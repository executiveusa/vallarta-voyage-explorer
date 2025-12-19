# Landing Page Blueprint (Scorecard / Assessment Style)

**Purpose**: This document is an **internal template** for AI agents (Claude, GPT, etc.) to generate consistent, high-converting landing pages based on the ScoreApp assessment model. It is NOT user-facing content.

**Context**: Every quiz, contest, or lead-gen funnel should follow this structure to ensure:
- Consistent user experience
- High completion rates (70%+ goal)
- Quality lead data capture
- A/B test comparability

---

## 1. Metadata (Frontmatter)

Every landing page variant should start with YAML frontmatter defining:

```yaml
---
page_slug: "sunset-evening-quiz"          # URL-friendly identifier
variant: "A"                              # A, B, C, etc. for A/B testing
target_audience: "luxury_traveler"        # luxury_traveler | hotel_gm | event_planner | influencer
primary_hook_type: "result"              # "frustration" | "result"
primary_goal: "capture_visitor_leads"    # capture_visitor_leads | capture_hotel_leads | contest_entry
conversion_tracking_id: "quiz_evening_v1" # For analytics
---
```

**Rules**:
- `page_slug` must be unique per variant
- `variant` determines which A/B test bucket this page belongs to
- `target_audience` shapes tone, imagery, and recommended outcomes
- `primary_hook_type` dictates headline style (see section 2)
- `primary_goal` determines CTA language and results page behavior

---

## 2. Hero Section

### Pattern: Hook + Value Prop + CTA

The hero must grab attention in 3 seconds or less. Use ONE of two hook types:

#### Hook Type A: Frustration-Based
**When to use**: Target audience is struggling with pain points (bad experiences, wasted time/money, confusion).

**Formula**:
> "Tired of [PAIN POINT] that [NEGATIVE OUTCOME]?"

**Examples**:
- "Tired of wandering into tourist-trap restaurants that feel the same in every city?"
- "Exhausted from planning trips that turn into logistical nightmares?"
- "Sick of sunsets that look amazing in person but mediocre in photos?"

**Tone**: Empathetic, validating, "I get it"

#### Hook Type B: Result-Based
**When to use**: Target audience is aspirational, seeking transformation or peak experiences.

**Formula**:
> "Ready for [DREAM OUTCOME] you'll [POSITIVE EMOTION] for [TIME FRAME]?"

**Examples**:
- "Ready for a Vallarta evening you'll talk about for years?"
- "Discover the perfect sunset moment that captures your story."
- "Unlock the luxury nightlife experience you deserve."

**Tone**: Confident, exciting, "You can have this"

---

### Subheadline

**Purpose**: Bridge the hook to the quiz mechanism. Explain the "what" and "why" concisely.

**Pattern**:
> "Answer [X] quick questions to find out [WHY CURRENT STATE EXISTS] and get a tailored plan for [DESIRED OUTCOME]."

**Examples**:
- "Answer 15 quick questions to discover why your evenings feel ordinary — and get a custom plan for unforgettable Vallarta nights."
- "Take this 3-minute quiz to identify your ideal sunset vibe and unlock hidden spots only locals know."
- "Find out which luxury venues match your style in under 5 minutes."

**Length**: 20-30 words max

---

### Primary CTA

**Button Label**:
- Frustration hook → "Fix This Now" | "Get My Custom Plan" | "Stop Wasting Time"
- Result hook → "Start the Quiz" | "Discover My Perfect Night" | "Unlock My Results"

**Subcopy** (below button, optional):
> "Completely free. Instant recommendations. No credit card required."

**Styling**:
- Large, high-contrast button (gradient background for premium feel)
- Hover: scale(1.05) + glow effect
- Mobile: full-width, sticky at bottom if user scrolls past hero

---

## 3. Value Proposition (3 Pillars)

**Purpose**: Build credibility and set expectations. Explain what the quiz measures and why it matters.

