# Client Requirements & Decisions (Dec 8, 2025)

## Approved Answers to Critical Questions

### 1. Business Model ✅
**Decision**: Pure B2B model targeting luxury hotels/resorts in Puerto Vallarta & Mexico City

**Target Clients**: 
- Luxury hotels and resorts
- High-end venues (rooftop bars, fine dining, yacht charters)
- Located in Puerto Vallarta and Mexico City

**Target End Users**:
- US travelers coming to Mexico
- High-end, luxury-seeking demographic

**Key Requirement**: **ALL CONTENT MUST BE BILINGUAL (Spanish + English)**

---

### 2. Content Authority ✅
**Decision**: Programmatic directory population with opt-out mechanism (Mexican law-compliant)

**Approach**:
- We CAN add businesses to directory without prior permission (legal in Mexico)
- Automated scraping + data collection via:
  - **Firecrawl** (web scraping)
  - **Apollo** (business data)
  - **Reddit** (pain point research, target audience insights)
  - Other local sources
- Send notification after adding business
- If they don't like it → remove immediately
- No US-style permission requirements

**Data to Collect**:
- Hotel pain points
- What we can offer them (lead generation, AI services)
- How we bring them leads
- Real estate dynamics
- Target audience needs (from Reddit, forums, reviews)

---

### 3. Photo Rights ✅
**Decision**: No model releases needed, simple attribution

**Policy**:
- Display with user's name/handle
- No legal paperwork required
- Standard terms: "By uploading, you grant us right to display with attribution"

---

### 4. Blog Backfill ✅
**Decision**: AI-generated blog posts based on Reddit pain point analysis

**Content Strategy**:
- 6-7 posts backdated over last 6-7 months
- Based on pain points discovered via Reddit scraping:
  - How to avoid tourist traps
  - Luxury travel tips for Puerto Vallarta
  - Hidden gems for high-end travelers
  - Sunset viewing strategies
  - Nightlife for discerning visitors
- **Use sunset as bait/hook** for all content
- Target higher-end luxury clients
- Custom, non-generic approaches
- **Bilingual (Spanish + English)**

---

### 5. Admin Workflow ✅
**Decision**: Custom admin dashboard matching our feature set

**Requirements**:
- NOT manual database editing
- Build custom dashboard UI
- Match existing dashboard style/features
- Features to include:
  - Photo approval queue
  - Contest management
  - Business directory CRUD
  - Scraping job controls (Firecrawl, Reddit)
  - Analytics overview
  - Quiz submission review
  - Blog post management
- Integrate into existing admin flow (if any) or create new

---

### 6. Brand Assets ✅
**Decision**: Design from scratch with ocean/sand/jungle palette

