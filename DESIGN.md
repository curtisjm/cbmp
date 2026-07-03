---
name: CBMP
description: Composed, precise, operational interface language for collegiate ballroom Competition management.
colors:
  primary: "#88c0d0"
  primary-deep: "#5e81ac"
  polar-night-0: "#2e3440"
  polar-night-1: "#3b4252"
  polar-night-2: "#434c5e"
  polar-night-3: "#4c566a"
  snow-base: "#ffffff"
  snow-surface: "#fbfbfc"
  snow-storm-4: "#d8dee9"
  snow-storm-5: "#e5e9f0"
  snow-storm-6: "#eceff4"
  lifecycle-published: "#81a1c1"
  lifecycle-open: "#88c0d0"
  lifecycle-closed: "#ebcb8b"
  lifecycle-running: "#bf616a"
  lifecycle-finished: "#a3be8c"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "0"
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 650
    lineHeight: 1.25
    letterSpacing: "0"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 650
    lineHeight: 1.25
    letterSpacing: "0"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "0"
  mono:
    fontFamily: "\"JetBrains Mono\", ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "0"
rounded:
  sm: "4px"
  md: "8px"
  lg: "14px"
  xl: "18px"
  panel: "24px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  "2xl": "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.polar-night-0}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
    height: "40px"
  button-dark:
    backgroundColor: "{colors.polar-night-3}"
    textColor: "{colors.snow-storm-6}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
    height: "40px"
  card-surface:
    backgroundColor: "{colors.snow-base}"
    textColor: "{colors.polar-night-0}"
    rounded: "{rounded.panel}"
    padding: "20px"
  panel-dark:
    backgroundColor: "{colors.polar-night-0}"
    textColor: "{colors.snow-storm-6}"
    rounded: "{rounded.panel}"
    padding: "20px"
  input-search:
    backgroundColor: "{colors.snow-base}"
    textColor: "{colors.polar-night-0}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
    height: "40px"
---

# Design System: CBMP

## 1. Overview

**Creative North Star: "The Operations Ledger"**

CBMP should read like a reliable operations ledger for collegiate ballroom Competition work: light where users scan repeated data, dark where state or authority needs emphasis, and quiet enough to survive long administrative sessions. The system is composed, precise, and operational; it should help Competition Hosts, Scrutineers, Judges, Deck Captains, Competitors, and Platform Admins understand state without mistaking decoration for authority.

The visual language uses a restrained Nord palette. Snow Storm surfaces carry tables, forms, and repeated work. Polar Night surfaces carry app chrome, lifecycle modules, table header bands, and authority panels. Aurora colors are reserved for sparse lifecycle markers and status borders, always paired with text labels.

This system explicitly rejects letting operational work surfaces borrow marketing-page composition, decorative ballroom event styling, analytics theater, generic SaaS admin templates, unfamiliar standard controls, or placeholder behavior that implies unsettled domain decisions. Future marketing pages, clean decorative moments, and real analytics pages are allowed; they should extend the same composed product language instead of fighting it.

**Key Characteristics:**

- Dense but calm operational surfaces.
- Familiar shadcn-compatible controls.
- Nord color used for state and structure, not ornament.
- Light table bodies with dark state bands.
- Inter as the primary UI voice, with JetBrains Mono only for fixed-width utility data.

## 2. Colors

The palette is a restrained Nord system: Snow Storm for working surfaces, Polar Night for chrome and authority, and sparse Aurora accents for lifecycle state.

### Primary

- **Frost Accent**: Primary action and selection accent. Use it for the main action on a surface, active controls, and the "entries open" lifecycle marker.
- **Fjord Accent**: Deeper blue for secondary accent emphasis, links where needed, or selected state borders on light surfaces.

### Secondary

- **Published Blue**: Public visibility state.
- **Entry Frost**: Entries-open state and primary accent alignment.
- **Review Amber**: Entries-closed or final-review attention state.
- **Running Red**: High-attention running state. Use sparingly and always with text.
- **Archive Green**: Finished or stable archive state.

### Neutral

