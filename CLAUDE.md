# CLAUDE.md — Verified Vallarta™ Workspace Root
# Read this FIRST before any other file.

## Prime Directive
All agents in this workspace are governed by the EMERALD TABLETS™:
`.emerald-tablets-tm/PRIME_DIRECTIVE.md`
Read all 9 tablets before beginning work.

## MANDATORY: jCodeMunch MCP — Token-Efficient Code Retrieval

jCodeMunch is installed and MUST be used before any coding work begins. It uses tree-sitter parsing to enable precise symbol-level lookups (functions, classes, methods, constants) instead of reading entire files, cutting code-reading token usage by up to 95%.

### REQUIRED — Before Any Coding Task:
1. Use `jcodemunch` tools to index and look up relevant symbols/files before opening any file
2. Prefer `search_symbols`, `get_symbol`, or `search_files` over reading full files with the Read tool
3. Only fall back to Read/Grep when jcodemunch cannot locate what you need

### REQUIRED — After Each Session:
Report the estimated tokens saved using jCodeMunch by outputting:
```
=== jCodeMunch Token Savings Report ===
Files looked up via symbol search (not full reads): <count>
Estimated tokens saved: <estimate based on ~95% reduction per file avoided>
=======================================
```

## Stack
- Frontend: Vite + React 18 + TypeScript + Tailwind + shadcn/ui
- Database: Supabase (live: enzyewybberxgpmgixib.supabase.co)
- Backend: Hono + Prisma (backend-node/)
- Auth: Supabase Auth (already wired)
- Deployment: Vercel (frontend) + Railway (backend)

## Brand
- English: Verified Vallarta™
- Spanish: Verificado Vallarta™
- VV monogram: luxury double-V
- Colors: navy #0a1628, gold #c9a84c, cream #f5f0e8, coral #ed6a5a

## Key Files
| What | Where |
|------|-------|
| Design tokens | tailwind.config.ts + src/index.css |
| Business data | src/hooks/useDirectoryListings.ts (→ Supabase) |
| WhatsApp hooks | src/hooks/useWhatsApp.ts |
| Sunset engine | backend-node/src/routes/sunset.ts |
| Supabase client | src/integrations/supabase/client.ts |
| Paperclip config | .paperclip/company.json |

## Rules
- Never publish business without approvalStatus = 'APPROVED'
- Never hardcode secrets — use .env.local
- Never modify supabase/migrations/ manually — use supabase CLI
- All copy must pass Krug usability + P.A.S.S. framework
