create table if not exists saved_stories (
  user_id text not null,
  slug text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, slug)
);

create table if not exists newsletter (
  email text primary key,
  user_id text,
  created_at timestamptz not null default now()
);
