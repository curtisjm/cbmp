---
name: CBMP
description: Composed Competition operations with restrained Nord clarity.
colors:
  primary: "#87bfcf"
  primary-hover: "#76b1c1"
  primary-pressed: "#65a2b3"
  accent: "#5d81ac"
  background: "#f9fafb"
  surface-raised: "#ffffff"
  surface-subtle: "#f2f4f8"
  surface-muted: "#eceff4"
  surface-selected: "#e2f0f3"
  border: "#d8dee9"
  foreground: "#1e2229"
  muted-foreground: "#4e586a"
  disabled-foreground: "#5c677a"
  sidebar-accent: "#373d48"
  lifecycle-published: "#84a1bd"
  lifecycle-closed: "#ebca89"
  lifecycle-running: "#bf636d"
  lifecycle-finished: "#a4bf8d"
  info-strong: "#476e9e"
  warning-strong: "#8a6a28"
  destructive-strong: "#a3434c"
  success-strong: "#57743e"
typography:
  display:
    fontFamily: "var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "48px"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "0"
  headline:
    fontFamily: "var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "30px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0"
  title:
    fontFamily: "var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0"
  body:
    fontFamily: "var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0"
  label:
    fontFamily: "var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "0"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "12px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  2xl: "24px"
  section: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "40px"
  button-primary-active:
    backgroundColor: "{colors.primary-pressed}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "40px"
  button-outline:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "40px"
  input-field:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
    height: "40px"
  status-chip:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  independent-card:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "20px"
  navigation-active:
    backgroundColor: "{colors.surface-selected}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
    height: "40px"
---

# Design System: CBMP

## 1. Overview

**Creative North Star: "The Competition Control Surface"**

CBMP is a composed, precise, operational control surface for collegiate ballroom Competition work. It gives Competition Hosts, Scrutineers, Judges, Deck Captains, Competitors, Organization Admins, and Platform Admins a calm shared frame for understanding state and taking careful action on laptops and tablets in imperfect competition-day light.

The system uses restrained Nord color, compact Inter typography, flat sections, and visible dividers to keep dense information trustworthy. It explicitly rejects marketing-page composition on operational routes, decorative ballroom event styling, analytics theater, generic SaaS admin templates, and any visual treatment that implies unsettled authority or behavior.

**Key Characteristics:**

- Dense but calm operational surfaces.
- Flat section-and-divider composition before cards.
- Familiar shadcn-compatible controls with 8px working corners.
- Nord color used for state and structure, never ornament.
- Short functional feedback with no page-load choreography.
- Mobile navigation through a standard left Sheet.

## 2. Colors

Snow Storm surfaces hold repeated work, Polar Night carries ink and app chrome, Frost marks selection and primary action, and Aurora colors identify lifecycle state.

### Primary

- **Frost Primary** (`colors.primary`): The principal action, selected control, and Entries Open cue. Its explicit hover and pressed tones prevent opacity-washed interaction states.
- **Fjord Focus** (`colors.accent`): Focus rings, links, and sparse emphasis that must remain visible against Snow Storm surfaces.

### Secondary

- **Published Blue** (`colors.lifecycle-published`): Publicly visible Competition state.
- **Review Amber** (`colors.lifecycle-closed`): Entries Closed and review attention.
- **Running Red** (`colors.lifecycle-running`): Running or destructive state; always paired with direct language.
- **Archive Green** (`colors.lifecycle-finished`): Finished, ready, or successfully completed state.
- **Strong Semantic Ink** (`colors.info-strong`, `colors.warning-strong`, `colors.destructive-strong`, `colors.success-strong`): Contrast-safe text and essential icons; the softer Aurora colors remain background, border, and dot roles.

### Neutral

- **Polar Night Ink** (`colors.foreground`): Primary text and dark operational chrome.
- **Polar Night Layer** (`colors.sidebar-accent`): Active and hover material inside the app sidebar.
- **Snow Field** (`colors.background`): Default page background.
- **Snow Raised** (`colors.surface-raised`): Inputs and genuinely independent bounded objects.
- **Snow Subtle** (`colors.surface-subtle`): Read-only, disabled, and low-emphasis regions.
- **Snow Muted** (`colors.surface-muted`): Hover bands, quiet section fills, and neutral chips.
- **Frost Selection** (`colors.surface-selected`): Selected public navigation and low-intensity active state.
- **Snow Divider** (`colors.border`): One-pixel rules between rows and regions.
- **Muted Ink** (`colors.muted-foreground`): Supporting text that still meets body-text contrast requirements.

