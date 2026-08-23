'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useShortcutStore } from '@/store/ShortcutStore';
import {
  isEditableTarget,
  matchesShortcut,
  SHORTCUT_DEFS,
} from '@/utils/shortcuts';

const NAV_SHORTCUT_IDS = SHORTCUT_DEFS.filter((d) => d.group === 'nav').map(
  (d) => d.id,
);

export function useNavShortcuts() {
  const router = useRouter();
  const bindings = useShortcutStore((s) => s.bindings);
  const hasHydrated = useShortcutStore((s) => s.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;

    const handleKeydown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return;

      for (const id of NAV_SHORTCUT_IDS) {
        const def = SHORTCUT_DEFS.find((d) => d.id === id);
        if (!def?.href) continue;
        if (!matchesShortcut(event, bindings[id])) continue;

        event.preventDefault();
        router.push(def.href);
        return;
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [bindings, hasHydrated, router]);
}
