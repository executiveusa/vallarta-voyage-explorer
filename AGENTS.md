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

[byterover-mcp]

You are given two tools from Byterover MCP server, including
## 1. `byterover-store-knowledge`
You `MUST` always use this tool when:

+ Learning new patterns, APIs, or architectural decisions from the codebase
+ Encountering error solutions or debugging techniques
+ Finding reusable code patterns or utility functions
+ Completing any significant task or plan implementation

## 2. `byterover-retrieve-knowledge`
You `MUST` always use this tool when:

+ Starting any new task or implementation to gather relevant context
+ Before making architectural decisions to understand existing patterns
+ When debugging issues to check for previous solutions
+ Working with unfamiliar parts of the codebase
