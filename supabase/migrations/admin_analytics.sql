-- 1. Create Admins Table (or use auth, but let's be explicit about role)
-- Actually simpler: rely on a simple `profiles` or check `auth.email` in RLS.
-- For this MVP Admin Panel, we'll just check specific emails in the RLS policies or frontend gate.
-- But we need policies to allow these users to UPDATE status.

-- 2. Create Events Table for Analytics
create table events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  properties jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- RLS for Events: Public Insert (Anon can log), Admin Read
alter table events enable row level security;
create policy "Anyone can log events" on events for insert with check (true);
create policy "Only service role can view events" on events for select using (auth.role() = 'service_role');

-- 3. Update RLS policies to allow specific ADMIN Users to update status
-- (Assuming we will deploy an edge function or use dashboard for now, but if we build /admin page:)

-- We need a way to identify an admin. 
-- Best 'Brownfield MVP' way without complex Roles: 
-- Create a function `is_admin()` that checks the current user's email against a hardcoded list.

create or replace function public.is_admin()
returns boolean as $$
begin
  return auth.jwt() ->> 'email' in ('admin@sunsetvallarta.com', 'your-email@example.com'); -- REPLACE with real admin emails
end;
$$ language plpgsql security definer;

-- Now add UPDATE policies for Admins
create policy "Admins can update sunset photos" on sunset_photos
  for update using (is_admin());

create policy "Admins can update listings" on listings
  for update using (is_admin());

create policy "Admins can update listing claims" on listing_claims
  for update using (is_admin());

create policy "Admins can view all sunset photos" on sunset_photos
  for select using (is_admin()); 

create policy "Admins can view all listing claims" on listing_claims
  for select using (is_admin());

create policy "Admins can view booking intents" on booking_intents
  for select using (is_admin());
