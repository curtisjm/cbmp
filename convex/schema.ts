import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

import { COMPETITION_LIFECYCLE } from "../src/domain/competitions/lifecycle";

export const competitionLifecycleValidator = v.union(
  v.literal(COMPETITION_LIFECYCLE.draft),
  v.literal(COMPETITION_LIFECYCLE.published),
  v.literal(COMPETITION_LIFECYCLE.entriesOpen),
  v.literal(COMPETITION_LIFECYCLE.entriesClosed),
  v.literal(COMPETITION_LIFECYCLE.running),
  v.literal(COMPETITION_LIFECYCLE.finished),
);

export const publicCompetitionLifecycleValidator = v.union(
  v.literal(COMPETITION_LIFECYCLE.published),
  v.literal(COMPETITION_LIFECYCLE.entriesOpen),
  v.literal(COMPETITION_LIFECYCLE.entriesClosed),
  v.literal(COMPETITION_LIFECYCLE.running),
  v.literal(COMPETITION_LIFECYCLE.finished),
);

export const publicCompetitionValidator = v.object({
  name: v.string(),
  slug: v.string(),
  lifecycle: publicCompetitionLifecycleValidator,
  hostName: v.optional(v.string()),
  city: v.optional(v.string()),
  region: v.optional(v.string()),
  // Calendar dates are deliberately stored without a time zone or time of day.
  startsOn: v.optional(v.string()),
  endsOn: v.optional(v.string()),
});

export default defineSchema({
  competitions: defineTable({
    name: v.string(),
    slug: v.string(),
    lifecycle: competitionLifecycleValidator,
    hostName: v.optional(v.string()),
    city: v.optional(v.string()),
    region: v.optional(v.string()),
    // `YYYY-MM-DD` calendar-date strings, not instants or timestamps.
    startsOn: v.optional(v.string()),
    endsOn: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_lifecycle", ["lifecycle"]),
});
