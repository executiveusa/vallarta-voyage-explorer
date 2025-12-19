-- Enable PostGIS for geography types
create extension if not exists postgis;

-- 1. Places Table (Base Entity)
create table places (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  area text not null,
  coordinates geography(Point, 4326),
  address text,
  created_at timestamptz default now()
);

-- 2. Sunset Spots Table (Extension of Place)
create table sunset_spots (
  id uuid primary key default gen_random_uuid(),
  place_id uuid references places(id) on delete cascade unique not null,
  image_url text,
  vibe text check (vibe in ('Chill', 'Party', 'Romantic', 'Crowded', 'Adventure')),
  access_type text check (access_type in ('Public', 'Private', 'Restaurant', 'Hike')),
  best_time_offset_minutes int,
  tips text[],
  is_featured boolean default false,
  created_at timestamptz default now()
);

-- 3. Providers Table (Business Entities)
create table providers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_info jsonb default '{}'::jsonb,
  is_verified boolean default false,
  created_at timestamptz default now()
);

-- 4. Listings Table (Directory Items)
create table listings (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid references providers(id) on delete cascade not null,
  slug text unique not null,
  category text not null,
  area text not null,
  description text,
  image_url text,
  tags text[],
  is_featured boolean default false,
  created_at timestamptz default now()
);

-- 5. Booking Intents Table (Leads)
create table booking_intents (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_email text not null,
  phone text,
  date date,
  guests int,
  message text,
  status text default 'new',
  ip_hash text,
  source_path text,
  source_type text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- Indexes
create index idx_places_slug on places(slug);
create index idx_sunset_spots_featured on sunset_spots(is_featured);
create index idx_listings_slug on listings(slug);
create index idx_listings_area on listings(area);
create index idx_listings_category on listings(category);
create index idx_bookings_created on booking_intents(created_at);
create index idx_bookings_email on booking_intents(contact_email);

-- Enable RLS
alter table places enable row level security;
alter table sunset_spots enable row level security;
alter table providers enable row level security;
alter table listings enable row level security;
alter table booking_intents enable row level security;

-- RLS Policies

-- Public Read Access
create policy "Public places are viewable by everyone" on places
  for select using (true);

create policy "Public sunset spots are viewable by everyone" on sunset_spots
  for select using (true);

create policy "Public providers are viewable by everyone" on providers
  for select using (true);

create policy "Public listings are viewable by everyone" on listings
  for select using (true);

-- Booking Intents: Public Insert, Admin Read
create policy "Anyone can submit a booking intent" on booking_intents
  for insert with check (true);

create policy "Only service role can view booking intents" on booking_intents
  for select using (auth.role() = 'service_role');
