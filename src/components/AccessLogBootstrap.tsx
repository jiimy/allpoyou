'use client';

import { useEffect } from 'react';

import { useLoggedInUserId } from '@/hooks/useLoggedInUserId';

const STORAGE_KEY = 'allpoyou:access-log';

function todayKey(): string {
  // KST 기준 날짜 (연속 접속 집계용)
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

/**
 * 앱 로드 시 접속 로그 API를 호출합니다.
 * 브라우저당 KST 날짜 + 로그인 상태가 같으면 재호출하지 않습니다.
 * (서버에서도 IP·user_id 기준 30분 쓰로틀이 있습니다.)
 */
export function AccessLogBootstrap() {
  const { userId, authReady } = useLoggedInUserId();

  useEffect(() => {
    if (!authReady) return;

    const stamp = `${todayKey()}:${userId ?? 'guest'}`;
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === stamp) return;
    } catch {
      // private mode 등 — 무시하고 시도
    }

    void fetch('/api/access-log', {
      method: 'POST',
      cache: 'no-store',
      keepalive: true,
    })
      .then(async (res) => {
        if (!res.ok) return;
        try {
          window.localStorage.setItem(STORAGE_KEY, stamp);
        } catch {
          // ignore
        }
      })
      .catch(() => {
        // 접속 로그 실패는 UX에 영향 없음
      });
  }, [authReady, userId]);

  return null;
}
