-- Admin Security Hardening
-- 1. Create Admin Allowlist Table
create table admin_allowlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

-- RLS for allowlist: Only service role can modify. Public read is NOT needed.
alter table admin_allowlist enable row level security;

-- 2. Create is_admin() function
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1
    from admin_allowlist
    where email = auth.jwt() ->> 'email'
  );
end;
$$ language plpgsql security definer;

-- 3. Update RLS Policies for Admin Actions

-- Listing Claims: Admin View
drop policy if exists "Admins can view all listing claims" on listing_claims;
create policy "Admins can view all listing claims" on listing_claims
  for select using (is_admin());

-- Booking Intents: Admin View
drop policy if exists "Admins can view booking intents" on booking_intents;
create policy "Admins can view booking intents" on booking_intents
  for select using (is_admin());

-- Sunset Photos: Admin Update (Approve/Reject)
-- (We might have an existing generic update policy, let's ensure it uses is_admin())
drop policy if exists "Admins can update sunset photos" on sunset_photos;
create policy "Admins can update sunset photos" on sunset_photos
  for update using (is_admin());

-- Listings: Admin Update (Features, Tiers, Claims)
drop policy if exists "Admins can update listings" on listings;
create policy "Admins can update listings" on listings
  for update using (is_admin());

-- Events: Admin View
drop policy if exists "Only service role can view events" on events;
create policy "Admins and service role can view events" on events
  for select using (is_admin() or auth.role() = 'service_role');
