import { create } from 'zustand';

export const TEAM_SLOT_COUNT = 6;

export type PokemonEvs = Partial<
  Record<'hp' | 'atk' | 'def' | 'spa' | 'spd' | 'spe', number>
>;

export type PokemonTeamMember = {
  pokemon_id: number;
  pokemon_name: string;
  item_id?: number;
  item_name?: string;
  move_ids?: number[];
  move_names?: string[];
  evs?: PokemonEvs; //"evs": { "h": 4, "a": 252, "b": 252 }
};

/** 최대 6마리까지 배열로 구성된 팀 */
export type PokemonTeam = PokemonTeamMember[];

type PokemonTeamMeta = {
  user_id: string;
  title?: string;
  game_name?: string;
  likes_count?: string;
  bookmarks_count?: string;
};

type PokemonTeamStoreState = PokemonTeamMeta & {
  /** 현재 편집 중인 6슬롯 (null = 빈 슬롯) */
  slots: (PokemonTeamMember | null)[];
  /** 저장된 팀 목록 */
  teams: PokemonTeam[];
  isLoading: boolean;
  error: string | null;
  setMeta: (meta: Partial<PokemonTeamMeta>) => void;
  setSlots: (slots: (PokemonTeamMember | null)[]) => void;
  setSlot: (index: number, member: PokemonTeamMember | null) => void;
  updateSlot: (index: number, patch: Partial<PokemonTeamMember>) => void;
  clearSlot: (index: number) => void;
  clearSlots: () => void;
  setTeams: (teams: PokemonTeam[]) => void;
  addTeam: (team: PokemonTeam) => void;
  updateTeam: (index: number, team: PokemonTeam) => void;
  removeTeam: (index: number) => void;
  buildTeamFromSlots: () => PokemonTeam;
  loadSlotsFromTeam: (team: PokemonTeam) => void;
  reset: () => void;
};

const emptySlots = (): (PokemonTeamMember | null)[] =>
  Array.from({ length: TEAM_SLOT_COUNT }, () => null);

const initialState = {
  user_id: '',
  title: undefined,
  game_name: undefined,
  likes_count: undefined,
  bookmarks_count: undefined,
  slots: emptySlots(),
  teams: [] as PokemonTeam[],
  isLoading: false,
  error: null as string | null,
};

export const usePokemonTeamStore = create<PokemonTeamStoreState>((set, get) => ({
  ...initialState,
  setMeta: (meta) => set(meta),
  setSlots: (slots) =>
    set({
      slots: Array.from({ length: TEAM_SLOT_COUNT }, (_, i) => slots[i] ?? null),
    }),
  setSlot: (index, member) =>
    set((state) => {
      if (index < 0 || index >= TEAM_SLOT_COUNT) return state;
      const next = [...state.slots];
      next[index] = member;
      return { slots: next };
    }),
  updateSlot: (index, patch) =>
    set((state) => {
      if (index < 0 || index >= TEAM_SLOT_COUNT) return state;
      const current = state.slots[index];
      if (!current) return state;
      const next = [...state.slots];
      next[index] = { ...current, ...patch };
      return { slots: next };
    }),
  clearSlot: (index) =>
    set((state) => {
      if (index < 0 || index >= TEAM_SLOT_COUNT) return state;
      const next = [...state.slots];
      next[index] = null;
      return { slots: next };
    }),
  clearSlots: () => set({ slots: emptySlots() }),
  setTeams: (teams) => set({ teams }),
  addTeam: (team) =>
    set((state) => ({
      teams: [...state.teams, team.slice(0, TEAM_SLOT_COUNT)],
    })),
  updateTeam: (index, team) =>
    set((state) => ({
      teams: state.teams.map((t, i) =>
        i === index ? team.slice(0, TEAM_SLOT_COUNT) : t,
      ),
    })),
  removeTeam: (index) =>
    set((state) => ({
      teams: state.teams.filter((_, i) => i !== index),
    })),
  buildTeamFromSlots: () =>
    get().slots.filter((member): member is PokemonTeamMember => member !== null),
  loadSlotsFromTeam: (team) =>
    set({
      slots: Array.from({ length: TEAM_SLOT_COUNT }, (_, i) => team[i] ?? null),
    }),
  reset: () => set({ ...initialState, slots: emptySlots() }),
}));
