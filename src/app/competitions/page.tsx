import { Search } from "lucide-react";
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
              Browse published Competitions when hosts make them public. Drafts
              stay private.
            </p>
          </div>
          <div
            className="empty-table"
            aria-label="Public Competition list tools"
          >
            <div className="empty-table__head">
              <span>/competitions</span>
              <span>
                <button className="button button--dark" disabled type="button">
                  <Search aria-hidden="true" className="button__icon" />
                  <span>Search unavailable</span>
                </button>
              </span>
              <span>Published only</span>
              <span>Public list</span>
            </div>
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
