# CBMP

CBMP is a Next.js App Router and Convex application for collegiate ballroom
Competition management. Public Competition discovery reads real deployment data
from Convex; draft Competitions are excluded by the backend query rather than by
the browser.

## Development

- [Local setup](docs/development/local-setup.md)
- [Auth and data path boundaries](docs/development/auth-data-path.md)

Useful commands:

```sh
pnpm install
pnpm dev
pnpm typecheck
pnpm test:unit
pnpm test:smoke
pnpm build
```

`pnpm dev` starts both Next.js and Convex and therefore requires a configured
Convex development deployment. Unit tests, smoke tests, typechecking, and the
production build do not require live Clerk secrets or a reachable Convex
deployment.
