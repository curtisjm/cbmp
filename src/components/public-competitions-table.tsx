"use client";

import {
  CalendarDays,
  Clock3,
  type LucideIcon,
  MapPin,
  Search,
  Trophy,
  Users,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import {
  competitionFixtures,
  getLifecycleCue,
  publicLifecycleCues,
  type CompetitionFixture,
  type LifecycleKey,
  type LifecycleTone,
} from "../lib/cbmp";

type ActiveFilter = LifecycleKey | "all";

const lifecycleToneClasses: Record<
  LifecycleTone,
  { badge: string; dot: string }
> = {
  closed: {
    badge: "border-warning/35 bg-warning/10 text-foreground",
    dot: "bg-warning",
  },
  draft: {
    badge: "border-muted bg-muted/70 text-muted-foreground",
    dot: "bg-muted-foreground",
  },
  finished: {
    badge: "border-success/35 bg-success/10 text-foreground",
    dot: "bg-success",
  },
  open: {
    badge: "border-primary/40 bg-primary/10 text-foreground",
    dot: "bg-primary",
  },
  published: {
    badge: "border-info/30 bg-info/10 text-foreground",
    dot: "bg-info",
  },
  running: {
    badge: "border-destructive/35 bg-destructive/10 text-foreground",
    dot: "bg-destructive",
  },
};

const publicCompetitionFixtures = competitionFixtures.filter(
  (row) => row.lifecycle !== "draft",
);

export function PublicCompetitionsTable() {
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
  const [searchValue, setSearchValue] = useState("");

  const query = searchValue.trim().toLowerCase();
  const filteredRows = publicCompetitionFixtures.filter((row) => {
    const cue = getLifecycleCue(row.lifecycle);
    const matchesFilter =
      activeFilter === "all" || row.lifecycle === activeFilter;
    const searchableText = [
      row.city,
      row.dateLabel,
      row.entriesLabel,
      row.host,
      row.name,
      row.region,
      row.sessions,
      row.summary,
      cue?.label ?? "",
      cue?.description ?? "",
    ]
      .join(" ")
      .toLowerCase();

    return matchesFilter && (query === "" || searchableText.includes(query));
  });

  const clearFilters = () => {
    setActiveFilter("all");
    setSearchValue("");
  };

  return (
    <section className="flex flex-col gap-5" aria-label="Competition results">
      <div className="border-y border-border bg-muted/25 py-4">
        <div className="flex flex-col gap-4 px-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="relative block flex-1 sm:max-w-lg">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <span className="sr-only">Search Competitions</span>
              <Input
                className="h-11 rounded-md pl-9"
                onChange={(event) => setSearchValue(event.currentTarget.value)}
                placeholder="Search Competitions, hosts, locations"
                type="search"
                value={searchValue}
              />
            </label>
            <output
              aria-atomic="true"
              aria-live="polite"
              className="text-sm font-medium text-muted-foreground"
            >
              {filteredRows.length} of {publicCompetitionFixtures.length} Competitions
            </output>
          </div>

          <div
            className="flex flex-wrap gap-2"
            aria-label="Competition lifecycle filters"
            role="group"
          >
            <Button
              aria-pressed={activeFilter === "all"}
              className={cn(
                "h-10 px-4 text-xs",
                activeFilter === "all" &&
                  "border-primary/50 bg-primary/15 text-foreground",
              )}
              variant="outline"
              onClick={() => setActiveFilter("all")}
              type="button"
            >
              All
            </Button>
            {publicLifecycleCues.map((cue) => (
              <Button
                aria-pressed={activeFilter === cue.key}
                className={cn(
                  "h-10 px-4 text-xs",
                  activeFilter === cue.key &&
                    "border-primary/50 bg-primary/15 text-foreground",
                )}
                variant="outline"
                key={cue.key}
                onClick={() => setActiveFilter(cue.key)}
                type="button"
              >
                <span
                  className={cn(
                    "size-2 rounded-full",
                    lifecycleToneClasses[cue.tone].dot,
                  )}
                  aria-hidden="true"
                />
                <span>{cue.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {filteredRows.length > 0 ? (
        <ul className="divide-y divide-border border-y border-border">
          {filteredRows.map((row) => (
            <li key={row.slug}>
              <CompetitionResultRow row={row} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="border-y border-dashed border-border px-5 py-12 text-center">
          <Trophy
            aria-hidden="true"
            className="mx-auto size-8 text-muted-foreground"
          />
          <h2 className="mt-3 text-base font-semibold">
            No Competitions match these filters
          </h2>
          <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-muted-foreground">
            Try a different host, city, lifecycle state, or clear the search to
            return to the full public discovery list.
          </p>
          <Button
            className="mt-5"
            onClick={clearFilters}
            type="button"
            variant="outline"
          >
            Clear filters
          </Button>
        </div>
      )}
    </section>
  );
}

function CompetitionResultRow({ row }: { row: CompetitionFixture }) {
  const cue = getLifecycleCue(row.lifecycle);

  if (!cue) {
    return null;
  }

  return (
    <article className="py-5 sm:py-6">
      <div className="flex flex-col gap-4 px-1">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <LifecycleBadge tone={cue.tone} label={cue.label} />
              <Badge className="rounded-md" variant="outline">
                {row.sessions}
              </Badge>
            </div>
            <h2 className="mt-3 text-lg font-semibold leading-tight text-foreground">
              {row.name}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              {row.summary}
            </p>
          </div>

          <p className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground sm:pt-1">
            <Clock3 aria-hidden="true" className="size-3.5" />
            {cue.description}
          </p>
        </div>

        <dl className="grid gap-x-8 gap-y-3 border-t border-border pt-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <MetadataItem icon={CalendarDays} label="Date" value={row.dateLabel} />
          <MetadataItem
            icon={MapPin}
            label="Location"
            value={`${row.city}, ${row.region}`}
          />
          <MetadataItem icon={Users} label="Entries" value={row.entriesLabel} />
          <MetadataItem icon={Trophy} label="Hosted by" value={row.host} />
        </dl>
      </div>
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
        <Icon aria-hidden="true" className="size-3.5" />
        {label}
      </dt>
      <dd className="mt-1 font-medium leading-5 text-foreground">{value}</dd>
    </div>
  );
}

function LifecycleBadge({
  label,
  tone,
}: {
  label: string;
  tone: LifecycleTone;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold",
        lifecycleToneClasses[tone].badge,
      )}
    >
      <span
        className={cn("size-2 rounded-full", lifecycleToneClasses[tone].dot)}
        aria-hidden="true"
      />
      <span>{label}</span>
    </span>
  );
}
