#!/usr/bin/env bash
# activate-skills.sh — Verify all 10 skills are accessible
# Run before starting any development session
# Usage: bash scripts/activate-skills.sh

set -euo pipefail

PASS=0
FAIL=0
WARNINGS=0

pass() { echo "  ✅ $1"; PASS=$((PASS+1)); }
fail() { echo "  ❌ $1"; FAIL=$((FAIL+1)); }
warn() { echo "  ⚠️  $1"; WARNINGS=$((WARNINGS+1)); }

echo ""
echo "AUTO-DESIGNER™ Skill Activation Check"
echo "======================================"
echo ""

# Skill 1: jcodemunch
echo "Skill 1: jcodemunch (AST token savings)"
if command -v node &>/dev/null && [ -d "$HOME/jcodemunch-mcp" ]; then
  pass "jcodemunch-mcp directory found at $HOME/jcodemunch-mcp"
elif [ -d "../jcodemunch-mcp" ]; then
  pass "jcodemunch-mcp found at ../jcodemunch-mcp"
else
  warn "jcodemunch-mcp not found locally. Clone: git clone https://github.com/gunta/jcodemunch-mcp ~/jcodemunch-mcp"
fi

# Skill 2: Ralphy (Loop protocol)
echo ""
echo "Skill 2: Ralphy (Ask→Plan→Execute→Observe→Iterate)"
if [ -f "$HOME/ralphy/CLAUDE.md" ] || [ -f "../ralphy/CLAUDE.md" ]; then
  pass "Ralphy CLAUDE.md found"
else
  warn "Ralphy not found locally. Clone: git clone https://github.com/thevibeworks/ralphy ~/ralphy"
fi

# Skill 3: ZTE Protocol
echo ""
echo "Skill 3: ZTE Auto-Deploy Protocol"
if [ -f ".claude/ZTE_PROTOCOL.md" ]; then
  pass ".claude/ZTE_PROTOCOL.md present"
else
  fail ".claude/ZTE_PROTOCOL.md missing — run setup first"
fi

# Skill 4: AUTO-DESIGNER
echo ""
echo "Skill 4: AUTO-DESIGNER™"
if [ -f ".github/AUTO_DESIGNER_CONFIG.md" ]; then
  pass ".github/AUTO_DESIGNER_CONFIG.md present"
else
  fail ".github/AUTO_DESIGNER_CONFIG.md missing"
fi
if [ -f ".claude/DESIGN_AUDIT.md" ]; then
  pass ".claude/DESIGN_AUDIT.md present"
else
  fail ".claude/DESIGN_AUDIT.md missing"
fi
if [ -f ".claude/design-system.json" ]; then
  pass ".claude/design-system.json present"
else
  fail ".claude/design-system.json missing"
fi

# Skill 5: Taste-Skill + Uncodixfy
echo ""
echo "Skill 5: Taste-Skill + Uncodixfy"
if [ -f ".github/AUTO_DESIGNER_CONFIG.md" ]; then
  pass "Taste-Skill embedded in AUTO_DESIGNER_CONFIG.md"
else
  warn "Taste-Skill config not found"
fi

# Skill 6: Supabase MCP
echo ""
echo "Skill 6: Supabase MCP"
if [ -n "${SUPABASE_URL:-}" ] && [ -n "${SUPABASE_ANON_KEY:-}" ]; then
  pass "SUPABASE_URL and SUPABASE_ANON_KEY are set"
elif [ -f ".env" ] && grep -q "SUPABASE_URL" .env; then
  pass "SUPABASE_URL found in .env"
else
  warn "Supabase env vars not set. Copy .env.example to .env and fill in values."
fi

# Skill 7: Hostinger API
echo ""
echo "Skill 7: Hostinger API"
if [ -n "${HOSTINGER_API_TOKEN:-}" ]; then
  pass "HOSTINGER_API_TOKEN is set (from vault)"
elif [ -f ".env" ] && grep -q "HOSTINGER_API_TOKEN" .env; then
  HOSTINGER_VAL=$(grep "HOSTINGER_API_TOKEN" .env | cut -d'=' -f2)
  if [ -n "$HOSTINGER_VAL" ] && [ "$HOSTINGER_VAL" != '""' ] && [ "$HOSTINGER_VAL" != "''" ]; then
    pass "HOSTINGER_API_TOKEN found in .env"
  else
    warn "HOSTINGER_API_TOKEN is empty in .env. Load from vault."
  fi
else
  warn "HOSTINGER_API_TOKEN not set. Load from vault, never hard-code."
fi

# Skill 8: Vercel Plugin
echo ""
echo "Skill 8: Vercel Plugin"
if command -v vercel &>/dev/null; then
  VERCEL_VERSION=$(vercel --version 2>/dev/null | head -1)
  pass "Vercel CLI installed: $VERCEL_VERSION"
else
  warn "Vercel CLI not installed. Run: npm install -g vercel"
fi
if [ -n "${VERCEL_TOKEN:-}" ]; then
  pass "VERCEL_TOKEN is set"
else
  warn "VERCEL_TOKEN not set in environment"
fi

# Skill 9: E2E Testing (Playwright)
echo ""
echo "Skill 9: E2E Testing (Playwright)"
if npx playwright --version &>/dev/null 2>&1; then
  pass "Playwright available via npx"
elif [ -f "playwright.config.ts" ] || [ -f "playwright.config.js" ]; then
  pass "Playwright config found (browsers may need install)"
else
  warn "No Playwright setup found. Run: npx playwright install"
fi

# Skill 10: SYNTHIA (embedded in AUTO_DESIGNER_CONFIG.md)
echo ""
echo "Skill 10: SYNTHIA™"
if [ -f ".github/AUTO_DESIGNER_CONFIG.md" ] && grep -q "SYNTHIA" .github/AUTO_DESIGNER_CONFIG.md; then
  pass "SYNTHIA™ embedded in AUTO_DESIGNER_CONFIG.md (Part 2)"
else
  warn "SYNTHIA not detected in config"
fi

# Summary
echo ""
echo "======================================"
echo "Skill Activation Summary"
echo "======================================"
echo "  Passed:   $PASS"
echo "  Warnings: $WARNINGS"
echo "  Failed:   $FAIL"
echo ""

if [ $FAIL -gt 0 ]; then
  echo "❌ $FAIL critical items need attention before starting work."
  echo "   See FAILED items above."
  exit 1
elif [ $WARNINGS -gt 0 ]; then
  echo "⚠️  $WARNINGS warnings. Skills may be partially available."
  echo "   Proceed with caution."
  exit 0
else
  echo "✅ All skills active. ZTE Protocol ready."
  exit 0
fi
