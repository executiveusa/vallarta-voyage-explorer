#!/usr/bin/env bash
# infra-setup.sh — Infrastructure credential loader template
# 
# ⚠️  DO NOT commit with real credentials.
# ⚠️  This script is a TEMPLATE. Fill in from vault, never inline.
# ⚠️  This script only exports to current shell session — it does NOT write files.
#
# Usage: source scripts/infra-setup.sh
# (NOTE: must be sourced, not executed, for exports to persist in current shell)

set -euo pipefail

echo ""
echo "Infrastructure Setup — Vault-Based Credential Loader"
echo "====================================================="
echo "⚠️  Load credentials from your vault (1Password, Bitwarden, etc.)"
echo "    NEVER hard-code tokens in this file."
echo ""

# --- Supabase ---
echo "[ Supabase ]"
# Load from vault:
# export SUPABASE_URL=$(op read "op://vault/Supabase/url")
# export SUPABASE_ANON_KEY=$(op read "op://vault/Supabase/anon_key")
# export SUPABASE_SERVICE_ROLE_KEY=$(op read "op://vault/Supabase/service_role_key")

if [ -z "${SUPABASE_URL:-}" ]; then
  echo "  ⚠️  SUPABASE_URL not set"
else
  echo "  ✅ SUPABASE_URL set"
fi
if [ -z "${SUPABASE_ANON_KEY:-}" ]; then
  echo "  ⚠️  SUPABASE_ANON_KEY not set"
else
  echo "  ✅ SUPABASE_ANON_KEY set"
fi

# --- Vercel ---
echo ""
echo "[ Vercel ]"
# Load from vault:
# export VERCEL_TOKEN=$(op read "op://vault/Vercel/token")
# export VERCEL_PROJECT_ID=$(op read "op://vault/Vercel/project_id")
# export VERCEL_TEAM_ID=$(op read "op://vault/Vercel/team_id")

if [ -z "${VERCEL_TOKEN:-}" ]; then
  echo "  ⚠️  VERCEL_TOKEN not set"
else
  echo "  ✅ VERCEL_TOKEN set"
fi

# --- Coolify ---
echo ""
echo "[ Coolify (31.220.58.212) ]"
# Load from vault:
# export COOLIFY_URL=$(op read "op://vault/Coolify/url")
# export COOLIFY_API_KEY=$(op read "op://vault/Coolify/api_key")
# export COOLIFY_SERVICE_UUID=$(op read "op://vault/Coolify/service_uuid")

if [ -z "${COOLIFY_API_KEY:-}" ]; then
  echo "  ⚠️  COOLIFY_API_KEY not set"
else
  echo "  ✅ COOLIFY_API_KEY set"
fi

# --- Hostinger ---
echo ""
echo "[ Hostinger API ]"
# Load from vault:
# export HOSTINGER_API_TOKEN=$(op read "op://vault/Hostinger/api_token")

if [ -z "${HOSTINGER_API_TOKEN:-}" ]; then
  echo "  ⚠️  HOSTINGER_API_TOKEN not set"
else
  echo "  ✅ HOSTINGER_API_TOKEN set"
fi

# --- GitHub ---
echo ""
echo "[ GitHub ]"
# Load from vault:
# export GH_PAT=$(op read "op://vault/GitHub/pat")

if [ -z "${GH_PAT:-}" ]; then
  echo "  ⚠️  GH_PAT not set"
else
  echo "  ✅ GH_PAT set"
fi

# --- Summary ---
echo ""
echo "====================================================="
echo "Load from vault when ready:"
echo "  1Password: eval \$(op signin); source scripts/infra-setup.sh"
echo "  Manual: export VARNAME=value (for testing only — not permanent)"
echo "  Production: Use GitHub Secrets + Coolify env vars"
echo ""
