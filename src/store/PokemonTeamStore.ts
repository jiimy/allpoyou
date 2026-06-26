import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
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

export const EV_TOTAL_MAX = 66;
export const EV_STAT_MAX = 32;
export const EV_STAT_KEYS = ['H', 'A', 'B', 'C', 'D', 'S'] as const;
export type EvStatKey = (typeof EV_STAT_KEYS)[number];

export function createEmptyEvs(): TeamPokemonEvs {
  return { H: 0, A: 0, B: 0, C: 0, D: 0, S: 0, total: 0 };
}

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
  /** [공식 일러스트 PNG, Showdown 애니 GIF] */
  images?: string[];
  /** 종족값 커스텀 시에만 저장 (미설정이면 dex 기본값) */
  baseStats?: PokemonBaseStats | null;
};

export type SavedTeam = {
  teamId: number;
  teamName: string;
  pokemons: (TeamPokemonSlot | null)[];
};

type PokemonTeamStoreState = {
  teams: SavedTeam[];
  activeTeamId: number;
  serverTeamsLoadedAt: number | null;
  setActiveTeamId: (teamId: number) => void;
  setTeamName: (teamId: number, teamName: string) => void;
  hydrateTeamsFromServer: (teams: SavedTeam[]) => void;
  syncActiveTeamPokemons: (pokemons: (TeamPokemonSlot | null)[]) => void;
  replaceTeamAtSlot: (
    teamId: number,
    teamName: string,
    pokemons: (TeamPokemonSlot | null)[],
  ) => void;
  updateActiveSlot: (
    index: number,
    patch: Partial<TeamPokemonSlot>,
  ) => void;
  getActiveTeam: () => SavedTeam | undefined;
  resetActiveTeam: () => void;
};

export const POKEMON_TEAM_PERSIST_KEY = 'allpoyou-pokemon-teams';

let loggedInSessionActive = false;
let sessionBootstrapped = false;
const sessionReadyListeners = new Set<() => void>();

export function enableLoggedInTeamSession() {
  loggedInSessionActive = true;
}

export function disableLoggedInTeamSession() {
  loggedInSessionActive = false;
  sessionBootstrapped = false;
}

export function isLoggedInTeamSessionActive() {
  return loggedInSessionActive;
}

export function isSessionTeamBootstrapped() {
  return sessionBootstrapped;
}

export function markSessionTeamBootstrapped() {
  sessionBootstrapped = true;
  sessionReadyListeners.forEach((listener) => listener());
}

export function subscribeSessionTeamReady(listener: () => void) {
  sessionReadyListeners.add(listener);
  return () => {
    sessionReadyListeners.delete(listener);
  };
}

export function isTeamStoreReadyForUse(): boolean {
  if (loggedInSessionActive) return sessionBootstrapped;
  const persist = usePokemonTeamStore.persist;
  if (!persist) return true;
  return persist.hasHydrated();
}

const conditionalTeamStorage = {
  getItem: (name: string) => {
    if (loggedInSessionActive) return null;
    return localStorage.getItem(name);
  },
  setItem: (name: string, value: string) => {
    if (loggedInSessionActive) return;
    localStorage.setItem(name, value);
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

function emptyPokemons(): (TeamPokemonSlot | null)[] {
  return Array.from({ length: TEAM_SLOT_COUNT }, () => null);
}

export function createDefaultTeams(): SavedTeam[] {
  return Array.from({ length: MAX_TEAMS }, (_, i) => ({
    teamId: i + 1,
    teamName: '',
    pokemons: emptyPokemons(),
  }));
}

export function normalizePersistedTeams(
  teams: SavedTeam[] | undefined,
): SavedTeam[] {
  return normalizeTeams(teams);
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
        images: Array.isArray(slot.images) ? slot.images : undefined,
        baseStats: parsePokemonBaseStats(slot.baseStats),
      } satisfies TeamPokemonSlot;
    });

    return {
      teamId: defaultTeam.teamId,
      teamName: saved.teamName ?? '',
      pokemons,
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

      replaceTeamAtSlot: (teamId, teamName, pokemons) =>
        set((state) => {
          if (teamId < 1 || teamId > MAX_TEAMS) return state;

          const normalized = Array.from(
            { length: TEAM_SLOT_COUNT },
            (_, index) => pokemons[index] ?? null,
          );

          return {
            activeTeamId: teamId,
            teams: state.teams.map((team) =>
              team.teamId === teamId
                ? { ...team, teamName, pokemons: normalized }
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
      storage: createJSONStorage(() => conditionalTeamStorage),
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

/** @deprecated enableLoggedInTeamSession 사용 */
export function pausePokemonTeamPersist() {
  enableLoggedInTeamSession();
}

/** @deprecated disableLoggedInTeamSession 사용 */
export function resumePokemonTeamPersist() {
  disableLoggedInTeamSession();
}

export function isPokemonTeamPersistWritesEnabled() {
  return !loggedInSessionActive;
}
