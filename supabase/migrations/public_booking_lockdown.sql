-- Public Booking Lockdown Migration
-- 1. Revoke public/auth insert to booking_intents
-- We want to force ALL public traffic through the Edge Function (public-booking).

-- Drop existing insert policies
drop policy if exists "Enable insert for authenticated users and anon" on booking_intents;
drop policy if exists "Public can insert human bookings" on booking_intents;
drop policy if exists "Public can insert human bookings only" on booking_intents;

-- 2. Create STRICT Service-Role Only Policy (implicitly public denied if no policy exists for them)
-- Actually, if we want to explicitly ALLOW service_role, we can rely on Supabase defaults (service_role bypasses RLS).
-- So by removing all INSERT policies, we effectively block public insert.
-- However, for clarity/safety if defaults change, we can leave no insert policy for public.

-- To be extra sure, we verify no roles are granted insert permission at Postgres level if possible, 
-- but RLS is the standard way. 
-- "If no policy allows it, it's denied."

-- 3. Just to be absolutely sure, create a policy that allows nothing for anon/authenticated 
-- (optional, but "no policy" is the cleanest "deny").

-- 4. Ensure we don't break existing SELECT policies for users/admin.
-- (Previous migrations set those up).

-- Result:
-- Public INSERT -> Denied (RLS violation)
-- Service Role INSERT (via Edge Function) -> Allowed (Bypasses RLS)
