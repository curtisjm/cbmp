import { ArrowRight, ClipboardList } from "lucide-react";
import Link from "next/link";

import { AuthAccessAction } from "../components/auth-access-action";
import { isClerkEnabled } from "../components/app-providers";
import { LifecycleCues } from "../components/lifecycle-cues";
import { PublicCompetitionsEmpty } from "../components/public-competitions-empty";
import { publicAccessLinks, productDescription, productName } from "../lib/cbmp";

export default function HomePage() {
  return (
    <main className="page" aria-labelledby="home-heading">
      <div className="home-layout">
        <section className="home-intro">
          <div>
            <h1 id="home-heading">{productName}</h1>
            <p>{productDescription}</p>
          </div>

          <div>
            <ul className="route-list" aria-label="CBMP public access links">
              {publicAccessLinks.map((link) => (
                <li key={link.label}>
                  <Link className="route-row" href={link.href}>
                    <span>
                      <span className="route-row__label">{link.label}</span>
                      <span className="route-row__description">
                        {link.description}
                      </span>
                    </span>
                    <link.icon aria-hidden="true" className="route-row__icon" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="home-actions">
            <Link className="button button--primary" href="/competitions">
              <ClipboardList aria-hidden="true" className="button__icon" />
              <span>Competitions</span>
              <ArrowRight aria-hidden="true" className="button__icon" />
            </Link>
            <AuthAccessAction clerkEnabled={isClerkEnabled()} variant="secondary" />
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
          <PublicCompetitionsEmpty
            ariaLabel="Public Competitions preview"
            description="The list remains empty until a Competition is published."
          />
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
