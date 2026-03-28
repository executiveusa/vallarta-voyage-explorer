# AGENTS.md — Agent System Configuration
## Vallarta Voyage Explorer | ZTE Protocol v2.0

**Version**: 2.0.0  
**Last Updated**: 2026-03  
**Authority**: ZTE_PROTOCOL.md (read before proceeding)

---

## MANDATORY BOOT SEQUENCE

Every agent, every model, every invocation — run this sequence FIRST:

```
Step 1: Read .claude/SKILL.md               (all capabilities + token strategy)
Step 2: Read .claude/ZTE_PROTOCOL.md        (execution protocol + circuit breakers)
Step 3: Read ops/reports/                   (prior task outcomes — avoid repeating failures)
Step 4: If frontend task:
        Read .github/AUTO_DESIGNER_CONFIG.md  (dominant design law)
        Read .claude/design-system.json        (design tokens)
        Read .claude/DESIGN_AUDIT.md           (14-axis UDEC — floor 8.5/10)
Step 5: Assign bead_id (ZTE-YYYYMMDD-NNNN)
Step 6: Write plan to ops/reports/plans/{bead_id}.md
Step 7: Execute with ZTE Stage protocol
```

There are no shortcuts to this sequence.

---

## BYTEROVER TOOLS (Preserved)

### `byterover-store-knowledge`
MUST use when:
- Learning new patterns, APIs, or architectural decisions from this codebase
- Encountering error solutions or debugging techniques
- Finding reusable code patterns or utility functions
- Completing any significant ZTE task or plan implementation
- After a ZTE stage completes successfully

### `byterover-retrieve-knowledge`
MUST use when:
- Starting any new task or implementation
- Before making architectural decisions
- When debugging issues to check for previous solutions
- Working with unfamiliar parts of the codebase
- ZTE Stage 0 (CONTEXT LOAD) — before planning anything

**Integration**: byterover (semantic context) + jcodemunch (AST code indexing) are complementary.  
Use both in Stage 0.

---

## AGENT ROLES

### Orchestrator
- Receive task, decompose, route sub-tasks, aggregate results, escalate failures
- Never writes code directly
- Reads all `.claude/` files and `ops/reports/` before delegating

### Execution Agent — Code
- ZTE Stages 2-4: IMPLEMENT → TEST → COMMIT
- Uses jcodemunch to read code (not raw file reads)
- Max 3 self-correction loops before escalating to Orchestrator
- Every commit tagged with `bead_id` in message

### Execution Agent — Deploy
- ZTE Stages 5-7: DEPLOY → VERIFY → NOTIFY
- Documents rollback command BEFORE triggering any deploy
- Uses Vercel plugin for frontend, Coolify API for backend
- Health check: runs Lighthouse on deployed URL after every deploy

### Minion Agent
- Single atomic task: $20 budget, 45-minute wall clock, 2 CI rounds max
- Returns: PR URL or failure report only

### Guardian Agent
- Adversarial testing, security scanning, performance regressions
- Files GitHub issues with evidence — never self-merges fixes
- Tools: Lighthouse (perf ≥80, a11y ≥90), axe-core, OWASP checkers

---

## CIRCUIT BREAKERS

| Breaker | Trigger | Action |
|---------|---------|--------|
| `COST_GUARD` | Task >$20 OR daily >$100 | HALT. Emit cost alert. Await human override. |
| `PRODUCTION_GATE` | Any prod deploy | HALT. Show plan. Await written "approve". |
| `SECRET_GUARD` | Secret in file/log/PR | HALT. Scrub. Alert. Vault fix required. |
| `LOOP_GUARD` | Same error 3× | HALT. Escalate with full context. |
| `BLAST_RADIUS_GUARD` | >5 services in one action | HALT. Write multi-service plan first. |
| `IRREVERSIBILITY_GUARD` | DB drop, force-push, cred delete | HALT. Require written human confirmation. |
| `UDEC_GUARD` | Frontend UDEC <8.5/10 | BLOCK merge. Fix. Re-audit. Repeat. |

---

## TASK ROUTING

| Task Type | Agent Tier | Skills |
|-----------|-----------|--------|
| Design UI component | Execution (Code) | AUTO-DESIGNER + Taste-Skill + Uncodixfy |
| Fix bug | Execution (Code) | jcodemunch + Ralphy |
| New page/route | Execution (Code) | AUTO-DESIGNER + Ralphy |
| Deploy feature | Execution (Deploy) | ZTE Auto-Deploy + Vercel |
| DB migration | Execution (Code) | Supabase MCP |
| DNS/domain | Minion | Hostinger API |
| Security scan | Guardian | OWASP + Lighthouse |
| Architecture | Orchestrator | SYNTHIA + ZTE |

---

## FRONTEND RULES (Enforced Without Exception)

Every component in `src/` must:

1. Pass UDEC 14-axis audit ≥ 8.5/10 before merge
2. Follow `.claude/design-system.json` — colors, fonts, spacing, motion
3. Use Geist font (NOT Lila, NOT random Google Fonts)
4. Not center everything — use left-align, asymmetric layouts, or creative grids
5. Have a single clear CTA on hero/primary sections
6. Use `min-h-[100dvh]` not `h-screen`
7. Label all form fields visibly on load — no placeholder-as-label
8. Not use ghost buttons as primary CTAs
9. Have `'use client'` directive on all client-only components
10. Use semantic HTML: `nav`, `main`, `section`, `article`, `aside`

---

## COMPLETION REPORT FORMAT

Save to `ops/reports/{bead_id}_complete.json`:

```json
{
  "bead_id": "ZTE-20260327-0001",
  "task": "Description of task",
  "status": "COMPLETE",
  "files_changed": [],
  "tests_passed": "N/N",
  "udec_score": null,
  "deployed_to": null,
  "pr_url": null,
  "elapsed_seconds": 0,
  "cost_usd": 0,
  "rollback_command": null
}
```

---

## ANTI-PATTERNS

- Never write code without reading SKILL.md first
- Never touch frontend without AUTO_DESIGNER_CONFIG.md context
- Never hard-code secrets — use `.env` vars loaded from vault
- Never use `window.addEventListener('scroll')` for animations (use IntersectionObserver)
- Never use `h-screen` — use `min-h-[100dvh]`
- Never ship with `// TODO` comments or stub implementations
- Never retry the same failing action more than 3 times
- Never deploy to production without documented rollback
- Never make architecture decisions without SYNTHIA™ context scan
