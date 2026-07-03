import type { Metadata } from "next";
import { ClipboardList } from "lucide-react";

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

        <div className="empty-table" aria-label="Public Competitions">
          <div className="empty-table__head" role="presentation">
            <span>Competition</span>
            <span>Competition Lifecycle</span>
            <span>Host Organization</span>
            <span>Route</span>
          </div>
          <div className="empty-state">
            <div>
              <span className="empty-state__icon">
                <ClipboardList aria-hidden="true" />
              </span>
              <h2>No public Competitions yet</h2>
              <p>
                Published Competitions will appear here with their Competition
                Lifecycle label and public route.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
