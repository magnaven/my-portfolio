# Feature Research

**Domain:** Senior product designer personal portfolio — dual audience (consulting clients + hiring managers)
**Researched:** 2026-03-21
**Confidence:** HIGH (multiple corroborating sources, cross-validated across recruiter/hiring manager perspectives and designer community)

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features both audiences assume exist. Missing these causes immediate loss of trust or bounce.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Hero section with clear positioning | Hiring managers spend 6-10 seconds deciding whether to continue. If they can't tell who you are and what you do, they close the tab. | LOW | Must state what you do, who you serve, and the result you deliver — not a generic "I'm a product designer" |
| 3–5 deep case studies (not a gallery) | Hiring managers explicitly reject portfolios with no process context. Static visuals alone communicate nothing about judgment or thinking. | HIGH | Each needs: problem, role/constraints, key decisions, process artifacts, and outcomes. Fewer is better than more — 3 well-crafted beats 10 shallow. |
| Clearly stated role in each project | Collaborative work is the norm; viewers need to know exactly what you contributed vs. the team. Missing this is an active red flag. | LOW | One sentence per case study: "I led X, collaborated on Y, owned Z." |
| Business outcomes and metrics | Senior-level means impact, not just craft. No numbers = hard to assess value. Hiring managers and clients both ask "what changed?" | MEDIUM | Proxy metrics are acceptable if direct ones are unavailable (support ticket reduction, NPS delta, conversion improvement). Testimonials serve a similar function for consulting work. |
| About page with genuine POV | Hiring managers often visit the About page before reaching out — it's the trust-closer, not an afterthought. Clients use it to assess working style and personality fit. | LOW | Should express design philosophy, career arc, and something human. Not a list of tools. |
| Contact section with clear next steps | No CTA = no conversion. Both audiences need a clear path to engage once they've decided they want to. | LOW | Needs at least one channel per audience path: calendar booking for consulting, email/form for hiring. |
| Mobile-responsive layout | Portfolios are frequently viewed on phones during commutes or initial screenings. A broken mobile experience signals poor craft judgment. | MEDIUM | Performance matters too — slow load on mobile is a silent killer. |
| Fast load time / Core Web Vitals | A portfolio that loads slowly undermines the credibility of any performance metric claimed inside it. | MEDIUM | Especially critical for image-heavy case studies. Lazy load, optimize images, avoid heavy animation libraries that block render. |
| Public URL, no password gate | Password-protected portfolios are actively rejected by recruiters with full candidate stacks to review. The friction alone causes drop-off. | LOW | If any work is NDA'd, excerpt it with a note: "Full case study available under NDA — reach out." |
| Typographic and visual polish | Non-designers feel when something is "off" even if they can't name it. Poor typography immediately signals poor craft judgment. | MEDIUM | Consistent type scale, generous whitespace, intentional hierarchy. Not decorative — structural. |

---

### Differentiators (Competitive Advantage)

