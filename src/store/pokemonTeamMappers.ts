import type { Pokemon } from '@/store/PokemonStore';
import abilitiesData from '@/constants/abilities.json';
import type {
  TeamPokemonEvs,
  TeamPokemonSlot,
} from '@/store/PokemonTeamStore';
import { ensureStringArray } from '@/utils/pokemonNormalize';
import {
  areBaseStatsModified,
  pickBaseStats,
  type PokemonBaseStats,
} from '@/utils/pokemonBaseStats';

type AbilityEntry = { nameKo: string; summary: string };

const ABILITY_ID_BY_NAME_KO = Object.entries(
  abilitiesData as Record<string, AbilityEntry>,
).reduce<Record<string, number>>((acc, [id, entry]) => {
  acc[entry.nameKo] = Number(id);
  return acc;
}, {});

const ABILITY_NAME_KO_BY_ID = Object.entries(
  abilitiesData as Record<string, AbilityEntry>,
).reduce<Record<number, string>>((acc, [id, entry]) => {
  acc[Number(id)] = entry.nameKo;
  return acc;
}, {});

export function getAbilityIdByNameKo(name: string | null): number | null {
  if (!name) return null;
  return ABILITY_ID_BY_NAME_KO[name] ?? null;
}

export function getAbilityNameById(id: number | null): string | null {
  if (id == null) return null;
  return ABILITY_NAME_KO_BY_ID[id] ?? null;
}

export function getDefaultAbilityName(pokemon: Pokemon): string | null {
  const ability = ensureStringArray(pokemon.ability);
  const sAbility = ensureStringArray(pokemon.s_ability);
  return ability[0] ?? sAbility[0] ?? null;
}

export function buildTeamPokemonSlot(
  pokemon: Pokemon,
  abilityName: string | null,
  itemId: number | null,
  moves: number[] | null,
  existing?: TeamPokemonSlot | null,
  nature?: string | null,
  evs?: TeamPokemonEvs | null,
  baseStats?: PokemonBaseStats | null,
): TeamPokemonSlot {
  const resolvedAbility = abilityName ?? getDefaultAbilityName(pokemon);
  const abilityId = getAbilityIdByNameKo(resolvedAbility);
  const sameAsExisting = existing?.pokemonId === pokemon.id;
  const resolvedMoves =
    moves ?? (sameAsExisting ? (existing?.moves ?? []) : []);
  const resolvedNature =
    nature !== undefined
      ? nature
      : sameAsExisting
        ? (existing?.nature ?? null)
        : null;
  const resolvedEvs =
    evs !== undefined
      ? evs
      : sameAsExisting
        ? (existing?.evs ?? null)
        : null;
  const resolvedBaseStats =
    baseStats !== undefined
      ? baseStats
      : sameAsExisting
        ? (existing?.baseStats ?? null)
        : null;

  return {
    pokemonId: pokemon.id,
    nameKo: pokemon.nameKo,
    nameEn: pokemon.name,
    types: ensureStringArray(pokemon.types),
    form: sameAsExisting ? existing?.form : undefined,
    abilityId,
    itemId,
    nature: resolvedNature,
    teraType: sameAsExisting ? (existing?.teraType ?? null) : null,
    moves: resolvedMoves,
    evs: resolvedEvs,
    images: sameAsExisting
      ? (existing?.images?.length ? existing.images : pokemon.images)
      : pokemon.images,
    baseStats: resolvedBaseStats,
  };
}

export function buildPokemonsFromEditor(
  selectedPokemons: (Pokemon | null)[],
  selectedAbilities: (string | null)[],
  selectedItemIds: (number | null)[],
  existingSlots: (TeamPokemonSlot | null)[],
  selectedMoveIds?: (number | null)[][],
  selectedNatures?: (string | null)[],
  selectedEvs?: (TeamPokemonEvs | null)[],
  originalBaseStatsBySlot?: (PokemonBaseStats | null)[],
): (TeamPokemonSlot | null)[] {
  return selectedPokemons.map((pokemon, index) => {
    if (!pokemon) return null;
    const abilityName =
      selectedAbilities[index] ?? getDefaultAbilityName(pokemon);
    const moves = selectedMoveIds
      ? selectedMoveIds[index].filter((id): id is number => id != null)
      : null;
    const originalBaseStats = originalBaseStatsBySlot?.[index] ?? null;
    const baseStats =
      originalBaseStats == null
        ? undefined
        : areBaseStatsModified(pokemon, originalBaseStats)
          ? pickBaseStats(pokemon)
          : null;

    return buildTeamPokemonSlot(
      pokemon,
      abilityName,
      selectedItemIds[index] ?? null,
      moves,
      existingSlots[index] ?? null,
      selectedNatures ? (selectedNatures[index] ?? null) : undefined,
      selectedEvs ? (selectedEvs[index] ?? null) : undefined,
      baseStats,
    );
  });
}
