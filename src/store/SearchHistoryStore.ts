import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const SEARCH_HISTORY_KEY = 'allpoyou:search-history';
export const SEARCH_HISTORY_MAX = 6;

/** SearchBar placeholderType 과 동일 */
export type SearchHistoryScope =
  | 'main'
  | 'pokemon'
  | 'moves'
  | 'item'
  | 'ability';

export type SearchHistoryKind =
  | 'search'
  | 'pokemon-info'
  | 'type-calc'
  | 'type-table';

export type SearchHistoryEntry = {
  id: string;
  /** 구버전 기록은 없을 수 있음 → search 로 취급 */
  kind?: SearchHistoryKind;
  scope?: SearchHistoryScope;
  keyword?: string;
  pokemonId?: number;
  createdAt: number;
};

export type HistoryModalKind = 'type-calc' | 'type-table';

export const SEARCH_SCOPE_LABEL: Record<SearchHistoryScope, string> = {
  main: '홈',
  pokemon: '도감',
  moves: '기술',
  item: '도구',
  ability: '특성',
};

export const SEARCH_SCOPE_PATH: Record<SearchHistoryScope, string> = {
  main: '/',
  pokemon: '/pokedex',
  moves: '/moves',
  item: '/items',
  ability: '/abilities',
};

export function getSearchHistoryKind(
  entry: SearchHistoryEntry,
): SearchHistoryKind {
  return entry.kind ?? 'search';
}

export function formatSearchHistoryLabel(entry: SearchHistoryEntry): string {
  const kind = getSearchHistoryKind(entry);
  if (kind === 'type-calc') return '타입계산기';
  if (kind === 'type-table') return '타입상성표';
  if (kind === 'pokemon-info') {
    return `도감정보 - ${entry.keyword ?? entry.pokemonId ?? ''}`;
  }
  const scope = entry.scope ?? 'pokemon';
  return `${SEARCH_SCOPE_LABEL[scope]} - ${entry.keyword ?? ''}`;
}

export function buildSearchHistoryHref(entry: SearchHistoryEntry): string | null {
  const kind = getSearchHistoryKind(entry);
  if (kind === 'pokemon-info' && entry.pokemonId != null) {
    return `/pokedex?pokemonId=${entry.pokemonId}`;
  }
  if (kind === 'search' && entry.scope && entry.keyword) {
    const path = SEARCH_SCOPE_PATH[entry.scope];
    return `${path}?q=${encodeURIComponent(entry.keyword)}`;
  }
  return null;
}

function sameEntry(a: SearchHistoryEntry, b: SearchHistoryEntry): boolean {
  const ak = getSearchHistoryKind(a);
  const bk = getSearchHistoryKind(b);
  if (ak !== bk) return false;
  if (ak === 'search') {
    return a.scope === b.scope && a.keyword === b.keyword;
  }
  if (ak === 'pokemon-info') {
    return a.pokemonId === b.pokemonId;
  }
  return true;
}

function pushEntry(
  entries: SearchHistoryEntry[],
  next: SearchHistoryEntry,
): SearchHistoryEntry[] {
  const withoutDup = entries.filter((entry) => !sameEntry(entry, next));
  return [next, ...withoutDup].slice(0, SEARCH_HISTORY_MAX);
}

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

type SearchHistoryState = {
  entries: SearchHistoryEntry[];
  pendingModal: HistoryModalKind | null;
  hasHydrated: boolean;
  addEntry: (scope: SearchHistoryScope, keyword: string) => void;
  addPokemonInfoEntry: (pokemonId: number, nameKo: string) => void;
  addModalEntry: (kind: HistoryModalKind) => void;
  requestModalOpen: (kind: HistoryModalKind) => void;
  consumePendingModal: () => HistoryModalKind | null;
  removeEntry: (id: string) => void;
  clearEntries: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set, get) => ({
      entries: [],
      pendingModal: null,
      hasHydrated: false,
      addEntry: (scope, keyword) => {
        const trimmed = keyword.trim();
        if (!trimmed) return;
        set((state) => ({
          entries: pushEntry(state.entries, {
            id: createId(),
            kind: 'search',
            scope,
            keyword: trimmed,
            createdAt: Date.now(),
          }),
        }));
      },
      addPokemonInfoEntry: (pokemonId, nameKo) => {
        const trimmed = nameKo.trim();
        if (!Number.isFinite(pokemonId) || !trimmed) return;
        set((state) => ({
          entries: pushEntry(state.entries, {
            id: createId(),
            kind: 'pokemon-info',
            pokemonId,
            keyword: trimmed,
            createdAt: Date.now(),
          }),
        }));
      },
      addModalEntry: (kind) => {
        set((state) => ({
          entries: pushEntry(state.entries, {
            id: createId(),
            kind,
            createdAt: Date.now(),
          }),
        }));
      },
      requestModalOpen: (kind) => set({ pendingModal: kind }),
      consumePendingModal: () => {
        const pending = get().pendingModal;
        if (pending) set({ pendingModal: null });
        return pending;
      },
      removeEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== id),
        })),
      clearEntries: () => set({ entries: [] }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: SEARCH_HISTORY_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ entries: state.entries }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
