create table if not exists story_comments (
  id text primary key,
  slug text not null,
  parent_id text,
  author_name text not null,
  author_kind text not null default 'reader',
  user_id text,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists story_comments_slug_idx on story_comments (slug, created_at);
