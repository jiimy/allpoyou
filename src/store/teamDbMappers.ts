import { ensureStringArray } from '@/utils/pokemonNormalize';
import {
  parsePokemonBaseStats,
  type PokemonBaseStats,
} from '@/utils/pokemonBaseStats';

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
  images?: string[];
  baseStats?: PokemonBaseStats | null;
};

export type SavedTeam = {
  teamId: number;
  teamName: string;
  pokemons: (TeamPokemonSlot | null)[];
};

export function hasTeamPokemonData(team: SavedTeam): boolean {
  return team.pokemons.some((slot) => slot?.pokemonId != null);
}

export function createDefaultTeams(): SavedTeam[] {
  return Array.from({ length: MAX_TEAMS }, (_, i) => ({
    teamId: i + 1,
    teamName: '',
    pokemons: Array.from({ length: TEAM_SLOT_COUNT }, () => null),
  }));
}

export type TeamDbRow = {
  team_slot?: unknown;
  team_name?: string | null;
  pokemon_data?: unknown;
};

function parseNumericId(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function parseTeamSlot(value: unknown, fallbackIndex: number): number {
  const parsed = parseNumericId(value);
  if (parsed != null && parsed >= 1 && parsed <= MAX_TEAMS) {
    return parsed;
  }
  return Math.min(fallbackIndex + 1, MAX_TEAMS);
}

function normalizePokemonSlot(slot: unknown): TeamPokemonSlot | null {
  if (!slot || typeof slot !== 'object') return null;
  const raw = slot as Record<string, unknown>;
  const pokemonId = parseNumericId(raw.pokemonId ?? raw.pokemon_id);
  if (pokemonId == null) return null;

  return {
    pokemonId,
    nameKo: typeof raw.nameKo === 'string' ? raw.nameKo : '',
    nameEn: typeof raw.nameEn === 'string' ? raw.nameEn : '',
    types: ensureStringArray(raw.types),
    form: typeof raw.form === 'string' ? raw.form : undefined,
    abilityId: parseNumericId(raw.abilityId ?? raw.ability_id),
    itemId: parseNumericId(raw.itemId ?? raw.item_id),
    nature: typeof raw.nature === 'string' ? raw.nature : null,
    teraType: typeof raw.teraType === 'string' ? raw.teraType : null,
    moves: Array.isArray(raw.moves)
      ? raw.moves
          .map((id) => parseNumericId(id))
          .filter((id): id is number => id != null)
      : [],
    evs:
      raw.evs && typeof raw.evs === 'object'
        ? (raw.evs as TeamPokemonEvs)
        : null,
    images: Array.isArray(raw.images)
      ? raw.images.filter((url): url is string => typeof url === 'string')
      : undefined,
    baseStats: parsePokemonBaseStats(raw.baseStats),
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
  };
}

/** DB rows → 5개 팀 슬롯 (team_slot 숫자/문자열 모두 처리) */
export function mapTeamsFromDbRows(rows: TeamDbRow[]): SavedTeam[] {
  const teams = createDefaultTeams();

  rows.forEach((row, index) => {
    const teamId = parseTeamSlot(row.team_slot, index);
    teams[teamId - 1] = normalizeTeamsFromDb(teamId, row);
  });

  return teams;
}
