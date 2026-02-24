-- Video interaction schema for project videos
-- Includes:
-- 1) play_count per project
-- 2) like_count per project
-- 3) one like per project per email

create table if not exists public.video_stats (
  project_id text primary key,
  play_count bigint not null default 0 check (play_count >= 0),
  like_count bigint not null default 0 check (like_count >= 0),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.video_likes (
  id bigint generated always as identity primary key,
  project_id text not null,
  visitor_name text not null,
  visitor_email text not null,
  created_at timestamptz not null default timezone('utc', now()),
  constraint video_likes_project_id_check check (char_length(trim(project_id)) > 0),
  constraint video_likes_visitor_name_check check (char_length(trim(visitor_name)) between 2 and 120),
  constraint video_likes_email_lowercase_check check (visitor_email = lower(visitor_email))
);

create unique index if not exists video_likes_project_email_unique
  on public.video_likes (project_id, visitor_email);

create index if not exists video_likes_project_id_idx
  on public.video_likes (project_id);

create or replace function public.set_video_stats_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists trg_video_stats_updated_at on public.video_stats;
create trigger trg_video_stats_updated_at
before update on public.video_stats
for each row
execute function public.set_video_stats_updated_at();

alter table public.video_stats enable row level security;
alter table public.video_likes enable row level security;

drop policy if exists "Public read video stats" on public.video_stats;
create policy "Public read video stats"
on public.video_stats
for select
to anon, authenticated
using (true);

drop policy if exists "Service role manages video stats" on public.video_stats;
create policy "Service role manages video stats"
on public.video_stats
for all
to service_role
using (true)
with check (true);

drop policy if exists "Service role manages video likes" on public.video_likes;
create policy "Service role manages video likes"
on public.video_likes
for all
to service_role
using (true)
with check (true);

grant select on table public.video_stats to anon, authenticated;
revoke all on table public.video_likes from anon, authenticated;

create or replace function public.increment_video_play_count(p_project_id text)
returns table(play_count bigint, like_count bigint)
language plpgsql
security definer
set search_path = public
as $$
declare
  normalized_project_id text := trim(p_project_id);
begin
  if normalized_project_id = '' then
    raise exception 'Project id is required.' using errcode = '22023';
  end if;

  insert into public.video_stats (project_id, play_count, like_count)
  values (normalized_project_id, 1, 0)
  on conflict (project_id) do update
    set play_count = public.video_stats.play_count + 1,
        updated_at = timezone('utc', now());

  return query
  select vs.play_count, vs.like_count
  from public.video_stats vs
  where vs.project_id = normalized_project_id;
end;
$$;

create or replace function public.submit_video_like(
  p_project_id text,
  p_visitor_name text,
  p_visitor_email text
)
returns table(like_count bigint, created boolean)
language plpgsql
security definer
set search_path = public
as $$
declare
  normalized_project_id text := trim(p_project_id);
  normalized_name text := trim(p_visitor_name);
  normalized_email text := lower(trim(p_visitor_email));
  like_was_created boolean := false;
begin
  if normalized_project_id = '' then
    raise exception 'Project id is required.' using errcode = '22023';
  end if;

  if char_length(normalized_name) < 2 then
    raise exception 'Name must be at least 2 characters.' using errcode = '22023';
  end if;

  if normalized_email !~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$' then
    raise exception 'Email is invalid.' using errcode = '22023';
  end if;

  insert into public.video_likes (project_id, visitor_name, visitor_email)
  values (normalized_project_id, normalized_name, normalized_email)
  on conflict (project_id, visitor_email) do nothing;

  like_was_created := found;

  if like_was_created then
    insert into public.video_stats (project_id, play_count, like_count)
    values (normalized_project_id, 0, 1)
    on conflict (project_id) do update
      set like_count = public.video_stats.like_count + 1,
          updated_at = timezone('utc', now());
  end if;

  return query
  select coalesce(vs.like_count, 0), like_was_created
  from (select 1) as one_row
  left join public.video_stats vs on vs.project_id = normalized_project_id;
end;
$$;

grant execute on function public.increment_video_play_count(text) to anon, authenticated;
grant execute on function public.submit_video_like(text, text, text) to anon, authenticated;