### Named Rules

**The Aurora Is State Rule.** Aurora colors identify lifecycle, success, warning, or destructive state only; decorative color coding is forbidden.

**The Soft Field, Strong Ink Rule.** Soft Aurora colors may fill a background or dot, but essential status text and icons always use their contrast-safe strong semantic foreground.

**The Contrast Is Operational Rule.** Body text must meet 4.5:1, large text and non-text controls must meet 3:1, and the Fjord focus ring must remain visible against every working surface.

**The Dark Surfaces Earn Their Keep Rule.** Polar Night belongs on app chrome, authority context, and a small number of high-signal bands; a decorative full-dark dashboard is forbidden.

## 3. Typography

**Display Font:** Inter, with UI sans and system fallbacks.
**Body Font:** Inter, with UI sans and system fallbacks.
**Label Font:** Inter, with UI sans and system fallbacks.

**Character:** Inter keeps the interface direct and modern without turning labels into decoration. One family carries public and operational surfaces; hierarchy comes from size, weight, spacing, and placement.

### Hierarchy

- **Display** (600, 48px, 1.08): Public-home headline only; it is never used for an operational page title.
- **Headline** (600, 30px, 1.25): Public entry pages and the largest operational title at wide viewports.
- **Title** (600, 18px, 1.25): Section headings, Competition names, and primary panel titles.
- **Body** (400, 14px, 1.45): Default interface copy and repeated records; explanatory prose stays within 65-75 characters per line.
- **Label** (500, 12px, 1.25): Metadata, compact state context, and table labels; sentence case with no decorative tracking.

### Named Rules

**The One Sans Rule.** Inter carries headings, navigation, controls, labels, and data; decorative type pairings are prohibited.

**The Heading Owner Rule.** Pages own semantic heading levels; reusable card titles provide styling only and never force an `h3` into the document outline.

**The Numbers Align Rule.** Counts, percentages, Entries, and totals use tabular numerals before any special typeface is introduced.

## 4. Elevation

CBMP is flat by default. Background shifts, one-pixel dividers, sticky positioning, and Polar Night bands establish hierarchy; shadows appear only when an overlay must separate from the work beneath it.

### Shadow Vocabulary

- **Flat Panel** (`none`): Default cards, list regions, tables, and section containers.
- **Elevated Overlay** (`0 4px 8px -4px hsl(220 16% 14% / 0.24)`): Sheets and tooltips only.
- **Dark Inset** (`inset 0 1px 0 hsl(218 27% 94% / 0.08)`): Optional material edge inside Polar Night chrome.

### Named Rules

**The Tonal Layering Rule.** Use surface tone, border, or divider before adding any shadow.

**The No Ghost Card Rule.** A visible border and a broad soft shadow must never decorate the same object; if a bounded object floats like a marketing card, the elevation is wrong.

## 5. Components

### Buttons

- **Shape:** Rectangular working controls with gently curved corners (8px); icon buttons remain 40px square.
- **Primary:** Frost background, Polar Night text, 40px height, and 16px horizontal padding.
- **Hover / Active:** Explicit Frost hover and pressed tones with a 150ms color transition; no translation, bounce, glow, or decorative shadow.
- **Focus / Disabled:** A two-pixel Fjord ring with a two-pixel offset; disabled controls remain legible and do not rely on extreme opacity.
- **Outline / Ghost / Dark:** Raised Snow with a divider border, transparent Snow hover, or translucent white on Polar Night respectively.

### Chips

- **Style:** Full pills are reserved for status, compact preview labels, and true session toggles.
- **State:** Lifecycle chips include a text label plus a dot, border, or icon; color alone is never sufficient.
- **Contrast:** Soft Aurora supplies the field or marker; the matching strong semantic foreground supplies essential status text and icons.
- **Constraint:** Ordinary buttons, inputs, navigation items, and cards are never pills.

### Cards / Containers

