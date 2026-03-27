# DESIGN AUDIT — 14-Axis UDEC Framework
## Vallarta Voyage Explorer | AUTO-DESIGNER™ v1.0 Gate

**Floor**: 8.5 / 10.0  
**Critical Gates Minimum**: 8.0 on Clarity, Accessibility, Error Recovery  
**Authority**: AUTO-DESIGNER™ + Taste-Skill v3.1 + Pauli-Uncodixfy™  
**Enforcement**: BLOCK merge if any component scores < 8.5 overall or < 8.0 on critical gates

---

## Scoring Formula

```
Total Score = Σ (axis_score × axis_weight)
Pass condition: Total ≥ 8.5 AND all critical gates ≥ 8.0
```

---

## 14 Axes

| # | Axis | Weight | Scoring Criterion | Critical Gate |
|---|------|--------|-------------------|---------------|
| 1 | **Clarity** | 12% | User finds primary action in < 1 second. One clear CTA per viewport. No competing focal points. | ✅ YES |
| 2 | **Affordance** | 10% | Buttons look clickable. Forms look like forms. Links underlined or clearly styled. Interactive elements 44px+ touch targets. | |
| 3 | **Density** | 8% | Every element earns its space. No decoration added for aesthetics. No redundant copy. | |
| 4 | **Consistency** | 10% | Same interactions behave identically across all components. Colors follow design-system.json. Typography uses approved fonts only. | |
| 5 | **Error Recovery** | 9% | User can undo. Empty states designed. Form errors are inline and actionable. Fallback content for failed network requests. | ✅ YES |
| 6 | **Motion Purpose** | 7% | Every animation communicates state change or guides attention. Zero decorative-only animations. No `window.addEventListener('scroll')`. | |
| 7 | **Accessibility** | 8% | WCAG AA contrast (4.5:1 text, 3:1 UI). Keyboard nav functional. All images have alt text. Semantic HTML (`nav`, `main`, `section`, `article`). No auto-playing media. | ✅ YES |
| 8 | **Latency** | 6% | TTI < 2.5s on 4G. FCP < 1.8s. Images lazy-loaded with `loading="lazy"`. No render-blocking resources. | |
| 9 | **Mobile** | 7% | 44px minimum touch targets. No horizontal scroll. `font-size` ≥ 16px on inputs (prevents iOS zoom). `min-h-[100dvh]` not `h-screen`. | |
| 10 | **Hierarchy** | 9% | Visual weight aligns with informational importance. H1 largest, CTAs prominent, secondary actions visually subordinate. | |
| 11 | **Brand Coherence** | 6% | ≤ 5 colors from design-system.json. ≤ 2 fonts (Geist + Geist Mono). Consistent border-radius across component types. | |
| 12 | **Copywriting** | 4% | P.A.S.S.™ applied (Problem, Agitate, Solve, Specifics). Scannable (headings, bullets). CTA text specific ("Explore Tours" not "Get Started"). No jargon. | |
| 13 | **Edge Cases** | 5% | Empty states designed (no bookings, no results, no hotels). Long content handled. Overflow doesn't break layout. Loading states present. | |
| 14 | **Systems Thinking** | 9% | Stocks/flows/feedback loops documented in component comments. Scales from 1 to 1M users. Agent scope non-duplicative. | |

---

## Scoring Guide Per Axis

| Score | Meaning |
|-------|---------|
| 9.0-10.0 | Exceptional. Reference-quality implementation. |
| 8.5-8.9 | Passes. Ships to production. |
| 8.0-8.4 | Marginal pass for non-critical axes. Critical gates must be ≥ 8.0. |
| 7.0-7.9 | Fails. Identify the specific deficiency, propose fix, re-score. |
| < 7.0 | Significant rework needed. File GitHub issue before proceeding. |

---

## Audit Protocol

### Step 1 — Component Inventory
List all UI components to be audited:
- [ ] Navbar
- [ ] HeroSection
- [ ] ToursSection  
- [ ] BookingSection
- [ ] Footer
- [ ] Chatbot
- [ ] Directory cards
- [ ] Auth forms
- [ ] Admin panel
- [ ] Sunset spot pages

### Step 2 — Score Each Component
For each component, score all 14 axes. Compute weighted total.

```json
{
  "component": "HeroSection",
  "scores": {
    "clarity": 9.0,
    "affordance": 8.5,
    "density": 9.0,
    "consistency": 8.5,
    "error_recovery": 8.0,
    "motion_purpose": 8.5,
    "accessibility": 9.0,
    "latency": 8.5,
    "mobile": 9.0,
    "hierarchy": 9.0,
    "brand_coherence": 9.0,
    "copywriting": 8.5,
    "edge_cases": 8.0,
    "systems_thinking": 8.5
  },
  "weighted_total": 8.75,
  "status": "PASS",
  "critical_gates": {
    "clarity": "PASS (9.0 ≥ 8.0)",
    "accessibility": "PASS (9.0 ≥ 8.0)",
    "error_recovery": "PASS (8.0 ≥ 8.0)"
  }
}
```

### Step 3 — System-Level Score
Average all component scores (weighted by page prominence).

### Step 4 — Gate Check
- If system score ≥ 8.5 AND all critical gates ≥ 8.0 → **PASS → ship**
- If any critical gate < 8.0 → **BLOCK → fix critical gate first**
- If system score < 8.5 → **BLOCK → identify lowest-scoring axis, fix, re-score**

### Step 5 — Certificate
On pass, generate: `ops/reports/emerald-cert-{bead_id}.md`

---

## Banned Patterns (Automatic Fail)

These patterns cause automatic 0/10 on the affected axis regardless of other scores.
Presence of any banned pattern BLOCKS shipment until fixed.

| Banned Pattern | Fails Axis |
|----------------|-----------|
| Lila font | Brand Coherence |
| Centered-everything layout | Hierarchy |
| 3-equal-card row as primary feature layout | Visual Density |
| Ghost button as primary CTA | Affordance |
| Auto-playing video/audio without user activation | Accessibility |
| `window.addEventListener('scroll')` for animations | Motion Purpose |
| Placeholder text used as form label | Accessibility |
| Secrets in code or logs | Systems Thinking |
| Any `// TODO` or stub in shipped component | Error Recovery |
| `h-screen` (use `min-h-[100dvh]` instead) | Mobile |

---

## Emerald Tablets™ Certification Template

Save completed audit as `ops/reports/emerald-cert-{bead_id}.md`:

```markdown
# Emerald Tablets™ Design Certification

**Bead ID**: ZTE-YYYYMMDD-NNNN  
**Date**: YYYY-MM-DD  
**Project**: Vallarta Voyage Explorer  
**Status**: ✅ CERTIFIED — PRODUCTION READY

## System Score: X.X / 10.0 (Floor: 8.5)

## Critical Gates
- Clarity: X.X ✅
- Accessibility: X.X ✅  
- Error Recovery: X.X ✅

## Component Scores
| Component | Score | Status |
|-----------|-------|--------|
| HeroSection | X.X | ✅ PASS |
| ...

## Violations Found & Resolved
- [List any violations that were fixed before certification]

## Certifier
ZTE Execution Agent | Zero-Touch Engineer Protocol v2.0
```
