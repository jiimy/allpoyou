const STORAGE_KEY = 'allpoyou:notice-dismissed-version';

type Listener = () => void;
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeNoticeDismiss(onStoreChange: () => void) {
  listeners.add(onStoreChange);

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      onStoreChange();
    }
  };

  window.addEventListener('storage', onStorage);

  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener('storage', onStorage);
  };
}

export function isNoticeDismissed(version: string): boolean {
  if (typeof window === 'undefined') return true;

  try {
    return localStorage.getItem(STORAGE_KEY) === version;
  } catch {
    return false;
  }
}

export function dismissNotice(version: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, version);
  emit();
}

export function clearNoticeDismiss() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  emit();
}
