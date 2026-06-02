import { create } from 'zustand';

import type { Pokemon } from '@/store/PokemonStore';

type PokemonPickStoreState = {
  pendingPokemon: Pokemon | null;
  setPendingPokemon: (pokemon: Pokemon | null) => void;
  clearPendingPokemon: () => void;
};

export const usePokemonPickStore = create<PokemonPickStoreState>((set) => ({
  pendingPokemon: null,
  setPendingPokemon: (pokemon) => set({ pendingPokemon: pokemon }),
  clearPendingPokemon: () => set({ pendingPokemon: null }),
}));
