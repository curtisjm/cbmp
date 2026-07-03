# Auth And Data Path Boundaries

Issue #3 establishes the runnable root application contract only. It does not add Clerk-protected routes, Convex domain behavior, or role-aware operational surfaces.

## Clerk Boundary

Clerk is the identity and session provider. Public routes may show sign-in or signed-out entry points, but CBMP domain roles are not sourced from Clerk Organizations.

Expected environment variables:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`

## Convex Boundary

Convex will own application data, realtime subscriptions, domain authorization, and lifecycle-sensitive writes in later slices. For this slice, the package and environment contract are present, while `pnpm dev:backend` remains a successful placeholder.

Expected environment variables:

- `NEXT_PUBLIC_CONVEX_URL`
- `CONVEX_DEPLOYMENT`

Next.js route handlers and server actions should be reserved for true HTTP integration edges, not introduced as a parallel domain API over Convex.
