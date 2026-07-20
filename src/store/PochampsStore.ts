import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type PochampsBattleFormat = 'Doubles' | 'Singles';

const POCHAMPS_PERSIST_KEY = 'allpoyou:pochamps';

type PochampsState = {
  enabled: boolean;
  format: PochampsBattleFormat;
  /** localStorage 복원 완료 여부 (SSR/하이드레이션 깜빡임 방지) */
  hasHydrated: boolean;
  setEnabled: (enabled: boolean) => void;
  setFormat: (format: PochampsBattleFormat) => void;
  toggle: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
};

export const usePochampsStore = create<PochampsState>()(
  persist(
    (set) => ({
      enabled: false,
      format: 'Doubles',
      hasHydrated: false,
      setEnabled: (enabled) => set({ enabled }),
      setFormat: (format) => set({ format }),
      toggle: () => set((state) => ({ enabled: !state.enabled })),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: POCHAMPS_PERSIST_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        enabled: state.enabled,
        format: state.format,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
