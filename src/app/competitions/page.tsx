import type { Metadata } from "next";

import { PublicCompetitionsTable } from "../../components/public-competitions-table";

export const metadata: Metadata = {
  title: "Public Competitions",
};

export default function CompetitionsPage() {
  return (
    <main
      className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8"
      aria-labelledby="competitions-heading"
    >
      <div className="flex flex-col gap-3 border-b border-border pb-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Public discovery
          </p>
          <h1
            className="mt-2 text-3xl font-semibold leading-tight text-foreground sm:text-4xl"
            id="competitions-heading"
          >
            Competitions
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Find published collegiate ballroom Competitions and scan their
            entry window, host, location, and floor-readiness status.
          </p>
        </div>
        <p className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-card">
          Draft setup stays private to hosts
        </p>
      </div>

      <PublicCompetitionsTable />
    </main>
  );
}
