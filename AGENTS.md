# Agent Protocol — Vallarta Voyage Explorer

## MANDATORY: Read These Files Before Any Task

1. `.claude/SKILL.md` — all capabilities, token strategy, skill registry
2. `.claude/AGENTS.md` — full agent roles, circuit breakers, routing
3. `.claude/ZTE_PROTOCOL.md` — ZTE execution protocol (7 stages)
4. For frontend: `.github/AUTO_DESIGNER_CONFIG.md` — mandatory design law
5. For frontend: `.claude/design-system.json` — design tokens

See `.claude/AGENTS.md` for complete agent system documentation.

---

[byterover-mcp]

## Prime Directive
All agents governed by Emerald Tablets™.
Root: .emerald-tablets-tm/PRIME_DIRECTIVE.md

## The Agent Roster (Paperclip Company: Verified Vallarta™)

| Agent | Role | Goal | Budget/day |
|-------|------|------|-----------|
| SYNTHIA PRIME | CEO | $100K revenue milestone | $50 |
| CAZADORA | CSO — Lead Scout | 10 new vetted businesses/week | $8 |
| FANY | CMO — Content | 500 qualified visitors/day | $10 |
| FORJADORA | COO — WhatsApp | 100% leads handled in 90s | $5 |
| LA VIGILANTE | CFO + QA | Quality + milestone tracking | $3 |
| ING-TEKNOS | CTO — Systems | 99.9% uptime | $5 |

## Mandatory Skills
| Skill | Applies to |
|-------|-----------|
| emerald-tablets-law | ALL agents |
| pike-engineering | ALL coding agents |
| udec-quality-gate | LA VIGILANTE + ING-TEKNOS |
| whatsapp-business | FORJADORA |
| postiz-content | FANY |

## Circuit Breakers (Tablet IV)
- Daily spend > $50 → halt all agents, alert Ivette
- 3 consecutive errors same type → escalate, don't retry
- approvalStatus bypass attempt → immediate halt + alert

## Ivette's Dashboard
Open .paperclip/dashboard.json for daily agent reports.
Review approval queue at /admin daily.
Everything else runs without intervention.
