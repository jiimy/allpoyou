import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const POKEMON_FAVORITE_KEY = 'allpoyou:pokemon-favorites';

type PokemonFavoriteState = {
  favoriteIds: number[];
  hasHydrated: boolean;
  isFavorite: (pokemonId: number) => boolean;
  toggleFavorite: (pokemonId: number) => void;
  setHasHydrated: (value: boolean) => void;
};

export const usePokemonFavoriteStore = create<PokemonFavoriteState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      hasHydrated: false,
      isFavorite: (pokemonId) => get().favoriteIds.includes(pokemonId),
      toggleFavorite: (pokemonId) => {
        if (!Number.isFinite(pokemonId)) return;
        set((state) => {
          const exists = state.favoriteIds.includes(pokemonId);
          return {
            favoriteIds: exists
              ? state.favoriteIds.filter((id) => id !== pokemonId)
              : [...state.favoriteIds, pokemonId],
          };
        });
      },
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: POKEMON_FAVORITE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ favoriteIds: state.favoriteIds }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
