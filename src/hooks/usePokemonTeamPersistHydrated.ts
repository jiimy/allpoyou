'use client';

import { useSyncExternalStore } from 'react';
import {
  isTeamStoreReadyForUse,
  subscribeSessionTeamReady,
  usePokemonTeamStore,
} from '@/store/PokemonTeamStore';

function subscribeTeamStoreReady(onStoreChange: () => void) {
  const persist = usePokemonTeamStore.persist;
  const unsubSession = subscribeSessionTeamReady(onStoreChange);
  const unsubPersist =
    persist && !persist.hasHydrated()
      ? persist.onFinishHydration(onStoreChange)
      : () => {};

  return () => {
    unsubSession();
    unsubPersist();
  };
}

/** 팀 스토어 사용 준비 여부 (게스트: persist 복원, 로그인: 세션 부트스트랩) */
export function usePokemonTeamPersistHydrated(): boolean {
  return useSyncExternalStore(
    subscribeTeamStoreReady,
    isTeamStoreReadyForUse,
    () => false,
  );
}
