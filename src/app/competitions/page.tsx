import { ArrowUpRight, MapPin, Search } from "lucide-react";
import type { Metadata } from "next";

import { lifecycleCues, type LifecycleKey } from "../../lib/cbmp";

export const metadata: Metadata = {
  title: "Public Competitions",
};

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

export default function CompetitionsPage() {
  return (
    <main
      className="page page--competitions"
      aria-labelledby="competitions-heading"
    >
      <div className="page-heading">
        <h1 id="competitions-heading">Competitions</h1>
        <p>
          Public discovery surface for collegiate ballroom Competitions. Only
          published Competitions appear here - drafts stay private to their
          hosts.
        </p>
      </div>

      <section className="competition-list">
        <div className="competition-list__toolbar">
          <div className="competition-list__topbar">
            <label className="competition-search">
              <Search aria-hidden="true" className="competition-search__icon" />
              <span className="sr-only">Search Competitions</span>
              <input
                disabled
                placeholder="Search Competitions, hosts, locations"
                type="search"
              />
            </label>
            <span className="competition-count">6 of 6 Competitions</span>
          </div>

          <div className="filter-chip-list" aria-label="Competition filters">
            {["All", ...lifecycleCues.map((cue) => cue.label)].map((label, index) => (
              <span
                className="filter-chip"
                data-active={index === 0 ? "true" : undefined}
                key={label}
              >
                {index > 0 ? (
                  <span
                    className="filter-chip__dot"
                    data-tone={lifecycleCues[index - 1].tone}
                    aria-hidden="true"
                  />
                ) : null}
                <span>{label}</span>
              </span>
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
              {competitionRows.map((row) => (
                <CompetitionTableRow row={row} key={row.name} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
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
