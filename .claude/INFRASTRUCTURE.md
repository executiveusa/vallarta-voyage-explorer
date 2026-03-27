# INFRASTRUCTURE.md — Service Connections
## Vallarta Voyage Explorer

> **Security rule**: This file contains ONLY endpoint patterns and environment variable names.  
> All actual credentials live in vault. Never commit real tokens here.

---

## Service Map

| Service | Role | Auth Env Var |
|---------|------|-------------|
| Vercel | Frontend deploy | `VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_TEAM_ID` |
| Coolify | Backend + agents deploy | `COOLIFY_API_KEY`, `COOLIFY_SERVICE_UUID`, `COOLIFY_URL` |
| Supabase | Database + auth + storage | `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| Hostinger | DNS + VPS + domain | `HOSTINGER_API_TOKEN` |
| GitHub | Source + CI/CD | `GH_PAT` |

---

## Vercel (Frontend)

**Plugin**: `npx plugins add vercel/vercel-plugin`  
**Project**: `vallarta-voyage-explorer`  
**Deploy target**: Production branch `main`, preview on all PRs

```bash
# Deploy commands (use env vars, never raw tokens)
vercel deploy --prod --token=$VERCEL_TOKEN
vercel rollback --token=$VERCEL_TOKEN

# List deployments
vercel list --token=$VERCEL_TOKEN --project=$VERCEL_PROJECT_ID
```

**Environment variables to set in Vercel dashboard**:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

**Expected deploy URL pattern**: `https://vallarta-voyage-explorer.vercel.app`  
**Preview URL pattern**: `https://vallarta-voyage-explorer-{hash}.vercel.app`

**Lighthouse gates** (enforced post-deploy by ZTE Stage 6):
- Performance ≥ 80
- Accessibility ≥ 90
- Best Practices ≥ 85
- SEO ≥ 80

---

## Coolify VPS (Backend)

**VPS IP**: `31.220.58.212`  
**Dashboard**: `http://31.220.58.212:8000` (or configured subdomain)  
**Access**: `COOLIFY_API_KEY` + `COOLIFY_URL`

```bash
# Health check pattern
curl -H "Authorization: Bearer $COOLIFY_API_KEY" \
  "$COOLIFY_URL/api/v1/healthcheck"

# Trigger deploy (use service UUID)
curl -X POST -H "Authorization: Bearer $COOLIFY_API_KEY" \
  "$COOLIFY_URL/api/v1/deploy?uuid=$COOLIFY_SERVICE_UUID"

# View service status
curl -H "Authorization: Bearer $COOLIFY_API_KEY" \
  "$COOLIFY_URL/api/v1/services/$COOLIFY_SERVICE_UUID"
```

**Services on Coolify**:
- FastAPI backend → port 8000
- Node.js backend → port 3000 (if active)
- Any Docker-based agent runners

**Subdomain convention** (per ZTE Auto-Deploy):
- `api.{domain}` → FastAPI
- `agents.{domain}` → Agent runners
- `monitor.{domain}` → Health dashboard

---

## Supabase (Database + Auth)

**MCP**: Use `supabase-mcp` skill for database operations from agents  
**Client**: `@supabase/supabase-js ^2.49.1` (already in package.json)

```typescript
// Client initialization (already in src/integrations/supabase/)
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

**Agent access**: Use `SUPABASE_SERVICE_ROLE_KEY` (server-side only, never shipped to browser)  
**Tables discovered**: See `src/integrations/supabase/types.ts` for auto-generated schema types  
**Migrations**: Stored in `supabase/migrations/` — NEVER hand-edit existing migrations

---

## Hostinger API (DNS + Domain)

**MCP server**: `npx hostinger-api-mcp@latest`  
**Documentation**: [developers.hostinger.com](https://developers.hostinger.com)  
**Auth**: Bearer `HOSTINGER_API_TOKEN` (vault only)

```bash
# MCP server invocation pattern via env var (never inline token)
HOSTINGER_API_TOKEN=$HOSTINGER_API_TOKEN npx hostinger-api-mcp@latest
```

**Common operations**:
- DNS record management (A, CNAME, TXT)
- Domain verification for email/SSL
- VPS server management

**Agent rule**: Any DNS change requires 5-minute propagation wait + verification before marking done.

---

## GitHub (Source + CI)

**Repo**: `executiveusa/vallarta-voyage-explorer`  
**Workflow triggers**: See `.github/workflows/auto-designer.yml`  
**Branch strategy**:
- `main` → production
- `feature/*` → auto-preview deploy + design audit
- `redesign*` → triggers full AUTO-DESIGNER™ pipeline

**Required secrets in GitHub repo settings**:
- `VERCEL_TOKEN`
- `VERCEL_PROJECT_ID`
- `VERCEL_TEAM_ID` (if using Vercel team)
- `COOLIFY_API_KEY`
- `COOLIFY_SERVICE_UUID`
- `COOLIFY_URL`

---

## Credential Rotation Protocol

If any credential is suspected compromised:

1. HALT all agents immediately (LOOP_GUARD + SECRET_GUARD)
2. Rotate via service dashboard
3. Update vault (NOT this file)
4. Update GitHub repo secrets
5. Update Vercel environment variables
6. Restart affected services on Coolify
7. Run `scripts/validate-setup.sh` to confirm connectivity
8. Document incident in `ops/reports/security-rotation-{date}.md`
