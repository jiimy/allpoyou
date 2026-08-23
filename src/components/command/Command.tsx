'use client';

import { useSyncExternalStore } from 'react';

import { useShortcutStore } from '@/store/ShortcutStore';
import {
  formatShortcutBadge,
  modifiersMatchBinding,
  type ShortcutId,
} from '@/utils/shortcuts';

import s from './command.module.scss';

type HeldModifiers = {
  shift: boolean;
  ctrl: boolean;
  alt: boolean;
};

let held: HeldModifiers = { shift: false, ctrl: false, alt: false };
let listenersInitialized = false;
const subscribers = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  ensureListeners();
  subscribers.add(onStoreChange);
  return () => {
    subscribers.delete(onStoreChange);
  };
}

function getSnapshot() {
  return held;
}

function getServerSnapshot(): HeldModifiers {
  return { shift: false, ctrl: false, alt: false };
}

function notifySubscribers() {
  subscribers.forEach((listener) => listener());
}

function setHeld(next: HeldModifiers) {
  if (
    next.shift === held.shift &&
    next.ctrl === held.ctrl &&
    next.alt === held.alt
  ) {
    return;
  }
  held = next;
  notifySubscribers();
}

function ensureListeners() {
  if (listenersInitialized || typeof window === 'undefined') return;
  listenersInitialized = true;

  const syncFromEvent = (event: KeyboardEvent) => {
    setHeld({
      shift: event.shiftKey,
      ctrl: event.ctrlKey,
      alt: event.altKey,
    });
  };

  window.addEventListener('keydown', syncFromEvent);
  window.addEventListener('keyup', syncFromEvent);
  window.addEventListener('blur', () => {
    setHeld({ shift: false, ctrl: false, alt: false });
  });
}

type CommandProps = {
  shortcutId: ShortcutId;
};

const Command = ({ shortcutId }: CommandProps) => {
  const modifiers = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const binding = useShortcutStore((state) => state.bindings[shortcutId]);
  const hasHydrated = useShortcutStore((state) => state.hasHydrated);

  if (!hasHydrated) return null;
  if (!modifiersMatchBinding(modifiers, binding)) return null;

  return <div className={s.command}>{formatShortcutBadge(binding)}</div>;
};

export default Command;
