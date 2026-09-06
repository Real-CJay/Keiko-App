-- Daily Keiko — database schema
-- Run this once in your Supabase project: SQL Editor -> New query -> paste -> Run.
--
-- Two tables, both locked down with Row Level Security so a signed-in user can
-- only ever read and write their own rows. This is what makes it safe to ship
-- the anon key in config.js.

-- ---------------------------------------------------------------- days
create table if not exists public.keiko_days (
  user_id    uuid        not null references auth.users(id) on delete cascade,
  day        date        not null,
  data       jsonb       not null default '{}'::jsonb,
  ts         bigint      not null default 0,          -- client clock, for last-write-wins
  updated_at timestamptz not null default now(),
  primary key (user_id, day)
);

alter table public.keiko_days enable row level security;

drop policy if exists "keiko_days owner read"   on public.keiko_days;
drop policy if exists "keiko_days owner write"  on public.keiko_days;
drop policy if exists "keiko_days owner update" on public.keiko_days;
drop policy if exists "keiko_days owner delete" on public.keiko_days;

create policy "keiko_days owner read"
  on public.keiko_days for select using (auth.uid() = user_id);
create policy "keiko_days owner write"
  on public.keiko_days for insert with check (auth.uid() = user_id);
create policy "keiko_days owner update"
  on public.keiko_days for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "keiko_days owner delete"
  on public.keiko_days for delete using (auth.uid() = user_id);

create index if not exists keiko_days_user_idx on public.keiko_days (user_id, day);

-- ------------------------------------------------------------ settings
create table if not exists public.keiko_settings (
  user_id    uuid        primary key references auth.users(id) on delete cascade,
  data       jsonb       not null default '{}'::jsonb,
  ts         bigint      not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.keiko_settings enable row level security;

drop policy if exists "keiko_settings owner read"   on public.keiko_settings;
drop policy if exists "keiko_settings owner write"  on public.keiko_settings;
drop policy if exists "keiko_settings owner update" on public.keiko_settings;

create policy "keiko_settings owner read"
  on public.keiko_settings for select using (auth.uid() = user_id);
create policy "keiko_settings owner write"
  on public.keiko_settings for insert with check (auth.uid() = user_id);
create policy "keiko_settings owner update"
  on public.keiko_settings for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ------------------------------------------------- keep updated_at honest
create or replace function public.keiko_touch()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists keiko_days_touch on public.keiko_days;
create trigger keiko_days_touch before update on public.keiko_days
  for each row execute function public.keiko_touch();

drop trigger if exists keiko_settings_touch on public.keiko_settings;
create trigger keiko_settings_touch before update on public.keiko_settings
  for each row execute function public.keiko_touch();
