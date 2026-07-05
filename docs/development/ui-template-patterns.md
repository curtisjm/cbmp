# UI Template Pattern Inventory

Date: 2026-07-05

This inventory maps useful Swift Cloud Space template patterns to CBMP use cases. It supports the issue 3 UI redesign brief and should be updated as implementation workers discover, adapt, or reject additional patterns.

Template root: `/home/curtis/dev/swift-cloud-space`

## Status Vocabulary

- `use now`: Implement in the current issue 3 redesign.
- `future/reference`: Keep as a documented pattern for later product slices.
- `requires dependency`: Useful only when the related dependency or behavior is deliberately added.
- `avoid`: Do not copy directly into CBMP.

## Pattern Inventory

| Component or pattern | CBMP use case | Template example source | Status | Notes or constraints |
|---|---|---|---|---|
| Tailwind/shadcn token foundation | Global CBMP styling, Nord color roles, shadcn-compatible primitives | `/home/curtis/dev/swift-cloud-space/src/index.css`, `/home/curtis/dev/swift-cloud-space/tailwind.config.ts`, `/home/curtis/dev/swift-cloud-space/components.json` | use now | Implemented through Tailwind config, shadcn-compatible CSS variables, Nord-informed lifecycle colors, and wholesale replacement of the old global stylesheet direction. |
| `components/ui` primitive layout | Shared Button, Card, Badge, Input, Sheet, Tooltip, and related primitives | `/home/curtis/dev/swift-cloud-space/src/components/ui/*` | use now | Implemented primitives support current public, auth, and `/app` surfaces. Dropdown Menu, Tabs, and Separator are reference-only template patterns and should not be kept locally without a current behavior surface. |
| Public layout, navbar, and footer | Public home, `/competitions`, `/sign-in`, and future marketing routes | `/home/curtis/dev/swift-cloud-space/src/components/layout/PublicLayout.tsx`, `/home/curtis/dev/swift-cloud-space/src/components/layout/Navbar.tsx`, `/home/curtis/dev/swift-cloud-space/src/components/layout/Footer.tsx` | use now | Keep navigation compact and CBMP-specific. Avoid the template mobile menu overlap observed during rendered inspection. |
| Animated landing hero | CBMP home first viewport with animated product mockup and marketing motion | `/home/curtis/dev/swift-cloud-space/src/pages/Landing.tsx` | use now | Preserve the template's animated feel, but replace cloud-storage metaphors with CBMP product mockups, lifecycle cues, and conservative product copy. Keep animations short and visible even when OS reduced motion is enabled. |
| Landing feature/bento sections | Home role cards, lifecycle section, and future marketing scaffolding | `/home/curtis/dev/swift-cloud-space/src/components/ui/bento-grid.tsx`, `/home/curtis/dev/swift-cloud-space/src/components/ui/accordion-feature-section.tsx`, `/home/curtis/dev/swift-cloud-space/src/pages/Landing.tsx` | use now | Implemented as restrained sections and cards, not literal template bento components. Keep room for future CBMP marketing content without overpromising unfinished product behavior. |
| Live demo pill | Public home or reference surfaces that need to disclose prototype/demo status without dominating the page | `/home/curtis/dev/swift-cloud-space/src/pages/Landing.tsx` | use now | Use as a compact, high-signal status pill near previews or calls to action. Keep label language explicit, such as `Live demo`, `Reference`, or `Preview`, and avoid implying production readiness. |
| Interactive home cards | Public home role/workflow cards that can route to placeholder or future surfaces | `/home/curtis/dev/swift-cloud-space/src/pages/Landing.tsx`, `/home/curtis/dev/swift-cloud-space/src/components/ui/bento-grid.tsx` | use now | Cards may link to `/coming-soon?surface=...` until product routes are real. Keep the whole card keyboard-accessible, preserve visible focus states, and make the temporary destination clear. |
| Authenticated app shell | `/app` prototype/reference shell and future authenticated workspace frame | `/home/curtis/dev/swift-cloud-space/src/components/layout/AppLayout.tsx` | use now | Strongest template reference for CBMP's operational center of gravity. Remove unrelated floating AI controls. |
| Collapsible sidebar | Reference app navigation and future authenticated module navigation | `/home/curtis/dev/swift-cloud-space/src/components/layout/AppSidebar.tsx` | use now | Use neutral module labels such as Overview, Competitions, Entries, Schedule, Officials, Results, Settings. Avoid role-labeled groups until permissions are specified. |
| Mobile sheet navigation | Mobile `/app` reference navigation | `/home/curtis/dev/swift-cloud-space/src/components/layout/MobileNav.tsx` | use now | Use Radix Sheet-style behavior. Future/disabled items may use a small `soon` badge. |
| App header search and account controls | `/app` reference header and future global search/account area | `/home/curtis/dev/swift-cloud-space/src/components/layout/AppHeader.tsx` | use now | Implemented as a read-only search preview and prototype badge. Do not imply platform-wide search or account behavior prematurely. |
| Dashboard stat cards | `/app` overview widgets and future operational summaries | `/home/curtis/dev/swift-cloud-space/src/pages/app/Dashboard.tsx` | use now | Use fake but domain-plausible fixture data. Keep typography compact and avoid fake analytics theater. |
| CSS-grid file list treatment | Visual inspiration for dense records and resource lists | `/home/curtis/dev/swift-cloud-space/src/pages/app/Files.tsx` | future/reference | Borrow density and rhythm, but prefer semantic table/list/card markup for public Competition discovery and data-heavy records. |
| Grid resource cards | Gallery-like alternate browsing texture for resource surfaces | `/home/curtis/dev/swift-cloud-space/src/pages/app/Files.tsx` | future/reference | Useful for document/resource browsing later. Avoid implementing list/grid toggle on `/competitions` unless it adds clear value. |
| Bulk action toolbar | Future multi-select workflows for entries, documents, or admin records | `/home/curtis/dev/swift-cloud-space/src/pages/app/Files.tsx` | future/reference | Requires real selection and actions. Do not add inert bulk actions to issue 3. |
| Login split panel | CBMP `/sign-in` fallback/entry surface | `/home/curtis/dev/swift-cloud-space/src/pages/auth/Login.tsx` | use now | Keep calm split-panel rhythm. Do not copy demo credentials or Supabase auth wiring. Preserve Clerk fallback expectations. |
| Dropdown menu | Future account/navigation affordances in app header and shell | `/home/curtis/dev/swift-cloud-space/src/components/ui/dropdown-menu.tsx` | future/reference | Template reference only. Do not install the Radix package or add a local primitive until a real interaction needs menu behavior. |
| Tooltip | Collapsed sidebar labels and icon-only controls | `/home/curtis/dev/swift-cloud-space/src/components/ui/tooltip.tsx` | use now | Important if the sidebar collapses to icon-only controls. Ensure icon buttons also have accessible names. |
| Sheet primitive | Mobile `/app` navigation | `/home/curtis/dev/swift-cloud-space/src/components/ui/sheet.tsx` | use now | Implemented through Radix Dialog under a Sheet API. Keep it focused on navigation until a concrete modal flow is specified. |
| Dialog primitive | Future modal flows | `/home/curtis/dev/swift-cloud-space/src/components/ui/dialog.tsx` | future/reference | No standalone Dialog surface is implemented in this pass. Add only when a current interaction needs it. |
| Framer Motion animation language | Home marketing motion, app shell transitions, list/surface motion | `/home/curtis/dev/swift-cloud-space/src/pages/Landing.tsx`, `/home/curtis/dev/swift-cloud-space/src/components/layout/AppSidebar.tsx` | use now | Include now while the template's motion language is in context. User preference is to keep these animations visible even with OS reduced motion enabled, using short durations and non-blocking effects instead of a global animation shutdown. |
| Old Impeccable-era lifecycle component | Historical home lifecycle/role block | Previous CBMP prototype CSS classes such as `home-ledger`, `lifecycle-list`, and `role-chip-list` | avoid | Retired in favor of shared CBMP fixtures and template-led Tailwind/shadcn surfaces. Do not preserve or revive the old component styling. |
| Toast notifications with Sonner | Future user feedback for save/copy/upload actions | `/home/curtis/dev/swift-cloud-space/src/components/ui/sonner.tsx`, `/home/curtis/dev/swift-cloud-space/src/components/ui/toaster.tsx` | future/reference | Document only for now. Do not add `sonner` until an implemented interaction needs feedback. |
| Upload dropzone | Future document or resource intake | `/home/curtis/dev/swift-cloud-space/src/components/files/FileUpload.tsx` | requires dependency | Requires `react-dropzone`. Only include when a CBMP issue explicitly needs uploads. |
| Share/access dialog | Future public links, permissions, or role-based sharing surfaces | `/home/curtis/dev/swift-cloud-space/src/components/files/FileShareDialog.tsx` | future/reference | Adapt permissions carefully to CBMP's Convex-owned authorization model. Do not copy storage-sharing assumptions. |
| Decorative cloud/radial landing treatment | Template visual atmosphere | `/home/curtis/dev/swift-cloud-space/src/pages/Landing.tsx` | avoid | Keep marketing motion and section rhythm, but avoid cloud-storage-specific imagery and decorative effects that obscure CBMP product UI. |
| Public mobile nav overlap behavior | Template mobile public nav implementation detail | `/home/curtis/dev/swift-cloud-space/src/components/layout/Navbar.tsx` | avoid | Rendered inspection found overlap with hero content when opened. Use a clearer mobile nav treatment for CBMP. |

## Dependency Notes

The template uses a broad shadcn/Radix stack plus `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `framer-motion`, `sonner`, `tailwindcss-animate`, and several feature-specific packages.

For the current redesign, prefer the smallest dependency set that supports implemented behavior:

- Tailwind CSS and shadcn-compatible configuration.
- `class-variance-authority`, `clsx`, and `tailwind-merge` for primitive variants and `cn`.
- Radix primitives only for interactive components that are actually implemented, such as Sheet and Tooltip.
- Framer Motion for home marketing motion and app/list/surface transitions.
- Defer `sonner`, `react-dropzone`, and specialized file-sharing dependencies until a concrete CBMP interaction needs them.
