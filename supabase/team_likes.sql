-- Supabase SQL Editor 에서 한 번 실행하세요.
-- 공개 팀 좋아요 저장용 team_likes 테이블입니다.

create table if not exists public.team_likes (
  id         bigint primary key generated always as identity,
  user_id    bigint not null references public.users (id) on delete cascade,
  team_id    text not null references public.teams (id) on delete cascade,
  created_at timestamptz default now(),
  unique (user_id, team_id)
);

create index if not exists team_likes_user_id_idx
  on public.team_likes (user_id);

create index if not exists team_likes_team_id_idx
  on public.team_likes (team_id);

alter table public.team_likes enable row level security;
