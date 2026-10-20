-- Trust foundation. Apply to the NEW Supabase project after 001.
-- Public can only INSERT into claims/reports. No public reads on those tables.

ALTER TABLE public.businesses
  ADD COLUMN IF NOT EXISTS verified_at         TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS verification_method TEXT CHECK (verification_method IN ('in_person','live_video')),
  ADD COLUMN IF NOT EXISTS verification_notes  TEXT,
  ADD COLUMN IF NOT EXISTS recheck_at          TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS sponsored           BOOLEAN NOT NULL DEFAULT FALSE;

-- No default verifier name: verification must be recorded explicitly.
ALTER TABLE public.businesses ALTER COLUMN verified_by DROP DEFAULT;
ALTER TABLE public.businesses ALTER COLUMN verified SET DEFAULT FALSE;

CREATE TABLE IF NOT EXISTS public.business_claims (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  business_name TEXT NOT NULL CHECK (char_length(business_name) BETWEEN 2 AND 200),
  owner_name    TEXT NOT NULL CHECK (char_length(owner_name) BETWEEN 2 AND 200),
  phone         TEXT NOT NULL CHECK (char_length(phone) BETWEEN 6 AND 40),
  whatsapp      TEXT,
  email         TEXT,
  website       TEXT,
  category      TEXT,
  area          TEXT,
  description   TEXT CHECK (description IS NULL OR char_length(description) <= 2000),
  lang          TEXT
);

CREATE TABLE IF NOT EXISTS public.business_reports (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  business_name TEXT NOT NULL CHECK (char_length(business_name) BETWEEN 2 AND 200),
  details       TEXT NOT NULL CHECK (char_length(details) BETWEEN 10 AND 4000),
  contact       TEXT CHECK (contact IS NULL OR char_length(contact) <= 200),
  lang          TEXT
);

ALTER TABLE public.business_claims  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public can insert claims"  ON public.business_claims  FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "public can insert reports" ON public.business_reports FOR INSERT TO anon WITH CHECK (true);
-- No SELECT/UPDATE/DELETE policies: only the service role (dashboard, server-side email hook) can read.
-- TODO (owner): add a database webhook or Edge Function that emails the owner on each insert,
-- and a rate limit (e.g. Supabase Edge Function or Cloudflare rule) in front of the API.
