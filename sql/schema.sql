create extension if not exists pgcrypto;

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  role text not null default 'admin',
  created_at timestamptz default now()
);
create table public.categories (id uuid primary key default gen_random_uuid(), name text not null, slug text unique not null, created_at timestamptz default now());
create table public.tags (id uuid primary key default gen_random_uuid(), name text not null, slug text unique not null);
create table public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null, slug text unique not null, excerpt text, content text not null,
  status text not null check (status in ('draft','published','scheduled')) default 'draft',
  category_id uuid references public.categories(id) on delete set null,
  author_id uuid references public.users(id) on delete set null,
  featured_image_url text, is_sponsored boolean default false,
  scheduled_for timestamptz, published_at timestamptz, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table public.article_tags (article_id uuid references articles(id) on delete cascade, tag_id uuid references tags(id) on delete cascade, primary key(article_id, tag_id));
create table public.media_assets (id uuid primary key default gen_random_uuid(), file_name text not null, file_path text not null, public_url text not null, mime_type text, size_bytes bigint, created_at timestamptz default now());
create table public.seo_metadata (id uuid primary key default gen_random_uuid(), article_id uuid unique references articles(id) on delete cascade, seo_title text, meta_description text, keywords text[], seo_score int default 0, fixes jsonb default '[]'::jsonb, updated_at timestamptz default now());
create table public.ad_slots (id uuid primary key default gen_random_uuid(), slot_key text unique not null, adsense_client text, adsense_slot text, enabled boolean default true, placement text not null);
create table public.affiliate_links (id uuid primary key default gen_random_uuid(), keyword text not null, url text not null, commission_rate numeric(5,2), active boolean default true);
create table public.article_views (id bigint generated always as identity primary key, article_id uuid references articles(id) on delete cascade, viewed_at timestamptz default now(), referrer text, ctr_simulated numeric(5,2) default 0.0);

create index idx_articles_status_pub on articles(status,published_at desc);
create index idx_articles_category on articles(category_id);
create index idx_article_views_article on article_views(article_id, viewed_at desc);

alter table public.users enable row level security;
alter table public.articles enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.article_tags enable row level security;
alter table public.media_assets enable row level security;
alter table public.seo_metadata enable row level security;
alter table public.ad_slots enable row level security;
alter table public.affiliate_links enable row level security;
alter table public.article_views enable row level security;

create policy "public can read published articles" on public.articles for select using (status='published');
create policy "admin full access articles" on public.articles for all using ((select role from public.users where id=auth.uid())='admin') with check ((select role from public.users where id=auth.uid())='admin');
create policy "public read categories" on public.categories for select using (true);
create policy "public read tags" on public.tags for select using (true);
create policy "public read seo" on public.seo_metadata for select using (true);
create policy "admin all tables" on public.users for all using (auth.uid()=id);
