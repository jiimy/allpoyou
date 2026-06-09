'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  loadUserTeamsFromDb,
  saveTeamToDb,
  setTeamPublicOnDb,
  uploadTeamsToDb,
} from '@/app/make-team/actions';
import { usePokemonTeamPersistHydrated } from '@/hooks/usePokemonTeamPersistHydrated';
import { hasTeamPokemonData, type SavedTeam } from '@/store/teamDbMappers';
import {
  createDefaultTeams,
  pausePokemonTeamPersist,
  resumePokemonTeamPersist,
  usePokemonTeamStore,
} from '@/store/PokemonTeamStore';
import { readGuestTeamsFromLocalStorage } from '@/utils/guestTeamStorage';

const DEFAULT_DEBOUNCE_MS = 5000;

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
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dbLoadedRef = useRef(false);
  const saveInFlightRef = useRef(false);
  const pendingTeamIdRef = useRef<number | null>(null);
  const guestTeamsRef = useRef<SavedTeam[] | null>(null);

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

        const result = await saveTeamToDb(team);

        if ('error' in result) {
          setSaveStatus('error');
          break;
        }

        setSaveStatus('saved');

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
    [loggedInUserId],
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
        void flushSave(teamId);
        return;
      }

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
    setSaveStatus('saved');
    finishLoggedInBootstrap();
    setLinkResolving(false);
  }, [finishLoggedInBootstrap]);

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

    let cancelled = false;
    dbLoadedRef.current = false;
    setTeamsSourceReady(false);
    setLinkPromptOpen(false);
    guestTeamsRef.current = null;

    pausePokemonTeamPersist();

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
    };
  }, [loggedInUserId, teamsSourceReady, scheduleSave]);

  const toggleTeamPublic = useCallback(async (teamId: number) => {
    const state = usePokemonTeamStore.getState();
    const team = state.teams.find((entry) => entry.teamId === teamId);
    if (!team) return;

    const nextPublic = !(team.isPublic ?? false);
    const result = await setTeamPublicOnDb(teamId, nextPublic, team);

    if ('error' in result) {
      setSaveStatus('error');
      throw new Error(result.error);
    }

    state.setTeamPublic(teamId, nextPublic);
    setSaveStatus('saved');
  }, []);

  return {
    teamsSourceReady,
    saveStatus,
    toggleTeamPublic,
    isLoggedIn: authReady && loggedInUserId != null,
    linkPromptOpen,
    linkResolving,
    confirmLinkLocalTeams,
    declineLinkLocalTeams,
  };
}
