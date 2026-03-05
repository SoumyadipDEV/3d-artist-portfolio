-- Website visit counter schema
-- Stores a single running total of visits for the portfolio.

create table if not exists public.site_metrics (
  metric_key text primary key,
  total_visits bigint not null default 0 check (total_visits >= 0),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

insert into public.site_metrics (metric_key, total_visits)
values ('portfolio', 0)
on conflict (metric_key) do nothing;

create or replace function public.set_site_metrics_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists trg_site_metrics_updated_at on public.site_metrics;
create trigger trg_site_metrics_updated_at
before update on public.site_metrics
for each row
execute function public.set_site_metrics_updated_at();

alter table public.site_metrics enable row level security;

drop policy if exists "Public read site metrics" on public.site_metrics;
create policy "Public read site metrics"
on public.site_metrics
for select
to anon, authenticated
using (true);

drop policy if exists "Service role manages site metrics" on public.site_metrics;
create policy "Service role manages site metrics"
on public.site_metrics
for all
to service_role
using (true)
with check (true);

revoke all on table public.site_metrics from anon, authenticated;
grant select on table public.site_metrics to anon, authenticated;

create or replace function public.increment_site_visit_count()
returns table(total_visits bigint)
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.site_metrics (metric_key, total_visits)
  values ('portfolio', 1)
  on conflict (metric_key) do update
    set total_visits = public.site_metrics.total_visits + 1,
        updated_at = timezone('utc', now());

  return query
  select sm.total_visits
  from public.site_metrics sm
  where sm.metric_key = 'portfolio';
end;
$$;

grant execute on function public.increment_site_visit_count() to anon, authenticated;
