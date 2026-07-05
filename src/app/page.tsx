import { ArrowRight, ClipboardList } from "lucide-react";
import Link from "next/link";

import { AuthAccessAction } from "../components/auth-access-action";
import { isClerkEnabled } from "../components/app-providers";
import { LifecycleCues } from "../components/lifecycle-cues";

export default function HomePage() {
  return (
    <main className="page page--home" aria-labelledby="home-heading">
      <section className="home-hero">
        <div className="home-copy">
          <p className="home-kicker">Collegiate ballroom operations</p>
          <h1 id="home-heading">
            Run collegiate ballroom competitions without spreadsheet chaos.
          </h1>
          <p>
            CBMP gives hosts and officials one shared operational surface for
            Competition setup, public discovery, lifecycle state, and final
            results.
          </p>

          <div className="home-actions">
            <Link className="button button--primary" href="/competitions">
              <ClipboardList aria-hidden="true" className="button__icon" />
              <span>Browse Competitions</span>
              <ArrowRight aria-hidden="true" className="button__icon" />
            </Link>
            <AuthAccessAction clerkEnabled={isClerkEnabled()} variant="secondary" />
          </div>
        </div>
      </section>

      <LifecycleCues />
    </main>
  );
}
