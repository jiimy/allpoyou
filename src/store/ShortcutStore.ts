'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import {
  DEFAULT_SHORTCUTS,
  mergeShortcuts,
  type ShortcutBinding,
  type ShortcutId,
} from '@/utils/shortcuts';

type ShortcutStoreState = {
  bindings: Record<ShortcutId, ShortcutBinding>;
  hasHydrated: boolean;
  setBinding: (id: ShortcutId, binding: ShortcutBinding) => void;
  resetBinding: (id: ShortcutId) => void;
  resetAll: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useShortcutStore = create<ShortcutStoreState>()(
  persist(
    (set) => ({
      bindings: { ...DEFAULT_SHORTCUTS },
      hasHydrated: false,
      setBinding: (id, binding) =>
        set((state) => ({
          bindings: { ...state.bindings, [id]: binding },
        })),
      resetBinding: (id) =>
        set((state) => ({
          bindings: { ...state.bindings, [id]: DEFAULT_SHORTCUTS[id] },
        })),
      resetAll: () => set({ bindings: { ...DEFAULT_SHORTCUTS } }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'allpoyou-shortcuts',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ bindings: state.bindings }),
      merge: (persisted, current) => {
        const saved = persisted as
          | Partial<ShortcutStoreState>
          | undefined;
        return {
          ...current,
          ...saved,
          bindings: mergeShortcuts(saved?.bindings),
        };
      },
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export function useShortcutBinding(id: ShortcutId): ShortcutBinding {
  return useShortcutStore((s) => s.bindings[id]);
}
