# UI Redesign Brief

Date: 2026-07-05

> Status: historical implementation brief. The completed system in `DESIGN.md` and the current source code supersede any conflicting branch, component, motion, or accessibility guidance below.

This brief records the working agreement for the issue 3 app shell redesign and the issue 11 finalization pass. It is a design and implementation guide, not a product authority document. Product scope still comes from the GitHub PRD, implementation issues, and CBMP domain language in `CONTEXT.md`.

## Source Of Truth

- The original work ran on branch `codex/issue-3-app-shell`; this is no longer an active branch instruction.
- Use `/Users/curtis/dev/swift-cloud-space` as a bounded visual reference.
- Preserve CBMP domain language from `CONTEXT.md`.
- Treat `PRODUCT.md` as product authority and `DESIGN.md` as the implemented visual authority. Template patterns never override those documents.
- Keep CBMP's Next.js app router structure rather than porting the template's Vite routing model.

## Design Direction

- Treat the current CBMP prototype as a functional baseline, not a design baseline.
- Match the template's density, layout idioms, component treatment, spacing, rounded surfaces, restrained elevation, and interaction feel wherever practical.
- Keep the Nord palette as CBMP's token foundation, while allowing the template's softer surface layering, subtle tints, and shadows to shape token usage.
- Refine back toward CBMP's Competition operations constraints when the template becomes too marketing-heavy, decorative, or warm-neutral.
- Use familiar shadcn-compatible controls. Do not introduce unusual controls for standard actions.
- Avoid the retired ledger-heavy, route-label, and old lifecycle component styling from the pre-redesign prototype.

## Scope

The redesign should cover all currently implemented issue 3 surfaces:

- Public home
- `/competitions`
- `/sign-in`
- Shared app shell
- Lifecycle/status cues via the shared CBMP fixture/domain module
- Global tokens and styling

Additional template-derived reference pages are allowed when they help establish reusable design language for future work. These routes should be clearly framed as prototype/reference surfaces and must not imply final authorization rules, role workflows, scoring behavior, or other unsettled product decisions.

Fake examples should be domain-plausible and clearly prototype-safe. Centralize reusable prototype fixtures in a shared module such as `src/lib/cbmp.ts` rather than scattering sample data across pages.

## Public Home

- Keep the home page product-facing rather than competition-browsing.
- Leave room for future marketing content, using template-style scaffolding such as feature sections, workflow highlights, bento-like sections, and trust or FAQ-style areas.
- Keep public content visible by default. Do not use page-load choreography or viewport-gated reveal animations.
- Reduced-motion users receive instant state replacement or non-translating feedback; repeating pulses and transform-based reveals are prohibited.
- Keep current copy conservative and CBMP-specific so it does not overpromise unfinished behavior.
- Do not put recent competitions on the home page. Competition discovery belongs on `/competitions`.
- Home cards may point to temporary `/coming-soon?surface=...` routes while deeper public or authenticated surfaces are still unsettled. These routes should be clearly framed as placeholders and link back to Home and Competitions.

## Competitions

- Treat `/competitions` as an operational discovery surface with selective gallery-like texture.
- Preserve search and filter behavior.
- Favor compact controls, scannable metadata, lifecycle badges, and clear event status.
- A divided record list is implemented: operational controls and dense comparison first, with lifecycle, host, location, and Entry context aligned without nested metadata cards.

## Auth And App Reference

- `/sign-in` should follow the template login page visually while remaining a Clerk fallback/entry surface.
- Future/reference authenticated routes may live under a product-shaped path such as `/app`.
- Prototype/reference app routes should demonstrate layout and component patterns more than complex behavior.
- Public navigation should stay compact and expose only stable surfaces such as Home, Competitions, Sign in, and any clearly labeled prototype/app reference link.

## Component Strategy

- Add Tailwind CSS during the foundation pass so CBMP can closely follow the template's shadcn/Tailwind conventions.
- Add a standard `components.json` shadcn config and use conventional `src/components/ui/*` and `src/lib/utils.ts` locations.
- Replace the current global stylesheet direction wholesale during the foundation pass. Preserve behavior and accessibility affordances, but do not keep old prototype styling when it conflicts with Tailwind/shadcn conventions.
- Add a small real shadcn-style local UI layer rather than copying the template's entire UI library.
- Bring in only the dependencies and components used by the redesign.
- Current primitives include Button, Card, Badge, Input, Sheet, and Tooltip. Tabs, Separator, and Dropdown Menu should not be installed or kept locally until a current surface needs them.
- Use the template as the visual source, but avoid unused Radix packages and broad component-system churn.
- Use 150ms CSS transitions for direct state feedback and the collapsible sidebar only. Framer Motion is not part of the implemented system.
- Disable nonessential transitions under reduced motion. No motion is required to understand content or complete a task.

## Documentation Requirement

Subagents should inventory useful CBMP and Swift Cloud Space patterns during implementation and record them in `docs/development/ui-template-patterns.md`.

Each inventory entry should include:

- Component or pattern
- CBMP use case
- Template example source
- Status such as use now, future/reference, requires dependency, or avoid
- Notes or constraints

The inventory may include patterns that are not implemented in the current pass as long as they are plausible future CBMP surfaces and clearly labeled as future/reference.

## Implementation Operating Model

- Use subagents for implementation work to keep the lead agent's context focused on orchestration and integration.
- The lead agent should define clear, disjoint ownership slices for workers, then review, integrate, verify, commit, and push their work.
- Implementation phases should include template exploration, foundation work, page/surface implementation, documentation, and code review.
- Workers must assume they are not alone in the codebase, avoid reverting unrelated changes, and adapt to already-integrated edits.

## Verification

- Preserve and expand automated coverage for behavior, not visual snapshots.
- Keep Playwright assertions around navigation, competition search/filter, empty states, and sign-in fallback.
- Use browser screenshots at desktop and mobile widths for visual review.
- Do not lock the template-inspired visual design into brittle screenshot tests yet.

## Visual Review Evidence

The refresh commits route-matched desktop and mobile before/after captures under `docs/screenshots/ui-refresh/`. See `docs/screenshots/ui-refresh/README.md` for the full comparison across Home, Competitions, Sign in, App overview, Competition workspace, Coming soon, and the open mobile workspace navigation.
