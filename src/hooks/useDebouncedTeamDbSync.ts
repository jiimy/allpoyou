'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  loadUserTeamsFromDb,
  saveTeamToDb,
  setTeamPublicOnDb,
} from '@/app/make-team/actions';
import { usePokemonTeamPersistHydrated } from '@/hooks/usePokemonTeamPersistHydrated';
import { hasTeamPokemonData } from '@/store/teamDbMappers';
import { usePokemonTeamStore } from '@/store/PokemonTeamStore';

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
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dbLoadedRef = useRef(false);
  const saveInFlightRef = useRef(false);
  const pendingTeamIdRef = useRef<number | null>(null);

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

  useEffect(() => {
    if (!authReady || !hydrated) return;

    if (!loggedInUserId) {
      dbLoadedRef.current = true;
      setTeamsSourceReady(true);
    }
  }, [authReady, hydrated, loggedInUserId]);

  useEffect(() => {
    if (!authReady || !loggedInUserId || !hydrated) return;

    let cancelled = false;
    dbLoadedRef.current = false;
    setTeamsSourceReady(false);

    (async () => {
      const result = await loadUserTeamsFromDb();
      if (cancelled) return;

      if (result == null) {
        dbLoadedRef.current = true;
        setTeamsSourceReady(true);
        return;
      }

      if ('error' in result) {
        setSaveStatus('error');
        dbLoadedRef.current = true;
        setTeamsSourceReady(true);
        return;
      }

      if (result.hasDbRows) {
        usePokemonTeamStore.getState().hydrateTeamsFromServer(result.teams);
      }

      dbLoadedRef.current = true;
      setTeamsSourceReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [authReady, loggedInUserId, hydrated]);

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
  };
}
