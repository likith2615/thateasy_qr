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
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

</div>

---

## ✨ Elevator Pitch

**Thateasy_qr** is a premium, editorial-grade QR code SaaS platform designed for professionals, creators, and businesses who refuse to settle for generic tools. Built on a meticulously crafted "Editorial Sanctuary" design system — warm cream backgrounds, quiet sage green accents, and classical typography — it transforms the mundane act of generating a QR code into an experience that feels like opening a beautifully typeset book. With real scannable QR generation, deep analytics, multi-type QR support (URL, vCard, WiFi, File, Link Pages), dynamic/static switching, a security-hardened Supabase backend with zero client-side key exposure, and public destination pages branded for sharing, Thateasy_qr is the QR tool that makes you proud to hand someone your link.

---

## 🖼️ Screenshots

> _Screenshots coming soon — the app is fully functional and running._

| Landing Page | QR Wizard | Analytics Dashboard |
|:---:|:---:|:---:|
| `[screenshot-landing.png]` | `[screenshot-wizard.png]` | `[screenshot-analytics.png]` |
| Hero + Live QR Sandbox | Multi-step QR creation | Scan trends & device breakdown |

| Profile Settings | Public vCard Page | Pricing |
|:---:|:---:|:---:|
| `[screenshot-profile.png]` | `[screenshot-vcard.png]` | `[screenshot-pricing.png]` |
| Avatar & plan info | Shareable digital card | Tiered plan overview |

---

## 🚀 Features

### 🎨 QR Code Engine
- **Real scannable SVG/PNG QR codes** powered by the `qrcode` npm library
- **Dot styles**: Square · Dots · Rounded · Classy
- **Eye styles**: Square · Circle · Rounded · Leaf
- **Color customization** — foreground, background, eye colors
- **Center logo overlay** — branded "T" mark embedded in QR center
- **Export** — download as SVG or high-resolution PNG
- **Compact 12% margin** — QR fills the card without dead space

### 🧙 QR Wizard (Multi-type Creation)
- **URL** — standard web link QR
- **vCard** — digital business card with name, phone, email, org
- **File Upload** — secure hosted file with download page
- **Link Page** — branded link-in-bio destination
- **WiFi** — SSID + password embedded QR

### 📊 Analytics & Dashboard
- **Overview stats** — total scans, active QRs, countries reached, scan trend graph
- **Per-QR analytics** — device breakdown (pie), OS breakdown, browser breakdown, timeline chart
- **QR management** — create, edit, delete, toggle active/inactive per code
- **File size limits** — Free plan: 1 MB · Teams plan: 20 MB

### 🔐 Auth & Security
- **Supabase GoTrue Auth** — email/password with profile seeding
- **Zero client-side key exposure** — all Supabase secrets handled via server-side Vite proxy plugin
- **Bot Prevention Pro widget** — blocks automated signup attempts
- **Terms & Conditions + Privacy Policy** — must be accepted before registration
- **Scan logs** — device/OS/browser tracked, never raw IP

### 🌍 Public Destination Pages
- **PublicLinkPage** — branded link-in-bio page for QR destination
- **PublicVCard** — digital business card with save-to-contacts
- **PublicFilePage** — secure, branded file download page
- **ScanOverlay** — scan event analytics tracking middleware

### 🎭 Registration UX
- **Gender selection** — Male / Female during signup
- **Avatar picker** — 3 male + 3 female avatars; Avatar 3 locked to Teams plan
- **Animated eyes** — close when password field is focused (delightful micro-interaction)
- **Teams plan badge** — "Coming Soon" with WhatsApp notify CTA

### 🏗️ Landing & Marketing Pages
- **Hero** — live QR Customizer sandbox with real-time scannable preview
- **Static profile cards** — LinkedIn, Instagram, GitHub presets
- **Marquee ticker** — animated QR use case labels
- **Benefits, How It Works, Testimonials, Feature Matrix, CTA Footer**
- **Blog** — SEO-optimized QR marketing articles
- **Pricing** — Free → Signup, Professional → Coming Soon, Enterprise → mailto

### 📄 Info / Use-Case Pages
Restaurant Menus · Event Tickets · Product Packaging · Business Cards · Press Kit · About · Contact · Terms & Conditions · Privacy Policy

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **UI Framework** | React | 19 |
| **Language** | TypeScript | 5.x |
| **Build Tool** | Vite | 8 |
| **Styling** | Tailwind CSS | v4 |
| **Animation** | Framer Motion | 12 |
| **Icons** | Lucide React | latest |
| **QR Engine** | qrcode (npm) | latest |
| **Backend / Auth** | Supabase (PostgreSQL + GoTrue) | latest |
| **API Proxy** | Custom Vite Plugin | — |
| **Deployment** | Vercel (serverless /api functions) | — |

