import { create } from 'zustand';

type SearchBarFocusStoreState = {
  isFocused: boolean;
  setFocused: (focused: boolean) => void;
};

export const useSearchBarFocusStore = create<SearchBarFocusStoreState>((set) => ({
  isFocused: false,
  setFocused: (isFocused) => set({ isFocused }),
}));
