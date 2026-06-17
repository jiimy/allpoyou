'use client';

import { useCallback, useSyncExternalStore } from 'react';

import {
  getLastVisitedPageSettings,
  saveLastVisitedPath,
  setRememberLastPageEnabled,
} from '@/utils/lastVisitedPageStorage';

const subscribers = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  subscribers.add(onStoreChange);
  return () => {
    subscribers.delete(onStoreChange);
  };
}

function getSnapshot() {
  return getLastVisitedPageSettings().enabled;
}

function getServerSnapshot() {
  return false;
}

function notifySubscribers() {
  subscribers.forEach((listener) => listener());
}

export function useRememberLastPage(pathname: string) {
  const enabled = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setEnabled = useCallback(
    (nextEnabled: boolean) => {
      setRememberLastPageEnabled(nextEnabled);
      if (nextEnabled && pathname) {
        saveLastVisitedPath(pathname);
      }
      notifySubscribers();
    },
    [pathname],
  );

  return { enabled, setEnabled };
}
