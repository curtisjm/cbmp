import { ArrowRight, ClipboardList } from "lucide-react";
import Link from "next/link";

import { AuthEntryAction } from "../components/auth-entry-action";
import { isClerkEnabled } from "../components/app-providers";
import { LifecycleCues } from "../components/lifecycle-cues";
import { entryActions, productDescription, productName } from "../lib/cbmp";

export default function HomePage() {
  return (
    <main className="page" aria-labelledby="home-heading">
      <div className="entry-layout">
        <section className="entry-intro">
          <div>
            <h1 id="home-heading">{productName}</h1>
            <p>{productDescription}</p>
          </div>

          <div>
            <ul className="route-list" aria-label="CBMP public route map">
              {entryActions.map((action) => (
                <li key={action.label}>
                  <Link className="route-row" href={action.href}>
                    <span>
                      <span className="route-row__label">{action.label}</span>
                      <span className="route-row__description">
                        {action.description}
                      </span>
                    </span>
                    <action.icon aria-hidden="true" className="route-row__icon" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="entry-actions">
            <Link className="button button--primary" href="/competitions">
              <ClipboardList aria-hidden="true" className="button__icon" />
              <span>Competitions</span>
              <ArrowRight aria-hidden="true" className="button__icon" />
            </Link>
            <AuthEntryAction clerkEnabled={isClerkEnabled()} />
          </div>
        </section>

        <LifecycleCues />
      </div>

      <div className="home-secondary">
        <section className="work-surface" aria-labelledby="public-heading">
          <div className="work-header">
            <div>
              <h2 id="public-heading">Public Competitions</h2>
              <p>
                Published Competitions appear with text-first Competition
                Lifecycle cues.
              </p>
            </div>
            <Link className="button button--secondary" href="/competitions">
              <ClipboardList aria-hidden="true" className="button__icon" />
              <span>Open list</span>
            </Link>
          </div>
          <div className="empty-table" aria-label="Public Competitions preview">
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
                  The list remains empty until a Competition is published.
                </p>
              </div>
            </div>
          </div>
        </section>

        <aside className="work-surface" aria-labelledby="language-heading">
          <div className="work-header">
            <div>
              <h2 id="language-heading">Domain Language</h2>
              <p>Public surfaces keep product nouns precise.</p>
            </div>
          </div>
          <ul className="compact-list">
            <li>
              <strong>User</strong>
              <span>identity and session path</span>
            </li>
            <li>
              <strong>User Profile</strong>
              <span>profile information</span>
            </li>
            <li>
              <strong>Competition</strong>
              <span>hosted ballroom competition</span>
            </li>
            <li>
              <strong>Competition Lifecycle</strong>
              <span>top-level Competition state</span>
            </li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
