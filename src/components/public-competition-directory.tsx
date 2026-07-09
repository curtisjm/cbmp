"use client";

import {
  Building2,
  CalendarDays,
  MapPin,
  Search,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import type { FunctionReturnType } from "convex/server";
import { useMemo, useState } from "react";

import {
  COMPETITION_LIFECYCLE,
  PUBLIC_COMPETITION_LIFECYCLES,
  competitionLifecycleLabel,
  type CompetitionLifecycle,
} from "../domain/competitions/lifecycle";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";

type ListPublicCompetitions =
  typeof import("../../convex/_generated/api").api.competitions.listPublic;

export type PublicCompetition =
  FunctionReturnType<ListPublicCompetitions>[number];

type ActiveFilter = (typeof PUBLIC_COMPETITION_LIFECYCLES)[number] | "all";

const lifecycleToneClasses: Record<
  CompetitionLifecycle,
  { badge: string; dot: string }
> = {
  [COMPETITION_LIFECYCLE.draft]: {
    badge: "border-muted bg-muted/70 text-muted-foreground",
    dot: "bg-muted-foreground",
  },
  [COMPETITION_LIFECYCLE.published]: {
    badge: "border-info/30 bg-info/10 text-foreground",
    dot: "bg-info",
  },
  [COMPETITION_LIFECYCLE.entriesOpen]: {
    badge: "border-primary/40 bg-primary/10 text-foreground",
    dot: "bg-primary",
  },
  [COMPETITION_LIFECYCLE.entriesClosed]: {
    badge: "border-warning/35 bg-warning/10 text-foreground",
    dot: "bg-warning",
  },
  [COMPETITION_LIFECYCLE.running]: {
    badge: "border-destructive/35 bg-destructive/10 text-foreground",
    dot: "bg-destructive",
  },
  [COMPETITION_LIFECYCLE.finished]: {
    badge: "border-success/35 bg-success/10 text-foreground",
    dot: "bg-success",
  },
};

export function CompetitionDirectory({
  competitions,
}: {
  competitions: readonly PublicCompetition[];
}) {
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
  const [searchValue, setSearchValue] = useState("");

  const filteredCompetitions = useMemo(() => {
    const query = searchValue.trim().toLocaleLowerCase();

    return competitions.filter((competition) => {
      const matchesFilter =
        activeFilter === "all" || competition.lifecycle === activeFilter;
      const searchableText = [
        competition.name,
        competition.hostOrganizationDisplayName,
        competition.city,
        competition.region,
        competitionLifecycleLabel(competition.lifecycle),
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase();

      return matchesFilter && (query === "" || searchableText.includes(query));
    });
  }, [activeFilter, competitions, searchValue]);

  if (competitions.length === 0) {
    return <CompetitionEmptyState />;
  }

  const resultCountLabel =
    filteredCompetitions.length === competitions.length
      ? `${competitions.length} ${pluralizeCompetition(competitions.length)}`
      : `${filteredCompetitions.length} of ${competitions.length} Competitions`;

  return (
    <>
      <div className="rounded-lg border border-border bg-card p-3 shadow-card">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block flex-1 lg:max-w-md">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <span className="sr-only">Search Competitions</span>
            <Input
              aria-controls="public-competition-results"
              className="h-9 rounded-md pl-9"
              onChange={(event) => setSearchValue(event.currentTarget.value)}
              placeholder="Search by Competition, host, or location"
              type="search"
              value={searchValue}
            />
          </label>
          <p
            aria-live="polite"
            className="text-xs font-medium text-muted-foreground"
          >
            {resultCountLabel}
          </p>
        </div>

        <fieldset className="mt-3 flex flex-wrap gap-2">
          <legend className="sr-only">Filter by Competition Lifecycle</legend>
          <LifecycleFilterButton
            active={activeFilter === "all"}
            label="All"
            onClick={() => setActiveFilter("all")}
          />
          {PUBLIC_COMPETITION_LIFECYCLES.map((lifecycle) => (
            <LifecycleFilterButton
              active={activeFilter === lifecycle}
              key={lifecycle}
              label={competitionLifecycleLabel(lifecycle)}
              lifecycle={lifecycle}
              onClick={() => setActiveFilter(lifecycle)}
            />
          ))}
        </fieldset>
      </div>

      <div id="public-competition-results">
        {filteredCompetitions.length > 0 ? (
          <ul
            aria-label="Public Competitions"
            className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card shadow-card"
          >
            {filteredCompetitions.map((competition) => (
              <li key={competition.slug}>
                <CompetitionResult competition={competition} />
              </li>
            ))}
          </ul>
        ) : (
          <FilteredCompetitionEmptyState
            onClear={() => {
              setActiveFilter("all");
              setSearchValue("");
            }}
          />
        )}
      </div>
    </>
  );
}

function LifecycleFilterButton({
  active,
  label,
  lifecycle,
  onClick,
}: {
  active: boolean;
  label: string;
  lifecycle?: CompetitionLifecycle;
  onClick: () => void;
}) {
  return (
    <Button
      aria-controls="public-competition-results"
      aria-pressed={active}
      className={cn(
        "h-8 rounded-md border px-3 text-xs",
        active && "border-primary/50 bg-primary/15 text-foreground",
      )}
      onClick={onClick}
      type="button"
      variant="outline"
    >
      {lifecycle ? (
        <span
          aria-hidden="true"
          className={cn(
            "size-2 rounded-full",
            lifecycleToneClasses[lifecycle].dot,
          )}
        />
      ) : null}
      <span>{label}</span>
    </Button>
  );
}

function CompetitionResult({
  competition,
}: {
  competition: PublicCompetition;
}) {
  const headingId = `competition-${competition.slug}`;
  const location =
    [competition.city, competition.region].filter(Boolean).join(", ") ||
    "Location to be announced";

  return (
    <article
      aria-labelledby={headingId}
      className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_minmax(28rem,0.9fr)] lg:items-center"
    >
      <div className="min-w-0">
        <LifecycleBadge lifecycle={competition.lifecycle} />
        <h2
          className="mt-3 text-base font-semibold leading-tight text-foreground"
          id={headingId}
        >
          {competition.name}
        </h2>
      </div>

      <dl className="grid gap-3 text-sm sm:grid-cols-3">
        <MetadataItem
          icon={CalendarDays}
          label="Dates"
          value={formatCalendarDateRange(
            competition.startsOn,
            competition.endsOn,
          )}
        />
        <MetadataItem icon={MapPin} label="Location" value={location} />
        <MetadataItem
          icon={Building2}
          label="Hosted by"
          value={
            competition.hostOrganizationDisplayName ??
            "Hosting Organization to be announced"
          }
        />
      </dl>
    </article>
  );
}

function MetadataItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <dt className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Icon aria-hidden="true" className="size-3.5 shrink-0" />
        {label}
      </dt>
      <dd className="mt-1 break-words font-medium leading-5 text-foreground">
        {value}
      </dd>
    </div>
  );
}

