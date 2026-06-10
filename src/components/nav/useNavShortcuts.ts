'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  return target.isContentEditable;
}

/** Nav Command 배지와 동일한 Shift + 키 → 경로 */
export const NAV_SHORTCUT_ROUTES = {
  q: '/pokedex',
  w: '/abilities',
  e: '/items',
  r: '/moves',
  t: '/make-team',
} as const;

export function useNavShortcuts() {
  const router = useRouter();

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (!event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
        return;
      }
      if (isEditableTarget(event.target)) return;

      const href =
        NAV_SHORTCUT_ROUTES[
          event.key.toLowerCase() as keyof typeof NAV_SHORTCUT_ROUTES
        ];
      if (!href) return;

      event.preventDefault();
      router.push(href);
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [router]);
}
