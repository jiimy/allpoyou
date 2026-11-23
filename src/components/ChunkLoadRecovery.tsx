'use client';

import { useEffect } from 'react';

const RELOAD_KEY = 'allpoyou:chunk-load-reload';

function isChunkLoadError(error: unknown): boolean {
  if (!error) return false;
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : String(error);
  const name = error instanceof Error ? error.name : '';
  return (
    name === 'ChunkLoadError' ||
    /Loading chunk [\w-]+ failed/i.test(message) ||
    /Failed to fetch dynamically imported module/i.test(message) ||
    /error loading dynamically imported module/i.test(message)
  );
}

function reloadOnce() {
  try {
    if (sessionStorage.getItem(RELOAD_KEY) === '1') return;
    sessionStorage.setItem(RELOAD_KEY, '1');
  } catch {
    // sessionStorage 불가 시에도 한 번은 시도
  }
  window.location.reload();
}

/**
 * 배포 직후 구 HTML이 새 JS 청크를 못 찾을 때 1회 자동 새로고침합니다.
 */
export function ChunkLoadRecovery() {
  useEffect(() => {
    try {
      sessionStorage.removeItem(RELOAD_KEY);
    } catch {
      // ignore
    }

    const onError = (event: ErrorEvent) => {
      if (isChunkLoadError(event.error) || isChunkLoadError(event.message)) {
        reloadOnce();
      }
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      if (isChunkLoadError(event.reason)) {
        reloadOnce();
      }
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);
    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
    };
  }, []);

  return null;
}
