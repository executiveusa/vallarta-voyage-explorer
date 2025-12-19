
-- 1. Modify Listings Table
alter table listings 
add column if not exists plan_tier text check (plan_tier in ('free', 'featured', 'partner')) default 'free',
add column if not exists claim_status text check (claim_status in ('unclaimed', 'pending', 'claimed')) default 'unclaimed',
add column if not exists website_url text;

-- 2. Modify Booking Intents Table
alter table booking_intents
add column if not exists attributed_listing_id uuid references listings(id) on delete set null;

-- 3. Create Listing Claims Table
create table listing_claims (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references listings(id) on delete cascade not null,
  name text not null,
  email text not null,
  proof_text text,
  status text check (status in ('pending', 'approved', 'rejected')) default 'pending',
  created_at timestamptz default now()
);

-- 4. RLS for Listing Claims
alter table listing_claims enable row level security;

-- Public Insert (Anyone can claim)
create policy "Anyone can submit a claim" on listing_claims
  for insert with check (true);

-- Admin Read Only (Service Role)
create policy "Only service role can view claims" on listing_claims
  for select using (auth.role() = 'service_role');

-- 5. No Public Update on sensitive Listing columns (Already covered by existing listing policies which restrict write)
-- Ensure 'plan_tier' and 'claim_status' are only editable by service_role (implicit in previous 'listings' policy setup: insert/update restricted to service_role)
