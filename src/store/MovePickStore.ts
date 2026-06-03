import { create } from 'zustand';
import type { MoveDbEntry } from '@/types/move';

type MovePickStoreState = {
  pendingMove: MoveDbEntry | null;
  setPendingMove: (move: MoveDbEntry | null) => void;
  clearPendingMove: () => void;
};

export const useMovePickStore = create<MovePickStoreState>((set) => ({
  pendingMove: null,
  setPendingMove: (move) => set({ pendingMove: move }),
  clearPendingMove: () => set({ pendingMove: null }),
}));
