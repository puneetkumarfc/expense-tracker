create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid references auth.users primary key,
  full_name text,
  currency text default 'INR',
  created_at timestamp default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  name text not null,
  color text,
  icon text,
  created_at timestamp default now()
);

create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  category_id uuid references categories not null,
  amount numeric not null,
  note text,
  date date not null,
  created_at timestamp default now()
);

create table if not exists budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  category_id uuid references categories not null,
  amount numeric not null,
  month text not null,
  created_at timestamp default now(),
  unique (user_id, category_id, month)
);

alter table profiles enable row level security;
alter table categories enable row level security;
alter table expenses enable row level security;
alter table budgets enable row level security;

drop policy if exists "profiles_select_own" on profiles;
create policy "profiles_select_own" on profiles for select using (id = auth.uid());
drop policy if exists "profiles_insert_own" on profiles;
create policy "profiles_insert_own" on profiles for insert with check (id = auth.uid());
drop policy if exists "profiles_update_own" on profiles;
create policy "profiles_update_own" on profiles for update using (id = auth.uid());

drop policy if exists "categories_all_own" on categories;
create policy "categories_all_own" on categories for all using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "expenses_all_own" on expenses;
create policy "expenses_all_own" on expenses for all using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "budgets_all_own" on budgets;
create policy "budgets_all_own" on budgets for all using (user_id = auth.uid()) with check (user_id = auth.uid());
