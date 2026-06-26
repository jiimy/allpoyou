'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { getLoggedInUserId } from '@/app/make-team/actions';

/** 클라이언트에서 로그인 상태를 주기적으로 서버와 동기화합니다. */
export function useLoggedInUserId() {
  const pathname = usePathname();
  const [userId, setUserId] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);

  const refresh = useCallback(async () => {
    const id = await getLoggedInUserId();
    setUserId(id);
    setAuthReady(true);
    return id;
  }, []);

  useEffect(() => {
    void refresh();
  }, [pathname, refresh]);

  useEffect(() => {
    const syncOnVisible = () => {
      if (document.visibilityState !== 'visible') return;
      void refresh();
    };

    window.addEventListener('focus', syncOnVisible);
    document.addEventListener('visibilitychange', syncOnVisible);

    return () => {
      window.removeEventListener('focus', syncOnVisible);
      document.removeEventListener('visibilitychange', syncOnVisible);
    };
  }, [refresh]);

  return { userId, authReady, refresh };
}
