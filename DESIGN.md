---
name: Thateasy_qr Design System
description: An elegant, editorial design system built on Crimson Text, DM Sans, and Warm Cream.
colors:
  primary: "#8E9C78"
  primary-light: "#a8b592"
  primary-dark: "#6b7859"
  neutral-bg: "#F7F5F0"
  neutral-bg-dark: "#EDE9E0"
  neutral-ink: "#1C1C1A"
  neutral-ink-light: "#3A3A38"
  neutral-muted: "#6F6F6A"
  neutral-border: "#D8D4C8"
typography:
  display:
    fontFamily: "Crimson Text, Georgia, serif"
    fontSize: "clamp(2.5rem, 7vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Roboto Mono, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  xs: "2px"
  sm: "4px"
  md: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.xs}"
    padding: "10px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.xs}"
    padding: "10px 24px"
  button-secondary:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.xs}"
    padding: "10px 24px"
---

# Design System: Thateasy_qr

## 1. Overview

**Creative North Star: "The Editorial Sanctuary"**

Thateasy_qr's visual system reject the chaotic, flashing aesthetics of modern SaaS platforms in favor of a calm, curated editorial atmosphere. The design is styled like a high-end publication, creating a sense of quality, trust, and quiet confidence. This is achieved by combining classic serif typography, generous whitespace, sharp lines, and a warm cream-and-sage color palette. The interface serves as a background showcase, allowing the user's bespoke QR codes and public profiles to stand out.

### Key Characteristics:
- **Calm Warmth**: Rely on a warm cream canvas rather than stark white or sterile blue.
- **Editorial Contrast**: Pair elegant, expressive Crimson Text headings with highly readable, geometric DM Sans body prose.
- **Structural Lines**: Use sharp, thin borders (#D8D4C8) to organize space rather than heavy cards or drop shadows.
- **Quiet Motion**: Limit transitions to small scale adjustments, opacity crossfades, and subtle translate shifts.

---

## 2. Colors

The color palette utilizes natural tones to convey restraint and premium quality.

### Primary
- **Quiet Sage** (#8E9C78): Used for key brand actions, active navigation states, and primary status indicators. 
- **Light Sage** (#a8b592): Used for hover feedback on primary actions.
- **Dark Sage** (#6b7859): Used for active pressed states and small high-contrast sage text.

### Neutral
- **Warm Alabaster** (#F7F5F0): The main page background. It provides a tactile, warm feeling.
- **Oatmeal Tint** (#EDE9E0): Used for secondary section backgrounds, table headers, and deep sidebar layers.
- **Deep Inkstone** (#1C1C1A): The primary text color and dark ink. High contrast and highly readable.
- **Charcoal Muted** (#3A3A38): Used for subheadings and body copy on dark backgrounds.
- **Warm Grey** (#6F6F6A): Used for secondary labels, metadata, and placeholder text.
- **Parchment Border** (#D8D4C8): The standard structural border color.

**The Sage-as-Accent Rule.** Primary Sage must carry ≤15% of the total screen space. Let the warm alabaster and deep inkstone do the heavy lifting; sage's impact is in its restraint.

---

## 3. Typography

**Display Font:** Crimson Text (with Georgia, serif fallback)
**Body Font:** DM Sans (with system-ui, sans-serif fallback)
**Label/Mono Font:** Roboto Mono (with monospace fallback)

**Character:** A classic editorial pairing. Crimson Text provides a human, literary voice for headings, while DM Sans offers a clear, geometric modernism for reading data and interacting with forms.

### Hierarchy
- **Display** (600, clamp(2.5rem, 7vw, 4.5rem), 1.05): Used for large hero headings and key landing statements. Letter spacing is set to -0.02em to keep the serif crisp.
- **Headline** (600, 2rem, 1.2): Used for major page headers and section titles.
- **Title** (600, 1.25rem, 1.3): Used for sub-sections, cards, and modal headers.
- **Body** (400, 1rem, 1.6): Used for description copy, paragraph blocks, and help text. Cap line length at 65–75ch for optimal reading.
- **Label** (500, 0.75rem, 1): Used for buttons, form labels, badges, and monospaced metadata. Frequently combined with uppercase styling and wide letter-spacing.

**The Serif Headings Rule.** All h1, h2, and main card headers must use Crimson Text. Form fields, labels, buttons, and numeric dashboards must use DM Sans.

---

## 4. Elevation

Thateasy_qr uses a flat, print-like design philosophy. We rely on structural borders and tonal shading rather than layers of soft drop shadows.

**The Flat-By-Default Rule.** Elements sit flat on the Warm Alabaster surface. Borders define structural divisions. Shadows are prohibited for default state containment, but may be used as a tiny, crisp 2px displacement glow on button focus or hover states.

---

## 5. Components

### Buttons
- **Shape:** Softly squared with a minimal border radius (2px).
- **Primary:** Background is Quiet Sage (#8E9C78) and text is Warm Alabaster (#F7F5F0). Internal padding is 10px top/bottom and 24px left/right.
- **Hover / Focus:** Transition background to Light Sage (#a8b592) or Dark Sage (#6b7859) smoothly over 0.2s.
- **Secondary:** Background is Warm Alabaster (#F7F5F0) with a 1px border (#D8D4C8) and Deep Inkstone (#1C1C1A) text.
- **Hover / Focus:** Transition border to Deep Inkstone (#1C1C1A) and slightly shift background to Oatmeal Tint (#EDE9E0).

### Cards / Containers
- **Corner Style:** Squared (2px) or slightly rounded (4px) for interactive panels.
- **Background:** Crisp White (#FFFFFF) or Oatmeal Tint (#EDE9E0) depending on background contrast.
- **Shadow Strategy:** Zero shadows at rest. Uses a 1px border (#D8D4C8) to separate.
- **Internal Padding:** Spaced generously (16px to 24px).

### Inputs / Fields
- **Style:** Background is Crisp White (#FFFFFF), 1px border (#D8D4C8), and rounded to 2px.
- **Focus:** Border transitions to Quiet Sage (#8E9C78) with an optional subtle 2px glow ring of the same color.
- **Error:** Border shifts to deep rust red (#8B3A3A).

### Navigation
- **Style:** Sticky header with a translucent Warm Alabaster background (rgba(247,245,240,0.92)) and backdrop blur (12px). Uses a thin 1px bottom border (#D8D4C8).
- **Links:** Gray text (#6F6F6A) transitioning to Inkstone (#1C1C1A) on hover.

---

## 6. Do's and Don'ts

### Do:
- **Do** use `text-wrap: balance` on all Crimson Text headings to prevent ugly line breaks.
- **Do** maintain a strict 4.5:1 text-to-background contrast ratio (especially on Warm Alabaster surfaces).
- **Do** align all dashboard components to a strict 8px spacing grid.
- **Do** use inline SVGs for all custom QR pattern elements.

### Don't:
- **Don't** use neon, vibrant primary gradients (e.g. blue-to-purple) as backgrounds.
- **Don't** pair a solid border with a soft drop shadow (>8px blur) on the same container.
- **Don't** use side-stripe accent borders on alerts or status cards.
- **Don't** use large border-radii (>8px) on cards or dashboards. Keep them sharp.
- **Don't** use tiny tracked uppercase eyebrows above every single header. Keep headers organic.
