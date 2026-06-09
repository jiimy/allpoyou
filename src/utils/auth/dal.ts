import 'server-only';

import { cache } from 'react';

import { createAdminClient } from '@/utils/supabase/admin';
import { getSession } from '@/utils/auth/session';

export type CurrentUser = {
  id: string;
  user_id: string;
  createdAt: string;
};

/**
 * 현재 로그인한 유저의 안전한 정보(password_hash 등 민감정보 제외)를 반환합니다.
 * 비로그인 또는 세션의 유저가 DB 에 없으면 null.
 * 한 렌더 패스에서 중복 호출을 막기 위해 React cache 로 메모이즈합니다.
 */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await getSession();
  if (!session) return null;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('users')
    .select('id, user_id, created_at')
    .eq('id', session.userId)
    .maybeSingle();

  if (error || !data) return null;

  return {
    id: data.id as string,
    user_id: data.user_id as string,
    createdAt: data.created_at as string,
  };
});
