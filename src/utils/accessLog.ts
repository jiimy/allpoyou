import 'server-only';

import { createAdminClient } from '@/utils/supabase/admin';
import { getSession } from '@/utils/auth/session';

const TABLE_NAME = 'access_logs';

/** 동일 IP·유저 기준 중복 기록 방지 간격 */
export const ACCESS_LOG_THROTTLE_MS = 30 * 60 * 1000; // 30분

export function getRequestIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }

  const candidates = [
    headers.get('x-real-ip'),
    headers.get('cf-connecting-ip'),
    headers.get('x-vercel-forwarded-for'),
    headers.get('x-client-ip'),
    headers.get('true-client-ip'),
  ];

  for (const value of candidates) {
    const ip = value?.split(',')[0]?.trim();
    if (ip) return ip;
  }

  // 로컬/프록시 미설정 환경 — 로그를 버리지 않도록 fallback
  return '127.0.0.1';
}

function parseUserId(raw: string | null | undefined): number | null {
  if (raw == null || raw === '') return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

/**
 * access_logs 에 접속 1건 기록.
 * - 로그인: users.id (int8)
 * - 비로그인: user_id = null
 * - 동일 IP + user_id 가 throttle 이내이면 스킵
 */
export async function recordAccessLog(headers: Headers): Promise<{
  recorded: boolean;
  skipped?: boolean;
  ip?: string;
  userId?: number | null;
  error?: string;
}> {
  const ipAddress = getRequestIp(headers);

  const session = await getSession();
  const userId = parseUserId(session?.userId);

  const supabase = createAdminClient();
  const since = new Date(Date.now() - ACCESS_LOG_THROTTLE_MS).toISOString();

  let recentQuery = supabase
    .from(TABLE_NAME)
    .select('id')
    .eq('ip_address', ipAddress)
    .gte('created_at', since)
    .limit(1);

  recentQuery =
    userId == null
      ? recentQuery.is('user_id', null)
      : recentQuery.eq('user_id', userId);

  const { data: recentRows, error: recentError } = await recentQuery;

  if (recentError) {
    console.warn('[accessLog] recent check failed', recentError.message);
    // 조회 실패해도 insert 는 시도 (테이블/권한 문제면 insert 에서 잡힘)
  } else if (recentRows && recentRows.length > 0) {
    return { recorded: false, skipped: true, ip: ipAddress, userId };
  }

  const { error } = await supabase.from(TABLE_NAME).insert({
    user_id: userId,
    ip_address: ipAddress,
  });

  if (error) {
    console.error('[accessLog] insert failed', error.message, error.code);
    return {
      recorded: false,
      ip: ipAddress,
      userId,
      error: error.message,
    };
  }

  return { recorded: true, ip: ipAddress, userId };
}
