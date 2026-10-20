'use client';

import { useEffect } from 'react';

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
 * 세션은 서버에서 쿠키로 판별하므로 로그인 훅을 기다리지 않습니다.
 * 브라우저당 KST 날짜 1회 호출 (서버 30분 쓰로틀과 별개).
 */
export function AccessLogBootstrap() {
  useEffect(() => {
    const stamp = todayKey();
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === stamp) return;
    } catch {
      // private mode 등 — 무시하고 시도
    }

    void fetch('/api/access-log', {
      method: 'POST',
      cache: 'no-store',
      keepalive: true,
      credentials: 'same-origin',
    })
      .then(async (res) => {
        let body: { recorded?: boolean; skipped?: boolean; error?: string } = {};
        try {
          body = (await res.json()) as typeof body;
        } catch {
          // ignore
        }

        if (!res.ok) {
          console.warn('[AccessLogBootstrap] failed', res.status, body.error);
          return;
        }

        // recorded / skipped 모두 성공으로 보고 당일 재호출 방지
        try {
          window.localStorage.setItem(STORAGE_KEY, stamp);
        } catch {
          // ignore
        }
      })
      .catch((err: unknown) => {
        console.warn('[AccessLogBootstrap] request error', err);
      });
  }, []);

  return null;
}
