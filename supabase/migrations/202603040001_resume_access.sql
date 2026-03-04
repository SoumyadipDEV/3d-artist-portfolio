-- Resume access capture schema
-- Collects visitor name + email before resume view.

create table if not exists public.resume_access_requests (
  id bigint generated always as identity primary key,
  visitor_name text not null,
  visitor_email text not null,
  created_at timestamptz not null default timezone('utc', now()),
  constraint resume_access_name_check check (char_length(trim(visitor_name)) between 2 and 120),
  constraint resume_access_email_lowercase_check check (visitor_email = lower(visitor_email))
);

create unique index if not exists resume_access_requests_email_unique
  on public.resume_access_requests (visitor_email);

alter table public.resume_access_requests enable row level security;

drop policy if exists "Service role manages resume access requests" on public.resume_access_requests;
create policy "Service role manages resume access requests"
on public.resume_access_requests
for all
to service_role
using (true)
with check (true);

revoke all on table public.resume_access_requests from anon, authenticated;

create or replace function public.submit_resume_access(
  p_visitor_name text,
  p_visitor_email text
)
returns table(created boolean)
language plpgsql
security definer
set search_path = public
as $$
declare
  normalized_name text := trim(p_visitor_name);
  normalized_email text := lower(trim(p_visitor_email));
  created_row boolean := false;
begin
  if char_length(normalized_name) < 2 then
    raise exception 'Name must be at least 2 characters.' using errcode = '22023';
  end if;

  if normalized_email !~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$' then
    raise exception 'Email is invalid.' using errcode = '22023';
  end if;

  insert into public.resume_access_requests (visitor_name, visitor_email)
  values (normalized_name, normalized_email)
  on conflict (visitor_email) do nothing;

  created_row := found;

  if not created_row then
    update public.resume_access_requests
    set visitor_name = normalized_name
    where visitor_email = normalized_email;
  end if;

  return query
  select created_row;
end;
$$;

grant execute on function public.submit_resume_access(text, text) to anon, authenticated;
