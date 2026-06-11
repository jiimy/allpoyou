-- Supabase SQL Editor 에서 한 번 실행하세요.
-- 로그인 유저의 개인 팀 슬롯 (편집용 작업실)

create table if not exists public.teams (
  id            bigint primary key generated always as identity,
  user_id       bigint not null references public.users (id) on delete cascade,
  team_slot     int not null check (team_slot between 1 and 5),
  team_name     varchar(100) not null default '새로운 팀',
  pokemon_data  jsonb not null,
  is_public     boolean not null default false,
  updated_at    timestamptz default now(),
  unique (user_id, team_slot)
);

create index if not exists teams_user_id_idx
  on public.teams (user_id);

alter table public.teams enable row level security;
