import 'server-only';

import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const SESSION_COOKIE = 'session';
const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7일

export type SessionPayload = {
  userId: string;
  username: string;
};

const secretKey = process.env.JWT_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

function assertSecret() {
  if (!secretKey) {
    throw new Error('JWT_SECRET 환경변수가 설정되지 않았습니다.');
  }
}

/** payload 를 JWT 로 서명합니다. (HS256, 7일 만료) */
export async function encryptSession(payload: SessionPayload): Promise<string> {
  assertSecret();
  // id 타입(uuid/정수)과 무관하게 항상 문자열로 저장합니다.
  return new SignJWT({
    userId: String(payload.userId),
    username: payload.username,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

/** JWT 를 검증하고 payload 를 반환합니다. 실패 시 null. */
export async function decryptSession(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    });
    const { userId, username } = payload as {
      userId?: unknown;
      username?: unknown;
    };
    if (
      (typeof userId === 'string' || typeof userId === 'number') &&
      typeof username === 'string'
    ) {
      return { userId: String(userId), username };
    }
    return null;
  } catch {
    return null;
  }
}

/** 세션 JWT 를 HttpOnly 쿠키로 저장합니다. */
export async function createSession(payload: SessionPayload): Promise<void> {
  const token = await encryptSession(payload);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SEC,
  });
}

/** 현재 요청의 세션 payload 를 반환합니다. */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return decryptSession(token);
}

/** 세션 쿠키를 삭제합니다. (로그아웃) */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
