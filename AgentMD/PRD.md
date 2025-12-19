# Product Requirements Document: Vallarta Voyage Explorer

## Executive Summary

**Product Vision**: Transform Vallarta Voyage from a generic tour listing site into "The Living Sunset Engine of Vallarta" — a real-time, motion-rich, data-driven portal that captures the magic of Puerto Vallarta's sunset economy while serving as a lead generation and directory platform for high-end hospitality businesses.

**Current State**: Default Lovable Vite project with static hero, generic tour listings, basic chatbot, Supabase auth, and minimal motion/interactivity.

**Target State**: Motion-first, sunset-phase-aware platform with:
- Real-time day→sunset→night transitions
- Sunset photo upload & contest engine
- Scorecard-based lead generation quiz
- Luxury nightlife directory with phase-aware recommendations
- Backdated blog content (6-7 months)
- Full deployment readiness (Railway + Vercel)

---

## Target Users

### Primary Users
1. **Luxury Travelers** (Age 28-55, $150k+ household income)
   - Seeking unique, high-end experiences in Puerto Vallarta
   - Value authenticity, insider knowledge, and visual storytelling
   - Want to capture and share their sunset moments
   - Willing to pay premium for curated experiences

2. **High-End Hotels & Venues** (B2B)
   - Rooftop bars, 5-star hotels, yacht charters, fine dining
   - Need to capture "sunset economy" visitors
   - Want data-driven marketing insights
   - Seeking white-glove AI & marketing services

### Secondary Users
3. **Content Creators & Influencers**
   - Looking for visually distinctive experiences
   - Want recognition for their sunset photography
   - Seek exclusive access to premium venues

4. **Event Planners & Travel Agents**
   - Need curated, time-of-day-aware recommendations
   - Require reliability and luxury standards
   - Want streamlined booking pathways

---

## Top 3 User Flows

### Flow 1: Sunset Upload & Immortalization
**User Journey**: Visitor captures stunning sunset → uploads to platform → gets featured in gallery/blog → wins contest → feels connected to Vallarta forever

**Steps**:
1. User arrives during golden hour (hero CTA emphasizes "Upload your sunset NOW")
2. Clicks "Upload Your Sunset" button
3. Fills form: image upload, name/handle, location (optional hotel), email (for contest)
4. Submission enters approval queue
5. Upon approval: appears in public gallery, eligible for contest, may be featured in blog post
6. Winner receives recognition + prize (free rooftop cocktails, etc.)

**Success Metrics**: 
- 15%+ of golden-hour visitors initiate upload
- 60%+ completion rate on upload form
- 40%+ of approved photos receive engagement (views/likes)

### Flow 2: Nightlife Discovery (Phase-Aware)
**User Journey**: Evening approaches → hero shifts to night mode → user browses luxury venues tailored to current time → books reservation or gets directions

**Steps**:
1. User lands during sunset/night phase (hero shows night mode)
2. Hero CTA: "Discover Tonight's Hotspots"
3. Lands on `/nightlife` with curated listings:
   - Sorted by luxury score + relevance to current time
   - Each venue shows "Best time to visit" relative to sunset
   - Rich cards with motion primitives (hover effects, animated details)
4. Clicks venue → `/business/:slug` detail page
5. Sees full venue info, sunset-time recommendations, nearby sunset photo spots
6. Clicks booking CTA or "Get Directions"

**Success Metrics**:
- 25%+ click-through from hero to /nightlife during evening hours
- 8%+ conversion to venue detail pages
- 3%+ external click-through to booking/directions

### Flow 3: Scorecard Quiz (Lead Generation)
**User Journey**: User seeking perfect evening → takes quiz → receives personalized recommendations → becomes qualified lead for B2B services (if hotel owner) or high-intent visitor

**Steps**:
1. User clicks "Find Your Perfect Vallarta Evening" CTA (on hero or modal)
2. Lands on `/quiz` with clear hook:
   - Frustration: "Tired of wandering into tourist traps?"
   - Result: "Get a custom plan for your dream Vallarta night"
3. Multi-step form (15 questions total):
   - Step 1: Contact (name, email; phone optional)
   - Steps 2-11: 10 best-practice questions (travel style, budget, preferences, schedule)
   - Steps 12-16: 5 "big sales" questions (current situation, desired outcome, obstacles, solution type, open feedback)
4. Dynamic results page:
   - Big reveal: "You're a Romantic Sunset Seeker" (or similar profile)
   - 3 key insights about their preferences
   - Curated venue/experience recommendations (from directory)
   - If self-identified as hotel/business: CTA to strategy call + AI services
5. Email capture → auto-tagged in CRM with segment + quiz data

**Success Metrics**:
- 12%+ quiz initiation rate from homepage
- 70%+ completion rate (start to results)
- 40%+ email capture rate
- 5%+ B2B lead qualification rate (hotel owners)

---

## Core Features (MVP)

