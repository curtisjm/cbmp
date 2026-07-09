import { Compass } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <section
      className="container flex min-h-[calc(100dvh-4rem)] items-center justify-center py-16"
      aria-labelledby="not-found-heading"
    >
      <div className="w-full max-w-lg border-y border-border py-10">
        <h1
          id="not-found-heading"
          className="text-2xl font-semibold leading-tight"
        >
          Route not available
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          The page you requested is not available. Public Competitions remain
          available from the main navigation.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/competitions">
              <Compass aria-hidden="true" />
              <span>Competitions</span>
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">CBMP home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
