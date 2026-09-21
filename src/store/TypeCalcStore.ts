import { create } from 'zustand';

export type TypeCalcMode = 'attack' | 'defense';

type TypeCalcStoreState = {
  mode: TypeCalcMode;
  attackSelected: string[];
  defenseSelected: string[];
  recommendOn: boolean;
  setMode: (mode: TypeCalcMode) => void;
  setAttackSelected: (selected: string[]) => void;
  setDefenseSelected: (selected: string[]) => void;
  setRecommendOn: (recommendOn: boolean) => void;
};

export const useTypeCalcStore = create<TypeCalcStoreState>((set) => ({
  mode: 'attack',
  attackSelected: [],
  defenseSelected: [],
  recommendOn: false,
  setMode: (mode) => set({ mode }),
  setAttackSelected: (attackSelected) => set({ attackSelected }),
  setDefenseSelected: (defenseSelected) => set({ defenseSelected }),
  setRecommendOn: (recommendOn) => set({ recommendOn }),
}));
