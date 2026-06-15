# Next.js and Vercel provide the app shell around Convex data paths

The application will use Next.js App Router deployed on Vercel for routing, layouts, public pages, metadata, and integration HTTP edges, while Convex remains the primary data path for authenticated workflows and realtime competition surfaces. Public live competition views may also use client-side Convex subscriptions without requiring sign-in; authentication should add user-specific context rather than be required for basic public visibility.

## Considered Options

- **Next.js App Router on Vercel with Convex queries and mutations as the main app data path**: preserves Vercel deployment ergonomics and lets live competition workflows subscribe directly to the backend that owns state.
- **Server-rendered Next.js routes as the main data path**: fits traditional admin dashboards, but makes realtime competition operations and public live views depend on an extra application-server layer.

## Consequences

Day-of competition, host, scrutineer, and public live-view surfaces should prefer Convex React subscriptions and mutations where realtime behavior matters. Next.js route handlers and server actions should be reserved for true HTTP integration edges, not used as a parallel domain API over Convex.
