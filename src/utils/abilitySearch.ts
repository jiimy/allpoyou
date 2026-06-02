import abilitiesData from '@/constants/abilities.json';

import type { Pokemon } from '@/store/PokemonStore';

export type AbilityListItem = {
  id: number;
  nameKo: string;
  summary: string;
};

type AbilityJsonEntry = {
  nameKo: string;
  summary: string;
};

export const ALL_ABILITIES: AbilityListItem[] = Object.entries(
  abilitiesData as Record<string, AbilityJsonEntry>,
)
  .map(([id, entry]) => ({
    id: Number(id),
    nameKo: entry.nameKo,
    summary: entry.summary,
  }))
  .filter((entry) => Number.isFinite(entry.id))
  .sort((a, b) => a.id - b.id);

export type FilteredAbility = AbilityListItem & {
  matchedPokemons: Pokemon[];
};

function collectPokemonAbilities(pokemon: Pokemon): string[] {
  return [...pokemon.ability, ...pokemon.s_ability];
}

function getPokemonsWithAbility(pokemons: Pokemon[], abilityName: string): Pokemon[] {
  return pokemons.filter((pokemon) =>
    collectPokemonAbilities(pokemon).includes(abilityName),
  );
}

function sortPokemons(pokemons: Pokemon[]): Pokemon[] {
  return [...pokemons].sort(
    (a, b) => a.number - b.number || a.nameKo.localeCompare(b.nameKo, 'ko'),
  );
}

/** 포켓몬 이름, 특성 이름, 특성 설명으로 특성 목록을 필터링합니다. */
export function filterAbilities(
  abilities: AbilityListItem[],
  pokemons: Pokemon[],
  keyword: string,
): FilteredAbility[] {
  const q = keyword.trim();
  if (!q) {
    return abilities.map((ability) => ({ ...ability, matchedPokemons: [] }));
  }

  const qLower = q.toLowerCase();
  const pokemonsMatchingQuery = pokemons.filter(
    (pokemon) =>
      pokemon.nameKo.includes(q) ||
      pokemon.name.includes(q) ||
      pokemon.name.toLowerCase().includes(qLower),
  );

  const abilityNamesFromPokemon = new Set<string>();
  const pokemonsByAbilityName = new Map<string, Pokemon[]>();

  for (const pokemon of pokemonsMatchingQuery) {
    for (const abilityName of collectPokemonAbilities(pokemon)) {
      abilityNamesFromPokemon.add(abilityName);

      const group = pokemonsByAbilityName.get(abilityName) ?? [];
      if (!group.some((entry) => entry.id === pokemon.id)) {
        group.push(pokemon);
        pokemonsByAbilityName.set(abilityName, group);
      }
    }
  }

  return abilities
    .filter(
      (ability) =>
        ability.nameKo.includes(q) ||
        ability.summary.includes(q) ||
        abilityNamesFromPokemon.has(ability.nameKo),
    )
    .sort((a, b) => a.id - b.id)
    .map((ability) => {
      const matchedByText =
        ability.nameKo.includes(q) || ability.summary.includes(q);
      const nameMatchedPokemons = pokemonsByAbilityName.get(ability.nameKo) ?? [];

      const matchedPokemons = matchedByText
        ? getPokemonsWithAbility(pokemons, ability.nameKo)
        : nameMatchedPokemons;

      return {
        ...ability,
        matchedPokemons: sortPokemons(matchedPokemons),
      };
    });
}
