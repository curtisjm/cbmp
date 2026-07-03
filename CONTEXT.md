# Ballroom Competition Management

This context describes the domain language for a ballroom competition organizer used by college teams, competition hosts, judges, scrutineers, and competitors.

## Language

**User**:
An authenticated login account that can be granted permission to manage competition, organization, or competitor-facing workflows. A user does not have to be linked to a competitor.
_Avoid_: Account, login

**User Profile**:
A user's own profile information, independent of whether the user is linked to a competitor. A user profile can be augmented with competitor-specific information when the user becomes or is linked to a competitor.
_Avoid_: Account profile, login profile

**Organization**:
A ballroom team or other group that competitors can represent at a competition. An organization can manage eligible competitors before those competitors have user accounts.
_Avoid_: Team, school, club

**Competitor**:
A durable person identity used for competition entries, partnerships, numbers, results history, and correction requests. A competitor can exist before the person has a user account, and a user can choose to become a competitor before entering a competition.
_Avoid_: User, account, dancer

**Organization Membership**:
A user's relationship to an organization. Organization membership can exist even when the user is not linked to a competitor.
_Avoid_: Team membership, club membership

**Competitor Organization Association**:
An organization's relationship to a competitor that allows the organization to enter or manage that competitor, including when the competitor is not yet linked to a user.
_Avoid_: Team affiliation, competitor membership

**Organization Admin**:
A user trusted by an organization to manage its membership, entries, and organization-associated competitor claims.
_Avoid_: Team captain, senior member, manager

**Platform Admin**:
A user trusted to manage platform-wide exceptions and competitor-level eligibility overrides that should not belong to a single organization or competition host.
_Avoid_: Org admin, host admin, superuser

**Entry**:
A competitor's or partnership's participation in a competition, including the organization represented for that competition or the choice to enter unaffiliated. Once an entry has an organization affiliation, that organization owns org-level edit authority for the entry.
_Avoid_: Registration, signup

**Competition**:
The hosted ballroom competition as a whole, owned by an organization and including its entries, events, schedule, officials, day-of operations, and results.
_Avoid_: Event, tournament

**Competition Host**:
A user trusted to configure and operate a competition on behalf of the organization that owns it before the scrutineer starts the competition, including competition-scoped manual entry decisions. Organization admins have default host authority for their organization's competitions, and other users can be assigned host authority for a specific competition.
_Avoid_: Platform admin, organizer

**Scrutineer**:
A competition official who can make competition changes before starting the competition and controls competition state, entry changes, event changes, and scoring operations after starting it.
_Avoid_: Scrutinizer, tech manager

**Judge**:
A competition official who can access assigned scoring workflows and the schedule for when they should judge, but does not control competition lifecycle, entries, scoring operations, or result publication.
_Avoid_: Adjudicator

**Deck Captain**:
A competition official who checks competitors in before they walk onto the floor. Deck captain check-offs are operational display state, but a deck captain can scratch a competitor or partnership from a scheduled competition appearance when requested by the competitor.
_Avoid_: Floor manager, marshal

**Add/Drop Request**:
A competitor- or organization-submitted request to change entries after normal entry editing is closed. Before the competition is started, add/drop requests can be approved by the competition host or scrutineer; after the competition is started, they are approved or denied by the scrutineer.
_Avoid_: Late registration, change request

**Scratch**:
An official last-minute removal of a competitor or partnership from a scheduled competition appearance, initiated by or on behalf of the competitor. A scratch does not delete the underlying competitor, entry, or audit history.
_Avoid_: Delete, withdraw

**Competition Lifecycle**:
The top-level state of a competition: draft, published, entries open, entries closed, running, or finished. The running state begins when the scrutineer starts the competition.
_Avoid_: Competition status

**Competition Reset Request**:
An audited request to return a started competition to its previous lifecycle state. A competition reset request requires approval from the scrutineer and two distinct competition hosts, and is unavailable after any session results have been published.
_Avoid_: Rollback, undo start

**Session**:
A host-defined operational grouping of events within a competition that can be run and have results published as a unit. Session names are free-form and can represent broad time blocks or narrower groupings, but only one session can be active at a time in a competition.
_Avoid_: Heat, round, daypart

**Event**:
A competitive unit inside a competition that produces placements or results. An event can contain one dance or multiple dances, depending on how the dances are grouped.
_Avoid_: Competition

**Event Template**:
A reusable default event grouping that a competition host can use when setting up a competition. Event templates are starting points, not mandatory competition structure.
_Avoid_: Default event, preset

**Event Taxonomy**:
The platform's standard set of styles, levels, and dances used as defaults when creating event templates. Competition hosts can extend or relabel the taxonomy for their competition.
_Avoid_: Fixed rules, category list

**Level**:
A competition-specific eligibility grouping used to organize events, such as newcomer, bronze, silver, or open levels.
_Avoid_: Rank, class

**Newcomer**:
A competitor whose first platform-recorded competition was within one year of the competition they are entering, unless a platform admin overrides eligibility.
_Avoid_: Rookie, beginner

**Vet**:
A rookie-vet partner who is eligible by being silver level or above in the same style, or by not entering any non-rookie-vet event in that style at the competition.
_Avoid_: Veteran, advanced partner

**Rookie-Vet Event**:
An event where a newcomer competes with a vet, scoped separately for rookie leaders and rookie followers.
_Avoid_: Mixed-level event, newcomer-vet event

**Competition Eligibility Override**:
A competition host's decision to allow an entry in a specific competition even when platform eligibility rules would otherwise block it. A competition eligibility override does not change the competitor-level eligibility.
_Avoid_: Platform override, profile override

**Payment Status**:
The registration-facing state of whether a competitor, partnership, or organization has satisfied expected competition fees. Payment status can be tracked manually before platform payment processing exists.
_Avoid_: Stripe status, invoice status

**Partnership**:
The competition-scoped pair of competitors entering one or more partner events together.
_Avoid_: Couple, pair

**Leader**:
The competitor in a partnership whose competition number represents that partnership in partner events. A leader can have multiple partnerships in one competition, but not multiple partnerships in the same event.
_Avoid_: Lead

**Competition Number**:
A number assigned to a leader for a competition and used to identify any partnership that leader is part of during that competition.
_Avoid_: Bib number, couple number

**Claim**:
A request for a user to be linked to an existing competitor. Organization-associated claims are approved by an organization admin; if the user is already linked to a different competitor, the claim is resolved only by merging the competitor identities before access is granted.
_Avoid_: Account claim, profile claim

**Competitor Merge**:
The resolution of duplicate competitor records into one competitor identity, including the choice of canonical name or profile details. A merge is required when a claim would otherwise link one user to multiple competitor identities for the same person.
_Avoid_: Account merge, user merge
