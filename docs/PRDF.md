# PRDF - vallarta-voyage-explorer (Production Readiness & Design Findings)

Inspected: 2026-09-28. Method: real code, real build, real tests - README ignored per owner order. Benchmark: Collins protocol + gauntlet skills.

## VERDICT: TIER 1 - PRODUCTION-ADJACENT (most complete business surface in the fleet; fix the install gate)
Live: https://vallarta-voyage-explorer.vercel.app (200). Vite + React 18 + shadcn + Supabase (3 edge functions), bilingual es/en (38-key language context). Real product: Puerto Vallarta directory with sunset spots, claim-listing monetization (Demo/Base/Pro tiers), WhatsApp lead capture, auth + admin.

## EVIDENCE (verified this inspection)
- `npm run build` PASSES (3.1s; 405KB main / 127KB gzip) - ONLY with --legacy-peer-deps.
- `tsc --noEmit` CLEAN.
- Real pages: Index, Directory, Sunsets, SunsetSpotDetail, ClaimListing, Auth, Admin, Agents, VideoReview, NotFound.
- Supabase edge functions present: public-booking, agent-booking, chatbot (gpt-4o-mini via env key, server-side - no key in client bundle; client uses standard anon-key createClient).
- Real pricing/lead model on ClaimListing; no payment code in repo (lead capture, no PCI surface).
- analytics lib, prerender script, canonical + share-card hooks, mobile hook. Not a lovable draft - a working business.

## VIOLATIONS / GAPS (severity + standard broken)
1. HIGH - `npm ci` FAILS clean: ERESOLVE upstream dependency conflict; install only succeeds with --legacy-peer-deps. Fresh CI/Vercel installs are roulette. Fix: resolve the peer conflict (audit the two conflicting packages, align versions), delete the flag. (Gauntlet: reproducible automated gates.)
2. MED - Zero tests: no test files, no test script in package.json. A booking/directory app with auth shipping untested. Fix: vitest + smoke tests on directory hooks, booking fn contract, language context. (Truth-in-tooling.)
3. MED - Two "coming soon" stubs in production UX: VideoReview page (frontend-only message) and Sunsets "Interactive Map Coming Soon". Fix: hide behind feature flags or ship; Collins 2.4 no dead ends.
4. LOW - chatbot edge function runs paid gpt-4o-mini with no free-lane fallback or budget guard. Fix: route through the smart-router pattern / cap tokens. (Owner money rule context - flagged, their product choice.)
5. LOW - No Dockerfile/self-host path; Vercel + Supabase only.
6. INFO - Design: shadcn default look risk (template recognizability - Collins originality reviewer). No design-token doc. A11y audit not run.

## FIX LIST TO PRODUCTION-READY (ordered)
1 (1-2h) resolve ERESOLVE conflict; 2 (2h) vitest smoke suite; 3 (1h) flag or ship the two stubs; 4 (1h) router/budget guard on chatbot; 6 (1h) axe + Lighthouse pass. Estimated: one day.

## PORTFOLIO ROLE
The flagship proof: real monetization model, real backend, bilingual, travel vertical that ties directly to the Breathe International travel build. Highest business potential in the fleet. Keep in top five.