**Approach**:
- No existing logo or brand assets
- Use existing color palette:
  - Ocean blues (#0284c7, etc.)
  - Sand tones (#eab308, etc.)
  - Jungle greens (#22c55e, etc.)
- Follow Steve Krug design principles (simplicity, clarity, usability)
- Can iterate later based on feedback
- Premium sans-serif typography (Geist, Inter, or Manrope)

---

### 7. Domain & DNS ✅
**Decision**: Deploy to Railway immediately, use Railway subdomains

**Deployment Strategy**:
- Deploy entire stack to Railway NOW
- Backend: Node/Hono service on Railway
- Database: PostgreSQL on Railway
- Frontend: Also on Railway (NOT Vercel for now)
- Use Railway-provided subdomains initially
- Can add custom domain later

---

### 8. Analytics & Tracking ✅
**Decision**: Defer to later, add in Railway eventually

**Approach**:
- Don't worry about analytics now
- Can add later directly in Railway dashboard
- Focus on core features first
- PostHog or Plausible can be added post-MVP

---

## Updated Technical Requirements

### Bilingual Support (CRITICAL)
- **All user-facing content must be Spanish + English**
- Routes: `/es/...` and `/en/...` (or use i18n library with language switcher)
- Database: Store business names, descriptions in both languages
- Blog posts: Write in both languages
- Quiz questions: Both languages
- Hero copy: Both languages
- Admin dashboard: Can be English-only (internal tool)

### Scraping Infrastructure (NEW FEATURE)
**Priority**: High (Phase 1-2)

**Tools to Integrate**:
1. **Firecrawl**: Web scraping for business listings
   - Target: TripAdvisor, Google Maps, local directories
   - Extract: name, address, description, photos, ratings
   
2. **Apollo**: B2B data enrichment
   - Get contact info (email, phone) for outreach
   
3. **Reddit API**: Pain point research
   - Subreddits: r/PuertoVallarta, r/travel, r/luxurytravel, r/mexico
   - Extract: common complaints, questions, needs
   - Feed into blog content generation

**Scraping Workflow**:
1. Admin triggers scrape job via dashboard
2. Firecrawl scrapes target sites
3. Data goes into temp table (`ScrapedBusiness`)
4. Admin reviews + approves → moves to `Business` table
5. System sends email: "We added you to our directory. Opt out here: [link]"
6. If opt-out → soft delete or mark as `hidden`

### Admin Dashboard Requirements (DETAILED)

**Pages/Sections**:
1. **Photo Approvals**
   - Queue of pending sunset photos
   - Preview, approve/reject buttons
   - Bulk actions

2. **Contest Management**
   - Create/edit contests
   - Set prizes, dates
   - View entries, assign rankings
   - Declare winners

3. **Business Directory**
   - CRUD for businesses
   - Review scraped businesses (approve/reject)
   - Edit bilingual content
   - Trigger scraping jobs

4. **Scraping Jobs**
   - Configure Firecrawl targets
   - View job history
   - Pause/resume scraping
   - Review Reddit insights

5. **Quiz Submissions**
   - View all quiz responses
   - Filter by segment (B2B vs. B2C)
   - Export to CSV
   - Flag high-intent leads

6. **Blog Management**
   - Create/edit posts (bilingual)
   - Schedule publishing
   - SEO settings

7. **Analytics Overview**
   - Sunset phase stats (day/golden/night traffic)
   - Photo upload trends
   - Quiz completion rates
   - Business directory views

---

## Updated Deployment Plan

### Railway Setup (All-in-One)
1. **Backend Service**
   - Node/Hono server
   - Env vars: `DATABASE_URL`, `FIRECRAWL_API_KEY`, `REDDIT_CLIENT_ID`, etc.
   
2. **PostgreSQL Database**
   - Provision via Railway
   - Free tier initially
   
3. **Frontend Service**
   - Vite build deployed as static site
   - Served via Railway's static hosting or simple Node server
   
4. **Cron Jobs** (via Railway or external)
   - Daily Reddit scraping
   - Weekly Firecrawl runs
   - Sunset photo contest reminders

---

## Updated Timeline

**Phase 1: Backend + Scraping** (4-5 days instead of 3-4)
- Hono + Prisma setup
- Bilingual schema (add `nameES`, `nameEN`, `descriptionES`, `descriptionEN` columns)
- Firecrawl integration
- Reddit API integration
- Apollo integration (optional, can defer)
- Admin API endpoints

**Phase 2: Frontend + i18n** (3-4 days instead of 2-3)
- TanStack Router with language routing
- i18n library (react-i18next or similar)
- Language switcher component
- Bilingual content management

**Phase 3: Admin Dashboard** (NEW, 3-4 days)
- Custom admin UI
- Photo approval queue
- Contest management
- Scraping job controls
- Business directory CRUD

**Phase 4-11**: Continue as planned (hero, upload, directory, quiz, blog, testing, deploy)

**Total Revised Timeline**: 16-20 days (up from 10-14 due to bilingual + scraping + admin dashboard)

---

## Action Items (Immediate)

### Now (Phase 1 Start):
1. Create `/backend-node` directory
2. Initialize Node + Hono + Prisma
3. Design bilingual database schema
4. Set up Railway project + Postgres
5. Install Firecrawl SDK
6. Set up Reddit API access
7. Build scraping endpoints
8. Deploy initial backend to Railway

### Next (Phase 2):
9. Add i18n to frontend
10. Create language switcher
11. Migrate routes to TanStack Router with `/es/` and `/en/`

### Then (Phase 3):
12. Build admin dashboard UI
13. Wire up admin API endpoints
14. Test scraping workflow end-to-end

---

**Status**: ✅ All questions answered, proceeding to Phase 1 implementation
**Updated**: December 8, 2025
**Next Action**: Begin backend scaffold with bilingual + scraping support
