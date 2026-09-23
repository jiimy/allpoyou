import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const POKEMON_LIST_FILTER_KEY = 'allpoyou:pokemon-list-filter';

type PokemonListFilterState = {
  excludeMega: boolean;
  excludeGmax: boolean;
  finalEvolutionOnly: boolean;
  /** 사이드 메뉴 열림 (persist 안 함) */
  menuOpen: boolean;
  hasHydrated: boolean;
  setExcludeMega: (value: boolean) => void;
  setExcludeGmax: (value: boolean) => void;
  setFinalEvolutionOnly: (value: boolean) => void;
  setMenuOpen: (value: boolean) => void;
  toggleMenu: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const usePokemonListFilterStore = create<PokemonListFilterState>()(
  persist(
    (set) => ({
      excludeMega: false,
      excludeGmax: false,
      finalEvolutionOnly: false,
      menuOpen: false,
      hasHydrated: false,
      setExcludeMega: (excludeMega) => set({ excludeMega }),
      setExcludeGmax: (excludeGmax) => set({ excludeGmax }),
      setFinalEvolutionOnly: (finalEvolutionOnly) => set({ finalEvolutionOnly }),
      setMenuOpen: (menuOpen) => set({ menuOpen }),
      toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: POKEMON_LIST_FILTER_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        excludeMega: state.excludeMega,
        excludeGmax: state.excludeGmax,
        finalEvolutionOnly: state.finalEvolutionOnly,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