**Pattern**:
> "Take this quiz so we can measure and improve three key areas:"

**Three Pillars** (customize per audience):

### Example: Luxury Traveler (Evening Quiz)
1. **Your Sunset Timing & Planning**
   - When you arrive, how much time you have, and what phase of the day matters most to you
2. **Your Nightlife Preferences & Comfort Zone**
   - Whether you prefer intimate rooftops, lively clubs, or cultural experiences
3. **Your Budget-to-Experience Match**
   - Ensuring you get maximum value without compromising on luxury or authenticity

### Example: Hotel GM (Sunset Economy Quiz)
1. **Your Current Sunset Marketing Strategy**
   - How well you're capturing golden-hour traffic and converting sunset viewers to guests
2. **Your Guest Experience Gaps**
   - Where your sunset-to-nightlife transition loses momentum or bookings
3. **Your Technology & Data Readiness**
   - Whether you have the tools to track, optimize, and upsell sunset moments

**Presentation**:
- Use icons or simple illustrations for each pillar
- Keep text to 1-2 sentences per pillar
- Optional: show mini-scores (e.g. "Most hotels score 40-60% in this area — let's see where you stand")

---

## 4. Credibility Section

**Purpose**: Answer "Why should I trust you?" before the user commits 3-5 minutes.

**Components**:

### Creator Bio (Short)
> "Created by [NAME/TEAM], who [CREDENTIAL + SPECIFIC RESULT]."

**Example**:
> "Created by the Vallarta Voyage team, who've helped 500+ travelers discover hidden gems and 50+ hotels increase their sunset bookings by an average of 30%."

### Social Proof
- Number of quiz takers: "Join 1,200+ travelers who've unlocked their perfect Vallarta evening"
- Average rating: "4.9/5 stars from users who found exactly what they were looking for"
- Media mentions (if any): "Featured in Travel + Leisure, Condé Nast Traveler"

### Credibility Bullets (1-2 max)
- "Based on 6 years of local research and 10,000+ guest experiences"
- "Powered by AI + real-time sunset data + curated local insights"

**Styling**:
- Use subtle badge/pill design for stats
- Small headshots or logos if available
- Keep section compact: 3-4 lines of text max

---

## 5. Quiz Structure (For Agent Implementation)

When generating the quiz flow, follow this exact structure:

### Step 1: Contact Capture (FIRST, non-negotiable)
**Fields**:
- Name (required)
- Email (required)
- Phone (optional, but incentivize: "Get SMS alerts for golden hour")
- Location (auto-detect via IP, editable)

**Why first?**: Capture the lead even if they abandon mid-quiz. Many tools delay this; we don't.

**Copy above form**:
> "We need your email to send your personalized results. We'll never spam you — promise."

---

### Steps 2-11: 10 Best-Practice Questions

These questions must:
- Be relevant to the quiz topic (evening planning, sunset photography, luxury preferences, etc.)
- Provide value in the results (segment users accurately)
- Be easy to answer (multiple choice, sliders, or quick text inputs)

**Example Questions (Luxury Evening Quiz)**:

1. **When do you typically start your evening in Vallarta?**
   - [ ] Right at sunset (6-7pm)
   - [ ] After sunset (7-9pm)
   - [ ] Late night (9pm+)

2. **How would you describe your ideal vibe?**
   - [ ] Intimate & romantic (rooftop for two)
   - [ ] Social & energetic (clubs, live music)
   - [ ] Cultural & unique (art galleries, performances)
   - [ ] Relaxed & scenic (beach bars, casual dining)

3. **What's your typical budget per person for a night out?**
   - [ ] Under $50 (casual, local spots)
   - [ ] $50-$150 (mid-range, some luxury)
   - [ ] $150-$300 (high-end, VIP experiences)
   - [ ] $300+ (ultra-luxury, no limits)

4. **How important is a sunset view to your experience?**
   - Slider: Not important (1) → Essential (10)

