"use client";

import { RotateCcw } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <section
      className="container flex min-h-[calc(100dvh-4rem)] items-center justify-center py-16"
      aria-labelledby="error-heading"
    >
      <div className="w-full max-w-lg border-y border-border py-10">
        <h1 id="error-heading" className="text-2xl font-semibold leading-tight">
          Something went wrong
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          This surface could not be loaded. Try again or return to the public
          Competition list.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset} type="button">
            <RotateCcw aria-hidden="true" />
            <span>Try again</span>
          </Button>
          <Button asChild variant="outline">
            <Link href="/competitions">Competitions</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
