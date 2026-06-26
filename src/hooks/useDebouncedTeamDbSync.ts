'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  loadUserPublishedPokemonData,
  loadUserTeamsFromDb,
  publishTeamToDb,
  saveTeamToDb,
  uploadTeamsToDb,
} from '@/app/make-team/actions';
import { usePokemonTeamPersistHydrated } from '@/hooks/usePokemonTeamPersistHydrated';
import { hasTeamPokemonData, type SavedTeam } from '@/store/teamDbMappers';
import {
  createDefaultTeams,
  enableLoggedInTeamSession,
  isSessionTeamBootstrapped,
  resumePokemonTeamPersist,
  usePokemonTeamStore,
} from '@/store/PokemonTeamStore';
import { readGuestTeamsFromLocalStorage } from '@/utils/guestTeamStorage';
import { isTeamPublishable } from '@/utils/teamShare';

const DEFAULT_DEBOUNCE_MS = 4000;

export type TeamSaveStatus = 'idle' | 'saving' | 'saved' | 'error';

type UseDebouncedTeamDbSyncOptions = {
  loggedInUserId: string | null;
  authReady?: boolean;
  debounceMs?: number;
};

export function useDebouncedTeamDbSync({
  loggedInUserId,
  authReady = true,
  debounceMs = DEFAULT_DEBOUNCE_MS,
}: UseDebouncedTeamDbSyncOptions) {
  const hydrated = usePokemonTeamPersistHydrated();
  const [saveStatus, setSaveStatus] = useState<TeamSaveStatus>('idle');
  const [teamsSourceReady, setTeamsSourceReady] = useState(false);
  const [linkPromptOpen, setLinkPromptOpen] = useState(false);
  const [linkResolving, setLinkResolving] = useState(false);
  const [publishedPokemonDataList, setPublishedPokemonDataList] = useState<
    unknown[]
  >([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dbLoadedRef = useRef(false);
  const saveInFlightRef = useRef(false);
  const pendingTeamIdRef = useRef<number | null>(null);
  const guestTeamsRef = useRef<SavedTeam[] | null>(null);
  // const saveDeadlineRef = useRef<number | null>(null);
  // const countdownTickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const savedFlashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // const [saveCountdownSec, setSaveCountdownSec] = useState<number | null>(null);

  // const clearSaveCountdown = useCallback(() => {
  //   if (countdownTickRef.current) {
  //     clearInterval(countdownTickRef.current);
  //     countdownTickRef.current = null;
  //   }
  //   saveDeadlineRef.current = null;
  //   setSaveCountdownSec(null);
  // }, []);

  // const startSaveCountdown = useCallback(() => {
  //   clearSaveCountdown();
  //   saveDeadlineRef.current = Date.now() + debounceMs;
  //
  //   const tick = () => {
  //     const deadline = saveDeadlineRef.current;
  //     if (deadline == null) return;
  //
  //     const remainingMs = deadline - Date.now();
  //     if (remainingMs <= 0) {
  //       setSaveCountdownSec(0);
  //       return;
  //     }
  //
  //     setSaveCountdownSec(Math.ceil(remainingMs / 1000));
  //   };
  //
  //   tick();
  //   countdownTickRef.current = setInterval(tick, 100);
  // }, [clearSaveCountdown, debounceMs]);

  const showSavedFlash = useCallback(() => {
    if (savedFlashTimerRef.current) {
      clearTimeout(savedFlashTimerRef.current);
    }

    setSaveStatus('saved');
    savedFlashTimerRef.current = setTimeout(() => {
      savedFlashTimerRef.current = null;
      setSaveStatus('idle');
    }, 300);
  }, []);

  const applyDbTeamsToStore = useCallback(
    (result: Awaited<ReturnType<typeof loadUserTeamsFromDb>>) => {
      if (result == null) {
        usePokemonTeamStore.getState().hydrateTeamsFromServer(createDefaultTeams());
        return;
      }

      if ('error' in result) {
        setSaveStatus('error');
        usePokemonTeamStore.getState().hydrateTeamsFromServer(createDefaultTeams());
        return;
      }

      if (result.hasDbRows) {
        usePokemonTeamStore.getState().hydrateTeamsFromServer(result.teams);
      } else {
        usePokemonTeamStore.getState().hydrateTeamsFromServer(createDefaultTeams());
      }
    },
    [],
  );

  const loadDbTeamsIntoStore = useCallback(async () => {
    const result = await loadUserTeamsFromDb();
    applyDbTeamsToStore(result);
  }, [applyDbTeamsToStore]);

  const dbHasTeamData = useCallback(
    (result: Awaited<ReturnType<typeof loadUserTeamsFromDb>>) => {
      if (result == null || 'error' in result || !result.hasDbRows) {
        return false;
      }
      return result.teams.some(hasTeamPokemonData);
    },
    [],
  );

  const finishLoggedInBootstrap = useCallback(() => {
    dbLoadedRef.current = true;
    setTeamsSourceReady(true);
  }, []);

  const flushSave = useCallback(
    async (teamId: number) => {
      if (!loggedInUserId || saveInFlightRef.current) return;

      let currentTeamId: number | null = teamId;
      saveInFlightRef.current = true;

      while (currentTeamId != null) {
        const team = usePokemonTeamStore
          .getState()
          .teams.find((entry) => entry.teamId === currentTeamId);

        if (!team || !hasTeamPokemonData(team)) {
          if (
            pendingTeamIdRef.current != null &&
            pendingTeamIdRef.current !== currentTeamId
          ) {
            currentTeamId = pendingTeamIdRef.current;
            pendingTeamIdRef.current = null;
            continue;
          }
          break;
        }

        setSaveStatus('saving');
        // clearSaveCountdown();

        const result = await saveTeamToDb(team);

        if ('error' in result) {
          setSaveStatus('error');
          break;
        }

        showSavedFlash();

        if (
          pendingTeamIdRef.current != null &&
          pendingTeamIdRef.current !== currentTeamId
        ) {
          currentTeamId = pendingTeamIdRef.current;
          pendingTeamIdRef.current = null;
        } else {
          currentTeamId = null;
        }
      }

      saveInFlightRef.current = false;
    },
    [loggedInUserId, showSavedFlash],
  );

  const scheduleSave = useCallback(
    (teamId: number, immediate = false) => {
      if (!loggedInUserId || !dbLoadedRef.current) return;

      const team = usePokemonTeamStore
        .getState()
        .teams.find((entry) => entry.teamId === teamId);
      if (!team || !hasTeamPokemonData(team)) return;

      pendingTeamIdRef.current = teamId;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      if (immediate) {
        // clearSaveCountdown();
        void flushSave(teamId);
        return;
      }

      // startSaveCountdown();

      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        void flushSave(teamId);
      }, debounceMs);
    },
    [loggedInUserId, debounceMs, flushSave],
  );

  const confirmLinkLocalTeams = useCallback(async () => {
    const guestTeams = guestTeamsRef.current;
    if (!guestTeams) return;

    setLinkResolving(true);
    setSaveStatus('saving');

    const result = await uploadTeamsToDb(guestTeams);

    if ('error' in result) {
      setSaveStatus('error');
      setLinkResolving(false);
      return;
    }

    usePokemonTeamStore.getState().hydrateTeamsFromServer(guestTeams);
    guestTeamsRef.current = null;
    setLinkPromptOpen(false);
    showSavedFlash();
    finishLoggedInBootstrap();
    setLinkResolving(false);
  }, [finishLoggedInBootstrap, showSavedFlash]);

  const declineLinkLocalTeams = useCallback(async () => {
    setLinkResolving(true);
    guestTeamsRef.current = null;
    setLinkPromptOpen(false);

    await loadDbTeamsIntoStore();
    finishLoggedInBootstrap();
    setLinkResolving(false);
  }, [finishLoggedInBootstrap, loadDbTeamsIntoStore]);

  useEffect(() => {
    if (!authReady || !hydrated) return;

    if (!loggedInUserId) {
      resumePokemonTeamPersist();
      guestTeamsRef.current = null;
      setLinkPromptOpen(false);
      setTeamsSourceReady(false);

      void Promise.resolve(usePokemonTeamStore.persist?.rehydrate()).then(() => {
        usePokemonTeamStore.setState({ serverTeamsLoadedAt: null });
        dbLoadedRef.current = true;
        setTeamsSourceReady(true);
      });
    }
  }, [authReady, hydrated, loggedInUserId]);

  useEffect(() => {
    if (!authReady || !loggedInUserId || !hydrated) return;

    setLinkPromptOpen(false);
    guestTeamsRef.current = null;

    if (isSessionTeamBootstrapped()) {
      enableLoggedInTeamSession();
      finishLoggedInBootstrap();
      return;
    }

    let cancelled = false;
    dbLoadedRef.current = false;
    setTeamsSourceReady(false);
    enableLoggedInTeamSession();

    (async () => {
      const dbResult = await loadUserTeamsFromDb();
      if (cancelled) return;

      if (dbHasTeamData(dbResult)) {
        applyDbTeamsToStore(dbResult);
        finishLoggedInBootstrap();
        return;
      }

      const guestTeams = readGuestTeamsFromLocalStorage();
      if (guestTeams) {
        guestTeamsRef.current = guestTeams;
        setLinkPromptOpen(true);
        return;
      }

      applyDbTeamsToStore(dbResult);
      finishLoggedInBootstrap();
    })();

    return () => {
      cancelled = true;
    };
  }, [
    authReady,
    loggedInUserId,
    hydrated,
    finishLoggedInBootstrap,
    applyDbTeamsToStore,
    dbHasTeamData,
  ]);

  const refreshPublishedPokemonDataList = useCallback(async () => {
    if (!loggedInUserId) {
      setPublishedPokemonDataList([]);
      return;
    }

    const data = await loadUserPublishedPokemonData();
    setPublishedPokemonDataList(data);
  }, [loggedInUserId]);

  useEffect(() => {
    if (!authReady || !loggedInUserId) {
      setPublishedPokemonDataList([]);
      return;
    }

    void refreshPublishedPokemonDataList();
  }, [authReady, loggedInUserId, refreshPublishedPokemonDataList]);

  useEffect(() => {
    if (!authReady || !loggedInUserId) return;

    const handleRefresh = () => {
      if (document.visibilityState !== 'visible') return;
      void refreshPublishedPokemonDataList();
    };

    window.addEventListener('focus', handleRefresh);
    document.addEventListener('visibilitychange', handleRefresh);

    return () => {
      window.removeEventListener('focus', handleRefresh);
      document.removeEventListener('visibilitychange', handleRefresh);
    };
  }, [authReady, loggedInUserId, refreshPublishedPokemonDataList]);

  useEffect(() => {
    if (!loggedInUserId || !teamsSourceReady) return;

    const unsub = usePokemonTeamStore.subscribe((state, prevState) => {
      if (!dbLoadedRef.current) return;

      if (state.activeTeamId !== prevState.activeTeamId) {
        scheduleSave(prevState.activeTeamId, true);
        return;
      }

      const activeId = state.activeTeamId;
      const prevTeam = prevState.teams.find((team) => team.teamId === activeId);
      const nextTeam = state.teams.find((team) => team.teamId === activeId);

      if (JSON.stringify(prevTeam) !== JSON.stringify(nextTeam)) {
        scheduleSave(activeId);
      }
    });

    return () => {
      unsub();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      // clearSaveCountdown();
      if (savedFlashTimerRef.current) {
        clearTimeout(savedFlashTimerRef.current);
        savedFlashTimerRef.current = null;
      }
    };
  }, [loggedInUserId, teamsSourceReady, scheduleSave]);

  const publishTeamPublic = useCallback(async (teamId: number) => {
    const freshPublished = await loadUserPublishedPokemonData();
    setPublishedPokemonDataList(freshPublished);

    const state = usePokemonTeamStore.getState();
    const team = state.teams.find((entry) => entry.teamId === teamId);
    if (!team || !isTeamPublishable(team, freshPublished)) {
      throw new Error(
        '공개 조건을 다시 확인해 주세요. 동일한 포켓몬 구성으로 이미 공개한 팀이 있거나 필수 항목이 비어 있을 수 있습니다.',
      );
    }

    const result = await publishTeamToDb(teamId, team);

    if ('error' in result) {
      setSaveStatus('error');
      throw new Error(result.error);
    }

    setPublishedPokemonDataList((prev) => [...prev, team.pokemons]);
    showSavedFlash();
  }, [showSavedFlash]);

  return {
    teamsSourceReady,
    saveStatus,
    // saveCountdownSec,
    publishTeamPublic,
    publishedPokemonDataList,
    isLoggedIn: authReady && loggedInUserId != null,
    linkPromptOpen,
    linkResolving,
    confirmLinkLocalTeams,
    declineLinkLocalTeams,
  };
}
