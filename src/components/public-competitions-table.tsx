"use client";

import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  type LucideIcon,
  MapPin,
  Search,
  Trophy,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

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

  const filteredRows = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return publicCompetitionFixtures.filter((row) => {
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
  }, [activeFilter, searchValue]);

  return (
    <section className="flex flex-col gap-4" aria-label="Competition results">
      <div className="rounded-lg border border-border bg-card p-3 shadow-card">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block flex-1 lg:max-w-md">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <span className="sr-only">Search Competitions</span>
            <Input
              className="h-9 rounded-md pl-9"
              onChange={(event) => setSearchValue(event.currentTarget.value)}
              placeholder="Search Competitions, hosts, locations"
              type="search"
              value={searchValue}
            />
          </label>
          <span className="text-xs font-medium text-muted-foreground">
            {filteredRows.length} of {publicCompetitionFixtures.length}{" "}
            Competitions
          </span>
        </div>

        <div
          className="mt-3 flex flex-wrap gap-2"
          aria-label="Competition lifecycle filters"
        >
          <Button
            aria-pressed={activeFilter === "all"}
            className={cn(
              "h-8 rounded-md border px-3 text-xs",
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
                "h-8 rounded-md border px-3 text-xs",
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

      {filteredRows.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {filteredRows.map((row) => (
            <li key={row.slug}>
              <CompetitionResultCard row={row} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-lg border border-dashed border-border bg-card px-5 py-10 text-center shadow-card">
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
            className="mt-4 rounded-md"
            onClick={() => {
              setActiveFilter("all");
              setSearchValue("");
            }}
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

function CompetitionResultCard({ row }: { row: CompetitionFixture }) {
  const cue = getLifecycleCue(row.lifecycle);

  if (!cue) {
    return null;
  }

  return (
    <article className="group rounded-lg border border-border bg-card shadow-card transition-all hover:border-primary/45 hover:shadow-elevated">
      <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="rounded-md" variant="outline">
              {row.sessions}
            </Badge>
            <LifecycleBadge tone={cue.tone} label={cue.label} />
          </div>
          <h2 className="mt-3 truncate text-base font-semibold leading-tight text-foreground">
            {row.name}
          </h2>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
            {row.summary}
          </p>
        </div>

        <dl className="grid gap-3 text-sm sm:grid-cols-3 lg:w-[34rem] lg:flex-none">
          <MetadataItem icon={CalendarDays} label="Date" value={row.dateLabel} />
          <MetadataItem
            icon={MapPin}
            label="Location"
            value={`${row.city}, ${row.region}`}
          />
          <MetadataItem icon={Users} label="Entries" value={row.entriesLabel} />
        </dl>

        <div className="flex items-center justify-between gap-3 border-t border-border pt-3 lg:w-56 lg:flex-col lg:items-start lg:border-l lg:border-t-0 lg:py-1 lg:pl-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Hosted by
            </p>
            <p className="mt-1 text-sm font-medium leading-5 text-foreground">
              {row.host}
            </p>
          </div>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock3 aria-hidden="true" className="size-3.5" />
            {cue.description}
          </p>
        </div>

        <ArrowUpRight
          aria-hidden="true"
          className="hidden size-4 flex-none text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground lg:block"
        />
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
    <div className="min-w-0 rounded-md border border-border bg-muted/35 px-3 py-2">
      <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        <Icon aria-hidden="true" className="size-3.5" />
        {label}
      </dt>
      <dd className="mt-1 truncate font-medium text-foreground">{value}</dd>
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
