'use client';

import { useEffect, useMemo, useState } from 'react';
import type { TypeTablePokemon } from '@/components/typeTable/TypeTable';
import { fetchPokemonList, getCachedPokemonList } from '@/store/PokemonStore';
import {
  TEAM_SLOT_COUNT,
  type TeamPokemonSlot,
  usePokemonTeamStore,
} from '@/store/PokemonTeamStore';
import { ensureStringArray } from '@/utils/pokemonNormalize';
import { usePokemonTeamPersistHydrated } from '@/hooks/usePokemonTeamPersistHydrated';

function slotsToTypeTablePokemons(
  slots: (TeamPokemonSlot | null)[] | undefined,
): (TypeTablePokemon | null)[] {
  const list = getCachedPokemonList();

  return Array.from({ length: TEAM_SLOT_COUNT }, (_, index) => {
    const slot = slots?.[index];
    if (!slot?.pokemonId) return null;

    const fromList = list.find((p) => p.id === slot.pokemonId);
    const types =
      ensureStringArray(slot.types).length > 0
        ? ensureStringArray(slot.types)
        : fromList
          ? ensureStringArray(fromList.types)
          : [];

    return {
      name: slot.nameKo || fromList?.nameKo || '',
      types,
    };
  });
}

function slotsNeedPokemonList(
  slots: (TeamPokemonSlot | null)[] | undefined,
): boolean {
  if (!slots) return false;
  return slots.some(
    (slot) =>
      slot?.pokemonId != null && ensureStringArray(slot.types).length === 0,
  );
}

/** 활성 팀 슬롯 → TypeTable용 포켓몬 목록 (이름·타입) */
export function useActiveTeamTypeTablePokemons(): {
  pokemons: (TypeTablePokemon | null)[];
  isReady: boolean;
} {
  const storeHydrated = usePokemonTeamPersistHydrated();
  const activeTeam = usePokemonTeamStore((state) =>
    state.teams.find((t) => t.teamId === state.activeTeamId),
  );
  const slots = activeTeam?.pokemons;

  const [listReady, setListReady] = useState(
    () => getCachedPokemonList().length > 0,
  );

  const needsList = useMemo(() => slotsNeedPokemonList(slots), [slots]);

  useEffect(() => {
    if (!needsList || getCachedPokemonList().length > 0) {
      setListReady(true);
      return;
    }
    let cancelled = false;
    fetchPokemonList()
      .then(() => {
        if (!cancelled) setListReady(true);
      })
      .catch(() => {
        if (!cancelled) setListReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [needsList]);

  const pokemons = useMemo(
    () => slotsToTypeTablePokemons(slots),
    [slots, listReady, storeHydrated],
  );

  const isReady = storeHydrated && (!needsList || listReady);

  return { pokemons, isReady };
}
