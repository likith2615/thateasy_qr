# Project Documentation
## Thateasy_qr — Premium QR Code SaaS Platform

**Version:** 1.0.0
**Author:** C. Likith Kumar
**Live URL:** https://thateasy-qr-snowy.vercel.app
**Repository:** https://github.com/likith2615/thateasy_qr
**Stack:** React 19 + TypeScript + Vite 8 + Tailwind CSS v4 + Supabase + Vercel

---

## 1. Project Overview

Thateasy_qr is a production-grade QR Code SaaS platform designed with the following goals:

- **Accessibility:** Any user — from a street food vendor to a Fortune 500 marketer — can generate a scannable QR code in under 60 seconds.
- **Depth:** 10 distinct QR code types covering communication, payments, location, files, and digital identity.
- **Security:** Zero client-side exposure of backend credentials. All Supabase operations run through server-side Vercel functions.
- **Analytics:** Every scan is logged with device, browser, OS, and location metadata, surfaced in a real-time dashboard.
- **Design:** An "Editorial Sanctuary" design system — warm cream backgrounds (#F7F5F0), sage green accents (#8E9C78), classical serif typography — creates a premium, trustworthy brand experience.

The application is a single-page React app with hash-based routing (no server-side rendering required), Supabase for auth/data, and Vercel serverless functions as a security proxy.

---

## 2. Features

### 2.1 QR Code Types

**1. Website URL**
Generates a standard URL QR code. Supports both dynamic (redirectable) and static modes. Dynamic codes redirect through `?r=<id>` enabling real-time destination changes and scan tracking.

**2. Digital Business Card (vCard)**
Generates a QR code linking to a branded PublicVCard page. Includes full name, phone, email, organisation, website, and profile photo. Visitors can download a `.vcf` contact file directly from the page.

**3. Multi-Link Page**
Creates a branded link-in-bio landing page (similar to Linktree) with a custom title, description, and up to multiple external links. Accessible at `?linkpage=<id>`.

**4. WhatsApp QR**
Encodes a `https://wa.me/<phone>?text=<message>` deep link. When scanned, opens WhatsApp directly with the specified number and pre-filled message. Supports international dialling codes.

**5. Phone Call QR**
Encodes a `tel:<number>` URI that triggers the device dialler immediately on scan.

**6. Email QR**
Encodes a `mailto:<email>?subject=<subject>&body=<body>` URI that opens the default mail client with all fields pre-populated.

**7. SMS QR**
Encodes a `sms:<number>?body=<message>` URI that opens the SMS app with a pre-filled message.

**8. UPI Payment QR**
Encodes a `upi://pay?pa=<VPA>&pn=<payee>&am=<amount>&tn=<note>&cu=INR` string. Compatible with all UPI apps (PhonePe, GPay, Paytm, BHIM). Optionally attaches to a Maps QR as a payment companion.

**9. Maps QR**
Generates a `https://www.google.com/maps/search/?api=1&query=<lat>,<lng>` URL. Features:
- Dual map provider selector: OpenStreetMap (Leaflet, free) or Google Maps (JS API, optional key)
- Persistent side-by-side DOM containers toggled via CSS display (prevents re-initialisation on switch)
- Browser Geolocation API integration for "My Location" button
- Nominatim geocoding for address-to-coordinate lookup
- Optional associated UPI QR with dual-preview tabs

**10. File Share**
Uploads files to Supabase Storage and generates a public download page. Supports:
- PDFs, images (JPG, PNG), and videos (MP4, MOV, AVI)
- Free plan: 1 MB limit | Teams plan: 20 MB limit
- PublicFilePage shows image preview or HTML5 `<video>` player for video files

### 2.2 QR Customisation
- Foreground, background, and eye ring colour pickers
- Dot style: Square, Dots, Rounded, Classy
- Eye shape: Square, Circle, Rounded, Leaf
- Branded logo overlay toggle
- Export as SVG (vector) or PNG (1200×1200 raster)

### 2.3 Analytics Dashboard
- Total scans, active QR count, countries reached
- Scan trend line chart (last 30 days)
- Per-QR drill-down: device type pie chart, OS and browser breakdown
- All analytics update in real-time from Supabase scan logs

### 2.4 Authentication
- Email and password registration with profile seeding
- Gender selection (Male / Female) and avatar picker (6 options)
- Bot Prevention widget on all auth forms
- Terms & Conditions + Privacy Policy acceptance required
- Animated eyes micro-interaction on login (eyes close when password field is focused)

### 2.5 Public Destination Pages
- All pages load from Supabase via `?vcard=`, `?linkpage=`, or `?file=` query params
- 404 shown for inactive or deleted QR codes

### 2.6 Marketing Pages
- Full landing page with hero QR sandbox, benefits, how-it-works, features matrix, testimonials
- Use-case pages: Restaurant Menus, Event Tickets, Product Packaging, Business Cards
- Blog, Pricing, About, Contact, Terms & Conditions, Privacy Policy

---

## 3. Technology Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI component framework |
| TypeScript | 5.x | Type safety across all components |
| Vite | 8 | Build tooling and dev server |
| Tailwind CSS | v4 | Utility-first styling |
| Framer Motion | 12 | Page transition animations and micro-interactions |
| Lucide React | latest | SVG icon library |
| qrcode (npm) | 1.5.4 | QR matrix generation (SVG + PNG canvas) |

### Backend & Infrastructure
| Technology | Purpose |
|---|---|
| Supabase (PostgreSQL) | Primary database for users, QR codes, scan events |
| Supabase Auth (GoTrue) | Email/password authentication, JWT session management |
| Supabase Storage | File hosting for uploaded PDFs, images, videos |
| Vercel Serverless Functions | Server-side API proxy (hides Supabase credentials from client) |
| Custom Vite Plugin | Local dev server-side proxy for `/api/*` routes |

### External Services
| Service | Purpose |
|---|---|
| Leaflet.js (CDN) | OpenStreetMap rendering (free map provider) |
| Google Maps JS API (optional) | Premium map rendering when user provides API key |
| Nominatim (OSM) | Free geocoding: address string → lat/lng coordinates |
| Brevo (Sendinblue) SMTP | Transactional email (signup confirmations) |

---

## 4. Folder Structure

```
thateasy_qr/
├── public/
│   ├── favicon.svg              # Custom QR finder-pattern favicon
│   └── robots.txt               # Search engine crawling rules
│
├── api/                         # Vercel Serverless Functions
│   ├── auth.ts                  # POST /api/auth?action=signup|signin|signout|get_user
│   ├── profile.ts               # GET/POST /api/profile
│   ├── qr.ts                    # GET/POST/PATCH/DELETE /api/qr
│   ├── qrs.ts                   # GET /api/qrs (list all for user)
│   ├── scan.ts                  # POST /api/scan (log scan event)
│   └── scans.ts                 # GET /api/scans (list scans for a QR)
│
├── src/
│   ├── main.tsx                 # React DOM root mount
│   ├── App.tsx                  # Route resolver + animated page transitions
│   ├── index.css                # Design tokens + Tailwind v4 base
│   │
│   ├── components/
│   │   ├── RealQRPattern.tsx    # Renders SVG QR from string input with style props
│   │   ├── QRWizard.tsx         # Multi-step form for all 10 QR types + maps + UPI
│   │   ├── QRCustomizer.tsx     # Real-time QR sandbox (landing page hero)
│   │   ├── QRList.tsx           # Paginated QR management table with search/filter
│   │   ├── QRLogo.tsx           # SVG overlay logo component for QR centre
│   │   ├── Dashboard.tsx        # Shell: sidebar nav, tab router, user state
│   │   ├── DashboardOverview.tsx# Stats cards, line chart, per-QR analytics
│   │   ├── ProfileSettings.tsx  # Name, organisation, avatar URL settings form
│   │   ├── Nav.tsx              # Responsive top navigation bar
│   │   ├── Hero.tsx             # Landing hero section with live QR sandbox
│   │   ├── Marquee.tsx          # Infinite scrolling ticker (use-case labels)
│   │   ├── Benefits.tsx         # Three-column benefits cards
│   │   ├── HowItWorks.tsx       # Numbered step section
│   │   ├── FeaturesMatrix.tsx   # Feature comparison table
│   │   ├── Testimonial.tsx      # User testimonial cards
│   │   ├── CtaFooter.tsx        # Footer: brand info, nav columns, copyright
│   │   ├── FeaturesPage.tsx     # Full dedicated features page
│   │   ├── HowItWorksPage.tsx   # Full dedicated how-it-works page
│   │   ├── PricingPage.tsx      # Free / Teams / Enterprise pricing cards
│   │   ├── BlogPage.tsx         # QR marketing blog articles
│   │   ├── InfoPage.tsx         # Use-case detail pages + "Create Your Own" CTA
│   │   ├── Login.tsx            # Combined login + register flow
│   │   ├── PublicVCard.tsx      # Branded contact card (name, phone, vcf download)
│   │   ├── PublicLinkPage.tsx   # Branded link-in-bio destination
│   │   ├── PublicFilePage.tsx   # File download page (image preview / video player)
│   │   ├── ScanOverlay.tsx      # Scan event logger (fires on public page load)
│   │   ├── BotPreventionPro.tsx # CAPTCHA-style bot detection widget
│   │   └── AnimatedEyes.tsx     # SVG eye animation component
│   │
│   └── lib/
│       ├── db.ts                # DB abstraction: cloud (Supabase) or sandbox (localStorage)
│       └── supabaseClient.ts    # Supabase client initialisation + isConfigured check
│
├── vite.config.ts               # Vite + Tailwind plugin + API proxy middleware plugin
├── tsconfig.json                # TypeScript config (strict mode)
├── package.json                 # Dependencies and scripts
└── .env                         # Environment secrets (gitignored)
```

---

## 5. Database Design

### 5.1 Entity Relationship Overview

```
auth.users (Supabase managed)
    |
    | (1:1)
    v
public.profiles
    |
    | (1:N)
    v
public.qrs
    |
    | (1:N)
    v
public.scans
```

### 5.2 Table: profiles

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | uuid | PRIMARY KEY, FK → auth.users | User's Supabase Auth ID |
| name | text | — | Display name |
| organization | text | — | Company or org name |
| avatar_url | text | — | Profile photo URL |
| plan | text | CHECK (free, teams, enterprise) | Subscription tier |
| gender | text | CHECK (male, female) | Used for avatar selection |
| updated_at | timestamptz | DEFAULT now() | Last update timestamp |

### 5.3 Table: qrs

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | uuid | PRIMARY KEY, DEFAULT gen_random_uuid() | QR unique identifier |
| user_id | uuid | FK → profiles.id, NOT NULL | Owner |
| name | text | NOT NULL | Display name for QR |
| type | text | CHECK (url, vcard, file, linkpage, wifi, whatsapp, phone, email, sms, upi, google-maps) | QR type |
| is_dynamic | boolean | NOT NULL, DEFAULT true | Dynamic (trackable) vs static |
| is_active | boolean | NOT NULL, DEFAULT true | Enable/disable the QR |
| destination_url | text | — | The URL this QR resolves to |
| content_data | jsonb | — | Type-specific payload (vCard fields, link page links, map coords, etc.) |
| styles | jsonb | — | QR visual settings (color, dotStyle, eyeStyle, logo) |
| created_at | timestamptz | DEFAULT now() | Creation timestamp |

### 5.4 Table: scans

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | uuid | PRIMARY KEY | Scan event identifier |
| qr_id | uuid | FK → qrs.id, NOT NULL | Which QR was scanned |
| country | text | — | Resolved country (mock from UA) |
| city | text | — | Resolved city (mock from UA) |
| device | text | — | Desktop / Mobile / Tablet |
| browser | text | — | Chrome / Safari / Firefox / Edge |
| os | text | — | Windows / macOS / iOS / Android / Linux |
| created_at | timestamptz | DEFAULT now() | Scan timestamp |

### 5.5 Row Level Security Policies

| Table | Policy | Rule |
|---|---|---|
| profiles | Self access | Users can only read/write their own row |
| qrs | Owner access | Users can only CRUD their own QRs |
| scans | Public insert | Anyone can insert (public scanning) |
| scans | Owner read | Only QR owner can read scan events |

---

## 6. API Overview

All API endpoints are implemented as Vercel Serverless Functions in `/api/`. During local development, the custom Vite plugin proxies `/api/*` to the same handlers.

### Auth Endpoints: `/api/auth`

| Action (query param) | Method | Body | Response |
|---|---|---|---|
| `get_user` | GET | — | User object or null |
| `signup` | POST | `{ email, password, name, avatarUrl, plan }` | Created user object |
| `signin` | POST | `{ email, password }` | Signed-in user object |
| `signout` | POST | — | `{ success: true }` |

### Profile Endpoints: `/api/profile`

| Action | Method | Body | Response |
|---|---|---|---|
| Read profile | GET | `?userId=<id>` | Profile object |
| Update profile | POST | `{ userId, name, organization, avatar_url }` | Updated profile |

### QR Endpoints: `/api/qr` and `/api/qrs`

| Endpoint | Method | Description |
|---|---|---|
| `/api/qrs?userId=<id>` | GET | List all QRs for a user |
| `/api/qr` | POST | Create a new QR |
| `/api/qr?id=<id>` | GET | Get a single QR by ID |
| `/api/qr?id=<id>` | PATCH | Update a QR |
| `/api/qr?id=<id>` | DELETE | Delete a QR |

### Scan Endpoints: `/api/scan` and `/api/scans`

| Endpoint | Method | Description |
|---|---|---|
| `/api/scan` | POST | Log a scan event `{ qrId, device, browser, os, country, city }` |
| `/api/scans?qrId=<id>` | GET | List all scans for a QR |

### Client-Side DB Abstraction (`src/lib/db.ts`)
The `db` object provides a unified API that automatically routes to:
- **Cloud mode** (Supabase): when `VITE_SUPABASE_URL` is configured and user is authenticated
- **Sandbox mode** (localStorage): when running without Supabase config for development/demo

---

## 7. Screenshots

Live URL: https://thateasy-qr-snowy.vercel.app

### Key Pages
| Page | URL / Hash |
|---|---|
| Landing Page | `/` |
| Dashboard | `/#dashboard` |
| Login | `/#login` |
| Register | `/#signup` |
| Features | `/#features` |
| Pricing | `/#pricing` |
| Blog | `/#blog` |
| Maps QR | Dashboard → Create → Maps QR |
| Public vCard | `/?vcard=<id>` |
| Public File | `/?file=<id>` |

---

## 8. Challenges & Solutions

### Challenge 1: Supabase Credentials Security
**Problem:** React SPA builds bundle all JavaScript into client-side files. If Supabase keys were referenced in component code, they would be visible in browser DevTools to any user.

**Solution:** Built a custom Vite plugin that intercepts all `/api/*` HTTP requests during development and routes them through Node.js, where `process.env` variables are available. In production, Vercel serverless functions handle the same proxy role. The browser-facing bundle never contains any Supabase credentials.

### Challenge 2: Dual Map Provider Switching (Blank Screen Bug)
**Problem:** When switching between Google Maps and OpenStreetMap in the Maps QR wizard, the inactive map's container was unmounted from the DOM. Re-mounting Leaflet.js on a hidden container caused it to fail dimension calculations and render blank.

**Solution:** Kept both map containers permanently in the DOM, toggling only their CSS `display` property between `block` and `none`. Separate refs cache each map instance (leafletMapRef, googleMapRef). On switching to OpenStreetMap, `leafletMap.invalidateSize()` is called to force recalculation of container dimensions. Coordinates are synced between both maps so the pin position matches when switching.

### Challenge 3: Dynamic vs. Static QR Codes
**Problem:** Static QR codes encode data directly. If a user wants to change the destination URL later, the printed QR code would need to be replaced. Dynamic codes require server-side redirect infrastructure.

**Solution:** Dynamic QR codes encode `<origin>?r=<qr_id>` and the app resolves the real destination at scan time from the database. This allows users to change any URL without reprinting. The scan event is also logged at this redirect step, enabling analytics.

### Challenge 4: File Upload Size Validation
**Problem:** File uploads to Supabase Storage are paid beyond a threshold. Free-tier users uploading large video files could incur unexpected costs.

**Solution:** Client-side file size validation before upload. Free plan: maximum 1 MB. Teams plan: maximum 20 MB. Plan is read from the user's profile record. Files that exceed the limit show an inline error with a clear upgrade prompt.

### Challenge 5: Scan Analytics Without Raw IP Addresses
**Problem:** Logging raw IP addresses raises GDPR and privacy concerns. Users need location analytics but we can not store personal data.

**Solution:** Location data is approximated from User-Agent strings (device/browser/OS) combined with a randomised selection from a set of representative city/country pairs. No real IP-to-location lookup is performed. Users see geographically plausible analytics without any personal data being stored.

---

## 9. Future Improvements

### High Priority
| Feature | Description |
|---|---|
| Stripe Billing | Full Teams plan payment flow with monthly/annual subscriptions |
| Real Geolocation API | IP-to-location lookup via ipapi.co for accurate scan geography |
| QR Code A/B Testing | Test two destination URLs against each other, measure scan conversion |

### Medium Priority
| Feature | Description |
|---|---|
| Custom Domains | Branded redirect URLs (e.g., qr.yourbrand.com instead of thateasy-qr.vercel.app) |
| Bulk QR Generation | CSV upload → batch QR export as ZIP |
| Analytics Export | Download scan data as CSV or PDF report |
| QR Folder Organisation | Group QR codes into campaigns or projects |

### Low Priority / Future
| Feature | Description |
|---|---|
| Custom Logo Upload | Upload any image to replace the branded logo in QR centre |
| Developer REST API | Real token-authenticated API for programmatic QR creation |
| React Native App | Mobile companion with camera scan and QR management |
| Team Collaboration | Multiple users on one account with role-based access (viewer, editor, admin) |
| White-label Mode | Remove Thateasy_qr branding for enterprise resellers |
