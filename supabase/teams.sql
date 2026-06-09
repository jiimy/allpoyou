-- Supabase SQL Editor 에서 한 번 실행하세요.
-- 로그인 유저의 포켓몬 팀 빌드 저장용 teams 테이블입니다.

create table if not exists public.teams (
  id            text primary key,
  user_id       bigint not null references public.users (id) on delete cascade,
  team_name     varchar(100) not null default '새로운 팀',
  pokemon_data  jsonb not null,
  is_public     boolean not null default false,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now(),
  team_slot     int not null,
  unique (user_id, team_slot)
);

create index if not exists teams_user_id_idx
  on public.teams (user_id);

create index if not exists teams_public_idx
  on public.teams (is_public, updated_at desc)
  where is_public = true;

alter table public.teams enable row level security;
