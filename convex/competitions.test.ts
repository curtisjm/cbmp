/// <reference types="vite/client" />

import { convexTest } from "convex-test";
import { describe, expect, it } from "vitest";

import {
  COMPETITION_LIFECYCLE,
  type CompetitionLifecycle,
} from "../src/domain/competitions/lifecycle";
import { api } from "./_generated/api";
import schema from "./schema";

const modules = import.meta.glob([
  "./**/*.ts",
  "./_generated/*.js",
  "!./**/*.test.ts",
  "!./**/*.d.ts",
]);

describe("competitions.listPublic", () => {
  it("returns every public lifecycle while excluding draft competitions", async () => {
    const t = convexTest(schema, modules);
    const now = 1_750_000_000_000;
    const fixtures: Array<{
      name: string;
      slug: string;
      lifecycle: CompetitionLifecycle;
    }> = [
      {
        name: "Unannounced Classic",
        slug: "unannounced-classic",
        lifecycle: COMPETITION_LIFECYCLE.draft,
      },
      {
        name: "Published Classic",
        slug: "published-classic",
        lifecycle: COMPETITION_LIFECYCLE.published,
      },
      {
        name: "Open Classic",
        slug: "open-classic",
        lifecycle: COMPETITION_LIFECYCLE.entriesOpen,
      },
      {
        name: "Closed Classic",
        slug: "closed-classic",
        lifecycle: COMPETITION_LIFECYCLE.entriesClosed,
      },
      {
        name: "Running Classic",
        slug: "running-classic",
        lifecycle: COMPETITION_LIFECYCLE.running,
      },
      {
        name: "Finished Classic",
        slug: "finished-classic",
        lifecycle: COMPETITION_LIFECYCLE.finished,
      },
    ];

    await t.run(async (ctx) => {
      for (const fixture of fixtures) {
        await ctx.db.insert("competitions", {
          ...fixture,
          createdAt: now,
          updatedAt: now,
        });
      }
    });

    const competitions = await t.query(api.competitions.listPublic, {});

    expect(competitions).toHaveLength(5);
    expect(
      competitions.map(
        (competition: { name: string; lifecycle: CompetitionLifecycle }) => ({
          name: competition.name,
          lifecycle: competition.lifecycle,
        }),
      ),
    ).toEqual(expect.arrayContaining([
      {
        name: "Published Classic",
        lifecycle: "published",
      },
      {
        name: "Open Classic",
        lifecycle: "entries open",
      },
      {
        name: "Closed Classic",
        lifecycle: "entries closed",
      },
      {
        name: "Running Classic",
        lifecycle: "running",
      },
      {
        name: "Finished Classic",
        lifecycle: "finished",
      },
    ]));
  });

  it("returns only the public Competition projection", async () => {
    const t = convexTest(schema, modules);

    await t.run(async (ctx) => {
      await ctx.db.insert("competitions", {
        name: "Published Classic",
        slug: "published-classic",
        lifecycle: COMPETITION_LIFECYCLE.published,
        hostOrganizationDisplayName: "Ballroom Organization",
        city: "Boston",
        region: "MA",
        startsOn: "2026-10-10",
        endsOn: "2026-10-11",
        createdAt: 1_750_000_000_000,
        updatedAt: 1_750_000_000_000,
      });
    });

    const competitions = await t.query(api.competitions.listPublic, {});

    expect(competitions).toEqual([
      {
        name: "Published Classic",
        slug: "published-classic",
        lifecycle: "published",
        hostOrganizationDisplayName: "Ballroom Organization",
        city: "Boston",
        region: "MA",
        startsOn: "2026-10-10",
        endsOn: "2026-10-11",
      },
    ]);
  });

  it.each(["startsOn", "endsOn"] as const)(
    "omits a Competition with an invalid stored %s calendar date without hiding valid Competitions",
    async (field) => {
      const t = convexTest(schema, modules);

      await t.run(async (ctx) => {
        await ctx.db.insert("competitions", {
          name: "Valid Date Classic",
          slug: "valid-date-classic",
          lifecycle: COMPETITION_LIFECYCLE.published,
          startsOn: "2026-02-28",
          endsOn: "2026-03-01",
          createdAt: 1_750_000_000_000,
          updatedAt: 1_750_000_000_000,
        });

        await ctx.db.insert("competitions", {
          name: "Invalid Date Classic",
          slug: `invalid-${field}`,
          lifecycle: COMPETITION_LIFECYCLE.published,
          [field]: "2026-02-29",
          createdAt: 1_750_000_000_000,
          updatedAt: 1_750_000_000_000,
        });
      });

      const competitions = await t.query(api.competitions.listPublic, {});

      expect(competitions).toEqual([
        {
          name: "Valid Date Classic",
          slug: "valid-date-classic",
          lifecycle: "published",
          startsOn: "2026-02-28",
          endsOn: "2026-03-01",
        },
      ]);
    },
  );
});
