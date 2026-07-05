import { ArrowUpRight, MapPin, Search } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Public Competitions",
};

const competitionRows = [
  {
    date: "Feb 14, 2026",
    host: "MIT Ballroom Dance Team",
    location: "Cambridge, MA",
    name: "MIT Open Ballroom Championships",
    status: "Entries open",
    tone: "open",
  },
  {
    date: "Mar 7, 2026",
    host: "UC Berkeley DanceSport",
    location: "Berkeley, CA",
    name: "Berkeley Classic",
    status: "Published",
    tone: "published",
  },
  {
    date: "Jan 31, 2026",
    host: "Columbia Ballroom",
    location: "New York, NY",
    name: "Big Apple Dancesport Challenge",
    status: "Entries closed",
    tone: "closed",
  },
  {
    date: "Jan 24, 2026",
    host: "Ohio State Ballroom",
    location: "Columbus, OH",
    name: "Midwest Collegiate Championships",
    status: "Running",
    tone: "running",
  },
  {
    date: "Nov 15, 2025",
    host: "Harvard Ballroom",
    location: "Cambridge, MA",
    name: "Harvard Invitational",
    status: "Finished",
    tone: "finished",
  },
  {
    date: "Apr 18, 2026",
    host: "Stanford Ballroom",
    location: "Los Angeles, CA",
    name: "Emerald Ball Collegiate",
    status: "Published",
    tone: "published",
  },
] as const;

const filterLabels = [
  "All",
  "Published",
  "Entries open",
  "Entries closed",
  "Running",
  "Finished",
] as const;

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
            {filterLabels.map((label, index) => (
              <span
                className="filter-chip"
                data-active={index === 0 ? "true" : undefined}
                data-tone={label.toLowerCase().replace(" ", "-")}
                key={label}
              >
                {index > 0 ? (
                  <span className="filter-chip__dot" aria-hidden="true" />
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
                <th scope="col">Status</th>
                <th scope="col">
                  <span className="sr-only">Open Competition</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {competitionRows.map((row) => (
                <tr key={row.name}>
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
                    <span className="status-pill" data-tone={row.tone}>
                      <span className="status-pill__dot" aria-hidden="true" />
                      <span>{row.status}</span>
                    </span>
                  </td>
                  <td className="competition-table__open">
                    <ArrowUpRight aria-hidden="true" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
