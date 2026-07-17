# Research Document
## Role: Product Planning & Business Analysis
### Project: Thateasy_qr — Premium QR Code SaaS Platform
**Intern:** C. Likith Kumar | **Organisation:** NxtGenSec Internship Program

---

## 1. Role Overview

**Product Planning & Business Analysis (PBA)** is a strategic engineering discipline that bridges the gap between user needs, business objectives, and technical delivery. The Product Planner and Business Analyst is responsible for defining what gets built, why it gets built, and how its success is measured — before a single line of code is written.

In a modern software company, this role sits at the intersection of product management, UX research, data analysis, and engineering. The PBA professional translates ambiguous market opportunities into structured product requirements, user stories, and acceptance criteria that engineering teams can execute against with clarity and confidence.

For SaaS platforms specifically, the PBA role involves continuous discovery (talking to users, studying competitors, analysing usage data) and continuous delivery planning (roadmapping, sprint prioritisation, release coordination). The role is not simply about writing documents — it is about making data-informed decisions that shape the product's entire trajectory.

---

## 2. Responsibilities

A Product Planner & Business Analyst on a SaaS product like Thateasy_qr is responsible for:

### Strategic Planning
- **Market & competitive research** — identifying gaps in the QR code tool market (e.g., existing tools like QR Code Generator, Bitly, Beaconstac) and defining a differentiated positioning
- **Product vision & strategy** — defining the long-term direction and annual goals for the platform
- **Roadmap creation** — prioritising features across releases using frameworks such as RICE (Reach, Impact, Confidence, Effort) and MoSCoW (Must, Should, Could, Won't)

### Requirement Engineering
- **User story writing** — structured in the form: *As a [user type], I want to [action], so that [benefit]*
- **Acceptance criteria** — defining testable conditions that determine when a feature is "done"
- **Functional & non-functional requirements** — documenting both what the system does and how it performs (speed, security, availability)

### Stakeholder Communication
- **PRDs (Product Requirement Documents)** — writing comprehensive specs that engineers, designers, and QA can act on
- **Sprint planning participation** — decomposing epics into user stories and estimating effort with the dev team
- **Demo preparation & feedback collection** — running structured usability sessions and translating feedback into actionable tickets

### Metrics & Validation
- **KPI definition** — identifying the right metrics: DAU, QR scan rate, conversion rate (free → paid), churn rate
- **Analytics setup** — ensuring product instrumentation captures the right events for data-driven decisions
- **A/B test planning** — designing experiments to validate hypotheses about new features

---

## 3. Industry Best Practices

### 3.1 Jobs-to-Be-Done (JTBD) Framework
Rather than building features, PBA professionals focus on the *job* the user is hiring the product to do. For Thateasy_qr, the core JTBD is: *"Help me connect my physical materials (menus, business cards, packaging) with my digital presence instantly, without technical friction."*

### 3.2 Dual-Track Agile
Industry best practice separates product discovery (research and validation) from delivery (engineering sprints). Discovery runs one sprint ahead of delivery, ensuring engineers never build unvalidated features.

### 3.3 Opportunity Solution Trees (Teresa Torres)
Mapping business opportunities → user outcomes → product solutions → experiments. This prevents "solution-first" thinking and keeps the team focused on outcomes rather than outputs.

### 3.4 Hypothesis-Driven Development
Every feature starts as a hypothesis: *"We believe [feature] will result in [outcome] for [user segment], as evidenced by [metric]."* This discipline prevents feature bloat and waste.

### 3.5 MoSCoW Prioritisation
| Priority | Definition |
|---|---|
| **Must Have** | Non-negotiable for launch (e.g., QR generation, auth) |
| **Should Have** | Important but not launch-blocking (e.g., analytics charts) |
| **Could Have** | Nice-to-have if time allows (e.g., bulk export) |
| **Won't Have** | Out of scope for this release (e.g., mobile app) |

### 3.6 RICE Scoring
**Score = (Reach × Impact × Confidence) / Effort**

Used to objectively compare features and resolve prioritisation debates with data instead of opinions.

### 3.7 Continuous Discovery
Weekly user interviews, usability tests, and behavioural analytics (Mixpanel, Amplitude, Hotjar heatmaps) to continuously validate assumptions and update the roadmap.

---

## 4. Tools & Technologies

| Category | Tool | Purpose |
|---|---|---|
| **Roadmapping** | Notion, Linear, Jira | Feature tracking, sprint management |
| **Prototyping** | Figma | Low-fi and hi-fi wireframes, design handoff |
| **Analytics** | Google Analytics, Mixpanel, Amplitude | Behavioural tracking, funnel analysis |
| **User Research** | Maze, UserTesting, Hotjar | Usability testing, heatmaps, session recordings |
| **Documentation** | Confluence, Notion, GitHub Wiki | PRDs, specs, knowledge base |
| **Competitive Intel** | SimilarWeb, BuiltWith, SEMrush | Traffic analysis, tech stack discovery |
| **Data Analysis** | Supabase Studio, Google Sheets, SQL | Querying scan analytics, cohort analysis |
| **Communication** | Slack, Linear, GitHub Issues | Cross-team coordination, bug triage |

For Thateasy_qr specifically:
- **Supabase Studio** — querying and analysing scan events, user growth, QR creation rates
- **GitHub** — version control, PR reviews, release management
- **Vite + TypeScript** — understanding the technical implications of product decisions
- **Figma** — designing and iterating on UI wireframes before implementation

---

## 5. Workflow

A typical Product Planning cycle for a feature in Thateasy_qr:

```
1. DISCOVER
   ├── User interviews (5-7 users per round)
   ├── Competitor analysis (Bitly, Beaconstac, QR Tiger)
   └── Analytics review (scan drop-offs, feature abandonment)

2. DEFINE
   ├── Opportunity framing ("How might we...?")
   ├── User story writing with acceptance criteria
   └── MoSCoW + RICE prioritisation

3. DESIGN
   ├── Wireframe in Figma
   ├── Internal review with dev team (feasibility check)
   └── Usability test on prototype (Maze)

4. DELIVER
   ├── Sprint ticket breakdown (epics → stories → tasks)
   ├── Developer handoff with annotated specs
   └── QA acceptance criteria validation

5. MEASURE
   ├── KPI tracking post-release
   ├── A/B test results analysis
   └── Retrospective → next discovery cycle
```

---

## 6. Challenges

### Challenge 1: Prioritisation Under Constraints
**Problem:** Limited engineering bandwidth with an extensive feature wishlist (10 QR types, analytics, maps, UPI, file uploads, public pages).
**Solution:** Applied RICE scoring to rank all features. Core QR generation and auth (must-haves) were built first. Maps QR and UPI were scored high-impact because they serve the Indian market specifically. Bulk export and Developer API were deprioritised to future phases.

### Challenge 2: Defining the Right QR Types
**Problem:** QR codes can encode virtually anything — deciding which 10 types to ship required market research.
**Solution:** Analysed competitor features (QR Code Generator, QR Tiger, Bitly) and mapped against Indian SMB use cases. WhatsApp QR and UPI Payment QR were identified as uniquely high-value for the Indian market, where WhatsApp is the dominant communication channel and UPI is the dominant payment method.

### Challenge 3: Free vs. Paid Feature Boundary
**Problem:** Deciding which features are free and which are paywalled is a critical monetisation decision that affects both conversion and churn.
**Solution:** Adopted a "generous free tier" strategy: all 10 QR types are free (1 MB file limit), with the paid Teams tier unlocking higher file limits (20 MB), advanced analytics, and team collaboration. This is consistent with PLG (Product-Led Growth) strategy where users experience value before paying.

### Challenge 4: Maps Provider Decision
**Problem:** Google Maps API costs money at scale; showing a payment-required map upfront creates friction.
**Solution:** Designed a dual-provider model: OpenStreetMap (free, Leaflet-based) as the default, with Google Maps as an optional premium toggle. Users who already have a Google Maps API key can opt into it. This eliminated the cost barrier entirely for free users while preserving premium capability.

### Challenge 5: Security vs. Developer Experience
**Problem:** Supabase credentials must never reach the browser, but exposing a server-side proxy adds complexity.
**Solution:** Built a custom Vite plugin that intercepts `/api/*` requests during development and routes them through a server context where environment variables are available. In production, Vercel serverless functions (`/api/*.ts`) handle the same responsibility. Zero Supabase keys ever appear in the client bundle.

---

## 7. How I Applied It in My Project

### Product Vision & Positioning
I defined Thateasy_qr's positioning as a "premium editorial QR platform" — differentiating from commodity tools through exceptional design quality, a warm brand aesthetic ("Editorial Sanctuary"), and depth of QR type support. This is a deliberate positioning against Bitly's utilitarian feel and QR Tiger's cluttered UI.

### Requirement Engineering
I wrote functional requirements for all 10 QR types, mapping each to a specific user need:
- **WhatsApp QR** → Small business owners who communicate with customers on WhatsApp
- **UPI Payment QR** → Street vendors, freelancers, and event organisers who accept UPI
- **Maps QR** → Restaurants, hotels, and event venues needing physical-to-digital location links
- **File Share QR** → Teachers, conference organisers, and doctors who distribute documents

### Roadmap & Phase Planning
I structured the build into 5 phases:
- **Phase 1:** Foundation (auth, database, proxy security)
- **Phase 2:** QR Engine (10 types, styling, export)
- **Phase 3:** Dashboard & Analytics (scan tracking, charts)
- **Phase 4:** Marketing & Use Cases (landing page, blog, use-case pages)
- **Phase 5:** Monetisation (Teams plan, Stripe billing — partially complete)

### Analytics Instrumentation
Every QR scan logs: device type, browser, OS, country, and city. This allows users to see exactly who is scanning their codes and from where, making the analytics dashboard the platform's key retention hook.

### Competitive Differentiation
After competitor analysis, I identified three unique angles for Thateasy_qr:
1. **Design quality** — no competitor in the Indian market has an editorial-grade design system
2. **UPI + Maps combo** — no competitor offers both UPI payment QR and interactive map QR in one platform
3. **Security transparency** — clearly communicating zero client-side key exposure builds trust with technical users

---

## 8. Learning Outcomes

Through this internship project applying the Product Planning & Business Analysis role:

1. **Structured thinking:** Learned to decompose a complex product vision into prioritised, deliverable units using RICE and MoSCoW frameworks
2. **User-centred design:** Understood how to define features from the user's job-to-be-done rather than the engineer's preference
3. **Technical literacy:** Gained hands-on experience with the technology stack (React, Supabase, Vite, TypeScript) which significantly improved my ability to write realistic, achievable requirements
4. **Trade-off navigation:** Experienced firsthand the tension between ideal features and practical constraints — learning to say "not in this phase" is as important as saying "yes"
5. **Security as a product decision:** Realised that security choices (zero client-side credentials, RLS policies) are not just engineering concerns — they are product trust signals that affect user adoption and enterprise sales
6. **Market segmentation:** Understood that "everyone" is not a target market — focusing on Indian SMBs, freelancers, and event organisers shaped every product decision more precisely
7. **Metric-first thinking:** Developed the habit of asking "how will we know if this worked?" before building anything

---

## 9. References

1. Cagan, M. (2018). *Inspired: How to Create Tech Products Customers Love.* Wiley.
2. Torres, T. (2021). *Continuous Discovery Habits.* Product Talk LLC.
3. Ries, E. (2011). *The Lean Startup.* Crown Business.
4. Olsen, D. (2015). *The Lean Product Playbook.* Wiley.
5. Supabase Documentation. (2024). Row Level Security. https://supabase.com/docs/guides/auth/row-level-security
6. Google Maps Platform. (2024). Maps JavaScript API Documentation. https://developers.google.com/maps/documentation/javascript
7. OpenStreetMap Foundation. (2024). Leaflet.js Documentation. https://leafletjs.com/reference.html
8. National Payments Corporation of India. (2024). UPI Product Overview. https://www.npci.org.in/what-we-do/upi/product-overview
9. Vercel. (2024). Serverless Functions Documentation. https://vercel.com/docs/functions
10. React Documentation. (2024). React 19 Release Notes. https://react.dev/blog/2024/12/05/react-19
