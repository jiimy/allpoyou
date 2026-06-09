import { ensureStringArray } from '@/utils/pokemonNormalize';

export const TEAM_SLOT_COUNT = 6;
export const MAX_TEAMS = 5;

export type TeamPokemonEvs = {
  H: number;
  A: number;
  B: number;
  C: number;
  D: number;
  S: number;
  total: number;
};

export type TeamPokemonSlot = {
  pokemonId: number;
  nameKo: string;
  nameEn: string;
  types: string[];
  form?: string;
  abilityId: number | null;
  itemId: number | null;
  nature: string | null;
  teraType: string | null;
  moves: number[];
  evs: TeamPokemonEvs | null;
};

export type SavedTeam = {
  teamId: number;
  teamName: string;
  pokemons: (TeamPokemonSlot | null)[];
  isPublic?: boolean;
};

export function hasTeamPokemonData(team: SavedTeam): boolean {
  return team.pokemons.some((slot) => slot?.pokemonId != null);
}

export function createDefaultTeams(): SavedTeam[] {
  return Array.from({ length: MAX_TEAMS }, (_, i) => ({
    teamId: i + 1,
    teamName: '',
    pokemons: Array.from({ length: TEAM_SLOT_COUNT }, () => null),
    isPublic: false,
  }));
}

type TeamDbRow = {
  team_name?: string | null;
  pokemon_data?: unknown;
  is_public?: boolean | null;
};

function normalizePokemonSlot(slot: unknown): TeamPokemonSlot | null {
  if (!slot || typeof slot !== 'object') return null;
  const raw = slot as Record<string, unknown>;
  if (typeof raw.pokemonId !== 'number') return null;

  return {
    pokemonId: raw.pokemonId,
    nameKo: typeof raw.nameKo === 'string' ? raw.nameKo : '',
    nameEn: typeof raw.nameEn === 'string' ? raw.nameEn : '',
    types: ensureStringArray(raw.types),
    form: typeof raw.form === 'string' ? raw.form : undefined,
    abilityId: typeof raw.abilityId === 'number' ? raw.abilityId : null,
    itemId: typeof raw.itemId === 'number' ? raw.itemId : null,
    nature: typeof raw.nature === 'string' ? raw.nature : null,
    teraType: typeof raw.teraType === 'string' ? raw.teraType : null,
    moves: Array.isArray(raw.moves)
      ? raw.moves.filter((id): id is number => typeof id === 'number')
      : [],
    evs:
      raw.evs && typeof raw.evs === 'object'
        ? (raw.evs as TeamPokemonEvs)
        : null,
  };
}

export function normalizeTeamsFromDb(
  teamId: number,
  row: TeamDbRow,
): SavedTeam {
  const rawPokemons = Array.isArray(row.pokemon_data) ? row.pokemon_data : [];
  const pokemons = Array.from({ length: TEAM_SLOT_COUNT }, (_, i) =>
    normalizePokemonSlot(rawPokemons[i]),
  );

  return {
    teamId,
    teamName: row.team_name ?? '',
    pokemons,
    isPublic: row.is_public ?? false,
  };
}
