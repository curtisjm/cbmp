import { v } from "convex/values";

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
          hostName: competition.hostName,
          city: competition.city,
          region: competition.region,
          startsOn: competition.startsOn,
          endsOn: competition.endsOn,
        }));
      }),
    );

    return competitionsByLifecycle.flat();
  },
});
