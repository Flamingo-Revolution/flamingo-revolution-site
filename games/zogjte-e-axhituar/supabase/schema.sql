create table public.leaderboard_scores (
  id bigint generated always as identity primary key,
  player_name text not null check (char_length(player_name) between 1 and 24),
  score integer not null check (score >= 0),
  created_at timestamptz not null default now()
);

create index leaderboard_scores_rank_idx
  on public.leaderboard_scores (score desc, created_at asc);

alter table public.leaderboard_scores enable row level security;

create policy "Anyone can read leaderboard scores"
  on public.leaderboard_scores
  for select
  to anon
  using (true);

create policy "Anyone can submit a leaderboard score"
  on public.leaderboard_scores
  for insert
  to anon
  with check (
    char_length(player_name) between 1 and 24
    and score >= 0
  );
