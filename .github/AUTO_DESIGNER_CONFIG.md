# AUTO-DESIGNER™ v1.0 — Mandatory Design System
## Vallarta Voyage Explorer | Kupuri Media™ Design Law

> **Status**: MANDATORY. Every agent touching frontend UI must read this file before writing a single line.  
> **Authority**: Supersedes any other style guide, component library default, or "quick fix" shortcut.

---

## PART 0 — REPO SCANNER (Pre-Work)

Before redesigning anything, perform a full repo audit:

```
1. Run jcodemunch on src/ to index all components
2. Catalog existing: colors, fonts, spacing, border-radius values, animation patterns
3. Identify "hero-pattern offenders": centered layouts, pill overload, gradient abuse
4. Identify "substance violations": placeholder-as-label, ghost primary CTAs, lorem ipsum
5. Score current state against 14-axis UDEC (see Part 7)
6. Document baseline in ops/reports/plans/{bead_id}.md
7. Only then plan specific changes — never redesign blind
```

**Vallarta project baseline baseline findings (documented)**:
- Brand colors: ocean (#0ea5e9), sand (#eab308), jungle (#22c55e), sunset (#f97316)
- Existing font: system default → migrate to Geist
- Pages: Index, Auth, Directory, Sunsets, SunsetSpotDetail, Agents, ClaimListing, Admin, NotFound
- Key components: HeroSection, ToursSection, BookingSection, Footer, Chatbot

---

## PART 1 — EMERALD TABLETS™ (Commandments)

These are design laws. They have no exceptions.

### Tablet I — Identity
The site has a visual fingerprint. Every new component must be recognizable as this site, not a generic template.

### Tablet II — Hierarchy
One dominant element per view. The eye must have a single destination. When everything is bold, nothing is.

### Tablet III — Substance Over Decoration
No gradient exists that doesn't carry information. No animation exists that doesn't aid comprehension. Decorations must earn their pixels.

### Tablet IV — Asymmetry
Grid perfection is the enemy of visual interest. Use deliberate asymmetry: offset grids, varied card heights, ragged right edges that cascade into structure.

### Tablet V — Motion Contract
Animations describe system state, not personality. Enter: elements come from their origin direction. Exit: elements return to origin. Duration: 150-400ms. No bounce, no spring, no wiggle unless the bounce IS the product.

### Tablet VI — Density Discipline
Information density is calibrated. Dashboard contexts carry more density than marketing pages. Never use padding to hide emptiness — add content or remove the section.

### Tablet VII — The One CTA Law
On any primary view, there is exactly one dominant action. All others are secondary (lower visual weight, smaller, muted). The user should never ask "where do I click?"

### Tablet VIII — Honesty
Forms label all fields. Buttons describe their action, not their CSS class. Error messages say what went wrong and how to fix it. Placeholder text is an example, not a label.

### Tablet IX — Accessibility Is Not Optional
WCAG AA is a floor, not a goal. Color contrast ≥ 4.5:1 for text. Focus states are visible. Interactive elements are keyboard-navigable. Screen reader text exists for all icons.

### Tablet X — The Lila Law
Lila is banned. Use Geist. If Geist is unavailable, use Inter. If Inter is unavailable, use system-ui. Do not introduce third typefaces without UDEC audit approval.

---

## PART 2 — SYNTHIA™ v4.0 (Context-Aware Design Intelligence)

SYNTHIA is the decision layer. Before choosing a design pattern, answer:

### SYNTHIA Query Protocol

```
Q1: Who uses this component, and under what conditions?
    → Persona: tourist planning trip / local discovering sunset spots / admin managing listings
    → Condition: mobile (80% likely), outdoor (direct sunlight), unfamiliar with app

Q2: What is the ONE job this component must do?
    → Avoid multi-purpose components. If it does two jobs, split it.

Q3: What happens when the data is empty / loading / errored?
    → Design all three states before implementing any of them.

Q4: What does this component look like in 6 months when it has 10x the data?
    → Design for scale from day one. No hard-coded heights. Use clamp() for typography.

Q5: Is this component solving a problem or performing design theater?
    → If you can't articulate the user's job-to-be-done, don't build it.
```

### SYNTHIA Output Contract
Every component proposal must include:
- Component purpose in one sentence
- Target persona(s)
- All three data states (empty, loading, populated)
- Mobile-first breakpoint plan
- UDEC predicted score (pre-build estimate)

---

## PART 3 — TASTE-SKILL v3.1 (Design Aesthetic Dial System)

Three dials control aesthetic output for this project:

| Dial | Setting | Scale | Effect |
|------|---------|-------|--------|
| `DESIGN_VARIANCE` | 6 | 1-10 | Layouts feel intentional and creative but never chaotic |
| `MOTION_INTENSITY` | 5 | 1-10 | Smooth, purposeful transitions; no bounce/spring |
| `VISUAL_DENSITY` | 5 | 1-10 | Balanced — dense enough to feel substantive, airy enough for leisure browsing |

**Dial interpretation guide**:

```
DESIGN_VARIANCE:
  1-3 = Corporate safe (Bootstrap vibes)
  4-6 = Modern intentional (Linear, Stripe)
  7-9 = Editorial bold (Are.na, Cosmos)
  10  = Experimental (art portfolio territory)

MOTION_INTENSITY:
  1-3 = Barely there (opacity + tiny translate)
  4-6 = Smooth and purposeful (300ms ease-out entry)
  7-9 = Cinematic (stagger, scroll-driven)
  10  = Game-like (continuous ambient motion)

VISUAL_DENSITY:
  1-3 = Ultra-minimal (breathing room, few elements)
  4-6 = Balanced content + whitespace
  7-9 = Dashboard-level (lots on screen)
  10  = Information overload (use only for data tools)
```

**Vallarta context override**: 
- Hero pages lean toward VARIANCE=7 (travel is aspirational)
- Booking/admin pages lean toward DENSITY=6 (utilitarian efficiency)
- Sunset spot galleries lean toward MOTION=6 (cinematic feel earns it)

---

## PART 4 — PAULI-UNCODIXFY™ (Anti-AI-UI Enforcement)

These patterns are not suggestions. They are automatic UDEC failures.

### BANNED PATTERNS (Auto-Fail UDEC Axis)

| Pattern | Why It Fails | What to Do Instead |
|---------|-------------|-------------------|
| Glassmorphism | Low contrast, trend artifact | Solid fills with subtle shadow |
| Pill overload | Everything rounded looks like a UI kit | Use 6-12px radius for cards, 6px for buttons |
| Gradient hero backgrounds | Generic, dated, low contrast on text | Use brand photo + subtle overlay OR solid with typography |
| Centered every-thing | No visual hierarchy | Left-aligned text, right-aligned visuals, deliberate grid |
| Eyebrow labels everywhere | "DISCOVER THE BEST" over every heading | Eyebrows once per page MAX, at primary section only |
| Ghost buttons as primary CTA | Invisible on dark backgrounds | Solid fill for primary, outline/text for secondary |
| Stock photo grids (3-col uniform) | Template energy | Masonry, varied aspect ratios, overlapping elements |
| Floating chatbot bubble (bottom-right) | Expected; invisible | Contextual inline prompt or edge-docked with label |
| Pure white background | Too stark, no depth | Use `#FAFAF9` or `oklch(98% 0.002 80)` |
| Color overload (>3 brand colors prominent) | Visual noise | Ocean as primary, sand as accent, jungle as positive signal |

### APPROVED PATTERNS

| Pattern | Usage |
|---------|-------|
| Asymmetric hero splits | 60/40 text/image, text left-aligned |
| Kinetic typography on scroll | Parallax word reveals, max MOTION=7 |
| Staggered card entry | 40-60ms stagger, translateY(16px)→0 |
| Color-field backgrounds | Full-bleed ocean or jungle for sections breaking monotony |
| Large editorial numerals | Section numbers, countdown, statistics as 120px+ display type |
| Sticky navigation with blur | `backdrop-blur-sm` + solid fallback for unsupported browsers |
| Micro-interaction buttons | Scale(0.97) on press, scale(1.02) on hover |
| Inline form validation | Real-time (debounced 400ms), green border on valid |

---

## PART 5 — FULL-OUTPUT LAW (Every Component Ships Complete)

When building any component, the following are non-negotiable before marking done:

### Required in Every Component
- [ ] Loading state (skeleton or spinner with timeout guard)
- [ ] Empty state (helpful message + action, not blank space)
- [ ] Error state (human-readable message + retry mechanism)
- [ ] Mobile layout (320px minimum width, tested)
- [ ] Dark mode consideration (if site supports dark mode)
- [ ] Focus ring on all interactive elements
- [ ] `aria-label` or visible label for all interactive elements
- [ ] Keyboard navigation (tab order logical)
- [ ] Touch target size ≥ 44×44px on mobile
- [ ] No `console.log` statements in committed code

### Typography Spec
```css
/* Vallarta Design System Typography */
--font-display: 'Geist', system-ui, sans-serif;
--font-body: 'Geist', system-ui, sans-serif;
--font-mono: 'Geist Mono', 'Fira Code', monospace;

/* Scale */
--text-hero: clamp(2.5rem, 5vw + 1rem, 5rem);     /* 40-80px */
--text-h1: clamp(2rem, 4vw + 0.5rem, 3.5rem);      /* 32-56px */
--text-h2: clamp(1.5rem, 3vw + 0.5rem, 2.5rem);    /* 24-40px */
--text-h3: clamp(1.25rem, 2vw + 0.25rem, 1.75rem); /* 20-28px */
--text-body: 1rem;    /* 16px */
--text-small: 0.875rem; /* 14px */
--text-xs: 0.75rem;     /* 12px */

/* Not permitted: clamp() below 16px for body text on mobile */
```

### Color Application Rule
```
ocean: primary action, links, selected states, hero accents
sand: warnings, attention, highlights, badge backgrounds
jungle: success states, positive indicators, "open/available" status
sunset: urgency, countdown timers, "limited" indicators, hot deals
```

---

## PART 6 — ZTE INTEGRATION (Pipeline Hookup)

### Stage 1: Component Spec (SYNTHIA)
Before writing code: fill out SYNTHIA Query Protocol (Part 2). Document in PR description.

### Stage 2: Token-Efficient Coding (jcodemunch)
Use jcodemunch to read existing components before writing new ones. Never recreate patterns that already exist.

### Stage 3: Build with Dials Active
Reference TASTE-SKILL dials (Part 3). Every aesthetic decision should be traceable to a dial setting.

### Stage 4: Self-Audit (Uncodixfy)
Before submitting PR, scan against BANNED PATTERNS list (Part 4). Remove any found violations.

### Stage 5: UDEC Audit (Full)
Run 14-axis UDEC audit (see `.claude/DESIGN_AUDIT.md`). Score must be ≥ 8.5.  
If score <8.5, list every blocking axis violation and fix code before PR.

### Stage 6: Ship
Merge. Deploy to Vercel. Run Lighthouse post-deploy.

---

## PART 7 — UDEC AUDIT REFERENCE

See `.claude/DESIGN_AUDIT.md` for full 14-axis scoring framework.

Quick reference — axis weights:

| Axis | Weight | Hard Floor |
|------|--------|-----------|
| Clarity | 12% | 8.0 |
| Consistency | 10% | — |
| Affordance | 10% | — |
| Systems Thinking | 9% | — |
| Error Recovery | 9% | 8.0 |
| Hierarchy | 9% | — |
| Density | 8% | — |
| Accessibility | 8% | 8.0 |
| Mobile | 7% | — |
| Motion | 7% | — |
| Latency | 6% | — |
| Brand | 6% | — |
| Edge Cases | 5% | — |
| Copy | 4% | — |

**Minimum ship threshold**: Weighted average ≥ 8.5/10  
**Hard floors** (Clarity, Error Recovery, Accessibility): Must each be ≥ 8.0 regardless of weighted average

---

## PART 8 — EXECUTION LOOP

```
For each redesign task:

  1. SCAN: jcodemunch index → catalog existing patterns
  2. AUDIT: score current UDEC baseline
  3. SPECIFY: SYNTHIA protocol → document component job
  4. DIAL: set DESIGN_VARIANCE, MOTION_INTENSITY, VISUAL_DENSITY
  5. BUILD: implement with Full-Output Law checklist
  6. UNCODIXFY: scan for banned patterns → remove
  7. AUDIT: final UDEC score ≥ 8.5?
     → YES: emit Emerald Tablets™ cert → ship
     → NO: identify lowest-scoring axis → fix → go to step 6
  8. CERT: write ops/reports/emerald-cert-{bead_id}.md
  9. DEPLOY: Vercel + Lighthouse gates
```

---

## VALLARTA-SPECIFIC DESIGN OVERRIDES

```json
{
  "project": "vallarta-voyage-explorer",
  "dials": {
    "DESIGN_VARIANCE": 6,
    "MOTION_INTENSITY": 5,
    "VISUAL_DENSITY": 5
  },
  "brand_colors": {
    "primary": "ocean",
    "accent": "sand",
    "positive": "jungle",
    "urgent": "sunset"
  },
  "font": "Geist",
  "border_radius": {
    "card": "12px",
    "button": "8px",
    "badge": "6px",
    "avatar": "50%"
  },
  "hero_pattern": "left-aligned-split",
  "cta_count_per_hero": 1,
  "vercel_project_id": "prj_YOUR_ID_HERE",
  "udec_floor": 8.5,
  "emerald_cert_path": "ops/reports/emerald-cert-{bead_id}.md"
}
```
