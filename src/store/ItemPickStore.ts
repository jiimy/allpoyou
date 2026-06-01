import { create } from 'zustand';
import type { ItemKr } from '@/types/item';

type ItemPickStoreState = {
  pendingItem: ItemKr | null;
  setPendingItem: (item: ItemKr | null) => void;
  clearPendingItem: () => void;
};

export const useItemPickStore = create<ItemPickStoreState>((set) => ({
  pendingItem: null,
  setPendingItem: (item) => set({ pendingItem: item }),
  clearPendingItem: () => set({ pendingItem: null }),
}));
