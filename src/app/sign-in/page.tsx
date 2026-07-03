import { SignIn } from "@clerk/nextjs";
import { ClipboardList, House } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { isClerkEnabled } from "../../components/app-providers";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignInPage() {
  if (isClerkEnabled()) {
    return (
      <main className="safe-page" aria-label="Sign in">
        <section className="safe-surface">
          <SignIn
            fallbackRedirectUrl="/"
            path="/sign-in"
            routing="path"
            transferable={false}
            withSignUp={false}
          />
        </section>
      </main>
    );
  }

  return (
    <main className="safe-page" aria-labelledby="sign-in-heading">
      <section className="safe-surface">
        <h1 id="sign-in-heading">Sign in unavailable</h1>
        <p>
          Clerk is not configured for this environment. Public Competitions
          remain available without signing in.
        </p>
        <div className="safe-actions">
          <Link className="button button--primary" href="/competitions">
            <ClipboardList aria-hidden="true" className="button__icon" />
            <span>Competitions</span>
          </Link>
          <Link className="button button--secondary" href="/">
            <House aria-hidden="true" className="button__icon" />
            <span>Public home</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
