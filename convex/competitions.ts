import { v } from "convex/values";

import { isCalendarDateString } from "../src/domain/competitions/calendar-date";
import { PUBLIC_COMPETITION_LIFECYCLES } from "../src/domain/competitions/lifecycle";
import { query } from "./_generated/server";
import { publicCompetitionValidator } from "./schema";

export const listPublic = query({
  args: {},
  returns: v.array(publicCompetitionValidator),
  handler: async (ctx) => {
    const competitionsByLifecycle = await Promise.all(
      PUBLIC_COMPETITION_LIFECYCLES.map(async (lifecycle) => {
        const competitions = await ctx.db
          .query("competitions")
          .withIndex("by_lifecycle", (q) => q.eq("lifecycle", lifecycle))
          .collect();

        return competitions.flatMap((competition) => {
          if (!hasValidCalendarDates(competition)) {
            return [];
          }

          return [
            {
              name: competition.name,
              slug: competition.slug,
              lifecycle,
              hostOrganizationDisplayName:
                competition.hostOrganizationDisplayName,
              city: competition.city,
              region: competition.region,
              startsOn: competition.startsOn,
              endsOn: competition.endsOn,
            },
          ];
        });
      }),
    );

    return competitionsByLifecycle.flat();
  },
});

function hasValidCalendarDates(competition: {
  startsOn?: string;
  endsOn?: string;
}): boolean {
  return (
    isValidOptionalCalendarDate(competition.startsOn) &&
    isValidOptionalCalendarDate(competition.endsOn)
  );
}

function isValidOptionalCalendarDate(value: string | undefined): boolean {
  return value === undefined || isCalendarDateString(value);
}
