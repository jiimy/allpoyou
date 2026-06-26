'use client';

import { useEffect } from 'react';

import { loadUserTeamsFromDb } from '@/app/make-team/actions';
import { useLoggedInUserId } from '@/hooks/useLoggedInUserId';
import {
  createDefaultTeams,
  disableLoggedInTeamSession,
  enableLoggedInTeamSession,
  isSessionTeamBootstrapped,
  markSessionTeamBootstrapped,
  usePokemonTeamStore,
} from '@/store/PokemonTeamStore';

function applyDbResult(
  result: Awaited<ReturnType<typeof loadUserTeamsFromDb>>,
) {
  const store = usePokemonTeamStore.getState();

  if (result == null || 'error' in result) {
    store.hydrateTeamsFromServer(createDefaultTeams());
    return;
  }

  if (result.hasDbRows) {
    store.hydrateTeamsFromServer(result.teams);
  } else {
    store.hydrateTeamsFromServer(createDefaultTeams());
  }
}

/** 로그인 시 persist 없이 메모리 스토어 부트스트랩 (모달·팀 만들기 공유) */
export function TeamSessionBootstrap() {
  const { userId, authReady } = useLoggedInUserId();

  useEffect(() => {
    if (!authReady) return;

    let cancelled = false;

    if (!userId) {
      disableLoggedInTeamSession();
      void Promise.resolve(usePokemonTeamStore.persist?.rehydrate()).then(() => {
        if (cancelled) return;
        usePokemonTeamStore.setState({ serverTeamsLoadedAt: null });
      });
      return () => {
        cancelled = true;
      };
    }

    enableLoggedInTeamSession();

    if (isSessionTeamBootstrapped()) {
      return () => {
        cancelled = true;
      };
    }

    void (async () => {
      applyDbResult(await loadUserTeamsFromDb());
      if (cancelled) return;
      markSessionTeamBootstrapped();
    })();

    return () => {
      cancelled = true;
    };
  }, [authReady, userId]);

  return null;
}