Features that make this portfolio memorable and convert for Ida's specific positioning: founder-lens senior designer, dual consulting + hiring audiences.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Explicit dual audience routing | Most senior designer portfolios attempt one voice for all visitors. Explicit "Looking for a design partner?" / "Hiring?" entry points let each audience feel seen immediately — reducing cognitive load and increasing relevance of everything they read after. | MEDIUM | Entry points should lead to meaningfully different content/CTAs, not just anchor links. Consulting path emphasizes strategic value and outcomes; hiring path emphasizes craft, process, and range. |
| Animated hero that signals craft on arrival | Animation used well is a demonstration, not decoration. A thoughtful hero animation communicates that the designer understands motion, timing, and restraint — before any case study is read. Custom platforms (Framer, etc.) already signal professionalism over Behance/Dribbble. | HIGH | Pitfall: animation that loads slowly or can't be disabled for reduced motion users undercuts the craft signal. It should be impressive AND technically sound. |
| Founder/consultant framing in copy | Most designer portfolios are written to get a job. A portfolio written from the perspective of someone who has built companies and run design operations reads differently — and converts consulting clients far better. "I've sat on both sides of the table" is a positioning statement, not a humble-brag. | LOW | This is a tone/copy decision more than a feature — but it must be intentional and consistent from hero through case studies. |
| "Key decisions" section within case studies | Generic case studies show what was built. Senior-level case studies show why: what tradeoffs were weighed, what was killed, what constraints shaped the outcome. This is the primary signal of judgment vs. execution. | MEDIUM | One focused section per case study titled something like "The decision that mattered" or "What we didn't build." Short. High signal. |
| Leadership and collaboration evidence | Hiring managers at senior levels want to see organizational influence, not just craft. Did you shape the process? Build team capability? Drive cross-functional alignment? | MEDIUM | Weave into case studies naturally — "I introduced a weekly critique ritual" or "I led alignment between engineering, product, and exec stakeholders" — not a separate section. |
| Post-launch / long-term impact | Most portfolios end at handoff. Showing what happened 3–6 months after launch (retention numbers, iteration decisions, lessons learned) communicates ownership through completion — rare at any level. | MEDIUM | Even qualitative post-launch reflection ("we shipped, discovered X, changed Y") distinguishes a founder-mindset designer from an execution designer. |
| Micro-interactions throughout the site | Used with restraint, micro-interactions signal that the designer considers interaction quality at every layer of their work — not just screens in Figma. Hover states, scroll reveals, and transition timing are all craft evidence. | HIGH | Must be used in service of the experience, not as decoration. Over-animation is an anti-feature (see below). Aim for 200-500ms interactions that feel responsive, not theatrical. |
| Calendar booking embedded for consulting path | Reduces the friction between "I want to work with this person" and "I've taken the first step." A link to Calendly or Cal.com embedded inline is a conversion step — not just a contact option. | LOW | Low-pressure CTA framing ("Book a 30-minute conversation") outperforms high-pressure language. |
| Testimonial(s) from consulting clients | For the consulting audience, peer validation from recognizable companies or roles is the fastest trust-builder. One strong quote beats three weak ones. | LOW | Even one quote from a founder or CPO at a notable company dramatically shifts credibility perception. |
| Spare, editorial visual identity | The best senior designer portfolios have a clear design voice — not just a clean template. Confident typography choices, a constrained color palette, and intentional white space all communicate design sensibility before anyone reads a word. | HIGH | This is a design decision, not a feature implementation — but it belongs in requirements because it's the difference between memorable and forgettable. |

---

### Anti-Features (Commonly Built, Often Problematic)

Features that seem good but actively harm the portfolio's goals.

