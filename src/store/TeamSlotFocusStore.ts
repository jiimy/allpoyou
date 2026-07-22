import { create } from 'zustand';

import { TEAM_SLOT_COUNT } from '@/store/PokemonTeamStore';

type TeamSlotFocusStoreState = {
  /** 마지막으로 선택한 팀 슬롯 (0-based) */
  focusedSlotIndex: number;
  setFocusedSlotIndex: (index: number) => void;
};

export const useTeamSlotFocusStore = create<TeamSlotFocusStoreState>((set) => ({
  focusedSlotIndex: 0,
  setFocusedSlotIndex: (index) => {
    if (!Number.isInteger(index) || index < 0 || index >= TEAM_SLOT_COUNT) {
      return;
    }
    set({ focusedSlotIndex: index });
  },
}));
