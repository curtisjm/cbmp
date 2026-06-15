# Convex owns backend state and realtime

Competition operations need realtime visibility for entries, lifecycle transitions, add/drop decisions, scrutineer control, scoring operations, and result publication. We will use Convex as the authoritative backend, database, and realtime layer so day-of state changes are written and observed through one consistency boundary instead of pairing a relational database with a separate realtime synchronization system.

## Considered Options

- **Convex authoritative backend**: keeps transactional writes and realtime subscriptions in the same system, which fits competition operations and reduces synchronization risk.
- **Postgres authoritative backend with separate realtime delivery**: improves familiar relational reporting and SQL access, but makes day-of realtime behavior depend on a second propagation path that can drift from the write model.

## Consequences

Reporting and analytics that want SQL-shaped access will need projections, exports, or later integration work instead of direct transactional Postgres queries. Authorization-sensitive domain mutations should live in Convex functions rather than being split between the frontend and a separate API service.
