const STORAGE_KEY = 'allpoyou:last-visited-page';

export type LastVisitedPageSettings = {
  enabled: boolean;
  path: string;
};

const DEFAULT_SETTINGS: LastVisitedPageSettings = {
  enabled: false,
  path: '/',
};

function readSettings(): LastVisitedPageSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;

    const parsed = JSON.parse(raw) as Partial<LastVisitedPageSettings>;
    return {
      enabled: parsed.enabled === true,
      path: typeof parsed.path === 'string' && parsed.path.startsWith('/')
        ? parsed.path
        : '/',
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function writeSettings(settings: LastVisitedPageSettings) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function getLastVisitedPageSettings(): LastVisitedPageSettings {
  return readSettings();
}

export function isRememberLastPageEnabled(): boolean {
  return readSettings().enabled;
}

export function setRememberLastPageEnabled(enabled: boolean) {
  const current = readSettings();
  writeSettings({ ...current, enabled });
}

export function saveLastVisitedPath(path: string) {
  if (!path.startsWith('/') || path.startsWith('//')) return;

  const current = readSettings();
  if (!current.enabled) return;

  writeSettings({ ...current, path });
}

export function isValidLastVisitedPath(path: string): boolean {
  if (!path.startsWith('/') || path.startsWith('//')) return false;
  if (path === '/') return true;

  const navPaths = [
    '/pokedex',
    '/abilities',
    '/items',
    '/moves',
    '/make-team',
    '/my-info',
    '/nature',
  ];

  return navPaths.some(
    (navPath) => path === navPath || path.startsWith(`${navPath}/`),
  );
}
