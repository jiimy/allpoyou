'use client';

import { useEffect, useState } from 'react';
import { usePokemonTeamStore } from '@/store/PokemonTeamStore';

/** localStorage persist 복원 완료 여부 */
export function usePokemonTeamPersistHydrated(): boolean {
  const [hydrated, setHydrated] = useState(
    () => usePokemonTeamStore.persist.hasHydrated(),
  );

  useEffect(() => {
    if (usePokemonTeamStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }
    return usePokemonTeamStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });
  }, []);

  return hydrated;
}
