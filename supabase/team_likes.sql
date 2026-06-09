-- Supabase SQL Editor 에서 한 번 실행하세요.
-- 좋아요 시 팀 스냅샷을 보관하는 team_likes 테이블입니다.

create table if not exists public.team_likes (
  id                bigint primary key generated always as identity,
  user_id           bigint not null references public.users (id) on delete cascade,
  original_team_id  text references public.teams (id) on delete set null,
  team_name         varchar(100) not null,
  pokemon_data      jsonb not null,
  created_at        timestamptz default now(),
  unique (user_id, original_team_id)
);

create index if not exists team_likes_user_id_idx
  on public.team_likes (user_id);

create index if not exists team_likes_original_team_id_idx
  on public.team_likes (original_team_id);

alter table public.team_likes enable row level security;
