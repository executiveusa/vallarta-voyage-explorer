# Recovery Instructions for Lost Context

**Purpose**: If you (agent or human developer) lose context mid-project, this file will help you quickly reconstruct where we are and what to do next.

---

## Quick Orientation

**Project**: Vallarta Voyage Living Sunset Engine  
**Current Phase**: Phase 0 complete, awaiting approval for Phase 1  
**Last Session**: December 7, 2025  
**Tech Stack**: Vite + React + TanStack Router/Query + Hono + Prisma + PostgreSQL + Railway

---

## What You Need to Know Right Now

### 1. The Core Transformation

We're transforming a **generic Lovable tour listing site** into:
- **"The Living Sunset Engine of Vallarta"** — a real-time, motion-rich portal
- Tracks Puerto Vallarta sunset phases (day/golden/night)
- Lets users upload sunset photos & enter contests
- Features luxury nightlife directory with phase-aware recommendations
- Includes scorecard quiz for lead generation (B2B + B2C)
- Has 6-7 months of backdated blog content

### 2. Where We Are

**✅ Phase 0 Complete**: Discovery & Audit
- Comprehensive PRD created
- 15 UX issues identified and prioritized
- 20 features defined with acceptance criteria
- BMAD workflow mapped (10 phases, 14 days estimated)

**🔜 Next**: Phase 1 — Backend Architecture (Node/Hono + Prisma + Postgres)

**⏸️ Blocked By**: Awaiting human architect approval of PRD + audit

### 3. Critical Files to Read (In Order)

