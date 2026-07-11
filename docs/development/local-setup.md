# Local Setup

## Requirements

- Node.js 22 or newer.
- pnpm 10 or newer.
- A Convex account and development deployment for the real public Competition
  data path.
- Clerk development keys only when exercising the prebuilt sign-in surface.

## Install

```sh
pnpm install
cp .env.example .env.local
```

The copied `.env.local` contains non-secret Clerk placeholders and blank Convex
settings. The application treats missing, blank, and obvious placeholder
configuration as unconfigured; this starting configuration is suitable for
typechecking, tests, and builds but does not connect to live services.

## Configure Convex

Keep both Convex variables blank for the first run. Then start the Convex
development process and follow its prompts to sign in and select or create the
CBMP development deployment:

```sh
pnpm dev:convex
```

Convex writes the deployment-specific `CONVEX_DEPLOYMENT` and
`NEXT_PUBLIC_CONVEX_URL` values to `.env.local`. Keep those real values local.
Do not add seed Competition records: an empty development deployment is a
supported state and `/competitions` renders an accessible empty state.

`NEXT_PUBLIC_CONVEX_URL` configures the browser's Convex client.
`CONVEX_DEPLOYMENT` tells the Convex CLI which development deployment to run
against. A real `pnpm dev` session needs both because the combined command
starts the web and Convex processes.

## Optional Clerk Configuration

When Clerk is available, set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` to a real
`pk_test_...` or `pk_live_...` value and set the matching `CLERK_SECRET_KEY`.
The public `/sign-in` route renders Clerk's prebuilt sign-in UI only in that
configured mode. Without real keys, `/sign-in` shows a safe unavailable state.

Clerk is not required for `/competitions`. This slice does not add a protected
User Profile or app-owned User sync.

## Development Commands

- `pnpm dev` runs Next.js and Convex together. This is the normal full-stack
  development command and requires a configured Convex deployment.
- `pnpm dev:web` runs only the Next.js App Router web app at
  `http://127.0.0.1:3000`.
- `pnpm dev:convex` runs only Convex development and code generation.
- `pnpm dev:backend` is an alias for `pnpm dev:convex`.

Running `pnpm dev:web` without Convex configuration is useful for the explicit
unconfigured state, but it does not exercise real Competition discovery.

## Verification Commands

- `pnpm test:unit` runs the Vitest domain and Convex function tests.
- `pnpm test:smoke` runs the Playwright public-route smoke tests and starts
  `pnpm dev:web` when needed.
- `pnpm test` runs the unit and smoke suites.
- `pnpm typecheck` generates Next.js route types and runs strict TypeScript
  validation.
- `pnpm build` creates the production Next.js build.

These verification commands need no live Clerk secrets and no reachable Convex
deployment. They exercise the public route's configured or unconfigured
boundary and test the Convex query in-process. Use `pnpm dev` with the configured
development deployment for a real end-to-end data-path check.
