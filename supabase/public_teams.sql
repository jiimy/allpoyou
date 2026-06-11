-- Supabase SQL Editor 에서 한 번 실행하세요.
-- [공개] 버튼을 누를 때마다 생성되는 독립 전시 게시물

create table if not exists public.public_teams (
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
