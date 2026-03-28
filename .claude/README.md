# .claude/ — Agent Systems Index
## Vallarta Voyage Explorer | ZTE + AUTO-DESIGNER Operational Layer

**Version**: 2.0.0 | **Authority**: ZTE Protocol v2.0 + AUTO-DESIGNER™ v1.0  
**Last Updated**: March 27, 2026  
**Dominant Law**: Emerald Tablets™ — no frontend ships without UDEC ≥ 8.5/10

---

## Quick Reference

| File | Purpose | Read When |
|------|---------|-----------|
| `SKILL.md` | Unified skill registry — all agent capabilities | **FIRST** — before any task |
| `AGENTS.md` | Agent roles, circuit breakers, ZTE protocol | Starting any agentic work |
| `ZTE_PROTOCOL.md` | Zero-Touch Engineer operating system | Full autonomous execution |
| `design-system.json` | Machine-readable design tokens (colors, fonts, spacing) | Any frontend work |
| `DESIGN_AUDIT.md` | 14-axis UDEC scoring framework | Before shipping any UI |
| `INFRASTRUCTURE.md` | Hostinger, Coolify, Vercel connection guides | Deploy or infra tasks |

---

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                  VALLARTA VOYAGE EXPLORER                   │
│               Agent Orchestration Layer v2.0                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  DOMINANT LAW: Emerald Tablets™                            │
│  ├── Taste-Skill v3.1 (design excellence)                  │
│  ├── Pauli-Uncodixfy™ (anti-AI-slop enforcement)           │
│  └── SYNTHIA™ (systems thinking + feedback loops)          │
│                                                             │
│  OPERATING SYSTEM: ZTE Protocol v2.0                       │
│  └── WRITE → TEST → FIX → COMMIT → DEPLOY → VERIFY        │
│                                                             │
│  SKILLS LOADED:                                            │
│  ├── jcodemunch-mcp (token-efficient AST indexing)         │
│  ├── ralphy (autonomous build + stub completion)           │
│  ├── supabase-mcp (database operations)                    │
│  ├── hostinger-api-mcp (domain/hosting management)        │
│  ├── vercel-plugin (deploy + preview)                      │
│  └── e2e-test (Playwright + Lighthouse)                    │
│                                                             │
│  AUTO-DESIGNER™ v1.0 (mandatory for frontend work)        │
│  └── See .github/AUTO_DESIGNER_CONFIG.md                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Critical Rules — Enforced Automatically

1. **Every agent reads `.claude/SKILL.md` before starting any task**
2. **No frontend work begins without acknowledging `.github/AUTO_DESIGNER_CONFIG.md`**
3. **No deploy proceeds without UDEC ≥ 8.5/10 (`.claude/DESIGN_AUDIT.md`)**
4. **No secrets in code — all credentials via vault/env (`.env.example`)**
5. **ZTE circuit breakers are hardcoded — COST_GUARD ($20/task), LOOP_GUARD (3x), SECRET_GUARD**

---

## Directory Map

```
.claude/
├── README.md              ← You are here
├── SKILL.md               ← Unified skill registry (all skills)
├── AGENTS.md              ← Agent roles + ZTE protocol
├── ZTE_PROTOCOL.md        ← Full ZTE operating system
├── design-system.json     ← Design tokens (colors, fonts, spacing, motion)
├── DESIGN_AUDIT.md        ← 14-axis UDEC scoring (8.5 floor)
└── INFRASTRUCTURE.md      ← Hostinger, Coolify, Vercel, Supabase

.github/
├── AUTO_DESIGNER_CONFIG.md ← AUTO-DESIGNER™ mandatory framework
└── workflows/
    └── auto-designer.yml  ← CI/CD pipeline (ZTE stages 0-8)

ops/
├── reports/               ← ZTE bead reports + audit certs
│   └── plans/             ← Per-task plan files
└── templates/
    └── zte-completion.json ← Standard task output format

scripts/
├── activate-skills.sh     ← Load all skills into memory
├── validate-setup.sh      ← Binary pass/fail verification
└── infra-setup.sh         ← Infrastructure setup (vault-based)
```

---

## Getting Started

```bash
# Validate everything is wired correctly
bash scripts/validate-setup.sh

# Activate all skills (load into memory)
bash scripts/activate-skills.sh

# Trigger AUTO-DESIGNER redesign
git checkout -b feature/redesign
git push origin feature/redesign
# → GitHub Actions auto-runs the full pipeline
```