---

## ⚡ Local Development Setup

### Prerequisites

- Node.js >= 20
- pnpm >= 9 (or npm >= 10)
- A [Supabase](https://supabase.com) project (free tier is fine)

### 1. Clone the repository

```bash
git clone https://github.com/likith2615/thateasy-qr.git
cd thateasy-qr
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
```

### 3. Configure environment variables

Create a `.env` file at the project root:

```env
# .env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key...
```

> **Security note:** These keys are consumed only by the server-side Vite proxy plugin. They are **never** bundled into the client JavaScript. The browser never sees your Supabase credentials.

### 4. Run the development server

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗄️ Database Setup

Run the following SQL in your **Supabase SQL editor** (Dashboard → SQL Editor → New Query).

### Create Tables

```sql
-- profiles: one row per auth user, seeded on signup
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text,
  organization text,
  avatar_url  text,
  plan        text not null default 'free' check (plan in ('free', 'teams', 'enterprise')),
  gender      text check (gender in ('male', 'female')),
  updated_at  timestamptz default now()
);

-- qrs: QR codes owned by a user
create table if not exists public.qrs (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  name            text not null,
  type            text not null check (type in ('url', 'vcard', 'file', 'linkpage', 'wifi')),
  is_dynamic      boolean not null default true,
  is_active       boolean not null default true,
  destination_url text,
  content_data    jsonb,
  styles          jsonb,
  created_at      timestamptz default now()
);

-- scans: analytics events for each QR scan
create table if not exists public.scans (
  id         uuid primary key default gen_random_uuid(),
  qr_id      uuid not null references public.qrs(id) on delete cascade,
  country    text,
  city       text,
  device     text,
  browser    text,
  os         text,
  created_at timestamptz default now()
);
```

### Enable Row Level Security

```sql
alter table public.profiles enable row level security;
alter table public.qrs      enable row level security;
alter table public.scans    enable row level security;

-- profiles: users can only read/write their own profile
create policy "profiles: self access" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

-- qrs: users can only CRUD their own QRs
create policy "qrs: owner access" on public.qrs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- scans: anyone can insert (public scanning), owner can read
create policy "scans: public insert" on public.scans
  for insert with check (true);

create policy "scans: owner read" on public.scans
  for select using (
    exists (
      select 1 from public.qrs q
      where q.id = scans.qr_id and q.user_id = auth.uid()
    )
  );
```

### Profile Auto-Seed Trigger

```sql
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, updated_at)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', new.email),
    now()
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### Performance Indexes

```sql
create index if not exists idx_qrs_user_id    on public.qrs(user_id);
create index if not exists idx_scans_qr_id    on public.scans(qr_id);
create index if not exists idx_scans_created  on public.scans(created_at desc);
```

---

## 🚢 Deployment (Vercel)

### 1. Push to GitHub

```bash
git add .
git commit -m "chore: initial production release"
git push origin main
```

### 2. Import on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"** and select your repo
3. Vercel auto-detects **Vite** — no framework override needed

### 3. Set Environment Variables

In your Vercel project → **Settings → Environment Variables**, add:

| Variable | Value |
|---|---|
| `VITE_SUPABASE_URL` | `https://your-project.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGc...` |

### 4. Deploy

Click **Deploy**. Vercel builds and ships in ~60 seconds. All `/api/*` routes are automatically served as Vercel serverless functions.

### Build Command (if overriding)

```bash
pnpm build
# output dir: dist/
```

---

## 📁 Project Structure

```
NovaQR/
├── public/
│   └── favicon.svg              # Custom QR finder-pattern favicon (sage green)
├── src/
│   ├── main.tsx                 # React entry point
│   ├── App.tsx                  # Root router & layout
│   ├── index.css                # Global styles + Tailwind v4 + Editorial tokens
│   │
│   ├── components/
│   │   ├── RealQRPattern.tsx    # Core SVG QR generator (qrcode npm)
│   │   ├── QRWizard.tsx         # Multi-step QR creation flow
│   │   ├── QRCustomizer.tsx     # Live sandbox QR customizer (landing)
│   │   ├── QRList.tsx           # Dashboard QR management table
│   │   ├── ScanOverlay.tsx      # Scan analytics tracking middleware
│   │   ├── BotPreventionPro.tsx # Bot prevention widget (auth forms)
│   │   ├── AnimatedEyes.tsx     # Eye animation widget (login form)
│   │   └── ComingSoonModal.tsx  # Teams/Professional plan CTA modal
│   │
│   ├── pages/
│   │   ├── LandingPage.tsx      # Hero, features, testimonials, CTA
│   │   ├── Dashboard.tsx        # Stats overview + scan trend chart
│   │   ├── QRAnalytics.tsx      # Per-QR device/OS/browser breakdown
│   │   ├── ProfileSettings.tsx  # Avatar, name, plan display
│   │   ├── Login.tsx            # Auth — email/password + animated eyes
│   │   ├── Register.tsx         # Auth — gender, avatar, terms accept
│   │   ├── Pricing.tsx          # Free / Professional / Enterprise tiers
│   │   ├── Blog.tsx             # SEO QR marketing articles
│   │   ├── About.tsx            # Brand story page
│   │   ├── Contact.tsx          # WhatsApp CTA + social links
│   │   ├── PressKit.tsx         # Brand assets & press info
│   │   ├── TermsAndConditions.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   ├── RestaurantMenus.tsx  # Use-case landing page
│   │   ├── EventTickets.tsx     # Use-case landing page
│   │   ├── ProductPackaging.tsx # Use-case landing page
│   │   └── BusinessCards.tsx    # Use-case landing page
│   │
│   ├── public-pages/
│   │   ├── PublicLinkPage.tsx   # Branded link-in-bio destination
│   │   ├── PublicVCard.tsx      # Digital business card (save-to-contacts)
│   │   └── PublicFilePage.tsx   # Secure file download page
│   │
│   └── lib/
│       ├── supabase.ts          # Supabase client (proxy-aware)
│       ├── db.ts                # Dual-mode DB layer (cloud + localStorage sandbox)
│       └── downloadQR.ts        # SVG/PNG export helper
│
├── vite.config.ts               # Vite config + custom API proxy plugin
├── tailwind.config.ts           # Tailwind v4 config (editorial tokens)
├── tsconfig.json
├── package.json                 # "thateasy-qr"
└── .env                         # Local secrets (never committed)
```

---

## ✅ Completed Phases

| Phase | Description | Status |
|---|---|---|
| **Phase 1** | Foundation — React + Vite + Tailwind v4 + Supabase + Proxy | ✅ Done |
| **Phase 2** | QR Code Engine — real SVG generation, styles, export | ✅ Done |
| **Phase 3** | Dashboard & Analytics — stats, charts, QR management | ✅ Done |
| **Phase 4** | Landing Page — hero sandbox, sections, marketing pages | ✅ Done |
| **Phase 5** | Info / Use-Case Pages — footer link targets | ✅ Done |
| **Phase 6** | Security Hardening — zero client-side key exposure | ✅ Done |
| **Phase 7** | Auth & Registration UX — gender, avatars, animated eyes, terms | ✅ Done |
| **Phase 8** | Brand Migration — NovaQR → Thateasy_qr, favicon, custom logger | ✅ Done |
| **Phase 9** | Public Scan Destination Pages — vCard, File, LinkPage, Overlay | ✅ Done |

---

## 🚧 Pending / Coming Soon

| Feature | Priority |
|---|---|
| 💳 **Teams Plan billing** — Stripe integration | High |
| 🎯 **Professional Plan** — 14-day free trial flow | High |
| 🌐 **Custom domains** — branded redirect URLs | Medium |
| 📦 **Bulk QR generation** — CSV import → batch export | Medium |
| 🔑 **API key access** — developer REST API | Medium |
| 📤 **Analytics export** — CSV & PDF download | Medium |
| 🖼️ **Logo upload** — custom image in QR center | Low |
| 📱 **Mobile app** — React Native companion | Future |

---

## 🤝 Contributing

Contributions are welcome and appreciated! Here's how to get involved:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "feat: add your feature"`
4. **Push** to the branch: `git push origin feature/your-feature-name`
5. **Open a Pull Request** with a clear description of what you changed and why

### Development Guidelines

- Follow the existing **Editorial Sanctuary** design system (see `src/index.css` for design tokens)
- Use **TypeScript** — no `any` types
- Keep components **focused and reusable** — one concern per file
- All new DB changes must include **RLS policies**
- Security-sensitive logic belongs in the **server-side proxy**, never in client code

---

## 📜 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 C. Likith Kumar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 👤 Creator

<div align="center">

**C. Likith Kumar**
_Full-Stack Developer · Product Designer · Maker_

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/likith-kumar-chippe/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/likith2615)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/ft_._likith)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/918179072511)

---

_"The simplest things are often the truest." — Richard Bach_

Built with 🌿 quiet intention and obsessive attention to craft.

</div>