1. **`_JCP/progress.md`** (this file's sibling) — Current status, session log, metrics
2. **`AgentMD/PRD.md`** — Full product vision, user flows, tech decisions (8 pages)
3. **`AgentMD/design_audit.yaml`** — 15 UX issues with evidence and fixes
4. **`_JCP/features.json`** — 20 features with acceptance criteria and test steps
5. **`AgentLogic/workflow.yaml`** — 10-phase BMAD plan with tasks and timelines
6. **`AgentMD/LANDING-PAGE-BLUEPRINT.md`** — Quiz/scorecard template for agents

---

## How to Resume Work

### If You're Picking Up Mid-Phase

1. **Check feature status**:
   ```bash
   cat _JCP/features.json | grep '"status"' | grep -v "not-started"
   ```
   This shows which features are in-progress or completed.

2. **Find the active feature**:
   Look for `"status": "in-progress"` in `features.json`.

3. **Review acceptance criteria**:
   Read the `acceptance_criteria` array for that feature.

4. **Check test steps**:
   Read the `test_steps` array to know what to verify.

5. **Resume implementation**:
   - If backend: work in `/backend-node/` (not `/backend/` — that's old Python)
   - If frontend: work in `/src/routes/` or `/src/components/`

6. **Mark as completed**:
   When done, update `features.json`:
   ```json
   {
     "status": "completed",
     "tested": true,
     "committed": true,
     "completed_at": "2025-12-XX"
   }
   ```

### If Starting a New Phase

1. **Confirm previous phase is complete**:
   Check `_JCP/progress.md` for ✅ checkmarks on all prior phases.

2. **Read phase tasks**:
   Go to `AgentLogic/workflow.yaml`, find the phase section (e.g. "Phase 2: Frontend Router").

3. **Mark features as in-progress**:
   For each feature in the phase, update `features.json`:
   ```json
   {
     "status": "in-progress",
     "started_at": "2025-12-XX"
   }
   ```

4. **Follow BMAD discipline**:
   - Don't write code before understanding architecture
   - Don't implement before reading acceptance criteria
   - Test each feature before moving to the next

5. **Update progress.md**:
   Add a new session log entry documenting what you did.

---

## Common Scenarios & Solutions

### Scenario A: "I don't know what to build"
→ Read `AgentMD/PRD.md` sections:
- "Top 3 User Flows" (pages 4-6)
- "Core Features (MVP)" (pages 7-8)

### Scenario B: "The current code doesn't match the plan"
→ Expected. Phase 0 is audit-only. Implementation starts in Phase 1.
→ Ignore `/backend/` (Python). New backend goes in `/backend-node/`.

### Scenario C: "I need to know the UX requirements"
→ Read `AgentMD/design_audit.yaml`:
- Check `issues` array for specific problems + fixes
- Check `prioritized_plan` for order of work

### Scenario D: "I need to build a quiz but don't know the structure"
→ Read `AgentMD/LANDING-PAGE-BLUEPRINT.md`:
- Section 5: "Quiz Structure (For Agent Implementation)"
- Section 6: "Results Page Template"

### Scenario E: "I don't know what tech to use"
→ Read `AgentMD/PRD.md` section "Tech Stack Decisions" (page 9).
- Frontend: Vite + React + TanStack Router/Query
- Backend: Hono (not tRPC, not FastAPI)
- Database: Postgres + Prisma
- Hosting: Railway (backend + DB), Vercel (frontend)

### Scenario F: "Tests are failing / Lighthouse scores are low"
→ This is expected until Phase 8. Don't panic.
→ Focus on implementation first, optimization later.

### Scenario G: "I'm stuck and don't know how to proceed"
→ Ask the human architect for clarification.
→ Or: Refer to `workflow.yaml` for detailed task breakdowns.

---

## Key Decisions Already Made (Don't Re-Debate)

1. **Backend language**: Node (not Python) ✅
2. **Backend framework**: Hono (not tRPC, not Express) ✅
3. **Database**: PostgreSQL via Prisma ✅
4. **Hosting**: Railway for backend, Vercel for frontend ✅
5. **Router**: TanStack Router (not react-router-dom) ✅
6. **State**: TanStack Query (not Redux, not Zustand) ✅
7. **Motion**: Framer Motion + Motion Primitives ✅
8. **UI Library**: shadcn/ui + Tailwind (keep existing) ✅
9. **Blog**: Strapi or Markdown (TBD, but NOT WordPress) ✅
10. **Auth**: Defer to post-MVP (anonymous uploads OK for now) ✅

---

## File Structure (Current State)

```
vallarta-voyage-explorer/
├── AgentMD/                     # Documentation for agents (YOU)
│   ├── PRD.md                   # Product requirements (8 pages)
│   ├── design_audit.yaml        # UX audit (15 issues)
│   └── LANDING-PAGE-BLUEPRINT.md # Quiz template (11 pages)
├── AgentLogic/
│   └── workflow.yaml            # 10-phase BMAD plan
├── _JCP/                        # Job Completion Protocol
│   ├── features.json            # 20 features with status
│   ├── progress.md              # Session log, metrics
│   └── recovery.md              # This file
├── backend/                     # OLD Python backend (ignore)
├── backend-node/                # NEW Node backend (not created yet)
├── src/
│   ├── components/              # React components (existing)
│   ├── routes/                  # TanStack Router (not created yet)
│   ├── hooks/                   # Custom hooks (will expand)
│   └── lib/                     # Utils, API client
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── ...other config files
```

---

## What NOT to Do (Anti-Patterns)

❌ **Don't** start coding without reading PRD + audit  
❌ **Don't** modify existing Python backend (replace it)  
❌ **Don't** use react-router-dom (migrate to TanStack Router)  
❌ **Don't** skip accessibility (prefers-reduced-motion, focus states)  
❌ **Don't** deploy without tests (Playwright + Lighthouse required)  
❌ **Don't** use generic Bootstrap/MUI components (use Motion Primitives)  
❌ **Don't** hardcode data (use database + API)  
❌ **Don't** skip the approval step (ask human before major changes)  

---

## Emergency Contacts / Resources

### If Something Breaks
1. Check `_JCP/progress.md` for recent changes
2. Check git log: `git log --oneline -20`
3. Check Railway logs (if deployed)
4. Check browser console for frontend errors

### If You Need Clarification
1. Re-read the PRD section for that feature
2. Check `workflow.yaml` for detailed task breakdown
3. Search for similar code in existing components
4. Ask the human architect (better to ask than guess wrong)

### Reference Docs
- TanStack Router: https://tanstack.com/router
- TanStack Query: https://tanstack.com/query
- Hono: https://hono.dev/
- Prisma: https://www.prisma.io/docs
- Railway: https://docs.railway.app/
- Framer Motion: https://www.framer.com/motion/

---

## Success Checklist (How to Know You're Done)

A feature is complete when:
- ✅ All acceptance criteria are met
- ✅ All test steps pass
- ✅ Code is committed with descriptive message
- ✅ `features.json` is updated (`status: "completed"`)
- ✅ `progress.md` has a session log entry
- ✅ No console errors in browser/terminal

A phase is complete when:
- ✅ All features in that phase are complete
- ✅ Phase checklist in `workflow.yaml` is 100% checked
- ✅ Integration tests pass (if phase includes testable flows)
- ✅ Acceptance criteria for the phase are met
- ✅ Human architect has reviewed and approved (if required)

The project is complete when:
- ✅ All 10 phases are done
- ✅ All 20 features are complete
- ✅ Lighthouse scores meet targets (90+/95+/95+/90+)
- ✅ Playwright tests pass (100%)
- ✅ Production site is live and functional
- ✅ Client has admin access and documentation

---

## One-Line Summary

**"If lost, read PRD.md for vision, features.json for status, workflow.yaml for tasks, and progress.md for history."**

---

**Last Updated**: December 7, 2025  
**Next Review**: After Phase 1 completion
