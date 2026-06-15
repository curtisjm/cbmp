# Use a modular monolith architecture

CBMP will be built as one Next.js and Convex application, but its code should be organized around domain areas rather than broad technical buckets. Competitors and claims, organizations, competitions, entries, day-of operations, scoring and results, and payments should have clear ownership boundaries so domain writes remain understandable as the application grows.

## Considered Options

- **Modular monolith**: keeps deployment simple while preserving domain boundaries inside the codebase.
- **Ad hoc shared function layout**: is faster at the beginning, but tends to concentrate unrelated Convex mutations, queries, and helpers into files whose ownership is unclear.
- **Microservices**: would create unnecessary operational cost for an early college ballroom competition app.

## Consequences

Convex functions should live near the domain they read or mutate, and cross-domain behavior should go through explicit internal functions or well-named shared modules. Generic catch-all files such as broad mutation/query collections or unowned utility modules should be treated as temporary seams, not the default architecture.
