# SKILL.md — Unified Skill Registry
## Vallarta Voyage Explorer | Agent Capability Index v2.0

**Version**: 2.0.0 | **Authority**: ZTE Protocol v2.0  
**Load Order**: This file MUST be read before starting any task  
**Token Strategy**: Use jcodemunch-mcp for all codebase reads — saves up to 99% tokens

---

## MANDATORY SKILL ACTIVATION SEQUENCE

Before ANY task in this repo, execute in order:
1. Read this file (`SKILL.md`) — know your capabilities
2. Read `.claude/AGENTS.md` — know your role and constraints
3. Read `.claude/ZTE_PROTOCOL.md` — know your execution protocol
4. **If frontend work**: Read `.github/AUTO_DESIGNER_CONFIG.md` — dominant design law
5. Scan `ops/reports/` — check prior outcomes for similar tasks

---

## SKILL 1 — jcodemunch-mcp
### Token-Efficient AST Indexing

**Source**: `https://github.com/jgravelle/jcodemunch-mcp`  
**Local path**: `C:\Users\execu\jcodemunch-mcp`  
**Install**: `npx jcodemunch-mcp@latest` or via MCP config  
**Token savings**: up to 99% vs raw file loading (validated in production)

**Core capabilities:**
- `search_symbols` — find functions/classes/constants by name across entire repo
- `get_symbol_source` — retrieve exact source of one symbol without loading file
- `find_importers` — identify all files that import a given module
- `get_module_api` — AST-indexed module API surface

**Usage rule — MANDATORY:**
```
NEVER load an entire file to find one function.
ALWAYS use jcodemunch search_symbols first.
ALWAYS use get_symbol_source to read one implementation.
```

**Token benchmark (this repo context):**
| Task | Without jcodemunch | With jcodemunch | Savings |
|------|--------------------|-----------------|---------|
| Find a component | ~8,000 tokens | ~200 tokens | ~97.5% |
| Read one hook | ~5,000 tokens | ~400 tokens | ~92% |
| Explore repo structure | ~40,000 tokens | ~800 tokens | ~98% |

---

## SKILL 2 — Ralphy
### Autonomous Build Agent

**Source**: `https://github.com/michaelshimeles/ralphy`  
**Local path**: `C:\Users\execu\ralphy`  
**Install**: See `C:\Users\execu\ralphy\README.md`

**Core protocol — Ask → Plan → Execute → Observe → Iterate:**
1. **Ask**: Before acting, Ralphy asks one clarifying question if task is ambiguous
2. **Plan**: Creates structured task plan with file list and success criteria
3. **Execute**: Implements changes atomically (one logical change per commit)
4. **Observe**: Runs lint + type check + tests after each change immediately
5. **Iterate**: Self-corrects on failure (max 3 rounds); escalates on 4th

**Code quality standards (from Ralphy CLAUDE.md):**
- One logical change per commit — small steps compound
- Write concise code — after writing, ask: "Would a senior engineer say this is overcomplicated?"
- No over-engineering — only changes directly requested or clearly necessary
- No dead code — if unused, delete completely
- No backwards-compatibility hacks for removed code

**Triggers**: "iterate this branch until green", "close open stubs", "fix lint and ship it"

**Integration point**: Ralphy is the primary Execution Agent in ZTE Stage 2 (IMPLEMENT)

---

## SKILL 3 — ZTE Auto-Deploy (`zte_autodeploy_v1`)
### Fully Autonomous Deploy-to-Green Pipeline

**Source**: `C:\Users\execu\Downloads\design-system\zte deploy files\SKILL.md`  
**GitHub Actions template**: `.github/workflows/auto-designer.yml`

**One required input**: Vercel project ID (set in workflow file — line `VERCEL_PROJECT_ID`)

**Pipeline stages:**
1. Stub detection + Ralphy implementation
2. Token-efficient reads via jcodemunch-mcp
3. E2E testing via Playwright
4. Design law enforcement via Emerald Tablets™
5. Vercel deploy + status polling
6. Auto-merge on green

**Platform routing:**
- Next.js / React / Vite / TypeScript → **Vercel**
- Python / Docker / long-running → **Coolify VPS** (`31.220.58.212`)
- Static / landing → **Cloudflare Pages**

