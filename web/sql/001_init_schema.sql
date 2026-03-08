create extension if not exists "pgcrypto";

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  role text not null check (role in ('admin', 'supplier', 'buyer')),
  created_at timestamptz not null default now()
);

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  country text,
  city text,
  website text,
  logo_url text,
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  parent_id uuid references categories(id) on delete set null
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  category_id uuid references categories(id) on delete set null,
  name text not null,
  slug text unique not null,
  description text,
  moq integer,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists rfqs (
  id uuid primary key default gen_random_uuid(),
  buyer_name text not null,
  buyer_email text not null,
  company_name text,
  country text,
  product_id uuid references products(id) on delete set null,
  supplier_id uuid references companies(id) on delete set null,
  message text not null,
  quantity integer,
  created_at timestamptz not null default now()
);
