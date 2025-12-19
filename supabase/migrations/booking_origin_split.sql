-- Booking Origin Split Migration
-- Hardens RLS to strict separation: Public=Human, Service=Any

-- 1. Drop old policies that might be too permissive
drop policy if exists "Enable insert for authenticated users and anon" on booking_intents;
drop policy if exists "Public can insert human bookings" on booking_intents; 

-- 2. Create STRICT Public Policy
-- Only allows insert if origin is 'human'
create policy "Public can insert human bookings only" on booking_intents
  for insert with check (
    origin = 'human'
  );

-- 3. Add Check Constraint (Belt & Suspenders)
-- Ensures that even if RLS is bypassed by a non-service role (unlikely but possible), the data integrity holds.
-- We must drop existing constraint if exists to update it or leave it if it's correct.
-- Previous step added check_origin_agent constraint: (origin = 'human' or (origin = 'agent' and auth.role() = 'service_role'))
-- Supabase check constraints usually don't see auth.role(). 
-- IF the previous migration succeeded, it might be flawed if auth.role() isn't valid in CHECK.
-- CHECK constraints sees row data. 
-- Let's replace it with a simple value constraint: origin in ('human', 'agent')
-- The Security is in RLS.

-- Attempt to drop previous complex constraint if it exists
alter table booking_intents drop constraint if exists check_origin_agent;

-- Ensure value constraint
alter table booking_intents drop constraint if exists check_origin_values;
alter table booking_intents
  add constraint check_origin_values check (origin in ('human', 'agent'));

-- 4. Rate Limiting (Database Level - MVP)
-- We can't easily do per-IP rate limiting in pure SQL without an events log table containing IP.
-- But we can rate limit per 'email' or generic spam protection if needed.
-- For P8D, we rely on App/Edge layer for IP limits.
