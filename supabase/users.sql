-- Supabase SQL Editor 에서 한 번 실행하세요.
-- 커스텀 인증(직접 구현한 회원가입/로그인)을 위한 users 테이블입니다.
-- Supabase Auth(auth.users)와는 별개로 동작합니다.

create extension if not exists "pgcrypto";

create table if not exists public.users (
  id                    uuid primary key default gen_random_uuid(), -- 유저 고유 식별자 (내부 참조용)
  username              varchar not null unique,                     -- 로그인 아이디이자 화면에 표시될 닉네임
  password_hash         varchar not null,                            -- 암호화된 비밀번호
  security_question     varchar,                                     -- 비밀번호 찾기 질문 (최애 포켓몬 등)
  security_answer_hash  varchar,                                     -- 암호화된 질문의 답변
  created_at            timestamptz not null default now()           -- 가입 일시
);

-- username 대소문자 무시 조회 성능용 인덱스
create unique index if not exists users_username_lower_idx
  on public.users (lower(username));

-- RLS 활성화: 클라이언트(anon/publishable key)로는 어떤 접근도 막습니다.
-- 모든 인증 로직은 서버에서 service_role 키로만 수행하며, service_role 은 RLS 를 우회합니다.
alter table public.users enable row level security;
