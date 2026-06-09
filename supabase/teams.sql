-- Supabase SQL Editor 에서 한 번 실행하세요.
-- 로그인 유저의 포켓몬 팀 빌드 저장용 teams 테이블입니다.

create table if not exists public.teams (
  id            uuid primary key default gen_random_uuid(),
  user_id       text not null,
  team_slot     smallint not null check (team_slot between 1 and 5),
  team_name     text not null default '',
  pokemon_data  jsonb not null default '[]'::jsonb,
  is_public     boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- 이미 테이블을 만든 경우: team_slot 컬럼 추가
alter table public.teams
  add column if not exists team_slot smallint;

-- 기존 row 에 team_slot 이 없으면 1 로 채움 (수동 생성 테이블 대비)
update public.teams
set team_slot = 1
where team_slot is null;

alter table public.teams
  alter column team_slot set not null;

-- upsert 용 unique 제약 (없을 때만 추가)
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'teams_user_id_team_slot_key'
      and conrelid = 'public.teams'::regclass
  ) then
    alter table public.teams
      add constraint teams_user_id_team_slot_key unique (user_id, team_slot);
  end if;
end $$;

create index if not exists teams_user_id_idx
  on public.teams (user_id);

create index if not exists teams_public_idx
  on public.teams (is_public, updated_at desc)
  where is_public = true;

alter table public.teams enable row level security;