# Auth And Data Path Boundaries

Issue #3 establishes the runnable root application contract only. It does not add Clerk-protected routes, Convex domain behavior, or role-aware operational surfaces.

## Clerk Boundary

Clerk is the identity and session provider. Public routes may show sign-in or
signed-out access actions, but CBMP domain roles are not sourced from Clerk
Organizations.

For issue #3, `/sign-in` is a public access route. It renders Clerk's prebuilt
`SignIn` component only when a real Clerk publishable key is configured. Copied
example placeholders intentionally leave Clerk disabled and show an unavailable
state instead. This slice does not add a sign-up route, protected routes,
middleware, or proxy behavior.

Expected environment variables:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL` (blank in the example until a sign-up route exists)
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`

## Convex Boundary

Convex will own application data, realtime subscriptions, domain authorization, and lifecycle-sensitive writes in later slices. For this slice, the package and environment contract are present, while `pnpm dev:backend` remains a successful placeholder.

Expected environment variables:

- `NEXT_PUBLIC_CONVEX_URL`
- `CONVEX_DEPLOYMENT`

Next.js route handlers and server actions should be reserved for true HTTP integration edges, not introduced as a parallel domain API over Convex.
