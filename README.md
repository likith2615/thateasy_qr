<div align="center">

```
████████╗██╗  ██╗ █████╗ ████████╗███████╗ █████╗ ███████╗██╗   ██╗       ██████╗ ██████╗
╚══██╔══╝██║  ██║██╔══██╗╚══██╔══╝██╔════╝██╔══██╗██╔════╝╚██╗ ██╔╝      ██╔═══██╗██╔══██╗
   ██║   ███████║███████║   ██║   █████╗  ███████║███████╗ ╚████╔╝ █████╗██║   ██║██████╔╝
   ██║   ██╔══██║██╔══██║   ██║   ██╔══╝  ██╔══██║╚════██║  ╚██╔╝  ╚════╝██║▄▄ ██║██╔══██╗
   ██║   ██║  ██║██║  ██║   ██║   ███████╗██║  ██║███████║   ██║         ╚██████╔╝██║  ██║
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝          ╚══▀▀═╝ ╚═╝  ╚═╝
```

### 🌿 Premium Editorial QR Code Platform

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://thateasy-qr-snowy.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

🔗 **Live Demo:** [https://thateasy-qr-snowy.vercel.app](https://thateasy-qr-snowy.vercel.app)

</div>

---

## 📌 Project Overview

**Thateasy_qr** is a premium, full-stack QR Code SaaS platform built for professionals, creators, and businesses. It features 10 distinct QR code types, a real-time analytics dashboard, dual map providers (OpenStreetMap + Google Maps), UPI payment integration, file hosting with media previews, and a beautifully crafted "Editorial Sanctuary" design system.

The platform uses a security-first approach — Supabase credentials are never exposed client-side. All sensitive operations go through server-side Vercel API functions. Users get a sandbox mode (localStorage-based) when not logged in, and full cloud mode with Supabase when authenticated.

---

## 🚀 Features

### 🎨 QR Code Engine
- Real scannable SVG/PNG QR codes powered by the `qrcode` npm library
- Dot styles: Square, Dots, Rounded, Classy
- Eye styles: Square, Circle, Rounded, Leaf
- Color customization — foreground, background, eye colors
- Center logo overlay — branded mark embedded in QR center
- Export — download as SVG or high-resolution PNG

### 🧙 10 QR Code Types

| # | Type | Description |
|---|---|---|
| 1 | Website URL | Standard web link QR code |
| 2 | Digital Business Card (vCard) | Shareable contact card with save-to-contacts |
| 3 | Multi-Link Page | Branded link-in-bio landing page |
| 4 | WhatsApp QR | Opens pre-filled WhatsApp conversations |
| 5 | Phone Call QR | Triggers device dialer directly |
| 6 | Email QR | Pre-composed email with recipient, subject, body |
| 7 | SMS QR | Pre-filled SMS message |
| 8 | UPI Payment QR | India UPI payment code (VPA, payee, amount) |
| 9 | Maps QR | Dual provider location picker (OSM + Google Maps) |
| 10 | File Share | Hosted PDFs, images, and videos |

### 🗺️ Interactive Maps (Maps QR)
- OpenStreetMap (Free) — Leaflet-based, no API key required
- Google Maps (Premium) — Official JS API with optional key stored in localStorage
- Browser Geolocation — "My Location" button for instant coordinate pinning
- Nominatim Geocoding — Free address search without paid API calls
- Associated UPI — Attach a payment QR alongside the location QR

### 📊 Analytics & Dashboard
- Overview: total scans, active QRs, countries reached, scan trend graph
- Per-QR: device breakdown, OS breakdown, browser breakdown, timeline chart
- QR management: create, edit, delete, filter, search all 10 types

### 🔐 Auth & Security
- Supabase GoTrue Auth — email/password with profile seeding
- Zero client-side key exposure — secrets in server-side proxy only
- Bot Prevention widget — blocks automated signup attempts
- Terms & Conditions + Privacy Policy acceptance before registration

### 🌍 Public Destination Pages
- PublicVCard — digital business card with vcf download
- PublicLinkPage — branded link-in-bio page
- PublicFilePage — media-aware download page (image preview / HTML5 video player)
- ScanOverlay — scan event analytics tracking middleware

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI Framework | React | 19 |
| Language | TypeScript | 5.x |
| Build Tool | Vite | 8 |
| Styling | Tailwind CSS | v4 |
| Animation | Framer Motion | 12 |
| Icons | Lucide React | latest |
| QR Engine | qrcode (npm) | 1.5.4 |
| Maps (Free) | Leaflet.js | CDN |
| Maps (Premium) | Google Maps JS API | v3 |
| Backend / Auth | Supabase (PostgreSQL + GoTrue) | latest |
| File Storage | Supabase Storage | latest |
| Email | Brevo (Sendinblue) SMTP | — |
| API Proxy | Custom Vite Plugin + Vercel Functions | — |
| Deployment | Vercel | — |

---

## ⚡ Installation Steps

### Prerequisites
- Node.js >= 20
- npm >= 10 (or pnpm >= 9)
- A Supabase project (free tier works)

### 1. Clone the repository
```bash
git clone https://github.com/likith2615/thateasy_qr.git
cd thateasy_qr
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file at the project root (see Environment Variables section below).

### 4. Run the development server
```bash
npm run dev
```

Open http://localhost:5173 in your browser.

---

## 🔑 Environment Variables

Create a `.env` file at the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key...
```

| Variable | Required | Description |
|---|---|---|
| `VITE_SUPABASE_URL` | Yes | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase anonymous (public) API key |

> Google Maps API key is optional and entered per-user in the QR creation UI. It is stored only in localStorage and never sent to the server.

> **NEVER commit your `.env` file.** It is listed in `.gitignore`.

---

## 📁 Folder Structure

```
thateasy_qr/
├── public/
│   ├── favicon.svg              # Custom QR favicon (sage green)
│   └── robots.txt
│
├── api/                         # Vercel Serverless Functions (server-side only)
│   ├── auth.ts                  # Auth: signup, signin, signout, get_user
│   ├── profile.ts               # Profile: read and update
│   ├── qr.ts                    # QR: create, read, update, delete
│   ├── qrs.ts                   # QR: list all for user
│   ├── scan.ts                  # Scans: log a scan event
│   └── scans.ts                 # Scans: list for a QR
│
├── src/
│   ├── main.tsx                 # React entry point
│   ├── App.tsx                  # Root router and animated transitions
│   ├── index.css                # Global styles + Tailwind v4 + design tokens
│   │
│   ├── components/
│   │   ├── RealQRPattern.tsx    # Core SVG QR generator
│   │   ├── QRWizard.tsx         # 10-type QR creation wizard
│   │   ├── QRCustomizer.tsx     # Live sandbox QR customizer (landing)
│   │   ├── QRList.tsx           # Dashboard QR management table
│   │   ├── QRLogo.tsx           # Branded QR logo overlay
│   │   ├── Dashboard.tsx        # Dashboard shell + tab router
│   │   ├── DashboardOverview.tsx# Stats, charts, scan analytics
│   │   ├── ProfileSettings.tsx  # Profile name, org, avatar settings
│   │   ├── Nav.tsx              # Top navigation bar
│   │   ├── Hero.tsx             # Landing hero + live QR sandbox
│   │   ├── Marquee.tsx          # Animated use-case ticker
│   │   ├── Benefits.tsx         # Benefits section
│   │   ├── HowItWorks.tsx       # How It Works section
│   │   ├── FeaturesMatrix.tsx   # Feature comparison matrix
│   │   ├── Testimonial.tsx      # Testimonials carousel
│   │   ├── CtaFooter.tsx        # Footer navigation
│   │   ├── FeaturesPage.tsx     # Full Features page
│   │   ├── HowItWorksPage.tsx   # Full How It Works page
│   │   ├── PricingPage.tsx      # Pricing tiers page
│   │   ├── BlogPage.tsx         # Blog articles page
│   │   ├── InfoPage.tsx         # Use-case pages (restaurant, events, etc.)
│   │   ├── Login.tsx            # Auth: login + registration with animated eyes
│   │   ├── PublicVCard.tsx      # Public vCard destination page
│   │   ├── PublicLinkPage.tsx   # Public link-in-bio destination
│   │   ├── PublicFilePage.tsx   # Public file download (image/video preview)
│   │   ├── ScanOverlay.tsx      # Page-transition analytics tracker
│   │   ├── BotPreventionPro.tsx # Bot prevention widget
│   │   └── AnimatedEyes.tsx     # Animated eyes micro-interaction
│   │
│   └── lib/
│       ├── db.ts                # Dual-mode DB layer (Supabase cloud + localStorage)
│       └── supabaseClient.ts    # Supabase JS client
│
├── vite.config.ts               # Vite config + custom API proxy plugin
├── tsconfig.json
├── package.json
└── .env                         # Local secrets — NEVER commit this file
```

---

## 📸 Screenshots

| Landing Page | QR Wizard | Dashboard Analytics |
|:---:|:---:|:---:|
| Hero + Live QR Sandbox | 10-type QR creation flow | Scan trends and device breakdown |

| Maps Picker | Public vCard | Pricing |
|:---:|:---:|:---:|
| OSM + Google Maps toggle | Digital business card | Free / Teams / Enterprise |

Live: https://thateasy-qr-snowy.vercel.app

---

## 🚢 Deployment

Deployed on Vercel: https://thateasy-qr-snowy.vercel.app

### Deploy your own:
1. Push to GitHub
2. Import at vercel.com/new
3. Add environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
4. Click Deploy

---

## 📦 Commit History

| Commit | Description |
|---|---|
| `346eb73` | feat: initial production release of Thateasy_qr |
| `6444fd9` | Delete AGENTS.md |
| `332e45a` | Delete .env.example |
| `cbeac2b` | Add figma files |
| `c97b55b` | Update .gitignore |
| `2a362fd` | feat: implement 10 QR code types, dual maps picker (Leaflet & Google Maps), geolocation tracking, UPI payment, and video uploads |
| `9c33875` | chore: remove API Docs, Integrations, Changelog, Careers, and Press Kit from footer |
| `57b49c1` | docs: add research document, project documentation, full README overhaul, and remove developer API keys from profile |
| `23ad498` | fix: auto sign-in and redirect straight to dashboard upon registration |
| `d92f659` | fix: resolve RLS policy violation on qrs table and add error logging |
| `72a2af1` | fix: replace cross-origin link download with secure blob fetch downloader to prevent security warnings |
| `4c00c39` | fix: store uploaded files as persistent Data URIs instead of temporary browser-memory blob URLs |
| `e17948a` | fix: call setView('dashboard') in handleLoginSuccess for immediate view transition upon login |
| `df2d7c7` | security: sanitize GET response in api/qr.ts to exclude user_id from public network responses |

---

## 📊 Phase Status

**Total Phases: 5**

| Phase | Description | Status |
|---|---|---|
| Phase 1 | Foundation — React + Vite + Tailwind v4 + Supabase + server-side API proxy | Fully Working |
| Phase 2 | QR Code Engine — real SVG/PNG generation, 10 QR types, styles, export | Fully Working |
| Phase 3 | Dashboard & Analytics — scan stats, charts, QR management, profile settings | Fully Working |
| Phase 4 | Landing & Marketing — hero sandbox, maps picker, use-case pages, blog, pricing | Fully Working |
| Phase 5 | Billing & Teams — Stripe integration, Teams plan access control | Partially Working |

### Completed & Fully Working
- All 10 QR type generation and download
- Supabase authentication (signup, login, logout)
- Real-time QR scan analytics dashboard
- Dual maps provider (OSM free + Google Maps premium)
- Browser geolocation for location QR
- UPI Payment QR with associated map QR
- File uploads with image/video public preview pages
- Public vCard, Link Page, and File destination pages
- All marketing and use-case landing pages

### Partially Working
- Teams Plan — UI and badge shown; Stripe billing not yet integrated
- Professional Plan — "Coming Soon" modal; trial flow not built

### Pending / Future Improvements

| Feature | Priority |
|---|---|
| Stripe billing for Teams and Pro plans | High |
| Custom domain redirect support | Medium |
| Bulk QR generation via CSV import | Medium |
| Analytics export to CSV/PDF | Medium |
| Custom logo upload in QR center | Low |
| Developer REST API with real auth tokens | Low |
| React Native mobile app | Future |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "feat: add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📜 License

MIT License © 2026 C. Likith Kumar

---

## 👤 Creator

**C. Likith Kumar**
Full-Stack Developer · Product Designer · Maker

- LinkedIn: https://linkedin.com/in/likith-kumar-chippe/
- GitHub: https://github.com/likith2615
- Instagram: https://instagram.com/ft_._likith
- WhatsApp: https://wa.me/918179072511

_"The simplest things are often the truest." — Richard Bach_

Built with 🌿 quiet intention and obsessive attention to craft.
