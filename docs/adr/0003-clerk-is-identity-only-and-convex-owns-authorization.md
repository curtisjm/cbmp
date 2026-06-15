# Clerk is identity-only and Convex owns authorization

Clerk will authenticate users and manage sessions, but it will not own CBMP organization roles or domain permissions. Convex will store the application `User`, `Organization Membership`, competitor links, platform roles, competition-scoped roles, and the authorization checks for domain writes because those permissions depend on competition lifecycle state, competitor identity, organization-associated competitors, and scrutineer-controlled operations.

## Considered Options

- **Clerk identity with Convex authorization**: keeps domain permissions next to the state they protect and supports competitors who are not linked to login accounts.
- **Clerk Organizations as authorization source of truth**: provides built-in organization membership and invitation workflows, but treats organizations primarily as user workspaces and does not model competitor associations, competition-scoped authority, or lifecycle-dependent write rules cleanly.

## Consequences

Clerk Organizations should not be used as the source of truth for CBMP `Organization`, `Organization Membership`, or role grants. If Clerk Organizations are introduced later for identity-side UX such as invitations, organization switching, or SSO-style onboarding, Convex must remain authoritative for domain authorization.
