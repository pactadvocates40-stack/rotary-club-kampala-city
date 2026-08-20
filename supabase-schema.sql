-- Rotary Club of Kampala City — database schema
-- Paste this whole file into Supabase → SQL Editor → New query → Run

create table if not exists settings (
  id int primary key default 1,
  club_name text not null default 'Rotary Club of Kampala City',
  meeting_label text not null default 'Weekly Fellowship Meeting',
  sign_in_url text not null default '',
  admin_pin text not null default '1905',
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);
insert into settings (id) values (1) on conflict (id) do nothing;

create table if not exists buddy_groups (
  id bigint generated always as identity primary key,
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists members (
  id bigint generated always as identity primary key,
  name text not null,
  buddy_group text not null,
  email text not null,
  registered_at timestamptz not null default now()
);

create table if not exists visitors (
  id bigint generated always as identity primary key,
  name text not null,
  home_club text not null,
  email text not null,
  category text not null check (category in ('Rotarian','Rotaract','Guest')),
  visit_date date not null default current_date,
  registered_at timestamptz not null default now()
);

create table if not exists makeups (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  buddy_group text,
  detail text not null,
  activity_date date not null,
  card_id text not null unique,
  verified boolean default false,
  verified_at timestamptz,
  logged_at timestamptz not null default now()
);

create table if not exists attendance (
  id bigint generated always as identity primary key,
  member_id bigint references members(id) on delete cascade,
  member_name text not null,
  buddy_group text not null,
  meeting_date date not null default current_date,
  signed_in_at timestamptz not null default now(),
  constraint unique_member_meeting unique (member_id, meeting_date)
);

-- Row Level Security: low-security internal club tool, allow public "anon" key access
alter table settings enable row level security;
alter table buddy_groups enable row level security;
alter table members enable row level security;
alter table visitors enable row level security;
alter table makeups enable row level security;
alter table attendance enable row level security;

create policy "public read settings" on settings for select using (true);
create policy "public update settings" on settings for update using (true);

create policy "public read groups" on buddy_groups for select using (true);
create policy "public insert groups" on buddy_groups for insert with check (true);
create policy "public delete groups" on buddy_groups for delete using (true);

create policy "public read members" on members for select using (true);
create policy "public insert members" on members for insert with check (true);
create policy "public delete members" on members for delete using (true);

create policy "public read visitors" on visitors for select using (true);
create policy "public insert visitors" on visitors for insert with check (true);

create policy "public read makeups" on makeups for select using (true);
create policy "public insert makeups" on makeups for insert with check (true);
create policy "public update makeups" on makeups for update using (true);

create policy "public read attendance" on attendance for select using (true);
create policy "public insert attendance" on attendance for insert with check (true);
create policy "public delete attendance" on attendance for delete using (true);
