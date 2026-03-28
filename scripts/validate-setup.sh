#!/usr/bin/env bash
# validate-setup.sh — Binary pass/fail validation of full ZTE + AUTO-DESIGNER setup
# Exit 0 = PASS (all required files present, env vars detectable)
# Exit 1 = FAIL (critical missing items)
# Usage: bash scripts/validate-setup.sh

set -euo pipefail

FAIL=0

fail() { echo "  ❌ FAIL: $1"; FAIL=$((FAIL+1)); }
pass() { echo "  ✅ PASS: $1"; }

echo ""
echo "ZTE + AUTO-DESIGNER Setup Validation"
echo "====================================="
echo ""

# --- Required .claude/ files ---
echo "[ .claude/ Agent System Files ]"
for f in \
  ".claude/README.md" \
  ".claude/SKILL.md" \
  ".claude/AGENTS.md" \
  ".claude/ZTE_PROTOCOL.md" \
  ".claude/DESIGN_AUDIT.md" \
  ".claude/INFRASTRUCTURE.md" \
  ".claude/design-system.json"; do
  if [ -f "$f" ]; then
    pass "$f"
  else
    fail "$f (missing)"
  fi
done

# --- Required .github/ files ---
echo ""
echo "[ .github/ Design System Files ]"
for f in \
  ".github/AUTO_DESIGNER_CONFIG.md" \
  ".github/workflows/auto-designer.yml"; do
  if [ -f "$f" ]; then
    pass "$f"
  else
    fail "$f (missing)"
  fi
done

# --- ops/ directory ---
echo ""
echo "[ ops/ Reports Infrastructure ]"
for f in \
  "ops/templates/zte-completion.json"; do
  if [ -f "$f" ]; then
    pass "$f"
  else
    fail "$f (missing)"
  fi
done
if [ -d "ops/reports/plans" ]; then
  pass "ops/reports/plans/ directory"
else
  fail "ops/reports/plans/ directory (missing — run: mkdir -p ops/reports/plans)"
fi

# --- Root agent files ---
echo ""
echo "[ Root Agent Config Files ]"
for f in \
  "AGENTS.md" \
  "CLAUDE.md"; do
  if [ -f "$f" ]; then
    # Verify they reference .claude/ (ZTE upgraded)
    if grep -q "\.claude/" "$f" 2>/dev/null; then
      pass "$f (ZTE-upgraded)"
    else
      fail "$f (exists but NOT ZTE-upgraded — still contains only byterover-mcp)"
    fi
  else
    fail "$f (missing)"
  fi
done

# --- .env.example ---
echo ""
echo "[ Environment Configuration ]"
if [ -f ".env.example" ]; then
  for var in VITE_SUPABASE_URL VITE_SUPABASE_ANON_KEY VERCEL_TOKEN COOLIFY_API_KEY HOSTINGER_API_TOKEN; do
    if grep -q "^${var}" .env.example 2>/dev/null; then
      pass ".env.example has $var"
    else
      fail ".env.example missing $var entry"
    fi
  done
else
  fail ".env.example (not found)"
fi

# --- Node / npm ---
echo ""
echo "[ Runtime Requirements ]"
if command -v node &>/dev/null; then
  NODE_VER=$(node --version)
  pass "Node.js $NODE_VER"
else
  fail "Node.js not installed"
fi
if command -v npm &>/dev/null; then
  pass "npm $(npm --version)"
else
  fail "npm not installed"
fi

# --- package.json sanity ---
if [ -f "package.json" ]; then
  pass "package.json present"
  if [ -d "node_modules" ]; then
    pass "node_modules installed"
  else
    fail "node_modules missing — run: npm install"
  fi
else
  fail "package.json missing"
fi

# --- Summary ---
echo ""
echo "====================================="
if [ $FAIL -gt 0 ]; then
  echo "❌ VALIDATION FAILED — $FAIL issue(s) require attention"
  echo ""
  echo "Re-run after fixing: bash scripts/validate-setup.sh"
  exit 1
else
  echo "✅ VALIDATION PASSED — Setup complete. ZTE Protocol active."
  exit 0
fi
