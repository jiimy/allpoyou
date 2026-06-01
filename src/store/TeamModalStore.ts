import type { SetStateAction } from 'react';
import { create } from 'zustand';

type TeamModalStoreState = {
  isOpen: boolean;
  setIsOpen: (value: SetStateAction<boolean>) => void;
};

export const useTeamModalStore = create<TeamModalStoreState>((set) => ({
  isOpen: false,
  setIsOpen: (value) =>
    set((state) => ({
      isOpen: typeof value === 'function' ? value(state.isOpen) : value,
    })),
}));
