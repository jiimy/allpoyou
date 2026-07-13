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
  .sort((a, b) => a.nameKo.localeCompare(b.nameKo, 'ko'));

const ABILITY_SUMMARY_BY_NAME = Object.fromEntries(
  ALL_ABILITIES.map((ability) => [ability.nameKo, ability.summary]),
) as Record<string, string>;

export function getAbilitySummary(
  abilityName: string | null | undefined,
): string | null {
  if (!abilityName) return null;
  return ABILITY_SUMMARY_BY_NAME[abilityName] ?? null;
}

export function formatAbilityTooltipText(abilityNames: string[]): string | undefined {
  if (abilityNames.length === 0) return undefined;

  return abilityNames
    .map((name) => {
      const summary = getAbilitySummary(name);
      return summary ? `${name}: ${summary}` : name;
    })
    .join('\n');
}

export type FilteredAbility = AbilityListItem & {
  matchedPokemons: Pokemon[];
};

function collectPokemonAbilities(pokemon: Pokemon): string[] {
  return [...pokemon.ability, ...pokemon.s_ability];
}

export function getPokemonsWithAbilityName(
  pokemons: Pokemon[],
  abilityName: string,
): Pokemon[] {
  return sortPokemons(getPokemonsWithAbility(pokemons, abilityName));
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

export function searchAbilities(keyword: string, limit = 1000): AbilityListItem[] {
  const q = keyword.trim();
  if (!q) return ALL_ABILITIES.slice(0, limit);

  const result: AbilityListItem[] = [];
  for (const ability of ALL_ABILITIES) {
    if (ability.nameKo.includes(q) || ability.summary.includes(q)) {
      result.push(ability);
      if (result.length >= limit) break;
    }
  }
  return result;
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
    .sort((a, b) => a.nameKo.localeCompare(b.nameKo, 'ko'))
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