| Feature | Why It Seems Good | Why It's Problematic | Better Approach |
|---------|-------------------|----------------------|-----------------|
| Showing 8–15 projects | Completeness signals effort; "more work = more experienced" | Dilutes quality signal, exhausts the viewer, buries the best work. Hiring managers read 3-5 case studies maximum — volume signals poor editorial judgment, the exact thing a senior designer should have. | Curate ruthlessly to 3-5. Add "More available on request" if needed. |
| Behance or Dribbble as primary portfolio | "Everyone has it, it's established" | Recruiters explicitly signal it as a "not serious about presentation" marker for product/UX roles. It has no narrative, no story, no differentiation. | Custom domain on a purpose-built site (Framer, custom code, etc.). |
| Full password protection | "Protects NDA work" | Rejects candidates before they're evaluated. Recruiters with large stacks won't request a password for every candidate. | Excerpt NDA work with context: "Full case available under NDA — reach out." Show a project summary, the problem, and the outcome without exposing proprietary screens. |
| Generic hero copy ("I'm a UX designer who loves crafting beautiful experiences") | Feels safe and professional | Indistinguishable from thousands of other portfolios. Signals no POV, no positioning. Hiring managers skip it; clients feel nothing. | A specific, bold statement that expresses what Ida believes and who she serves. Something you can't copy-paste onto another designer's site. |
| Blog / writing section (in v1) | Thought leadership signals depth | Creates a content debt: either it's empty (worse than nothing) or it requires ongoing maintenance. In v1, it dilutes the core message and splits focus between "portfolio" and "publication." | Defer entirely to v2+ once the portfolio is established. If Ida wants to publish, use a separate platform (Substack, LinkedIn) and link from the About page. |
| Heavy animations that delay content | "Motion signals craft" | If animation blocks case study content from loading, it's punishing the viewer for their interest. Gratuitous animation also reads as junior — senior designers use restraint. | Animation that loads alongside or after content; reduced-motion support via prefers-reduced-motion media query; no blocking above-the-fold animation. |
| One-size-fits-all voice for both audiences | Simpler to write; "professionals adapt" | Consulting clients want to evaluate strategic value and working style. Hiring managers want craft, range, and cultural fit. A single voice optimizes for neither. | Explicit audience routing with meaningfully different CTAs, framing, and content emphasis per path. |
| Skills/tools list (Figma, Sketch, Notion...) | "Shows range of tools" | Tools are table stakes at 12 years experience — listing them reads as junior. No senior hire or consulting client has ever been convinced by "proficient in Figma." | Replace with evidence of thinking: case study artifacts, leadership evidence, outcomes. |
| Timeline / resume section embedded in the site | "Gives full context" | Resumes belong as a downloadable PDF, not as a portfolio section. Embedding a timeline fragments the narrative and creates a documentation mode that conflicts with the portfolio's storytelling mode. | Link to a downloadable PDF. Keep the site in editorial/portfolio mode. |
| Contact form with 5+ fields | "Qualifies leads" | Every additional field reduces form completion rates. A consulting client interrupted mid-consideration by a lengthy form will close the tab. | Name, email, message. That's it. Let the conversation qualify itself. |

---

## Feature Dependencies

```
Dual Audience Routing
    └──requires──> Hero with clear audience signals
                       └──requires──> Two distinct CTA destinations
                                          └──requires──> Consulting path content (calendar + consulting framing)
                                          └──requires──> Hiring path content (case studies + resume link)

Case Studies
    └──requires──> Outcomes / Business Impact evidence
    └──requires──> Role clarity per project
    └──requires──> Key decisions narrative
    └──enhances──> Testimonials (consulting credibility)
    └──enhances──> Leadership evidence (senior signal)

Animated Hero
    └──requires──> Reduced-motion support (accessibility / craft credibility)
    └──requires──> Fast load time (otherwise undermines the craft claim)
    └──conflicts──> Slow asset loading (blocking animation is worse than no animation)

Micro-interactions
    └──requires──> Reduced-motion fallbacks
    └──enhances──> Visual identity (reinforces design sensibility)

Calendar Booking (consulting path)
    └──requires──> Contact section
    └──requires──> Third-party embed (Cal.com, Calendly, etc.)
```

### Dependency Notes

- **Dual audience routing requires meaningful destinations:** Entry points that lead to the same content with different anchor text are not dual routing — they are a navigation illusion. Each path needs a genuinely different primary CTA and framing.
- **Animated hero requires performance:** An animation that delays above-the-fold content contradicts the craft signal it's meant to communicate. Animation and fast load are not inherently in conflict — they require careful implementation.
- **Case studies require key decisions:** Without the "why" sections, case studies become project summaries. The differentiator is judgment, not just process documentation.

---

## MVP Definition

### Launch With (v1)

Minimum viable portfolio — what's needed for both audiences to trust, engage, and convert.

