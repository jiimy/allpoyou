-- Supabase SQL Editor 에서 한 번 실행하세요.
-- ⚠️ 기존 teams / public_teams / team_likes / users 데이터가 모두 삭제됩니다.

drop table if exists public.team_likes cascade;
drop table if exists public.public_teams cascade;
drop table if exists public.teams cascade;
drop table if exists public.users cascade;

-- 1. 회원
create table public.users (
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

-- 2. 개인 팀 슬롯 (편집용)
create table public.teams (
  id            bigint primary key generated always as identity,
  user_id       bigint not null references public.users (id) on delete cascade,
  team_slot     int not null check (team_slot between 1 and 5),
  team_name     varchar(100) not null default '새로운 팀',
  pokemon_data  jsonb not null,
  is_public     boolean not null default false,
  updated_at    timestamptz default now(),
  unique (user_id, team_slot)
);

create index if not exists teams_user_id_idx on public.teams (user_id);
alter table public.teams enable row level security;

-- 3. 메인 전시장 (공개 게시물)
create table public.public_teams (
  id            text primary key,
  author_id     bigint not null references public.users (id) on delete cascade,
  team_name     varchar(100) not null,
  pokemon_data  jsonb not null,
  likes_count   int not null default 0,
  created_at    timestamptz default now()
);

create index if not exists public_teams_author_id_idx
  on public.public_teams (author_id);
create index if not exists public_teams_created_at_idx
  on public.public_teams (created_at desc);
alter table public.public_teams enable row level security;

-- 4. 좋아요 보관함
create table public.team_likes (
  id              bigint primary key generated always as identity,
  user_id         bigint not null references public.users (id) on delete cascade,
  public_team_id  text references public.public_teams (id) on delete set null,
  team_name       varchar(100) not null,
  pokemon_data    jsonb not null,
  created_at      timestamptz default now(),
  unique (user_id, public_team_id)
);

create index if not exists team_likes_user_id_idx on public.team_likes (user_id);
create index if not exists team_likes_public_team_id_idx
  on public.team_likes (public_team_id);
alter table public.team_likes enable row level security;
