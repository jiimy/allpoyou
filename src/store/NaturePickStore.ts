import { create } from 'zustand';

type NaturePickStoreState = {
  pendingNature: string | null;
  setPendingNature: (nature: string | null) => void;
  clearPendingNature: () => void;
};

export const useNaturePickStore = create<NaturePickStoreState>((set) => ({
  pendingNature: null,
  setPendingNature: (nature) => set({ pendingNature: nature }),
  clearPendingNature: () => set({ pendingNature: null }),
}));
