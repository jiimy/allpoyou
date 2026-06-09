import type { TeamPokemonEvs, TeamPokemonSlot } from '@/store/teamDbMappers';
import { EV_STAT_KEYS, type EvStatKey } from '@/store/PokemonTeamStore';
import { getAbilityNameById } from '@/store/pokemonTeamMappers';
import { getItemNameKoById } from '@/utils/itemSearch';
import { getMoveById } from '@/utils/movesIndex';

const EV_SHORT_LABEL: Record<EvStatKey, string> = {
  H: 'HP',
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  S: 'S',
};

export function getPokemonPngUrl(pokemonId: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
}

export function formatInvestedEvs(evs: TeamPokemonEvs | null): string {
  if (!evs) return '';

  const parts = EV_STAT_KEYS.filter((key) => evs[key] > 0).map(
    (key) => `${EV_SHORT_LABEL[key]} ${evs[key]}`,
  );

  return parts.join(' ');
}

export type ResolvedPokemonSlot = {
  pokemonId: number;
  nameKo: string;
  types: string[];
  ability: string | null;
  item: string | null;
  nature: string | null;
  moves: string[];
  evsText: string;
  imageUrl: string;
};

export function resolvePokemonSlot(
  slot: TeamPokemonSlot | null,
): ResolvedPokemonSlot | null {
  if (!slot?.pokemonId) return null;

  return {
    pokemonId: slot.pokemonId,
    nameKo: slot.nameKo,
    types: slot.types,
    ability: getAbilityNameById(slot.abilityId),
    item: getItemNameKoById(slot.itemId),
    nature: slot.nature,
    moves: slot.moves
      .map((id) => getMoveById(id)?.koreanName ?? null)
      .filter((name): name is string => Boolean(name)),
    evsText: formatInvestedEvs(slot.evs),
    imageUrl: getPokemonPngUrl(slot.pokemonId),
  };
}

export function teamMatchesPokemonQuery(
  pokemons: (TeamPokemonSlot | null)[],
  query: string,
): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  return pokemons.some((slot) => {
    if (!slot) return false;
    return (
      slot.nameKo.toLowerCase().includes(q) ||
      slot.nameEn.toLowerCase().includes(q)
    );
  });
}
