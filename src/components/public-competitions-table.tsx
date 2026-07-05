"use client";

import { ArrowUpRight, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { lifecycleCues, type LifecycleKey } from "../lib/cbmp";

type CompetitionRow = {
  date: string;
  host: string;
  lifecycle: LifecycleKey;
  location: string;
  name: string;
};

const competitionRows = [
  {
    date: "Feb 14, 2026",
    host: "MIT Ballroom Dance Team",
    lifecycle: "entries open",
    location: "Cambridge, MA",
    name: "MIT Open Ballroom Championships",
  },
  {
    date: "Mar 7, 2026",
    host: "UC Berkeley DanceSport",
    lifecycle: "published",
    location: "Berkeley, CA",
    name: "Berkeley Classic",
  },
  {
    date: "Jan 31, 2026",
    host: "Columbia Ballroom",
    lifecycle: "entries closed",
    location: "New York, NY",
    name: "Big Apple Dancesport Challenge",
  },
  {
    date: "Jan 24, 2026",
    host: "Ohio State Ballroom",
    lifecycle: "running",
    location: "Columbus, OH",
    name: "Midwest Collegiate Championships",
  },
  {
    date: "Nov 15, 2025",
    host: "Harvard Ballroom",
    lifecycle: "finished",
    location: "Cambridge, MA",
    name: "Harvard Invitational",
  },
  {
    date: "Apr 18, 2026",
    host: "Stanford Ballroom",
    lifecycle: "published",
    location: "Los Angeles, CA",
    name: "Emerald Ball Collegiate",
  },
] satisfies CompetitionRow[];

const lifecycleCueByKey = new Map(
  lifecycleCues.map((cue) => [cue.key, cue] as const),
);

type ActiveFilter = LifecycleKey | "all";

export function PublicCompetitionsTable() {
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
  const [searchValue, setSearchValue] = useState("");

  const filteredRows = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return competitionRows.filter((row) => {
      const cue = lifecycleCueByKey.get(row.lifecycle);
      const matchesFilter =
        activeFilter === "all" || row.lifecycle === activeFilter;
      const searchableText = [
        row.date,
        row.host,
        row.location,
        row.name,
        cue?.label ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return matchesFilter && (query === "" || searchableText.includes(query));
    });
  }, [activeFilter, searchValue]);

  return (
    <section className="competition-list">
      <div className="competition-list__toolbar">
        <div className="competition-list__topbar">
          <label className="competition-search">
            <Search aria-hidden="true" className="competition-search__icon" />
            <span className="sr-only">Search Competitions</span>
            <input
              onChange={(event) => setSearchValue(event.currentTarget.value)}
              placeholder="Search Competitions, hosts, locations"
              type="search"
              value={searchValue}
            />
          </label>
          <span className="competition-count">
            {filteredRows.length} of {competitionRows.length} Competitions
          </span>
        </div>

        <div className="filter-chip-list" aria-label="Competition filters">
          <button
            aria-pressed={activeFilter === "all"}
            className="filter-chip"
            data-active={activeFilter === "all" ? "true" : undefined}
            onClick={() => setActiveFilter("all")}
            type="button"
          >
            <span>All</span>
          </button>
          {lifecycleCues.map((cue) => (
            <button
              aria-pressed={activeFilter === cue.key}
              className="filter-chip"
              data-active={activeFilter === cue.key ? "true" : undefined}
              key={cue.key}
              onClick={() => setActiveFilter(cue.key)}
              type="button"
            >
              <span
                className="filter-chip__dot"
                data-tone={cue.tone}
                aria-hidden="true"
              />
              <span>{cue.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="competition-table-wrap">
        <table className="competition-table">
          <thead>
            <tr>
              <th scope="col">Competition</th>
              <th scope="col">Host</th>
              <th scope="col">Location</th>
              <th scope="col">Date</th>
              <th scope="col">Competition Lifecycle</th>
              <th scope="col">
                <span className="sr-only">Open Competition</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length > 0 ? (
              filteredRows.map((row) => (
                <CompetitionTableRow row={row} key={row.name} />
              ))
            ) : (
              <tr>
                <td className="competition-table__empty" colSpan={6}>
                  No Competitions match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CompetitionTableRow({ row }: { row: CompetitionRow }) {
  const cue = lifecycleCueByKey.get(row.lifecycle);

  if (!cue) {
    return null;
  }

  return (
    <tr>
      <th scope="row">{row.name}</th>
      <td>{row.host}</td>
      <td>
        <span className="location-cell">
          <MapPin aria-hidden="true" className="location-cell__icon" />
          <span>{row.location}</span>
        </span>
      </td>
      <td>{row.date}</td>
      <td>
        <span className="status-pill">
          <span
            className="status-pill__dot"
            data-tone={cue.tone}
            aria-hidden="true"
          />
          <span>{cue.label}</span>
        </span>
      </td>
      <td className="competition-table__open">
        <ArrowUpRight aria-hidden="true" />
      </td>
    </tr>
  );
}
