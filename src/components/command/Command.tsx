'use client';

import { useHeldModifiers } from '@/hooks/useHeldModifiers';
import { useSearchBarFocusStore } from '@/store/SearchBarFocusStore';
import { useShortcutStore } from '@/store/ShortcutStore';
import {
  formatShortcutBadge,
  modifiersMatchBinding,
  type ShortcutId,
} from '@/utils/shortcuts';

import s from './command.module.scss';

type CommandProps = {
  shortcutId: ShortcutId;
};

const Command = ({ shortcutId }: CommandProps) => {
  const modifiers = useHeldModifiers();
  const searchBarFocused = useSearchBarFocusStore((state) => state.isFocused);
  const binding = useShortcutStore((state) => state.bindings[shortcutId]);
  const hasHydrated = useShortcutStore((state) => state.hasHydrated);

  if (!hasHydrated) return null;
  if (searchBarFocused) return null;
  if (!modifiersMatchBinding(modifiers, binding)) return null;

  return <div className={s.command}>{formatShortcutBadge(binding)}</div>;
};

export default Command;