- [ ] Hero with bold positioning statement and dual audience routing ("Looking for a design partner?" / "Hiring?") — first impression is everything; without this the site is generic
- [ ] 3 rich case studies with problem, role, key decisions, process artifacts, and outcomes — this is the core of both conversion paths
- [ ] About section with founder-lens POV and genuine background (Magna Ventures, AIDA AI, 12 years B2C + B2B) — both audiences need this to close trust
- [ ] Contact section with calendar embed (consulting) and email/form (hiring) — without conversion mechanisms, the portfolio has no business function
- [ ] Animated hero — craft signal on arrival; non-negotiable given the positioning
- [ ] Micro-interactions throughout — not decoration; evidence of attention to interaction quality
- [ ] Mobile-responsive layout — portfolios are frequently screened on mobile first
- [ ] Fast load time — slow load on a designer's own site is a credibility contradiction
- [ ] No password gate — public access required for recruiter/client stack review

### Add After Validation (v1.x)

Add when core portfolio is working and converting.

- [ ] Testimonial from consulting client — adds consulting credibility; requires sourcing quote post-launch
- [ ] Post-launch / long-term impact sections in case studies — requires 3-6 months of data on shipped work; add retroactively
- [ ] 4th or 5th case study — only if existing 3 don't cover sufficient range (B2C + B2B + systems/leadership)

### Future Consideration (v2+)

Defer until portfolio is established and audience is known.

- [ ] Blog / writing section — creates content debt; dilutes v1 focus; revisit if thought leadership becomes a primary acquisition channel
- [ ] Full case study CMS — hardcoded works for v1; only add when Ida needs to self-update without developer
- [ ] Video walkthroughs of case studies — high production effort; adds value for async consulting pitches but overkill for v1

---

## Feature Prioritization Matrix

| Feature | Consulting Client Value | Hiring Manager Value | Implementation Cost | Priority |
|---------|------------------------|---------------------|---------------------|----------|
| Hero + dual audience routing | HIGH | HIGH | LOW | P1 |
| 3 rich case studies | HIGH | HIGH | HIGH | P1 |
| About with founder-lens POV | HIGH | HIGH | LOW | P1 |
| Contact + calendar booking | HIGH | MEDIUM | LOW | P1 |
| Animated hero | MEDIUM | HIGH | HIGH | P1 |
| Mobile responsive | HIGH | HIGH | MEDIUM | P1 |
| Fast load / Core Web Vitals | MEDIUM | HIGH | MEDIUM | P1 |
| Micro-interactions | MEDIUM | HIGH | HIGH | P1 |
| Testimonials | HIGH | LOW | LOW | P2 |
| Post-launch impact in case studies | HIGH | MEDIUM | MEDIUM | P2 |
| Reduced-motion support | MEDIUM | HIGH | LOW | P2 |
| 4th–5th case study | MEDIUM | MEDIUM | HIGH | P2 |
| Blog / writing section | LOW | MEDIUM | HIGH | P3 |
| Case study CMS | LOW | LOW | HIGH | P3 |
| Video walkthroughs | MEDIUM | LOW | HIGH | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

---

## Audience-Specific Feature Notes

### Consulting Clients (Startups and scale-ups needing a design partner)

These visitors arrive with a budget question and a trust question. They want to know: can this person do what I need, have they done it before, and is working with them going to be good? Features that serve this path:

- **Hero framing**: "design partner" language over "product designer" — signals collaboration, not execution
- **Case studies emphasizing business context and decisions**: clients want to know if Ida understands their world, not just their screens
- **Consulting-specific outcomes**: revenue impact, speed to launch, team capability built — not user satisfaction scores
- **Calendar CTA**: low-friction path from interest to conversation; "Book a 30-minute call" outperforms "Contact me"
- **Testimonials**: social proof from recognizable roles (founder, CPO, VP Product) is disproportionately valuable to this audience
- **About page as founder narrative**: "I've built companies, I know what shipping under constraint looks like" — resonates with founders who've been burned by agency designers

### Hiring Managers (Product-led companies evaluating for senior/lead roles)

These visitors arrive with a craft question and a fit question. They want to know: is this person at the level we need, do they have range, and will they raise the bar on our team? Features that serve this path:

