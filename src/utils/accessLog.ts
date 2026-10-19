import 'server-only';

import { createAdminClient } from '@/utils/supabase/admin';
import { getSession } from '@/utils/auth/session';

const TABLE_NAME = 'access_logs';

/** 동일 IP·유저 기준 중복 기록 방지 간격 */
export const ACCESS_LOG_THROTTLE_MS = 30 * 60 * 1000; // 30분

export function getRequestIp(headers: Headers): string | null {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }

  return (
    headers.get('x-real-ip')?.trim() ||
    headers.get('cf-connecting-ip')?.trim() ||
    headers.get('x-vercel-forwarded-for')?.trim() ||
    null
  );
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
  error?: string;
}> {
  const ipAddress = getRequestIp(headers);
  if (!ipAddress) {
    return { recorded: false, error: 'ip_address를 확인할 수 없습니다.' };
  }

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
  }

  if (recentRows && recentRows.length > 0) {
    return { recorded: false, skipped: true };
  }

  const { error } = await supabase.from(TABLE_NAME).insert({
    user_id: userId,
    ip_address: ipAddress,
  });

  if (error) {
    console.error('[accessLog] insert failed', error.message);
    return { recorded: false, error: error.message };
  }

  return { recorded: true };
}