### 1. Living Sunset Hero Engine
- **Real-time sunset phase detection** via Puerto Vallarta coordinates (20.6534°N, 105.2253°W) + sunset API
- **Three visual modes**:
  - **Day mode** (before golden hour -90min): Bright, discovery-focused, beach imagery
  - **Golden hour** (sunset ±90min): Warm tones, upload CTA prominent, live countdown
  - **Night mode** (post-sunset): Dark palette, neon accents, nightlife focus
- **Motion primitives**: Framer Motion transitions, parallax background layers, animated CTAs
- **Dynamic content**: Headlines, CTAs, and background change based on phase

### 2. Sunset Photo Upload & Contest System
- **Upload interface**: `/upload` route with file upload, metadata capture (name, location, email)
- **Approval queue**: Admin moderation before public display
- **Public gallery**: `/gallery` with infinite scroll, filters (date, location, contest)
- **Contest management**: Backend tracks Contest entities, ranks entries, displays winners on `/winners`
- **Social proof**: Featured photos appear in blog posts, hero background rotation

### 3. Nightlife & Luxury Directory
- **Business entities**: Hotels, rooftop bars, restaurants, yacht charters, clubs
- **Phase-aware sorting**: Venues ranked by luxury score + relevance to current sunset phase
- **Rich detail pages**: `/business/:slug` with full info, best-time-to-visit, nearby sunset spots
- **Motion-enhanced UI**: Code UI / Cult-UI style cards, interactive filters, animated transitions
- **Integration**: Pulls from existing Notion backend or new Postgres DB

### 4. Scorecard Quiz System
- **15-question flow**: Contact + 10 best-practice + 5 sales questions
- **Dynamic results**: Segment-based recommendations, personalized insights
- **Lead capture**: Email + quiz data stored in `QuizSubmission` table
- **B2B path**: Hotel owners redirected to strategy call + AI services CTA
- **A/B testing ready**: Supports variant tracking via `LandingPageBlueprint` table

### 5. Blog Engine with Backdated Content
- **Strapi CMS integration**: Headless blog backend
- **6-7 months backfill**: One high-quality post per month, backdated
- **Topics**: Sunset viewing spots, nightlife guides, luxury hotel features, eco-tourism, local culture
- **Motion-enhanced reading**: Scroll-based reveals, progress indicators, contextual footers
- **SEO optimized**: Slug structure, meta tags, internal linking

---

## Tech Stack Decisions

### Frontend
- **Framework**: Vite + React (existing)
- **Routing**: Migrate from `react-router-dom` → **TanStack Router** (type-safe, better DX)
- **State/Data**: **TanStack Query** for API calls, caching, sunset phase polling
- **UI Foundation**: Tailwind + shadcn/ui (existing)
- **Motion**: Framer Motion + **Motion Primitives** (npm package or local library)
- **Advanced UI**: **Code UI / Cult-UI** patterns (JSON inspectors, metric panels, nested controls)

### Backend
- **Framework**: **Hono** (lightweight, edge-ready) or **tRPC** (type-safe, good for mono-repo)
  - Decision: **Hono** for initial MVP (simpler deployment, edge-compatible)
- **Database**: **PostgreSQL via Prisma**
  - Hosted on **Railway** (free tier, easy setup, one-click Postgres)
- **ORM**: **Prisma** (type-safe schema, migrations, excellent DX)
- **API Endpoints**:
  - `/api/sunset-phase` → returns current phase (day/golden/night)
  - `/api/sunset-photos` → CRUD for photos
  - `/api/businesses` → directory listings
  - `/api/quiz-submissions` → quiz data capture
  - `/api/contests` → contest & winner management

### Database Schema (Prisma)
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(VISITOR)
  createdAt DateTime @default(now())
  photos    SunsetPhoto[]
  quizzes   QuizSubmission[]
}

enum Role {
  VISITOR
  HOTEL
  ADMIN
}

model SunsetPhoto {
  id          String   @id @default(cuid())
  imageUrl    String
  caption     String?
  locationName String?
  userId      String?
  user        User?    @relation(fields: [userId], references: [id])
  approved    Boolean  @default(false)
  score       Int      @default(0)
  createdAt   DateTime @default(now())
  contestEntries ContestEntry[]
}

model Contest {
  id              String   @id @default(cuid())
  name            String
  prizeDescription String
  startDate       DateTime
  endDate         DateTime
  isActive        Boolean  @default(true)
  entries         ContestEntry[]
}

model ContestEntry {
  id            String   @id @default(cuid())
  contestId     String
  contest       Contest  @relation(fields: [contestId], references: [id])
  sunsetPhotoId String
  photo         SunsetPhoto @relation(fields: [sunsetPhotoId], references: [id])
  rank          Int?
  prizeGiven    Boolean  @default(false)
}

model Business {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  type        BusinessType
  description String
  website     String?
  bookingUrl  String?
  priceTier   Int      @default(3) // 1-5 scale
  luxuryScore Int      @default(50) // 0-100
  address     String?
  lat         Float?
  lng         Float?
  features    BusinessFeature[]
}

