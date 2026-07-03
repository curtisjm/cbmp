import type { Metadata } from "next";

import { PublicCompetitionsEmpty } from "../../components/public-competitions-empty";

export const metadata: Metadata = {
  title: "Public Competitions",
};

export default function CompetitionsPage() {
  return (
    <main className="page" aria-labelledby="competitions-heading">
      <section className="work-surface">
        <div className="work-header">
          <div>
            <h1 id="competitions-heading">Public Competitions</h1>
            <p>
              Published Competitions appear here when available. Draft
              Competitions are not shown on the public list.
            </p>
          </div>
          <div className="state-chip">
            <span className="state-chip__dot" aria-hidden="true" />
            <span>public list</span>
          </div>
        </div>

        <PublicCompetitionsEmpty
          ariaLabel="Public Competitions"
          description="Published Competitions will appear here with their Competition Lifecycle label and public route."
        />
      </section>
    </main>
  );
}
