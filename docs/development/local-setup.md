# Local Setup

## Requirements

- Node.js 22 or newer.
- pnpm 10 or newer.

## Install

```sh
pnpm install
cp .env.example .env.local
```

The copied `.env.local` starts with non-secret placeholders only. Those
placeholder Clerk values are rejected by the app, so Clerk stays unavailable
until you replace them with real local Clerk keys.

When Clerk is available, set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` to a real
`pk_test_...` or `pk_live_...` value and set the matching `CLERK_SECRET_KEY`.
The public `/sign-in` route renders Clerk's prebuilt sign-in UI only in that
configured mode. Without real keys, `/sign-in` shows a safe unavailable state.

## Development Commands

- `pnpm dev` runs the full app development path: Next.js web plus the backend placeholder.
- `pnpm dev:web` runs only the Next.js App Router web app at `http://127.0.0.1:3000`.
- `pnpm dev:backend` prints the current Convex backend deferral message and exits successfully.
- `pnpm typecheck` runs strict TypeScript validation.
- `pnpm build` runs the production Next.js build.
- `pnpm test:smoke` runs Playwright smoke coverage.

The backend command is a stub for issue #3. Convex functions, schema, and local Convex dev behavior belong to the follow-up backend slice.
