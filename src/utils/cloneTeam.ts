import {
  TEAM_SLOT_COUNT,
  type TeamPokemonSlot,
} from '@/store/teamDbMappers';

export function cloneTeamPokemons(
  pokemons: (TeamPokemonSlot | null)[],
): (TeamPokemonSlot | null)[] {
  return Array.from({ length: TEAM_SLOT_COUNT }, (_, index) => {
    const slot = pokemons[index];
    if (!slot) return null;

    return {
      ...slot,
      types: [...slot.types],
      moves: [...slot.moves],
      evs: slot.evs ? { ...slot.evs } : null,
    };
  });
}
