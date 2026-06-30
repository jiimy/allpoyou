'use server';

import { redirect } from 'next/navigation';
import { hash, compare } from 'bcrypt-ts';

import { createAdminClient } from '@/utils/supabase/admin';
import { createSession, deleteSession, getSession } from '@/utils/auth/session';
import { isGoogleLinked, getPasswordResetQuestion } from '@/utils/auth/googleUser';
import { setGoogleLinkCookie, deleteGoogleLinkFlashCookie } from '@/utils/auth/googleLink';
import { SECURITY_QUESTION, MIN_PASSWORD_LENGTH } from './constants';

const SALT_ROUNDS = 10;

export type AuthState =
  | {
      error?: string;
      fieldErrors?: Record<string, string>;
    }
  | undefined;

export type ResetState =
  | {
      error?: string;
      message?: string;
      question?: string;
      step?: 'lookup' | 'reset';
    }
  | undefined;

function normalizeAnswer(value: string): string {
  return value.trim().toLowerCase();
}

/** 회원가입 */
export async function signup(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const user_id = String(formData.get('user_id') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const passwordConfirm = String(formData.get('passwordConfirm') ?? '');
  const securityAnswer = String(formData.get('securityAnswer') ?? '');

  const fieldErrors: Record<string, string> = {};

  if (user_id.length < 2 || user_id.length > 20) {
    fieldErrors.user_id = '아이디는 2~20자로 입력해주세요.';
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    fieldErrors.password = `비밀번호는 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다.`;
  }
  if (password !== passwordConfirm) {
    fieldErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }
  if (!securityAnswer.trim()) {
    fieldErrors.securityAnswer = '질문의 답변을 입력해주세요.';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  const supabase = createAdminClient();

  const { data: existing, error: lookupError } = await supabase
    .from('users')
    .select('id')
    .ilike('user_id', user_id)
    .maybeSingle();

  if (lookupError) {
    console.error('[signup] user_id lookup error:', lookupError);
    return { error: '회원가입 처리 중 오류가 발생했습니다.' };
  }
  if (existing) {
    return { fieldErrors: { user_id: '이미 사용 중인 아이디입니다.' } };
  }

  const passwordHash = await hash(password, SALT_ROUNDS);
  const securityAnswerHash = await hash(
    normalizeAnswer(securityAnswer),
    SALT_ROUNDS,
  );

  const { data: created, error: insertError } = await supabase
    .from('users')
    .insert({
      user_id,
      password_hash: passwordHash,
      security_question: SECURITY_QUESTION,
      security_answer_hash: securityAnswerHash,
    })
    .select('id, user_id')
    .single();

  if (insertError || !created) {
    if (insertError?.code === '23505') {
      return { fieldErrors: { user_id: '이미 사용 중인 아이디입니다.' } };
    }
    console.error('[signup] insert error:', insertError);
    return { error: '회원가입 처리 중 오류가 발생했습니다.' };
  }

  await createSession({
    userId: String(created.id),
    user_id: created.user_id as string,
  });

  redirect('/my-info');
}

/** 로그인 */
export async function login(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const user_id = String(formData.get('user_id') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (!user_id || !password) {
    return { error: '아이디와 비밀번호를 입력해주세요.' };
  }

  const supabase = createAdminClient();
  const { data: user, error } = await supabase
    .from('users')
    .select('id, user_id, password_hash')
    .ilike('user_id', user_id)
    .maybeSingle();

  if (error) {
    return { error: '로그인 처리 중 오류가 발생했습니다.' };
  }

  // 사용자 존재 여부를 노출하지 않도록 동일 메시지 사용
  if (!user) {
    return { error: '아이디 또는 비밀번호가 올바르지 않습니다.' };
  }

  const valid = await compare(password, user.password_hash as string);
  if (!valid) {
    return { error: '아이디 또는 비밀번호가 올바르지 않습니다.' };
  }

  await createSession({
    userId: String(user.id),
    user_id: user.user_id as string,
  });

  redirect('/my-info');
}

/** 로그아웃 */
export async function logout(): Promise<void> {
  await deleteSession();
  redirect('/my-info');
}

/** Google 계정 연동 준비 (연동 의도 쿠키 설정) */
export async function prepareGoogleLink(): Promise<{ error?: string }> {
  const session = await getSession();
  if (!session) {
    return { error: '로그인이 필요합니다.' };
  }

  const supabase = createAdminClient();
  const { data: user, error } = await supabase
    .from('users')
    .select('security_question')
    .eq('id', session.userId)
    .maybeSingle();

  if (error || !user) {
    return { error: '사용자 정보를 찾을 수 없습니다.' };
  }

  if (isGoogleLinked(user.security_question as string)) {
    return { error: '이미 Google 계정과 연동되어 있습니다.' };
  }

  await setGoogleLinkCookie(session.userId);
  return {};
}

/** Google 연동 flash 쿠키 삭제 (Server Action) */
export async function dismissGoogleLinkFlash(): Promise<void> {
  await deleteGoogleLinkFlashCookie();
}

/** 비밀번호 찾기 1단계: 아이디로 보안 질문 조회 */
export async function lookupSecurityQuestion(
  _prev: ResetState,
  formData: FormData,
): Promise<ResetState> {
    const user_id = String(formData.get('user_id') ?? '').trim();

  if (!user_id) {
    return { step: 'lookup', error: '아이디를 입력해주세요.' };
  }

  const supabase = createAdminClient();
  const { data: user, error } = await supabase
    .from('users')
    .select('user_id, security_question')
    .ilike('user_id', user_id)
    .maybeSingle();

  if (error) {
    return { step: 'lookup', error: '조회 중 오류가 발생했습니다.' };
  }
  if (!user || !user.security_question) {
    return {
      step: 'lookup',
      error: '해당 아이디의 보안 질문을 찾을 수 없습니다.',
    };
  }

  return {
    step: 'reset',
    question: getPasswordResetQuestion(user.security_question as string),
  };
}

/** 비밀번호 찾기 2단계: 보안 답변 검증 후 비밀번호 재설정 */
export async function resetPassword(
  _prev: ResetState,
  formData: FormData,
): Promise<ResetState> {
  const user_id = String(formData.get('user_id') ?? '').trim();
  const answer = String(formData.get('securityAnswer') ?? '');
  const newPassword = String(formData.get('newPassword') ?? '');
  const newPasswordConfirm = String(formData.get('newPasswordConfirm') ?? '');
  const question = String(formData.get('question') ?? '');

  const baseState: ResetState = { step: 'reset', question };

  if (!answer.trim()) {
    return { ...baseState, error: '질문의 답변을 입력해주세요.' };
  }
  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    return {
      ...baseState,
      error: `새 비밀번호는 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다.`,
    };
  }
  if (newPassword !== newPasswordConfirm) {
    return { ...baseState, error: '새 비밀번호가 일치하지 않습니다.' };
  }

  const supabase = createAdminClient();
  const { data: user, error } = await supabase
    .from('users')
    .select('id, security_answer_hash')
    .ilike('user_id', user_id)
    .maybeSingle();

  if (error || !user || !user.security_answer_hash) {
    return { ...baseState, error: '비밀번호 재설정에 실패했습니다.' };
  }

  const answerValid = await compare(
    normalizeAnswer(answer),
    user.security_answer_hash as string,
  );
  if (!answerValid) {
    return { ...baseState, error: '답변이 올바르지 않습니다.' };
  }

  const passwordHash = await hash(newPassword, SALT_ROUNDS);
  const { error: updateError } = await supabase
    .from('users')
    .update({ password_hash: passwordHash })
    .eq('id', user.id as string);

  if (updateError) {
    return { ...baseState, error: '비밀번호 재설정에 실패했습니다.' };
  }

  return { message: '비밀번호가 변경되었습니다. 새 비밀번호로 로그인해주세요.' };
}
