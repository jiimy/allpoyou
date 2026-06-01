import type { Pokemon } from '@/store/PokemonStore';
import abilitiesData from '@/constants/abilities.json';
import type { TeamPokemonSlot } from '@/store/PokemonTeamStore';
import { ensureStringArray } from '@/utils/pokemonNormalize';

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
  existing?: TeamPokemonSlot | null,
): TeamPokemonSlot {
  const resolvedAbility = abilityName ?? getDefaultAbilityName(pokemon);
  const abilityId = getAbilityIdByNameKo(resolvedAbility);

  return {
    pokemonId: pokemon.id,
    nameKo: pokemon.nameKo,
    nameEn: pokemon.name,
    types: ensureStringArray(pokemon.types),
    form: existing?.pokemonId === pokemon.id ? existing.form : undefined,
    abilityId,
    itemId,
    nature:
      existing?.pokemonId === pokemon.id ? (existing.nature ?? null) : null,
    teraType:
      existing?.pokemonId === pokemon.id ? (existing.teraType ?? null) : null,
    moves:
      existing?.pokemonId === pokemon.id ? (existing.moves ?? []) : [],
    evs: existing?.pokemonId === pokemon.id ? (existing.evs ?? null) : null,
  };
}

export function buildPokemonsFromEditor(
  selectedPokemons: (Pokemon | null)[],
  selectedAbilities: (string | null)[],
  selectedItemIds: (number | null)[],
  existingSlots: (TeamPokemonSlot | null)[],
): (TeamPokemonSlot | null)[] {
  return selectedPokemons.map((pokemon, index) => {
    if (!pokemon) return null;
    const abilityName =
      selectedAbilities[index] ?? getDefaultAbilityName(pokemon);
    return buildTeamPokemonSlot(
      pokemon,
      abilityName,
      selectedItemIds[index] ?? null,
      existingSlots[index] ?? null,
    );
  });
}
