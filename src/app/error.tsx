"use client";

import { RotateCcw } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <section
      className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-16"
      aria-labelledby="error-heading"
    >
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle id="error-heading">Something went wrong</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-muted-foreground">
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
        </CardContent>
      </Card>
    </section>
  );
}
