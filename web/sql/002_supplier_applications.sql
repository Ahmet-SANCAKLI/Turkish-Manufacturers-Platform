create table if not exists supplier_applications (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text not null,
  email text not null,
  country text not null,
  city text,
  website text,
  description text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  approved_company_id uuid references companies(id) on delete set null,
  reviewed_by text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);
