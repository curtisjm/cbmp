import type { PublicCompetition } from "../../src/components/public-competition-directory";
import { COMPETITION_LIFECYCLE } from "../../src/domain/competitions/lifecycle";

export const publicCompetitionFixtures = [
  {
    city: "Seattle",
    endsOn: "2027-02-21",
    hostOrganizationDisplayName: "Northwest Ballroom Alliance",
    lifecycle: COMPETITION_LIFECYCLE.entriesOpen,
    name: "Cascade Collegiate Classic",
    region: "WA",
    slug: "cascade-collegiate-classic",
    startsOn: "2027-02-20",
  },
  {
    city: "Arlington",
    endsOn: undefined,
    hostOrganizationDisplayName: "Capital DanceSport Collective",
    lifecycle: COMPETITION_LIFECYCLE.published,
    name: "Capital Ballroom Invitational",
    region: "VA",
    slug: "capital-ballroom-invitational",
    startsOn: "2027-03-13",
  },
  {
    city: "Chicago",
    endsOn: undefined,
    hostOrganizationDisplayName: "Lakeside Ballroom Council",
    lifecycle: COMPETITION_LIFECYCLE.finished,
    name: "Lakeside Collegiate Open",
    region: "IL",
    slug: "lakeside-collegiate-open",
    startsOn: "2026-11-07",
  },
] as const satisfies readonly PublicCompetition[];
