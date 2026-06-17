import type { SetStateAction } from 'react';
import { create } from 'zustand';

type FloatingBtnStoreState = {
  isOpen: boolean;
  setIsOpen: (value: SetStateAction<boolean>) => void;
};

export const useFloatingBtnStore = create<FloatingBtnStoreState>((set) => ({
  isOpen: false,
  setIsOpen: (value) =>
    set((state) => ({
      isOpen: typeof value === 'function' ? value(state.isOpen) : value,
    })),
}));
