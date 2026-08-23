'use client';

import { useEffect } from 'react';

import { useShortcutStore } from '@/store/ShortcutStore';
import {
  isEditableTarget,
  matchesShortcut,
  type ShortcutId,
} from '@/utils/shortcuts';

/**
 * 설정된 단축키로 모달 open 상태를 토글합니다.
 */
export function useModalShortcut(
  shortcutId: ShortcutId,
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>,
  enabled = true,
) {
  const binding = useShortcutStore((s) => s.bindings[shortcutId]);
  const hasHydrated = useShortcutStore((s) => s.hasHydrated);

  useEffect(() => {
    if (!enabled || !hasHydrated) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (isEditableTarget(e.target)) return;
      if (!matchesShortcut(e, binding)) return;

      e.preventDefault();
      setOnModal((open) => !open);
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [binding, enabled, hasHydrated, setOnModal]);
}
