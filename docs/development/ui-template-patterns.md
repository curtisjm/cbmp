# UI Template Pattern Inventory

Date: 2026-07-09

This inventory records which Swift Cloud Space patterns CBMP adapted, deferred, or rejected during the UI refresh. The template is a composition reference, not a source of product behavior, permissions, seeded data, or visual authority beyond the decisions recorded here and in `DESIGN.md`.

Template root: `/Users/curtis/dev/swift-cloud-space`

## Status Vocabulary

- `implemented/adapted`: Present in CBMP after being reshaped for the Competition domain and current design system.
- `future/reference`: Useful source material for a later product slice, but not current behavior.
- `requires dependency`: Relevant only when a product issue deliberately adds the associated behavior and dependency.
- `avoid`: A template pattern CBMP intentionally rejects.

## Pattern Inventory

| Component or pattern | CBMP use case | Template example source | Status | Notes or constraints |
|---|---|---|---|---|
| Tailwind/shadcn token foundation | Global Nord roles and familiar primitives | `/Users/curtis/dev/swift-cloud-space/src/index.css`, `/Users/curtis/dev/swift-cloud-space/tailwind.config.ts`, `/Users/curtis/dev/swift-cloud-space/components.json` | implemented/adapted | CBMP keeps semantic CSS variables and conventional variants, but uses contrast-safe Nord roles, 8px working controls, flat cards, and strong semantic foregrounds. |
| `components/ui` primitive APIs | Button, Card, Badge, Input, Sheet, and Tooltip | `/Users/curtis/dev/swift-cloud-space/src/components/ui/*` | implemented/adapted | APIs remain familiar. CBMP does not copy the template's pill buttons, shadowed card defaults, or forced card-title heading level. |
| Public layout, navbar, and footer | Home, Competitions, Sign in, Coming soon | `/Users/curtis/dev/swift-cloud-space/src/components/layout/PublicLayout.tsx`, `/Users/curtis/dev/swift-cloud-space/src/components/layout/Navbar.tsx`, `/Users/curtis/dev/swift-cloud-space/src/components/layout/Footer.tsx` | implemented/adapted | Navigation is compact and CBMP-specific, uses rectangular active states, and avoids the template's mobile-menu overlap. |
| Landing composition rhythm | Public-home hero, alternating tonal sections, product preview | `/Users/curtis/dev/swift-cloud-space/src/pages/Landing.tsx` | implemented/adapted | CBMP borrows first-viewport balance and section rhythm without cloud imagery, glow decoration, or reveal choreography. |
| Animated landing and page reveals | Marketing entrances and staggered content | `/Users/curtis/dev/swift-cloud-space/src/pages/Landing.tsx` | avoid | CBMP ships visible content by default. Framer Motion is not installed; page-load choreography and staggered reveals are not part of the system. |
| Bento and identical feature-card grids | Marketing feature scaffolding | `/Users/curtis/dev/swift-cloud-space/src/components/ui/bento-grid.tsx`, `/Users/curtis/dev/swift-cloud-space/src/components/ui/accordion-feature-section.tsx` | avoid | CBMP uses flat linked rows, divided sections, and varied composition instead of ornamental card grids. |
| Live demo status pill | Explicit preview/demo disclosure | `/Users/curtis/dev/swift-cloud-space/src/pages/Landing.tsx` | implemented/adapted | A compact pill is valid because it communicates status; it must not imply production readiness. |
| Whole-row linked workflows | Role and workflow navigation | `/Users/curtis/dev/swift-cloud-space/src/pages/Landing.tsx` | implemented/adapted | CBMP makes the full row keyboard-accessible and uses dividers instead of wrapping every destination in a card. |
| Authenticated app shell | `/app` overview and Competition workspace frame | `/Users/curtis/dev/swift-cloud-space/src/components/layout/AppLayout.tsx` | implemented/adapted | The sidebar/header/content geometry is the template's strongest contribution. CBMP uses `100dvh` and omits unrelated floating AI controls. |
| Collapsible sidebar | Operational module navigation | `/Users/curtis/dev/swift-cloud-space/src/components/layout/AppSidebar.tsx` | implemented/adapted | Neutral module labels and accessible tooltips remain; role-labeled navigation waits for defined permissions. |
| Mobile Sheet navigation | Mobile app and Competition workspace navigation | `/Users/curtis/dev/swift-cloud-space/src/components/layout/MobileNav.tsx`, `/Users/curtis/dev/swift-cloud-space/src/components/ui/sheet.tsx` | implemented/adapted | Uses the standard left Sheet pattern with named controls, immediate reduced-motion behavior, and readable disabled/soon labels. |
| App-header global search | Future real cross-product search | `/Users/curtis/dev/swift-cloud-space/src/components/layout/AppHeader.tsx` | future/reference | The inert read-only search preview was removed. Do not restore it until search has real scope and behavior. |
| Dashboard metric cards | Operational summaries | `/Users/curtis/dev/swift-cloud-space/src/pages/app/Dashboard.tsx` | avoid | CBMP uses inline summary strips and definition-list bands. Repeated metric cards read as analytics theater and generic SaaS scaffolding. |
| Recent-items card beside secondary cards | Dashboard overview composition | `/Users/curtis/dev/swift-cloud-space/src/pages/app/Dashboard.tsx` | avoid | Use one primary list and separate flat sections; never reproduce a card containing bordered mini-cards. |
| Dense CSS-grid file list | Future Entries, documents, and resource records | `/Users/curtis/dev/swift-cloud-space/src/pages/app/Files.tsx` | future/reference | Borrow column rhythm and responsive reduction, but prefer semantic tables or lists with shared headers and dividers. |
| Grid resource cards | Future document or media browsing | `/Users/curtis/dev/swift-cloud-space/src/pages/app/Files.tsx` | future/reference | Valid only when a visual resource truly benefits from gallery browsing; it is not an alternate view for Competition discovery by default. |
| Bulk action toolbar | Future multi-select administration | `/Users/curtis/dev/swift-cloud-space/src/pages/app/Files.tsx` | future/reference | Requires real selection, actions, confirmation, and undo. Never add inert bulk controls. |
| Login split panel | Clerk sign-in and unconfigured fallback | `/Users/curtis/dev/swift-cloud-space/src/pages/auth/Login.tsx` | implemented/adapted | CBMP keeps the calm split rhythm and replaces nested preview cards with a flat operational list. Demo credentials and Supabase wiring are forbidden. |
| Dropdown menu | Future account and row actions | `/Users/curtis/dev/swift-cloud-space/src/components/ui/dropdown-menu.tsx` | future/reference | Add the primitive only when a real interaction needs it. |
| Tooltip | Collapsed navigation and icon-only controls | `/Users/curtis/dev/swift-cloud-space/src/components/ui/tooltip.tsx` | implemented/adapted | Tooltips supplement, but never replace, accessible names. |
| Dialog primitive | Future bounded confirmation or creation flows | `/Users/curtis/dev/swift-cloud-space/src/components/ui/dialog.tsx` | future/reference | Exhaust inline and progressive alternatives before adding a modal. |
| Toast feedback | Future save, copy, upload, and background-action feedback | `/Users/curtis/dev/swift-cloud-space/src/components/ui/sonner.tsx`, `/Users/curtis/dev/swift-cloud-space/src/components/ui/toaster.tsx` | future/reference | Add only with implemented actions; do not install Sonner for placeholder feedback. |
| Upload dropzone | Future document or resource intake | `/Users/curtis/dev/swift-cloud-space/src/components/files/FileUpload.tsx` | requires dependency | Requires a deliberate upload issue, validation design, and `react-dropzone` or an equivalent dependency. |
| Share/access dialog | Future public links and permissions | `/Users/curtis/dev/swift-cloud-space/src/components/files/FileShareDialog.tsx` | future/reference | Any adaptation must respect Clerk identity and Convex-owned authorization boundaries. |
| Decorative cloud, radial glow, gradient text, and broad shadows | Template atmosphere | `/Users/curtis/dev/swift-cloud-space/src/pages/Landing.tsx`, `/Users/curtis/dev/swift-cloud-space/src/index.css` | avoid | These treatments obscure the composed operational register and trigger the design system's anti-pattern rules. |
| Spring/bounce sidebar indicator | Active navigation motion | `/Users/curtis/dev/swift-cloud-space/src/components/layout/AppSidebar.tsx` | avoid | CBMP uses a 150ms color or width transition and disables movement under reduced motion. Bounce and elastic motion are forbidden. |
| Public mobile-menu overlap behavior | Template mobile navigation | `/Users/curtis/dev/swift-cloud-space/src/components/layout/Navbar.tsx` | avoid | CBMP's mobile navigation expands inside fixed chrome without covering the first content heading. |

## Dependency Notes

The template uses a broad Radix/shadcn stack plus `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, Framer Motion, Sonner, `tailwindcss-animate`, and feature-specific file packages. CBMP deliberately keeps the implemented set smaller:

- Tailwind CSS, `class-variance-authority`, `clsx`, and `tailwind-merge` support the current token and variant system.
- Radix dependencies are added only for implemented interaction primitives such as Sheet and Tooltip.
- Lucide supplies the single icon vocabulary.
- Framer Motion is not installed; current feedback is CSS-based and content never depends on an entrance animation.
- Sonner, upload, sharing, dropdown, and other feature-specific dependencies remain deferred until concrete product behavior requires them.
