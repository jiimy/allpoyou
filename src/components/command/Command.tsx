'use client';

import { useSyncExternalStore } from 'react';
import s from './command.module.scss';

let leftShiftHeld = false;
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
  return leftShiftHeld;
}

function getServerSnapshot() {
  return false;
}

function notifySubscribers() {
  subscribers.forEach((listener) => listener());
}

function ensureListeners() {
  if (listenersInitialized || typeof window === 'undefined') return;
  listenersInitialized = true;

  window.addEventListener('keydown', (event) => {
    if (event.code !== 'ShiftLeft' || leftShiftHeld) return;
    leftShiftHeld = true;
    notifySubscribers();
  });

  window.addEventListener('keyup', (event) => {
    if (event.code !== 'ShiftLeft' || !leftShiftHeld) return;
    leftShiftHeld = false;
    notifySubscribers();
  });

  window.addEventListener('blur', () => {
    if (!leftShiftHeld) return;
    leftShiftHeld = false;
    notifySubscribers();
  });
}

type CommandProps = {
  command: string;
};

const Command = ({ command }: CommandProps) => {
  const shiftHeld = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (!shiftHeld) return null;

  return <div className={s.command}>{command}</div>;
};

export default Command;
