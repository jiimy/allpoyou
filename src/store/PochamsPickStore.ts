import { create } from 'zustand';

import type { Pokemon } from '@/store/PokemonStore';
import type { TeamPokemonEvs } from '@/store/PokemonTeamStore';
import type { ItemKr } from '@/types/item';
import type { MoveDbEntry } from '@/types/move';

export type PochamsPendingBuild = {
  pokemon: Pokemon;
  abilityName: string | null;
  item: ItemKr | null;
  nature: string | null;
  moves: MoveDbEntry[];
  evs: TeamPokemonEvs | null;
};

type PochamsPickStoreState = {
  pendingBuild: PochamsPendingBuild | null;
  setPendingBuild: (build: PochamsPendingBuild | null) => void;
  clearPendingBuild: () => void;
};

export const usePochamsPickStore = create<PochamsPickStoreState>((set) => ({
  pendingBuild: null,
  setPendingBuild: (build) => set({ pendingBuild: build }),
  clearPendingBuild: () => set({ pendingBuild: null }),
}));
