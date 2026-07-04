create extension if not exists "pgcrypto";

create table if not exists public.problems (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  affected_group text not null,
  current_impact text not null,
  desired_outcome text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_analysis (
  id uuid primary key default gen_random_uuid(),
  problem_id uuid not null references public.problems(id) on delete cascade,
  summary text not null,
  theme text not null check (
    theme in (
      'Data Quality',
      'Service Improvement',
      'Manual Processes',
      'Technology',
      'Policy',
      'Communication',
      'Customer Experience'
    )
  ),
  root_cause text not null,
  affected_personas text[] not null default '{}',
  suggested_solution_area text not null,
  impact_score integer not null check (impact_score between 1 and 10),
  complexity_score integer not null check (complexity_score between 1 and 10),
  created_at timestamptz not null default now(),
  unique(problem_id)
);

create table if not exists public.problem_votes (
  id uuid primary key default gen_random_uuid(),
  problem_id uuid not null references public.problems(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists problems_created_at_idx on public.problems(created_at desc);
create index if not exists ai_analysis_theme_idx on public.ai_analysis(theme);
create index if not exists problem_votes_problem_id_idx on public.problem_votes(problem_id);

alter table public.problems enable row level security;
alter table public.ai_analysis enable row level security;
alter table public.problem_votes enable row level security;

create policy "Anyone can read problems"
  on public.problems for select
  using (true);

create policy "Anyone can submit problems"
  on public.problems for insert
  with check (true);

create policy "Anyone can read analysis"
  on public.ai_analysis for select
  using (true);

create policy "Service role can manage analysis"
  on public.ai_analysis for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Anyone can read votes"
  on public.problem_votes for select
  using (true);

create policy "Anyone can upvote problems"
  on public.problem_votes for insert
  with check (true);
