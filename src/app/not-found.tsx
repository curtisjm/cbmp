import { Compass } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="safe-page" aria-labelledby="not-found-heading">
      <section className="safe-surface">
        <h1 id="not-found-heading">Route not available</h1>
        <p>
          The page you requested is not available. Public Competitions remain
          available from the main navigation.
        </p>
        <div className="safe-actions">
          <Link className="button button--primary" href="/competitions">
            <Compass aria-hidden="true" className="button__icon" />
            <span>Competitions</span>
          </Link>
          <Link className="button button--secondary" href="/">
            <span>CBMP home</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
