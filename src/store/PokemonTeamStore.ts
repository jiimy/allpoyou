import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
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

/** 한 포켓몬에게 줄 수 있는 노력치 총합 */
export const EV_TOTAL_MAX = 66;
/** 한 항목에 줄 수 있는 노력치 최대치 */
export const EV_STAT_MAX = 32;
export const EV_STAT_KEYS = ['H', 'A', 'B', 'C', 'D', 'S'] as const;
export type EvStatKey = (typeof EV_STAT_KEYS)[number];

export function createEmptyEvs(): TeamPokemonEvs {
  return { H: 0, A: 0, B: 0, C: 0, D: 0, S: 0, total: 0 };
}

export type TeamPokemonSlot = {
  /** pokemon.csv row id */
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

type PokemonTeamStoreState = {
  teams: SavedTeam[];
  activeTeamId: number;
  serverTeamsLoadedAt: number | null;
  setActiveTeamId: (teamId: number) => void;
  setTeamName: (teamId: number, teamName: string) => void;
  setTeamPublic: (teamId: number, isPublic: boolean) => void;
  hydrateTeamsFromServer: (teams: SavedTeam[]) => void;
  syncActiveTeamPokemons: (pokemons: (TeamPokemonSlot | null)[]) => void;
  updateActiveSlot: (
    index: number,
    patch: Partial<TeamPokemonSlot>,
  ) => void;
  getActiveTeam: () => SavedTeam | undefined;
  resetActiveTeam: () => void;
};

export const POKEMON_TEAM_PERSIST_KEY = 'allpoyou-pokemon-teams';

export function getPokemonTeamPersistKey(userId?: string | null) {
  return userId
    ? `${POKEMON_TEAM_PERSIST_KEY}-${userId}`
    : POKEMON_TEAM_PERSIST_KEY;
}

function emptyPokemons(): (TeamPokemonSlot | null)[] {
  return Array.from({ length: TEAM_SLOT_COUNT }, () => null);
}

export function createDefaultTeams(): SavedTeam[] {
  return Array.from({ length: MAX_TEAMS }, (_, i) => ({
    teamId: i + 1,
    teamName: '',
    pokemons: emptyPokemons(),
    isPublic: false,
  }));
}

export function countFilledPokemonSlots(teams: SavedTeam[]): number {
  return teams.reduce(
    (sum, team) => sum + team.pokemons.filter((slot) => slot?.pokemonId).length,
    0,
  );
}

export function mergeTeamsPreferRicher(
  local: SavedTeam[],
  server: SavedTeam[],
): SavedTeam[] {
  const defaults = createDefaultTeams();

  return defaults.map((defaultTeam) => {
    const localTeam =
      local.find((team) => team.teamId === defaultTeam.teamId) ?? defaultTeam;
    const serverTeam =
      server.find((team) => team.teamId === defaultTeam.teamId) ?? defaultTeam;

    const localCount = localTeam.pokemons.filter((slot) => slot?.pokemonId).length;
    const serverCount = serverTeam.pokemons.filter(
      (slot) => slot?.pokemonId,
    ).length;

    if (serverCount > localCount) return normalizeTeams([serverTeam])[0];
    if (localCount > serverCount) return localTeam;

    return {
      ...localTeam,
      teamName: serverTeam.teamName || localTeam.teamName,
      isPublic: serverTeam.isPublic ?? localTeam.isPublic,
    };
  });
}

function normalizeTeams(teams: SavedTeam[] | undefined): SavedTeam[] {
  const defaults = createDefaultTeams();
  if (!teams?.length) return defaults;

  return defaults.map((defaultTeam) => {
    const saved = teams.find((t) => t.teamId === defaultTeam.teamId);
    if (!saved) return defaultTeam;

    const pokemons = Array.from({ length: TEAM_SLOT_COUNT }, (_, i) => {
      const slot = saved.pokemons?.[i];
      if (!slot?.pokemonId) return null;
      return {
        pokemonId: slot.pokemonId,
        nameKo: slot.nameKo ?? '',
        nameEn: slot.nameEn ?? '',
        types: ensureStringArray(slot.types),
        form: slot.form,
        abilityId: slot.abilityId ?? null,
        itemId: slot.itemId ?? null,
        nature: slot.nature ?? null,
        teraType: slot.teraType ?? null,
        moves: Array.isArray(slot.moves) ? slot.moves : [],
        evs: slot.evs ?? null,
      } satisfies TeamPokemonSlot;
    });

    return {
      teamId: defaultTeam.teamId,
      teamName: saved.teamName ?? '',
      pokemons,
      isPublic: saved.isPublic ?? false,
    };
  });
}

export const usePokemonTeamStore = create<PokemonTeamStoreState>()(
  persist(
    (set, get) => ({
      teams: createDefaultTeams(),
      activeTeamId: 1,
      serverTeamsLoadedAt: null,

      setActiveTeamId: (teamId) => {
        if (teamId < 1 || teamId > MAX_TEAMS) return;
        set({ activeTeamId: teamId });
      },

      setTeamName: (teamId, teamName) =>
        set((state) => ({
          teams: state.teams.map((team) =>
            team.teamId === teamId ? { ...team, teamName } : team,
          ),
        })),

      setTeamPublic: (teamId, isPublic) =>
        set((state) => ({
          teams: state.teams.map((team) =>
            team.teamId === teamId ? { ...team, isPublic } : team,
          ),
        })),

      hydrateTeamsFromServer: (teams) =>
        set({
          teams: normalizeTeams(teams),
          serverTeamsLoadedAt: Date.now(),
        }),

      syncActiveTeamPokemons: (pokemons) =>
        set((state) => {
          const normalized = Array.from(
            { length: TEAM_SLOT_COUNT },
            (_, i) => pokemons[i] ?? null,
          );
          return {
            teams: state.teams.map((team) =>
              team.teamId === state.activeTeamId
                ? { ...team, pokemons: normalized }
                : team,
            ),
          };
        }),

      updateActiveSlot: (index, patch) =>
        set((state) => {
          if (index < 0 || index >= TEAM_SLOT_COUNT) return state;
          return {
            teams: state.teams.map((team) => {
              if (team.teamId !== state.activeTeamId) return team;
              const current = team.pokemons[index];
              if (!current) return team;
              const next = [...team.pokemons];
              next[index] = { ...current, ...patch };
              return { ...team, pokemons: next };
            }),
          };
        }),

      getActiveTeam: () => {
        const { teams, activeTeamId } = get();
        return teams.find((t) => t.teamId === activeTeamId);
      },

      resetActiveTeam: () =>
        set((state) => ({
          teams: state.teams.map((team) =>
            team.teamId === state.activeTeamId
              ? { ...team, pokemons: emptyPokemons() }
              : team,
          ),
        })),
    }),
    {
      name: POKEMON_TEAM_PERSIST_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        teams: state.teams,
        activeTeamId: state.activeTeamId,
      }),
      merge: (persisted, current) => {
        const saved = persisted as Partial<PokemonTeamStoreState> | undefined;
        return {
          ...current,
          teams: normalizeTeams(saved?.teams),
          activeTeamId:
            saved?.activeTeamId != null &&
            saved.activeTeamId >= 1 &&
            saved.activeTeamId <= MAX_TEAMS
              ? saved.activeTeamId
              : current.activeTeamId,
        };
      },
    },
  ),
);

export function setPokemonTeamPersistUser(userId: string | null) {
  if (typeof window === 'undefined') return;
  const persist = usePokemonTeamStore.persist;
  if (!persist) return;
  persist.setOptions({ name: getPokemonTeamPersistKey(userId) });
}
