import type { Metadata } from "next";

import { PublicCompetitionsTable } from "../../components/public-competitions-table";

export const metadata: Metadata = {
  title: "Public Competitions",
};

export default function CompetitionsPage() {
  return (
    <section
      className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-7 px-4 py-8 sm:px-6 lg:px-8 lg:py-10"
      aria-labelledby="competitions-heading"
    >
      <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <h1
            className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl"
            id="competitions-heading"
          >
            Competitions
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Find published collegiate ballroom Competitions and scan their
            entry window, host, location, and floor-readiness status.
          </p>
        </div>
        <p className="max-w-xs text-sm leading-6 text-muted-foreground md:text-right">
          Draft setup stays private to hosts
        </p>
      </div>

      <PublicCompetitionsTable />
    </section>
  );
}