- **Polar Night Base**: Primary text on light surfaces and darkest operational panels.
- **Polar Night Layer**: Dark soft panel base and app chrome material.
- **Polar Night Cap**: Dark panel cap, table header band, and section header background.
- **Polar Night Muted**: Frosted nav overlay and secondary dark material.
- **Snow Base**: Primary page and card surface.
- **Snow Surface**: Slightly cool working background.
- **Snow Divider**: Borders, dividers, and table row lines.
- **Snow Muted Text**: Muted text on dark surfaces.
- **Snow High Text**: Primary text on Polar Night surfaces.

### Named Rules

**The Dark Surfaces Earn Their Keep Rule.** Polar Night is for app chrome, lifecycle, table headers, and authority context. It is not a decorative full-dashboard default.

**The Aurora Is State Rule.** Aurora colors identify lifecycle and operational state only. Do not use them as decorative confetti or section theming.

**The Light Table Body Rule.** Public Competition lists and repeated admin tables stay light and dense. Dark headers are allowed; dark data bodies are not the default.

## 3. Typography

**Display Font:** Inter, with system sans fallback.
**Body Font:** Inter, with system sans fallback.
**Label/Mono Font:** JetBrains Mono for route paths, IDs, slugs, audit references, and fixed-width utility data only.

**Character:** Inter gives CBMP a precise, modern product voice without adding theatrical flavor. JetBrains Mono is a utility instrument, not a brand voice; use it where fixed-width scanning matters and nowhere else.

### Hierarchy

- **Display** (650, 24px, 1.2): Rare product-level screen titles or prototype headers. Operational surfaces do not use marketing-scale hero type.
- **Headline** (650, 20px, 1.25): Primary panel or page section headings.
- **Title** (650, 16px, 1.25): Card titles, table module titles, and compact surface headings.
- **Body** (400, 14px, 1.45): Default UI copy, table supporting text, descriptions, and empty states. Keep prose near 65-75ch where it is explanatory.
- **Label** (650, 12px, 1.2): Badges, compact metadata, table headers, and control labels. No wide tracking.
- **Mono** (500, 12px, 1.35): Routes, stable IDs, slugs, audit references, and fixed-width comparison data.

### Named Rules

**The Sans-First Rule.** Inter carries the product. Do not introduce display fonts, decorative fonts, or serif pairings for operational screens.

**The Mono Is Evidence Rule.** JetBrains Mono marks inspectable data, not style. Never use it for headings, buttons, navigation, role labels, or prose.

**The Numbers Align Rule.** Numeric columns use tabular numerals in Inter before reaching for mono. Entries, counts, and totals should align without making the table feel like a developer console.

## 4. Elevation

CBMP uses tonal layering first and restrained shadow second. Most depth comes from light surfaces against Snow backgrounds, Polar Night sections, borders, and header bands. Shadows must remain shallow and structural; if a surface looks like a floating marketing card, it is too decorative.

### Shadow Vocabulary

- **Nord Panel** (`0 12px 26px rgb(46 52 64 / 0.1)`): Raised white panels and table containers against the Snow Surface background.
- **Frosted Nav** (`inset 0 1px 0 rgb(236 239 244 / 0.1), 0 10px 22px rgb(46 52 64 / 0.12)`): Sticky Polar Night navigation with blur.
- **Dark Inset** (`inset 0 1px 0 rgb(236 239 244 / 0.08)`): Dark panels that need a subtle top-edge material cue.
- **Prototype Control** (`0 12px 22px rgb(46 52 64 / 0.18)`): Development-only floating switchers and temporary prototype tools.

### Named Rules

**The Tonal Layering Rule.** Prefer background, border, and header-band contrast before adding a shadow.

**The No Ghost Card Rule.** Do not combine a visible border with a broad soft shadow as decoration. If both exist, the shadow must be shallow and structural.

## 5. Components

### Buttons

- **Shape:** Full pill controls for buttons and compact actions.
- **Primary:** Frost Accent background with Polar Night text, 40px height, 16px horizontal padding.
- **Hover / Focus:** Slight tonal shift only. Focus uses the Frost Accent ring.
- **Dark:** Translucent white-on-Polar-Night treatment for nav and dark panels.
- **Secondary / Outline:** Light surface controls use Snow Base, Snow Divider borders, and Polar Night text.

