import type { Metadata } from "next";

import { PublicCompetitionsTable } from "../../components/public-competitions-table";
import { isConvexEnabled } from "../../lib/convex";

export const metadata: Metadata = {
  title: "Competitions",
};

export default function CompetitionsPage() {
  return (
    <main
      className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8"
      aria-labelledby="competitions-heading"
    >
      <div className="border-b border-border pb-5">
        <div className="max-w-3xl">
          <h1
            className="text-3xl font-semibold leading-tight text-foreground"
            id="competitions-heading"
          >
            Competitions
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Find published collegiate ballroom Competitions and review their
            lifecycle, dates, host, and location.
          </p>
        </div>
      </div>

      <PublicCompetitionsTable
        convexEnabled={isConvexEnabled(process.env.NEXT_PUBLIC_CONVEX_URL)}
      />
    </main>
  );
}
