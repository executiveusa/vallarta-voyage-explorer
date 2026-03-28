-- Verified Vallarta™ — Business Directory Schema
-- Migration: 001_verified_businesses
-- Governs: Tablet III — The Verified Promise

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── BUSINESSES ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.businesses (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Identity (bilingual)
  name_en           TEXT NOT NULL,
  name_es           TEXT NOT NULL,
  slug              TEXT UNIQUE NOT NULL,
  description_en    TEXT,
  description_es    TEXT,

  -- Category
  -- Values: 'Hotel', 'Restaurant', 'Bar', 'Tour', 'Spa', 'Experience', 'Shop', 'Transport'
  category          TEXT NOT NULL DEFAULT 'Experience',

  -- Location
  address           TEXT,
  area              TEXT DEFAULT 'Puerto Vallarta',
  city              TEXT DEFAULT 'Puerto Vallarta',
  state             TEXT DEFAULT 'Jalisco',
  country           TEXT DEFAULT 'Mexico',
  latitude          DECIMAL(10,8),
  longitude         DECIMAL(11,8),

  -- Contact
  phone             TEXT,
  whatsapp_number   TEXT,
  email             TEXT,
  website           TEXT,

  -- Verified Vallarta™ fields
  verified          BOOLEAN DEFAULT FALSE,
  verified_by       TEXT DEFAULT 'Ivette',
  verified_at       TIMESTAMPTZ,
  verification_notes TEXT,
  approval_status   TEXT DEFAULT 'PENDING',
  -- Values: 'PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED'

  -- SYNTHIA integration
  synthia_connected BOOLEAN DEFAULT FALSE,
  synthia_client_id TEXT,
  subscription_tier TEXT,
  -- Values: null, 'demo', 'base' ($99), 'pro' ($199), 'hotel' ($299-499)
  subscription_start TIMESTAMPTZ,
  subscription_end   TIMESTAMPTZ,

  -- Nonprofit
  nonprofit_partner  BOOLEAN DEFAULT FALSE,
  nonprofit_pledge_usd DECIMAL(10,2),

  -- Visual
  image_urls        TEXT[] DEFAULT '{}',
  logo_url          TEXT,
  sunset_view       BOOLEAN DEFAULT FALSE,
  luxury_tier       INTEGER DEFAULT 3,  -- 1-5 scale
  price_range       TEXT DEFAULT '$$$',  -- $, $$, $$$, $$$$

  -- Sunset phase relevance
  best_phases       TEXT[] DEFAULT '{"day","golden","night"}',
  golden_hour_special TEXT,

  -- Video reviews
  video_review_count INTEGER DEFAULT 0,
  avg_rating        DECIMAL(3,2) DEFAULT 0,

  -- Lead tracking
  whatsapp_lead_count INTEGER DEFAULT 0,
  booking_count     INTEGER DEFAULT 0,
  total_revenue_mxn DECIMAL(12,2) DEFAULT 0,

  -- Meta
  is_active         BOOLEAN DEFAULT TRUE,
  is_featured       BOOLEAN DEFAULT FALSE,
  scraped_from      TEXT,
  source_url        TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ─── VIDEO REVIEWS ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.video_reviews (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id     UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  reviewer_name   TEXT NOT NULL,
  reviewer_phone  TEXT,
  video_url       TEXT NOT NULL,
  transcript      TEXT,
  thumbnail_url   TEXT,
  duration_secs   INTEGER,
  star_rating     INTEGER CHECK (star_rating BETWEEN 1 AND 5),
  experience_type TEXT,
  tour_date       DATE,
  language        TEXT DEFAULT 'es',
  approved        BOOLEAN DEFAULT FALSE,
  share_card_url  TEXT,
  instagram_posted BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── WHATSAPP LEADS ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.whatsapp_leads (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id     UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  from_number     TEXT NOT NULL,
  from_name       TEXT,
  message_body    TEXT,
  intent          TEXT,
  -- Values: 'booking', 'info', 'complaint', 'other'
  status          TEXT DEFAULT 'pending',
  -- Values: 'pending', 'qualified', 'booked', 'no_response', 'lost'
  synthia_handled BOOLEAN DEFAULT FALSE,
  synthia_response TEXT,
  booking_confirmed BOOLEAN DEFAULT FALSE,
  booking_date    TIMESTAMPTZ,
  review_requested BOOLEAN DEFAULT FALSE,
  review_request_sent_at TIMESTAMPTZ,
  revenue_mxn     DECIMAL(10,2),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── SUNSET PHOTOS ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.sunset_photos_vv (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  uploader_name   TEXT,
  uploader_phone  TEXT,
  photo_url       TEXT NOT NULL,
  location_tag    TEXT,
  business_id     UUID REFERENCES public.businesses(id),
  caption_es      TEXT,
  caption_en      TEXT,
  phase           TEXT DEFAULT 'golden',
  approved        BOOLEAN DEFAULT FALSE,
  contest_entry   BOOLEAN DEFAULT FALSE,
  likes_count     INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── NONPROFIT DONATIONS ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.donations (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id     UUID REFERENCES public.businesses(id),
  donor_name      TEXT,
  amount_mxn      DECIMAL(10,2) NOT NULL,
  amount_usd      DECIMAL(10,2),
  type            TEXT DEFAULT 'monthly_pledge',
  status          TEXT DEFAULT 'pending',
  payment_method  TEXT,
  stripe_session_id TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── INDEXES ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_vv_businesses_slug       ON public.businesses(slug);
CREATE INDEX IF NOT EXISTS idx_vv_businesses_verified   ON public.businesses(verified, approval_status);
CREATE INDEX IF NOT EXISTS idx_vv_businesses_category   ON public.businesses(category);
CREATE INDEX IF NOT EXISTS idx_vv_businesses_whatsapp   ON public.businesses(whatsapp_number);
CREATE INDEX IF NOT EXISTS idx_vv_video_reviews_biz     ON public.video_reviews(business_id, approved);
CREATE INDEX IF NOT EXISTS idx_vv_wa_leads_biz          ON public.whatsapp_leads(business_id, status);
CREATE INDEX IF NOT EXISTS idx_vv_sunset_photos_appr    ON public.sunset_photos_vv(approved, created_at);

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────────────────────
ALTER TABLE public.businesses     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_reviews  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sunset_photos_vv ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations      ENABLE ROW LEVEL SECURITY;

-- Public read for approved businesses only (Tablet III enforced at DB level)
CREATE POLICY IF NOT EXISTS "Public read approved businesses"
  ON public.businesses FOR SELECT
  USING (approval_status = 'APPROVED' AND is_active = TRUE);

CREATE POLICY IF NOT EXISTS "Public read approved reviews"
  ON public.video_reviews FOR SELECT
  USING (approved = TRUE);

CREATE POLICY IF NOT EXISTS "Public read approved photos"
  ON public.sunset_photos_vv FOR SELECT
  USING (approved = TRUE);

-- Admin full access (service role only)
CREATE POLICY IF NOT EXISTS "Admin write businesses"
  ON public.businesses FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY IF NOT EXISTS "Admin write reviews"
  ON public.video_reviews FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY IF NOT EXISTS "Admin write leads"
  ON public.whatsapp_leads FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY IF NOT EXISTS "Admin write photos"
  ON public.sunset_photos_vv FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY IF NOT EXISTS "Admin write donations"
  ON public.donations FOR ALL
  USING (auth.role() = 'service_role');

-- Allow anon to insert into businesses (claim form — creates PENDING record)
CREATE POLICY IF NOT EXISTS "Anon insert pending business"
  ON public.businesses FOR INSERT
  WITH CHECK (approval_status = 'PENDING' AND verified = FALSE);

-- Allow anon to insert video reviews (pending approval)
CREATE POLICY IF NOT EXISTS "Anon insert video review"
  ON public.video_reviews FOR INSERT
  WITH CHECK (approved = FALSE);