- **Corner Style:** Independent bounded objects use a 10px radius and a one-pixel Snow Divider border.
- **Background:** Snow Raised on light pages; Polar Night only for earned operational emphasis.
- **Shadow Strategy:** Flat at rest; normal cards never receive a decorative shadow.
- **Internal Padding:** 20px for a bounded object; dense section rows use 12-16px.
- **Composition:** Page hierarchy defaults to headings, tonal bands, border rules, and divided lists.

**The Independent Object Rule.** A card is allowed only when its contents form one independently bounded object; cards inside cards are forbidden.

### Inputs / Fields

- **Style:** Snow Raised background, one-pixel input border, 8px radius, 40px height, and 12px horizontal padding.
- **Focus:** Fjord border and two-pixel ring; the measured focus treatment exceeds the 3:1 non-text contrast requirement on Snow Field.
- **Error / Read-only / Disabled:** Running Red border for invalid fields, Snow Subtle fill for read-only and disabled fields, and readable Disabled Ink instead of washed-out opacity.

### Navigation

- **Public:** Compact 64px fixed header, 8px navigation corners, Frost Selection active state, and quiet Snow hover.
- **App:** Polar Night sidebar with a restrained Layer active state; collapsed icon navigation always retains accessible names and tooltips.
- **Mobile:** Public links expand inline; app navigation uses a standard left Sheet no wider than 22rem or 86vw.
- **Responsive Frame:** Use `100dvh` for app-height geometry and the shared 640px, 768px, 1024px, 1280px, and 1536px breakpoints for structural changes.

### Lists, Tables, and Operational Sections

- **Structure:** One section heading, one shared header where needed, and `divide-y` rows; metadata aligns in columns without putting every value in a mini-card.
- **Density:** Repeated records use 12-14px text, 12-16px row padding, visible dividers, and tabular numerals for counts.
- **Responsive Behavior:** Hide or stack secondary columns before shrinking text; controls remain at least 40px high and mobile navigation targets reach 44px where space permits.

### Motion and Accessibility

- **Motion:** Functional color and width feedback uses 150ms ease-out; Sheet transitions may use 200ms. There are no staggered page-load reveals or decorative entrance sequences.
- **Reduced Motion:** Movement and width transitions become immediate under `prefers-reduced-motion`; content is always visible without animation.
- **Semantics:** Every page keeps one clear `h1`, heading levels remain ordered, controls retain accessible names, and state is never communicated by color alone.
- **Target:** WCAG 2.2 AA for text, focus, controls, navigation, tables, badges, and empty states.

## 6. Do's and Don'ts

### Do:

- Do use Inter for headings, navigation, controls, labels, and repeated data.
- Do build dashboards from flat sections, tonal bands, shared headers, and divided rows before reaching for a card.
- Do reserve cards for genuinely independent bounded objects and keep their contents flat.
- Do use 8px corners for working controls, 10px corners for independent cards, and full pills only for status or true toggles.
- Do pair every lifecycle and action color with a text label, icon, border, or other non-color cue.
- Do keep public Competition lists light, dense, readable, and grounded in real domain questions.
- Do use familiar shadcn-compatible controls and a standard Sheet for mobile app navigation.
- Do keep functional feedback near 150ms and make movement immediate under reduced motion.
- Do preserve the domain language User Profile, Competition, Entry, Competition Lifecycle, Scrutineer, Judge, Deck Captain, and Organization.

### Don't:

- Don't let operational app surfaces feel like marketing pages or decorative ballroom event sites.
- Don't use decorative ballroom cliches, oversized heroes, or ornamental card grids on operational routes.
- Don't ship analytics theater, placeholder metrics, fake actor dashboards, or generic SaaS admin-template composition.
- Don't use placeholder content that implies unsettled product behavior, role authority, or authorization decisions.
- Don't use unfamiliar controls for standard actions.
- Don't nest cards or box every metric, metadata value, checklist row, or navigation group.
- Don't combine a visible border with a broad soft shadow, gradient text, decorative glassmorphism, side-stripe accents, or repeating stripe backgrounds.
- Don't use tiny uppercase tracked eyebrows as repeated section scaffolding.
- Don't rely on color alone for lifecycle, success, warning, destructive, selected, or disabled state.
- Don't use page-load choreography, bounce, elastic motion, or animations that hide content before JavaScript runs.
- Don't introduce full dark mode by default; every dark surface needs an operational reason.
- Don't reduce body, placeholder, disabled, or soon-state text below readable contrast.
