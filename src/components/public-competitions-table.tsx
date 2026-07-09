"use client";

import { CloudOff } from "lucide-react";
import { useQuery } from "convex/react";

import { api } from "../../convex/_generated/api";
import { CompetitionDirectory } from "./public-competition-directory";

type PublicCompetitionsTableProps = {
  convexEnabled: boolean;
};

export function PublicCompetitionsTable({
  convexEnabled,
}: PublicCompetitionsTableProps) {
  return (
    <section
      aria-label="Public Competition discovery"
      className="flex flex-col gap-4"
    >
      {convexEnabled ? (
        <ConnectedPublicCompetitions />
      ) : (
        <CompetitionUnavailableState />
      )}
    </section>
  );
}

function ConnectedPublicCompetitions() {
  const competitions = useQuery(api.competitions.listPublic, {});

  if (competitions === undefined) {
    return <CompetitionLoadingState />;
  }

  return <CompetitionDirectory competitions={competitions} />;
}

function CompetitionLoadingState() {
  return (
    <div
      aria-label="Loading Competitions"
      className="overflow-hidden rounded-lg border border-border bg-card shadow-card"
      role="status"
    >
      <span className="sr-only">Loading Competitions</span>
      {[0, 1, 2].map((row) => (
        <div
          className="grid animate-pulse gap-4 border-b border-border p-5 last:border-b-0 motion-reduce:animate-none lg:grid-cols-[minmax(0,1fr)_minmax(28rem,0.9fr)]"
          key={row}
        >
          <div>
            <div className="h-5 w-24 rounded bg-muted" />
            <div className="mt-3 h-5 w-2/3 rounded bg-muted" />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item}>
                <div className="h-3 w-16 rounded bg-muted" />
                <div className="mt-2 h-4 w-4/5 rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CompetitionUnavailableState() {
  return (
    <div
      className="rounded-lg border border-border bg-card px-5 py-12 text-center shadow-card"
      role="status"
    >
      <CloudOff
        aria-hidden="true"
        className="mx-auto size-8 text-muted-foreground"
      />
      <h2 className="mt-3 text-base font-semibold">
        Competition discovery is unavailable
      </h2>
      <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-muted-foreground">
        Public Competition information cannot be loaded right now. Try again
        later.
      </p>
    </div>
  );
}