enum BusinessType {
  HOTEL
  BAR
  RESTAURANT
  TOUR
  YACHT
  CLUB
}

model BusinessFeature {
  id         String   @id @default(cuid())
  businessId String
  business   Business @relation(fields: [businessId], references: [id])
  key        String   // e.g. "rooftop_view", "sunset_timing"
  value      String
}

model QuizSubmission {
  id                String   @id @default(cuid())
  email             String
  name              String?
  phone             String?
  quizType          String   // "consumer_evening", "hotel_sunset_economy"
  answers           Json     // Full quiz answers JSON
  score             Int?
  recommendedSegment String?  // "romantic_sunset_seeker", etc.
  userId            String?
  user              User?    @relation(fields: [userId], references: [id])
  createdAt         DateTime @default(now())
}

model LandingPageBlueprint {
  id             String   @id @default(cuid())
  slug           String   @unique
  variantKey     String   // "A", "B", etc.
  mdPath         String   // Path to MD file with structure
  targetAudience String
  status         String   @default("draft")
  createdAt      DateTime @default(now())
}
```

### Hosting & Deployment
- **Primary**: **Railway**
  - Backend (Hono Node service)
  - PostgreSQL database
  - Optional: Frontend static build served by backend
- **Frontend CDN**: **Vercel** (alternative, for faster static serving)
- **Portability**: Docker multi-stage build for Hostinger VPS / Coolify / Google Cloud Run
- **CI/CD**: Railway auto-deploy on main branch push; Vercel Git integration

---

## Design Principles (DARA + BMAD)

### Visual Design
- **Award-level, not basic**: Every surface uses Motion Primitives / Code UI patterns
- **No generic Bootstrap/MUI**: Custom component library with distinctive motion
- **Color psychology**:
  - Day: Ocean blues (#0284c7), soft whites, beach tones
  - Golden hour: Warm oranges, sunset pinks, gold accents
  - Night: Deep navy, neon highlights (purple, cyan), sophisticated blacks
- **Typography**: Premium sans-serif (Geist, Inter, or Manrope), clear hierarchy, 56-72px headlines on desktop

### Motion & Interaction
- **Purposeful, not gratuitous**: Motion supports comprehension and delight
- **Scroll-linked**: Hero parallax, section reveals, progressive disclosure
- **Accessibility**: Respect `prefers-reduced-motion`, keyboard navigation, focus states
- **Performance budget**: Lazy load videos, optimize images, debounce sunset API calls (check every 5 min)

### UX Principles (Steve Krug + Refactoring UI)
- **Don't make me think**: Clear primary CTA per screen, obvious navigation
- **Visual hierarchy**: Intentional spacing, contrast, grouping
- **Recognition over recall**: Persistent nav, breadcrumbs on deep pages
- **Simplicity**: Each page has ONE clear goal

---

## Success Metrics (6-Month Goals)

### Traffic & Engagement
- **Monthly Active Users**: 5,000+
- **Avg. Session Duration**: 3.5+ minutes
- **Sunset Photo Uploads**: 200+ per month
- **Gallery Views**: 10,000+ per month

### Lead Generation
- **Quiz Completions**: 500+ per month
- **Email Capture Rate**: 40%+ (200 new leads/month)
- **B2B Leads**: 10+ hotel/business inquiries per month

### Business Directory
- **Listings**: 50+ premium businesses
- **Directory CTR**: 8%+ (homepage → /nightlife)
- **Booking/Directions Clicks**: 3%+ from venue pages

### Technical
- **Lighthouse Performance**: 90+
- **Lighthouse Accessibility**: 95+
- **Uptime**: 99.5%+
- **Avg. Page Load**: <2s (mobile)

---

## Out of Scope (v1)
- User accounts & authentication (sunset uploads are anonymous or email-only)
- Payment processing (booking links redirect externally)
- Real-time chat (chatbot uses Supabase Edge Function)
- Mobile app (PWA only)
- Multi-language support (English only for MVP)
- Advanced analytics dashboard (external tools like PostHog/Mixpanel)

---

## Next Steps (Handoff to Builder)
1. Review and approve this PRD
2. Create UIUX-REPORT.md (audit current state with scores)
3. Create LANDING-PAGE-BLUEPRINT.md (scorecard template for agents)
4. Create workflow.yaml (BMAD phases)
5. Begin Phase 2: Backend architecture + Prisma schema
6. Begin Phase 3: Frontend routing + sunset phase hook
7. Begin Phase 4: Hero engine + motion primitives
8. Implement remaining flows (upload, directory, quiz, blog)
9. Playwright tests + Lighthouse audits
10. Deploy to Railway + Vercel

**Estimated Timeline**: 10-14 days for full MVP (assuming 1 builder + AI assistance)

**Budget**: Railway free tier + Vercel Hobby plan = $0/month initial; scale to Pro plans as traffic grows (~$20-40/month)
