# Prototype Notes

Prototype question: Does a more realistic shadcn-style React surface make the Nord direction feel credible for CBMP's composed, precise, operational UI when Polar Night is used for chrome and selected operational sections?

Source palette: official Nord documentation at `https://www.nordtheme.com/docs/colors-and-palettes/`.

Palette and material constraints:

- The prototype defines `nord0` through `nord15` with the official default hex values.
- The prototype is now a throwaway Vite + React + Tailwind app instead of static HTML.
- shadcn-style component source is copied into `src/components/ui`: Button, Card, Input, Badge, DropdownMenu, Tabs, Table, and Separator.
- `nord8 #88c0d0` is the primary accent fill outside Polar Night and Snow Storm.
- Light mode uses `#fff` and `#fbfbfc` as site-inspired application materials, following the Nord homepage's whiter sections.
- The dark theme has been removed for this pass.
- Polar Night colors are used for the frosted top nav, lifecycle panels, table headers, and role/authority panels rather than only borders.
- Polar Night panels use a lighter `nord2` cap over a darker `nord0` body, matching the contrast pattern from the Nord toolbox reference.
- The public competitions table now uses a Polar Night header band only, keeping the table body light and dense.
- Frosted blur is stronger on navigation and menu/control materials, with the `View` menu using dark translucent material for stronger contrast.
- The floating prototype switcher is present because this is now a multi-variant UI prototype; it is hidden in production builds.
- Panel rounding is intentionally larger than the previous pass to test the attached rounded shadcn reference without changing core control semantics.

Theme mapping:

- `base`: `#ffffff`
- `surface`: `#fbfbfc`
- `raised`: `#ffffff`
- `text`: `nord0 #2e3440`
- `divider`: `nord4 #d8dee9`
- `primary`: `nord8 #88c0d0`
- `dark panel cap`: `nord2 #434c5e`
- `dark panel body`: `nord0 #2e3440`
- `dark panel text`: `nord6 #eceff4`

Competition Lifecycle mapping:

- `nord9 #81a1c1`: published
- `nord8 #88c0d0`: entries open
- `nord13 #ebcb8b`: entries closed / warning
- `nord11 #bf616a`: running / high-attention operational state
- `nord14 #a3be8c`: finished / success

Current read:

- The whiter light materials still make the prototype feel closer to the Nord site while keeping the table and lifecycle layout operational.
- The frosted top nav, lifecycle surface, and role-mapping panels give the page a stronger Nord signature without turning the whole app into a full dark dashboard.
- The table header band adds a second Polar Night operational module without making the main data body feel dark.
- `nord8` works as a primary action color when paired with `nord0` text and now has enough presence in buttons and selected controls.
- Aurora colors are legible as lifecycle markers when labels and dots are present; they should remain sparse.
- Variant A tests a left operations rail plus table/inspector layout.
- Variant B tests a darker lifecycle board as the main structure.
- Variant C tests a lighter public registry with dark authority/lifecycle modules.

Review decision, July 3, 2026:

- Variant A is the strongest base direction because the public Competition list remains the primary work surface while lifecycle state, authority cues, and role vocabulary stay visible around it.
- Variant B makes lifecycle state too dominant for the public-list question. Keep its dark lifecycle treatment, but use it as an operational module rather than the whole page structure.
- Variant C has the calmest registry density, but it reads more like a public directory than the eventual app shell.
- The next pass should continue from A, borrowing C's table calm and B's lifecycle contrast.

Changes made in this pass:

- Made the frosted Polar Night top nav less pill-like and closer to app chrome.
- Reduced panel radius and broad shadows so the rounded shadcn direction feels operational rather than soft.
- Tightened table header and cell density, with the entries column aligned as numeric data.
- Normalized dark authority/lifecycle panels with the same Polar Night material language.
- Moved the development-only prototype switcher into a compact bottom-right control so it interferes less with review.

If accepted, fold the chosen mapping into `DESIGN.md` or the eventual app token system and delete this prototype.