### Chips

- **Style:** Small pill badges with text plus color when representing state.
- **State:** Lifecycle chips always include a text label and a dot or border; color alone is forbidden.
- **Usage:** Use for lifecycle markers, route labels, prototype tags, and compact status context.

### Cards / Containers

- **Corner Style:** Rounded panels, generally 24px for major cards and 14-18px for smaller inner controls.
- **Background:** Snow Base for repeated work, Polar Night Base/Layer for lifecycle and authority context.
- **Shadow Strategy:** Nord Panel on light raised containers; Dark Inset on dark panels.
- **Border:** Snow Divider on light surfaces; translucent Snow Divider on dark surfaces.
- **Internal Padding:** 16-20px for normal panels; 12-16px for dense operational sections.

### Inputs / Fields

- **Style:** Full-pill search and filter fields with Snow Base background on light surfaces.
- **Focus:** Frost Accent focus ring with no dramatic glow.
- **Dark Inputs:** Glass input treatment is allowed in the top nav only, with strong placeholder contrast.
- **Error / Disabled:** Error uses Running Red with text. Disabled uses opacity reduction and must remain readable.

### Navigation

- **Style:** Frosted Polar Night app chrome, not a decorative floating pill. Keep it compact, sticky, and operational.
- **Active State:** Active nav item uses Snow Base with Polar Night text.
- **Hover:** Subtle translucent highlight, never saturated color.
- **Mobile Treatment:** Collapse vertically before inventing new behavior. If the prototype evolves, use a standard Sheet-like menu rather than custom navigation.

### Tables

- **Header:** Polar Night header band with Snow High Text.
- **Body:** Snow Base body, dense rows, 12-14px table text, and visible row dividers.
- **Numeric Data:** Right-align numeric columns and use tabular numerals.
- **Routes / IDs:** Use JetBrains Mono for route paths and stable identifiers.

### Lifecycle Modules

- **Style:** Dark operational panels with text labels, route tags, and sparse Aurora state markers.
- **Authority:** Role and authority panels use Polar Night only when the user needs to distinguish public inspection from privileged actions.
- **Constraint:** Do not invent role dashboards or authority behavior that has not been defined by PRDs.

## 6. Do's and Don'ts

### Do:

- **Do** use Inter as the primary UI font for navigation, labels, controls, tables, and body copy.
- **Do** use JetBrains Mono only for route paths, IDs, slugs, audit references, and other fixed-width utility data.
- **Do** keep core controls familiar and shadcn-compatible.
- **Do** use Polar Night for top chrome, lifecycle modules, table headers, and authority panels.
- **Do** keep public Competition tables light, dense, and readable.
- **Do** pair every status color with a text label.
- **Do** preserve domain language from the glossary: User Profile, Competition, Entry, Competition Lifecycle, Scrutineer, Judge, Deck Captain, and Organization.
- **Do** target WCAG 2.2 AA contrast and keep text readable in imperfect competition-day environments.

### Don't:

- **Don't** let operational app surfaces feel like marketing landing pages; marketing pages are allowed later, but they must use CBMP's clean composed language.
- **Don't** use decorative ballroom cliches or ornament on operational pages; clean modern decorative elements are allowed where they do not obscure workflow.
- **Don't** ship analytics theater, placeholder metrics, or fake dashboards; real analytics pages must be grounded in real domain questions and data.
- **Don't** make CBMP feel like a generic SaaS admin template.
- **Don't** use oversized hero sections, ornamental card grids, or ballroom cliches on operational routes.
- **Don't** imply product behavior, role authority, or dashboards that have not been defined by PRDs or domain decisions.
- **Don't** use unfamiliar controls for standard actions.
- **Don't** bring in full dark mode by default; dark surfaces need an operational reason.
- **Don't** use JetBrains Mono for headings, buttons, role labels, or general table text.
- **Don't** rely on color alone for lifecycle or action state.
