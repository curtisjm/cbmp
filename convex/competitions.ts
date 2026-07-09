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

        return competitions.map((competition) => ({
          name: competition.name,
          slug: competition.slug,
          lifecycle,
          hostOrganizationDisplayName:
            competition.hostOrganizationDisplayName,
          city: competition.city,
          region: competition.region,
          startsOn: validatedCalendarDate(competition.startsOn),
          endsOn: validatedCalendarDate(competition.endsOn),
        }));
      }),
    );

    return competitionsByLifecycle.flat();
  },
});

function validatedCalendarDate(value: string | undefined): string | undefined {
  if (value !== undefined && !isCalendarDateString(value)) {
    throw new Error("Stored Competition calendar date is invalid");
  }

  return value;
}
