import type { SetStateAction } from 'react';
import { create } from 'zustand';

type NoticeModalStoreState = {
  isOpen: boolean;
  setIsOpen: (value: SetStateAction<boolean>) => void;
};

export const useNoticeModalStore = create<NoticeModalStoreState>((set) => ({
  isOpen: false,
  setIsOpen: (value) =>
    set((state) => ({
      isOpen: typeof value === 'function' ? value(state.isOpen) : value,
    })),
}));
