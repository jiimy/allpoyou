-- Supabase SQL Editor 에서 한 번 실행하세요.
-- 커스텀 인증(직접 구현한 회원가입/로그인)을 위한 users 테이블입니다.

create table if not exists public.users (
  id                    bigint primary key generated always as identity,
  created_at            timestamptz default now(),
  user_id               text unique not null,
  password_hash         text not null,
  security_question     text not null,
  security_answer_hash  text not null
);

create unique index if not exists users_user_id_lower_idx
  on public.users (lower(user_id));

alter table public.users enable row level security;