**Subdomain convention:**
- Root: `vallartavoyageexplorer.com`
- API: `api.vallartavoyageexplorer.com` → Coolify
- Admin: `admin.vallartavoyageexplorer.com`

**Triggers**: "deploy to Vercel", "iterate branch until green and merge", "run ZTE on [project-id]"

---

## SKILL 4 — AUTO-DESIGNER™ v1.0
### Complete Repo Redesigner (MANDATORY FOR FRONTEND)

**Config file**: `.github/AUTO_DESIGNER_CONFIG.md`  
**Design tokens**: `.claude/design-system.json`  
**Audit framework**: `.claude/DESIGN_AUDIT.md`

**THIS SKILL IS MANDATORY. No frontend work ships without it.**

The AUTO-DESIGNER:
1. Scans repo structure to infer goal and audience automatically
2. Generates design brief (type, goal, audience, problems, objectives)
3. Designs all UI components against 3 dials:
   - **DESIGN_VARIANCE**: 6 (asymmetric grids, Bento patterns)
   - **MOTION_INTENSITY**: 5 (smooth transitions, no scroll hacks)
   - **VISUAL_DENSITY**: 5 (daily app mode — balanced content/whitespace)
4. Audits every component on 14-axis UDEC framework (floor: 8.5/10)
5. Blocks shipment if any violation; auto-fixes and re-audits

**Read full framework**: `.github/AUTO_DESIGNER_CONFIG.md`

**Triggers**: Any UI component creation or modification, any `src/components/` file touched

---

## SKILL 5 — Taste-Skill v3.1 + Pauli-Uncodixfy™
### Design Excellence + Anti-AI-Slop Laws

**Source repos:**
- Taste: `git@github.com:executiveusa/pauli-taste-skill.git`
- Uncodixfy: `git@github.com:executiveusa/pauli-Uncodixfy.git`

**The Three Dials (set for this project):**
- **DESIGN_VARIANCE = 6**: Overlapping margins, Bento patterns, varied image aspects
- **MOTION_INTENSITY = 5**: `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`, cascading delays
- **VISUAL_DENSITY = 5**: Daily App Mode — normal spacing for web apps

**BANNED patterns (automatic UDEC fail):**
- Lila font (associated with generic AI output)
- Centered-everything layout
- 3-equal-card grid as primary feature section
- Ghost buttons as primary CTAs
- Pill overload (every element pill-shaped)
- Glassmorphism as default aesthetic
- Soft corporate gradients without brand purpose
- Auto-playing media without user activation
- `window.addEventListener('scroll')` for animations

**APPROVED patterns:**
- Bento Grid (2-4 different-sized cards — use for tour feature highlights)
- Asymmetric 2-column zig-zag (use for hotel/tour detail sections)
- Horizontal infinite scroll carousel (use for tour catalog, sunset gallery)
- Staggered list animation (use for itinerary, amenity lists)
- Magnetic button (use sparingly on primary CTAs)

---

## SKILL 6 — Supabase MCP
### Database Operations

**Source**: `https://github.com/supabase-community/supabase-mcp`  
**Local path**: `C:\Users\execu\supabase-mcp` (if cloned)  
**Connection**: Via `SUPABASE_URL` + `SUPABASE_ANON_KEY` env vars

**Current schemas** (from `src/integrations/supabase/`):
- `hotels` — hotel listings with rating, maps, website
- `sunsets` — sunset spot details
- `profiles` — user profiles (auth)
- `projects` — project-based filtering

**Safe operations**: SELECT, INSERT (user data), UPDATE (own records)  
**Blocked operations**: DROP TABLE, DELETE ALL, TRUNCATE (require IRREVERSIBILITY_GUARD override)

---

## SKILL 7 — Hostinger API MCP
### Domain + Hosting Management

**MCP server**: `npx hostinger-api-mcp@latest`  
**Config**: See `.env.example` for required `HOSTINGER_API_TOKEN` placeholder  
**CRITICAL**: API token is vault-only — never in code or logs

