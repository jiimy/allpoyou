import { create } from 'zustand';

export type TypeCalcMode = 'attack' | 'defense';

type TypeCalcStoreState = {
  mode: TypeCalcMode;
  attackSelected: string[];
  defenseSelected: string[];
  setMode: (mode: TypeCalcMode) => void;
  setAttackSelected: (selected: string[]) => void;
  setDefenseSelected: (selected: string[]) => void;
};

export const useTypeCalcStore = create<TypeCalcStoreState>((set) => ({
  mode: 'attack',
  attackSelected: [],
  defenseSelected: [],
  setMode: (mode) => set({ mode }),
  setAttackSelected: (attackSelected) => set({ attackSelected }),
  setDefenseSelected: (defenseSelected) => set({ defenseSelected }),
}));
