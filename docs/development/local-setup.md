# Local Setup

## Requirements

- Node.js 22 or newer.
- pnpm 10 or newer.

## Install

```sh
pnpm install
cp .env.example .env.local
```

Fill `.env.local` with local Clerk keys and the Convex deployment values when those services are available. The example file contains placeholders only.

## Development Commands

- `pnpm dev` runs the full app development path: Next.js web plus the backend placeholder.
- `pnpm dev:web` runs only the Next.js App Router web app at `http://127.0.0.1:3000`.
- `pnpm dev:backend` prints the current Convex backend deferral message and exits successfully.
- `pnpm typecheck` runs strict TypeScript validation.
- `pnpm build` runs the production Next.js build.
- `pnpm test:smoke` runs Playwright smoke coverage.

The backend command is a stub for issue #3. Convex functions, schema, and local Convex dev behavior belong to the follow-up backend slice.