**Capabilities**: Domain management, DNS records, email accounts, VPS management  
**Use for**: DNS updates, subdomain creation, SSL certificates  
**Do NOT use for**: Destructive operations (domain deletion) without IRREVERSIBILITY_GUARD override

---

## SKILL 8 — Vercel Plugin
### Deploy + Preview Management

**Install**: `npx plugins add vercel/vercel-plugin`  
**Project ID**: Set via `VERCEL_PROJECT_ID` env var  
**Token**: `VERCEL_TOKEN` env var (vault-only)

**Deployment commands:**
```bash
vercel --prod              # Production deploy
vercel                     # Preview deploy
vercel rollback            # Instant rollback to previous
vercel logs                # Stream logs
```

**Integration**: Wired into `.github/workflows/auto-designer.yml` Stage 5

---

## SKILL 9 — E2E Testing (Playwright)
### Smoke Tests + Lighthouse Audit

**Source**: `https://github.com/coleam00/link-in-bio-page-builder/.claude/skills/e2e-test/SKILL.md`  
**Framework**: Playwright  
**Runs**: After every deploy in ZTE Stage 6 (VERIFY)

**Required test coverage:**
- Homepage renders without errors
- Nav links work (directory, sunsets, auth)
- Hotel cards display
- Booking section renders
- Auth form submits (test user)
- Admin panel protected (redirect to auth)
- Mobile viewport (375px) — no horizontal scroll

**Lighthouse gates:**
- Performance: ≥ 80
- Accessibility: ≥ 90
- Best Practices: ≥ 90
- SEO: ≥ 80

---

## SKILL 10 — SYNTHIA™ v4.0
### Systems Architecture (Donella Meadows Framework)

**Embedded in**: `.github/AUTO_DESIGNER_CONFIG.md` Part 2  
**Use for**: Architecture reviews, component design decisions, system scaling analysis

**Mandatory context scan before any architecture decision:**
```bash
ls -la && cat package.json
cat .claude/README.md
find . -name "SKILL.md"
find . -name "design-system.json"
```

**Systems dial defaults (this project):**
- `SYSTEM_COMPLEXITY`: 5 (clean 3-tier: frontend + API + database)
- `FEEDBACK_DENSITY`: 6 (quality gate + error recovery + monitoring per tier)
- `AUTONOMY_LEVEL`: 5 (detect + flag + propose; human approves production)

**Architecture floor (8.5/10 on):**
- Stock Integrity, Flow Balance, Feedback Completeness
- Resilience Design, Agent Scope Discipline, Blast Radius Control

---

## SKILL LOADING VERIFICATION

When activating skills, confirm:
- [ ] jcodemunch-mcp accessible (`npx jcodemunch-mcp@latest --version`)
- [ ] Ralphy accessible (`C:\Users\execu\ralphy\ralphy.sh`)
- [ ] AUTO_DESIGNER_CONFIG.md present (`.github/AUTO_DESIGNER_CONFIG.md`)
- [ ] design-system.json valid JSON (`.claude/design-system.json`)
- [ ] DESIGN_AUDIT.md present (`.claude/DESIGN_AUDIT.md`)
- [ ] ZTE_PROTOCOL.md present (`.claude/ZTE_PROTOCOL.md`)
- [ ] `.env.example` has all required placeholders
- [ ] `ops/reports/` directory exists
- [ ] GitHub Actions workflow present (`.github/workflows/auto-designer.yml`)

Run `bash scripts/validate-setup.sh` to check all of the above automatically.

---

## QUICK SKILL REFERENCE

| Task Type | Primary Skill | Support Skill |
|-----------|---------------|---------------|
| Find existing code | jcodemunch | — |
| Write/fix code | Ralphy | ZTE Protocol |
| Design UI component | AUTO-DESIGNER | Taste-Skill + Uncodixfy |
| Audit design | DESIGN_AUDIT | SYNTHIA |
| Deploy | ZTE Auto-Deploy | Vercel Plugin |
| Test | E2E (Playwright) | Lighthouse |
| Database | Supabase MCP | — |
| Domain/hosting | Hostinger API | — |
| Architecture review | SYNTHIA | ZTE Protocol |
