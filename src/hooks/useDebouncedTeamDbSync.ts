'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  loadUserTeamsFromDb,
  saveTeamToDb,
  setTeamPublicOnDb,
} from '@/app/make-team/actions';
import { usePokemonTeamPersistHydrated } from '@/hooks/usePokemonTeamPersistHydrated';
import {
  mergeTeamsPreferRicher,
  usePokemonTeamStore,
} from '@/store/PokemonTeamStore';

const DEFAULT_DEBOUNCE_MS = 5000;

/** 같은 브라우저 세션에서 사용자별 DB 초기 로드 1회만 수행 */
let dbSyncedSessionUserId: string | null = null;

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
  const [dbLoadedFromServer, setDbLoadedFromServer] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dbLoadedRef = useRef(false);
  const saveInFlightRef = useRef(false);
  const pendingTeamIdRef = useRef<number | null>(null);

  const dbReady =
    loggedInUserId != null
      ? dbLoadedFromServer
      : authReady && hydrated;

  const flushSave = useCallback(
    async (teamId: number) => {
      if (!loggedInUserId || saveInFlightRef.current) return;

      let currentTeamId: number | null = teamId;
      saveInFlightRef.current = true;

      while (currentTeamId != null) {
        setSaveStatus('saving');

        const team = usePokemonTeamStore
          .getState()
          .teams.find((entry) => entry.teamId === currentTeamId);
        if (!team) break;

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

  useEffect(() => {
    if (!authReady || !hydrated) return;

    if (!loggedInUserId) {
      dbSyncedSessionUserId = null;
      dbLoadedRef.current = true;
    }
  }, [authReady, hydrated, loggedInUserId]);

  useEffect(() => {
    if (!authReady || !loggedInUserId || !hydrated) return;

    if (dbSyncedSessionUserId === loggedInUserId) {
      dbLoadedRef.current = true;
      setDbLoadedFromServer(true);
      return;
    }

    let cancelled = false;

    (async () => {
      const result = await loadUserTeamsFromDb();
      if (cancelled) return;

      if (result == null) {
        dbSyncedSessionUserId = loggedInUserId;
        dbLoadedRef.current = true;
        setDbLoadedFromServer(true);
        return;
      }

      if ('error' in result) {
        setSaveStatus('error');
        dbSyncedSessionUserId = loggedInUserId;
        dbLoadedRef.current = true;
        setDbLoadedFromServer(true);
        return;
      }

      if (result.hasDbRows) {
        const localTeams = usePokemonTeamStore.getState().teams;
        const mergedTeams = mergeTeamsPreferRicher(localTeams, result.teams);
        usePokemonTeamStore.getState().hydrateTeamsFromServer(mergedTeams);
      }

      dbSyncedSessionUserId = loggedInUserId;
      dbLoadedRef.current = true;
      setDbLoadedFromServer(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [authReady, loggedInUserId, hydrated]);

  useEffect(() => {
    if (!loggedInUserId || !dbReady) return;

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
  }, [loggedInUserId, dbReady, scheduleSave]);

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
    dbReady,
    saveStatus,
    toggleTeamPublic,
    isLoggedIn: authReady && loggedInUserId != null,
  };
}
