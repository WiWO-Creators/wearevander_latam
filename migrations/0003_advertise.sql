create table if not exists advertise_leads (
  email text not null,
  company text,
  note text,
  created_at timestamptz not null default now(),
  primary key (email)
);
