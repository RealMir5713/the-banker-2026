create extension if not exists "pgcrypto";

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null,
  gender text not null,
  birth_date date not null,
  facebook_url text not null,
  hometown text not null,
  current_city text not null,
  university text not null,
  year text not null,
  major text not null,
  class_info text,
  student_id text,
  gpa text not null,
  gpa_scale text not null,
  english_certificates text,
  professional_certificates text,
  other_certificates text,
  awards text,
  team_name text not null,
  proof_links text,
  referral_source text,
  expectations text,
  created_at timestamptz not null default now()
);

create index if not exists registrations_created_at_idx
  on public.registrations (created_at desc);

create index if not exists registrations_email_idx
  on public.registrations (email);

alter table public.registrations
  add column if not exists gender text,
  add column if not exists birth_date date,
  add column if not exists facebook_url text,
  add column if not exists hometown text,
  add column if not exists current_city text,
  add column if not exists major text,
  add column if not exists gpa text,
  add column if not exists gpa_scale text,
  add column if not exists english_certificates text,
  add column if not exists professional_certificates text,
  add column if not exists other_certificates text,
  add column if not exists awards text,
  add column if not exists team_name text;

alter table public.registrations enable row level security;

drop policy if exists "Allow public registration insert" on public.registrations;
create policy "Allow public registration insert"
  on public.registrations
  for insert
  with check (true);

-- Do not add public select policies for this table.
-- The /admin dashboard reads through SUPABASE_SERVICE_ROLE_KEY on the server.

create table if not exists public.webinar_registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null,
  university text not null,
  year text not null,
  major text,
  student_id text,
  facebook_url text,
  competition_interest text not null,
  referral_source text,
  expectations text,
  created_at timestamptz not null default now()
);

create index if not exists webinar_registrations_created_at_idx
  on public.webinar_registrations (created_at desc);

create index if not exists webinar_registrations_email_idx
  on public.webinar_registrations (email);

alter table public.webinar_registrations enable row level security;

drop policy if exists "Allow public webinar registration insert"
  on public.webinar_registrations;
create policy "Allow public webinar registration insert"
  on public.webinar_registrations
  for insert
  with check (true);

-- Public reads remain disabled. Use a service-role server endpoint for admin access.