5. **Are you traveling solo, as a couple, or with a group?**
   - [ ] Solo
   - [ ] Couple
   - [ ] Small group (3-5)
   - [ ] Large group (6+)

6. **What time of year are you visiting?**
   - Dropdown: Jan | Feb | Mar | ... | Dec

7. **How do you prefer to discover new places?**
   - [ ] Research everything in advance
   - [ ] Ask locals / concierge on the spot
   - [ ] Follow Instagram / influencers
   - [ ] Spontaneous / wander and discover

8. **Which cuisine interests you most?**
   - [ ] Traditional Mexican
   - [ ] Seafood
   - [ ] International fusion
   - [ ] Vegetarian / health-focused

9. **Do you want a structured itinerary or flexibility?**
   - [ ] Structured (book everything ahead)
   - [ ] Flexible (a few anchors, room to explore)
   - [ ] Totally spontaneous (no plans)

10. **What makes a night "perfect" for you?**
    - Open text field (1-2 sentences)

**Rules**:
- Use variety: mix multiple choice, sliders, dropdowns, one open text
- Progress bar must be visible at all times
- Each question on its own screen/step (don't overwhelm with long forms)

---

### Steps 12-16: 5 "Big Sales" Questions

These questions qualify the lead for high-touch sales or upsell.

**The Big 5** (adjust wording per audience):

1. **What's your current situation?**
   - Open text or multiple choice
   - Example: "I'm planning my first trip" | "I visit yearly" | "I own a hotel here"

2. **What's your desired outcome in the next 90 days?**
   - Open text
   - Example: "I want to have the best 3 nights of my life in Vallarta by March"

3. **What's your biggest obstacle to achieving that?**
   - Multiple choice or open text
   - Example: "Not enough time to research" | "Don't know which venues are worth it" | "Worried about tourist traps"

4. **What type of solution are you looking for?**
   - [ ] DIY guide (I'll plan it myself with recommendations)
   - [ ] Done-for-you itinerary (book me a custom experience)
   - [ ] VIP concierge (handle everything, I just show up)
   - [ ] Not sure yet (just exploring)

5. **Anything else we should know?**
   - Open text field
   - Example: "Dietary restrictions, accessibility needs, special occasions, etc."

**Why these questions?**:
- Qualify intent (DIY vs. high-ticket concierge)
- Surface objections (time, trust, price)
- Capture context for personalized follow-up

---

## 6. Results Page Template

### Big Reveal (Hero of Results Page)

**Pattern**:
> "Your Profile: [SEGMENT NAME]"
> 
> [One-sentence description of what this means]

**Example**:
> **"Your Profile: Romantic Sunset Seeker"**
> 
> "You value intimate, beautiful moments with a special someone — and you're willing to invest in experiences that create lasting memories."

**Styling**:
- Large, confident headline (48-56px)
- Badge/icon representing the profile
- Subtle confetti or celebration animation (Motion Primitives)

---

### Three Insights

**Purpose**: Validate the user's self-perception and demonstrate that the quiz "gets" them.

**Pattern**:
> "Here's what we learned about you:"
> 
> 1. [INSIGHT 1: Observational statement about their preferences]
> 2. [INSIGHT 2: Gap between current and desired state]
> 3. [INSIGHT 3: Opportunity or strength they should lean into]

**Example** (Romantic Sunset Seeker):
1. "You prioritize quality over quantity — you'd rather have one perfect rooftop dinner than 5 mediocre bar-hops."
2. "You're likely missing out on hidden gems because mainstream reviews don't highlight the 'vibe factor' you care about."
3. "Your ideal evening starts 30 minutes before sunset and transitions smoothly into a cozy, low-key nightcap."

**Styling**:
- Numbered list with icons
- Each insight is 1-2 sentences max
- Optional: show how they compare to "average" quiz-takers

---

### Next Steps (Segmented)

**For High-Intent Visitors** (selected "VIP concierge" or "done-for-you"):
> "Based on your answers, here are your top 3 recommended venues:"
> 
> [Display 3 Business cards from directory, sorted by luxuryScore + profile match]
> 
> **CTA**: "Book a Free 15-Minute Call with Our Concierge" (Calendly link)

**For Mid-Intent Visitors** (selected "DIY guide"):
> "Here's your personalized evening itinerary:"
> 
> [Show 3-5 recommendations with timing, e.g.:]
> - 6:00pm: Arrive at [Rooftop Bar] for sunset cocktails
> - 7:30pm: Dinner at [Restaurant]
> - 9:00pm: Live music at [Venue]
> 
> **CTA**: "Download Full Guide (PDF)" (requires email confirmation)

**For B2B Leads** (self-identified as hotel/business owner):
> "We help hotels like yours capture the sunset economy. Here's what that could look like:"
> 
> [Mini case study or stat: "Hotels using our system see 30% more evening bookings"]
> 
> **CTA**: "Schedule a Strategy Session" (Calendly)

---

### Optional: Social Sharing

**Pattern**:
> "Share your profile with friends:"
> 
> [Twitter | Facebook | LinkedIn | Copy Link buttons]
> 
> **Pre-populated text**:
> "I just discovered I'm a Romantic Sunset Seeker in Puerto Vallarta! Find your perfect evening: [quiz URL]"

**Why?**: Viral loop for organic growth.

---

## 7. A/B Testing Rules for Agents

When generating multiple variants of the same quiz, use these rules:

### Variant A (Frustration Hook)
- Headline: Emphasize pain points, obstacles, wasted time/money
- Tone: Empathetic, problem-focused
- Results page: Focus on how to "fix" the gap
- Example: "Tired of tourist-trap nights? Get a custom plan to avoid them."

### Variant B (Result Hook)
- Headline: Emphasize dream outcome, transformation, peak experience
- Tone: Confident, aspirational
- Results page: Focus on the "elevated" future state
- Example: "Ready for the perfect Vallarta evening? Discover your ideal itinerary."

### Variant C (Urgency Hook, optional)
- Headline: Time-sensitive or scarcity-based
- Tone: Urgent but not manipulative
- Example: "Sunset in 2 hours — find your perfect spot before it's too late."

### What to Track
- `conversion_rate`: % of visitors who start the quiz
- `completion_rate`: % who finish all 15 questions
- `email_capture_rate`: % who provide valid email
- `b2b_lead_rate`: % who self-identify as hotel/business
- `segment_distribution`: Which profiles are most common

**Log all variants in `LandingPageBlueprint` table** with:
- `slug`, `variantKey`, `targetAudience`, `conversionTrackingId`, `status` (draft/active/archived)

---

## 8. Technical Implementation Notes (For Agents)

### Frontend (React/Next.js)
- Use **multi-step form library** (React Hook Form + Zod for validation)
- Save progress to localStorage after each step (allow resume)
- Progress bar: `(currentStep / totalSteps) * 100`
- Animations: Framer Motion for step transitions (slide-in, fade-up)

### Backend (Hono/tRPC + Prisma)
- **Endpoint**: `POST /api/quiz-submissions`
- **Schema**: See PRD.md (QuizSubmission model)
- **Response**: Return `submissionId` + `recommendedSegment` + `topRecommendations` (Business[])

### Segment Logic (Pseudocode)
```javascript
function calculateSegment(answers) {
  const { budget, vibe, timing, flexibility } = answers;
  
  if (budget === "high" && vibe === "intimate") return "romantic_sunset_seeker";
  if (budget === "mid" && vibe === "social") return "social_explorer";
  if (timing === "late" && vibe === "energetic") return "night_owl";
  // ... add 5-7 total segments
  
  return "balanced_explorer"; // default
}
```

### Recommendations Logic
```javascript
function getRecommendations(segment, answers) {
  const { budget, timing, cuisine } = answers;
  
  return db.business.findMany({
    where: {
      luxuryScore: budget === "high" ? { gte: 80 } : { gte: 50 },
      type: { in: ["BAR", "RESTAURANT", "HOTEL"] },
      // Filter by sunset phase relevance, cuisine tags, etc.
    },
    orderBy: { luxuryScore: "desc" },
    take: 3
  });
}
```

---

## 9. Content Guidelines

### Tone & Voice
- **Luxury travelers**: Sophisticated, aspirational, but not pretentious
- **Hotel GMs**: Data-driven, ROI-focused, respectful of expertise
- **Influencers**: Visual, shareable, status-oriented

### Avoid
- Hype or "clickbait" language ("You won't believe #3!")
- Fake urgency ("Only 2 spots left!")
- Over-promising ("Guaranteed perfect night!")
- Generic adjectives ("amazing", "incredible", "unforgettable" — be specific)

### Use
- Specific benefits ("Save 2 hours of research")
- Concrete outcomes ("3 curated venues matching your vibe")
- Sensory language ("Golden light, warm breeze, the sound of waves")
- Social proof (numbers, testimonials, case studies)

---

## 10. Success Checklist (For Agent Self-Review)

Before marking a landing page as "complete," verify:

- [ ] Metadata (frontmatter) is complete and valid
- [ ] Hero hook matches `primary_hook_type` (frustration or result)
- [ ] Subheadline clearly explains the quiz value
- [ ] Primary CTA is prominent and variant-appropriate
- [ ] Value Proposition (3 pillars) is specific to target audience
- [ ] Credibility section includes social proof or stats
- [ ] Quiz has exactly 15 questions (1 contact, 10 best-practice, 5 big sales)
- [ ] Progress bar is visible throughout quiz
- [ ] Results page has: Big Reveal + 3 Insights + Segmented Next Steps
- [ ] Segment logic is implemented in backend
- [ ] Recommendations query is working and returns valid Business records
- [ ] A/B variant is logged in `LandingPageBlueprint` table
- [ ] Mobile responsiveness is tested (all CTAs thumb-accessible)
- [ ] Form validation prevents submission with missing required fields
- [ ] Thank-you/confirmation message appears after results

---

## 11. Example Full Page Outline (Variant A)

```markdown
## Page: /quiz/sunset-evening-vallarta

### Metadata
- slug: sunset-evening-vallarta
- variant: A
- target_audience: luxury_traveler
- primary_hook_type: frustration
- primary_goal: capture_visitor_leads

### Hero
**Headline**: "Tired of tourist-trap evenings that feel the same everywhere?"

**Subheadline**: "Answer 15 quick questions to discover why your nights fall flat — and get a custom plan for unforgettable Vallarta experiences."

**CTA**: "Get My Custom Plan" | Subcopy: "Free. Instant. No credit card."

### Value Prop
"Take this quiz so we can measure and improve three key areas:"
1. Your Sunset Timing & Planning
2. Your Nightlife Preferences & Comfort Zone
3. Your Budget-to-Experience Match

### Credibility
"Created by Vallarta Voyage, trusted by 1,200+ travelers and 50+ luxury hotels."
- 4.9/5 stars from users
- Featured in Travel + Leisure

### Quiz (15 steps)
[Step-by-step form as outlined above]

### Results Page
**Big Reveal**: "Your Profile: Romantic Sunset Seeker"

**3 Insights**: [As outlined above]

**Next Steps**: "Here are your top 3 venues:" [Business cards] + CTA: "Download Full Itinerary"

**Social Share**: [Buttons + pre-populated text]
```

---

**End of Blueprint**

**For Agents**: Use this template every time you generate a quiz, contest entry form, or lead-gen assessment. Customize the specifics (questions, segments, recommendations) but NEVER deviate from the core structure: Hook → Value Prop → Credibility → 15 Questions → Results with Insights + Next Steps.
