import type { Metadata } from "next";

import { PublicCompetitionsEmpty } from "../../components/public-competitions-empty";

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
        <span className="route-label">/competitions</span>
        <h1 id="competitions-heading">Public Competitions</h1>
        <p>
          Browse published Competitions when hosts make them public. Drafts stay
          private.
        </p>
      </div>

      <section className="work-surface">
        <div className="work-header">
          <div>
            <h2>Published list</h2>
            <p>Competition Lifecycle labels appear with public routes.</p>
          </div>
          <div className="state-chip">
            <span className="state-chip__dot" aria-hidden="true" />
            <span>published only</span>
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
