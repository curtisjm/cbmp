# Auth And Data Path Boundaries

The public Competition route now uses Convex as its real application data path.
Clerk remains an independent identity/session integration: authentication is not
required to read public Competitions, and this slice does not add a protected
User Profile or app-owned User sync.

## Runtime Configuration

The application enables the Clerk and Convex providers independently:

| Configuration | Runtime behavior |
| --- | --- |
| Convex only | Public Competition discovery reads from Convex without requiring sign-in. |
| Clerk only | The prebuilt sign-in surface is available; Competition discovery shows its distinct unavailable state without making a query. |
| Clerk and Convex | Clerk sessions and the Convex client share the provider boundary, but no User sync or domain authorization behavior is introduced here. |
| Neither | Public shell routes render without connecting to either service. |

`NEXT_PUBLIC_CONVEX_URL` must be a real HTTP(S) deployment URL to enable the
browser client. Missing, blank, malformed, and obvious placeholder values are
treated as unconfigured. `CONVEX_DEPLOYMENT` selects the deployment used by the
Convex CLI; it is required by the full `pnpm dev` workflow, not by a web-only
build or test.

## Clerk Boundary

Clerk is the identity and session provider. Public routes may show sign-in or
signed-out access actions, but CBMP domain roles are not sourced from Clerk
Organizations.

`/sign-in` is a public access route. It renders Clerk's prebuilt
`SignIn` component only when a real Clerk publishable key is configured. Copied
example placeholders intentionally leave Clerk disabled and show an unavailable
state instead. The current public Competition query does not inspect a Clerk
session. This slice does not claim a sign-up route, protected User Profile, User
projection, or Clerk-to-Convex User sync.

Expected environment variables:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL` (blank in the example until a sign-up route exists)
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`

## Convex Boundary

Convex owns the first real application data path:

1. `/competitions` subscribes to the public Competition query through the
   Convex React client.
2. `competitions.listPublic` queries only the public Competition Lifecycle
   values at the backend boundary.
3. The query returns a public-safe projection for each visible Competition.
4. The route renders returned records or an accessible empty state when the
   configured deployment has none.

The public query is the privacy boundary. The browser does not receive draft
Competitions and then filter them out.

The minimal `competitions` table stores:

- `name` and `slug`;
- Competition Lifecycle;
- optional public display fields for host name, city, and region;
- optional `startsOn` and `endsOn` calendar-date strings (`YYYY-MM-DD` by
  contract, not instants); and
- creation and update timestamps.

Competition Lifecycle is shared domain vocabulary with exactly these values:
`draft`, `published`, `entries open`, `entries closed`, `running`, and
`finished`. The shared definition is reused by Convex validation, the public
query, UI labels, and tests. Every state except `draft` is public in this slice.

There is deliberately no Organization foreign key, create/edit workflow, or
Organization Membership visibility rule yet. Draft visibility stays private by
exclusion until those ownership and permission boundaries are designed.

Expected environment variables:

- `NEXT_PUBLIC_CONVEX_URL`
- `CONVEX_DEPLOYMENT`

Next.js route handlers and server actions should be reserved for true HTTP integration edges, not introduced as a parallel domain API over Convex.

Unit and smoke tests, typechecking, and builds do not require live service
secrets or a reachable Convex deployment. Real local full-stack development
does require a configured Convex development deployment so the public route can
exercise the subscription and empty/data states against actual deployment data.
