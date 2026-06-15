# Test domain rules first with role-based E2E coverage

Testing should prioritize confidence in competition domain rules and authorization-sensitive state transitions before broad UI coverage. Pure rules such as eligibility, lifecycle transitions, number assignment, add/drop behavior, reset approval, scratching, and scoring constraints should have focused unit coverage, while Convex function tests should cover permissions and state changes at the backend boundary.

## Consequences

End-to-end tests should be reserved for user-visible flows, but every distinct web-facing actor must have E2E coverage for its unique view and critical workflow. That includes unauthenticated public viewers, signed-in competitors, organization admins, competition hosts, scrutineers, judges, deck captains, and platform admins where platform-level exceptions affect competition behavior.

Avoid snapshot-heavy UI tests and exhaustive brittle browser coverage early. The goal is a test suite that catches broken domain behavior, permission regressions, and role-specific workflow failures without making routine UI iteration expensive.
