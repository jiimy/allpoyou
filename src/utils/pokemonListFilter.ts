import type { Pokemon } from '@/store/PokemonStore';
import {
  isGmaxDisplayName,
  isGmaxEnglishName,
  isMegaDisplayName,
  isMegaEvolutionEnglishName,
} from '@/utils/pokemonName';

export type PokemonListFilterOptions = {
  excludeMega?: boolean;
  excludeGmax?: boolean;
  finalEvolutionOnly?: boolean;
};

/** 전역 포켓몬 리스트 필터 (메가/거다이/최종진화) */
export function applyPokemonListFilters<T extends Pokemon>(
  list: T[],
  options: PokemonListFilterOptions,
): T[] {
  const {
    excludeMega = false,
    excludeGmax = false,
    finalEvolutionOnly = false,
  } = options;

  if (!excludeMega && !excludeGmax && !finalEvolutionOnly) {
    return list;
  }

  return list.filter((p) => {
    if (
      excludeMega &&
      (isMegaDisplayName(p.nameKo) || isMegaEvolutionEnglishName(p.name))
    ) {
      return false;
    }
    if (
      excludeGmax &&
      (isGmaxDisplayName(p.nameKo) || isGmaxEnglishName(p.name))
    ) {
      return false;
    }
    if (finalEvolutionOnly && p.grade !== 3) {
      return false;
    }
    return true;
  });
}
