'use client';

import { useEffect } from 'react';
import { getLoggedInUserId, loadUserTeamsFromDb } from '@/app/make-team/actions';
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
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const userId = await getLoggedInUserId();
      if (cancelled) return;

      if (userId) {
        enableLoggedInTeamSession();

        if (!isSessionTeamBootstrapped()) {
          applyDbResult(await loadUserTeamsFromDb());
          if (cancelled) return;
          markSessionTeamBootstrapped();
        }
        return;
      }

      disableLoggedInTeamSession();
      await usePokemonTeamStore.persist?.rehydrate();
      if (cancelled) return;
      usePokemonTeamStore.setState({ serverTeamsLoadedAt: null });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