- **Hero framing**: direct, confident, specific — what kind of work, what level of scope
- **Case studies emphasizing process artifacts and key decisions**: hiring managers want to see how you think, not just what you shipped
- **Range evidence**: ideally, 3 case studies that span B2C and B2B, early-stage and scaled products, or different design disciplines (product + systems + research)
- **Leadership evidence woven into case studies**: influenced process, drove alignment, grew team capability
- **Resume as downloadable PDF**: linked from navigation or About page — not embedded
- **Email/form contact**: lower urgency than consulting; hiring is a slower process and email is the expected channel

---

## Competitor Feature Analysis

| Feature | Generic Mid-Level Portfolio | Typical Senior Portfolio | Ida's Target Approach |
|---------|---------------------------|-------------------------|----------------------|
| Audience targeting | Single voice, generic | Single voice, seniority signaled | Explicit dual audience routing with distinct paths |
| Case study depth | Visuals + brief description | Problem → process → outcome | Problem → role → constraints → key decisions → outcomes → post-launch |
| Hero copy | "I'm a UX designer who loves..." | "Senior product designer with X years..." | Bold POV statement + founder framing + audience split |
| Volume | 8–15 projects | 4–6 projects | 3–4 projects, each excellent |
| Animation | None or template-default | Subtle scroll reveals | Craft-demonstrating hero animation + purposeful micro-interactions |
| Contact | Generic contact form | Email link + LinkedIn | Calendar embed (consulting) + email (hiring) — path-specific |
| About page | Background and skills list | Background + philosophy | Founder narrative + design POV + human detail |
| Outcomes | Missing or vague | Sometimes quantified | Always framed in business impact, even if proxy metrics |

---

## Sources

- [UX Portfolio Guide: How Senior Designers Get Hired in 2026](https://uxplaybook.org/articles/senior-ux-designer-portfolio-get-hired-2026) — HIGH confidence, current, specific to senior level
- [14 Common UX Portfolio Mistakes to Avoid | Designlab](https://designlab.com/blog/ux-portfolio-mistakes-to-avoid) — HIGH confidence, comprehensive list
- [How Recruiters and Hiring Managers Actually Look at Your Portfolio](https://blog.opendoorscareers.com/p/how-recruiters-and-hiring-managers-actually-look-at-your-portfolio) — HIGH confidence, recruiter perspective
- [Top 20 UX Designer Portfolio Websites in 2026 | Case Study Club](https://www.casestudy.club/journal/ux-designer-portfolio) — MEDIUM confidence, example analysis
- [What hiring managers look for in a UX portfolio | UX Design Institute](https://www.uxdesigninstitute.com/blog/hiring-managers-ux-portfolio/) — HIGH confidence, hiring manager direct input
- [10 Exceptional Product Design Portfolios with Case Study Breakdowns | DesignerUp](https://designerup.co/blog/10-exceptional-product-design-portfolios-with-case-study-breakdowns/) — MEDIUM confidence, example analysis
- [7 UX Portfolio Mistakes to Avoid | Case Study Club](https://www.casestudy.club/journal/ux-portfolio-mistakes) — HIGH confidence, community-validated
- [Micro Interactions in Web Design 2025 | Justinmind](https://www.justinmind.com/web-design/micro-interactions) — MEDIUM confidence, animation/interaction context
- [How to Create a Consulting Case Study Portfolio as a Freelancer | Consultport](https://consultport.com/succeed-as-consultant/how-to-create-a-great-consulting-case-study-portfolio-as-a-freelancer/) — MEDIUM confidence, consulting-specific
- [UX/UI Design Portfolio Tips from a Hiring Manager | Medium](https://medium.com/@ahxo/ux-product-designer-portfolio-tips-from-a-hiring-manager-10707aac81c3) — HIGH confidence, primary source hiring manager perspective

---

*Feature research for: Senior product designer portfolio (dual audience — consulting + hiring)*
*Researched: 2026-03-21*
