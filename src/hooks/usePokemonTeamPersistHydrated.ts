'use client';

import { useSyncExternalStore } from 'react';
import { usePokemonTeamStore } from '@/store/PokemonTeamStore';

function getHydratedSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  const persist = usePokemonTeamStore.persist;
  if (!persist) return true;
  return persist.hasHydrated();
}

function subscribeHydrated(onStoreChange: () => void): () => void {
  const persist = usePokemonTeamStore.persist;
  if (!persist || persist.hasHydrated()) return () => {};
  return persist.onFinishHydration(onStoreChange);
}

/** localStorage persist 복원 완료 여부 (SSR/prerender 시 persist API 미노출) */
export function usePokemonTeamPersistHydrated(): boolean {
  return useSyncExternalStore(
    subscribeHydrated,
    getHydratedSnapshot,
    () => false,
  );
}
