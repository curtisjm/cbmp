import type { Metadata } from "next";

import { PublicCompetitionsTable } from "../../components/public-competitions-table";

export const metadata: Metadata = {
  title: "Public Competitions",
};

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

      <PublicCompetitionsTable />
    </main>
  );
}