function LifecycleBadge({
  lifecycle,
}: {
  lifecycle: CompetitionLifecycle;
}) {
  const label = competitionLifecycleLabel(lifecycle);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold",
        lifecycleToneClasses[lifecycle].badge,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-2 rounded-full",
          lifecycleToneClasses[lifecycle].dot,
        )}
      />
      <span>{label}</span>
    </span>
  );
}

function CompetitionEmptyState() {
  return (
    <div
      className="rounded-lg border border-dashed border-border bg-card px-5 py-12 text-center shadow-card"
      role="status"
    >
      <Trophy
        aria-hidden="true"
        className="mx-auto size-8 text-muted-foreground"
      />
      <h2 className="mt-3 text-base font-semibold">
        No public Competitions yet
      </h2>
      <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-muted-foreground">
        Published Competitions will appear here when hosts make their public
        details available.
      </p>
    </div>
  );
}

function FilteredCompetitionEmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-card px-5 py-10 text-center shadow-card">
      <Search
        aria-hidden="true"
        className="mx-auto size-7 text-muted-foreground"
      />
      <h2 className="mt-3 text-base font-semibold">
        No Competitions match these filters
      </h2>
      <p
        aria-live="polite"
        className="mx-auto mt-1 max-w-md text-sm leading-6 text-muted-foreground"
      >
        Try another Competition, host, location, or lifecycle state.
      </p>
      <Button
        className="mt-4 rounded-md"
        onClick={onClear}
        type="button"
        variant="outline"
      >
        Clear filters
      </Button>
    </div>
  );
}

function formatCalendarDateRange(startsOn?: string, endsOn?: string) {
  const start = startsOn ? formatCalendarDate(startsOn) : undefined;
  const end = endsOn ? formatCalendarDate(endsOn) : undefined;

  if (start && end && startsOn !== endsOn) {
    return `${start} – ${end}`;
  }

  return start ?? end ?? "Dates to be announced";
}

function formatCalendarDate(value: string) {
  const dateParts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!dateParts) {
    return value;
  }

  const [, year, month, day] = dateParts;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(date);
}

function pluralizeCompetition(count: number) {
  return count === 1 ? "Competition" : "Competitions";
}
