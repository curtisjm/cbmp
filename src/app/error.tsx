"use client";

import { RotateCcw } from "lucide-react";
import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="safe-page" aria-labelledby="error-heading">
      <section className="safe-surface">
        <h1 id="error-heading">Something went wrong</h1>
        <p>
          This surface could not be loaded. Try again or return to the public
          Competition list.
        </p>
        <div className="safe-actions">
          <button className="button button--primary" onClick={reset} type="button">
            <RotateCcw aria-hidden="true" className="button__icon" />
            <span>Try again</span>
          </button>
          <Link className="button button--secondary" href="/competitions">
            <span>Competitions</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
