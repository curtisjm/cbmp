import { ArrowLeft, ClipboardList, Construction, Trophy } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { productName } from "@/lib/cbmp";

export const metadata: Metadata = {
  title: "Coming Soon",
};

type ComingSoonPageProps = {
  searchParams?: Promise<{
    surface?: string | string[];
  }>;
};

const surfaceLabels: Record<string, string> = {
  "competition-hosts": "Competition Hosts",
  "entry-review": "Entry Review",
  "floor-coordination": "Floor Coordination",
  organizations: "Organizations",
  "public-boundary": "Public Boundary",
  scrutineers: "Scrutineers",
};

export default async function ComingSoonPage({
  searchParams,
}: ComingSoonPageProps) {
  const params = await searchParams;
  const surface = formatSurfaceLabel(params?.surface);

  return (
    <section
      className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-16"
      aria-labelledby="coming-soon-heading"
    >
      <Card className="w-full max-w-2xl overflow-hidden">
        <CardHeader className="border-b bg-muted/45">
          <div className="mb-4 grid size-11 place-items-center rounded-lg bg-primary/20 text-foreground">
            <Construction className="size-5" aria-hidden="true" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {productName} preview
          </p>
          <h1
            id="coming-soon-heading"
            className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl"
          >
            {surface} is coming soon.
          </h1>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="max-w-[62ch] text-sm leading-6 text-muted-foreground">
            This temporary route keeps the public home cards clickable while the
            deeper CBMP surfaces are still being shaped. Public Competition
            discovery remains available today.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/competitions">
                <Trophy aria-hidden="true" />
                <span>Competitions</span>
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft aria-hidden="true" />
                <span>Home</span>
              </Link>
            </Button>
          </div>

          <div className="mt-8 rounded-lg border bg-background p-4">
            <div className="flex gap-3">
              <ClipboardList
                className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <p className="text-sm leading-6 text-muted-foreground">
                The page name can be passed as a{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground">
                  surface
                </code>{" "}
                query parameter so prototype links can point here without
                implying that final routes or permissions exist yet.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function formatSurfaceLabel(value: string | string[] | undefined) {
  const rawValue = Array.isArray(value) ? value[0] : value;

  if (!rawValue) {
    return "This CBMP surface";
  }

  const normalized = rawValue.trim().toLowerCase();
  const knownLabel = surfaceLabels[normalized];

  if (knownLabel) {
    return knownLabel;
  }

  const words = normalized
    .replace(/[^a-z0-9 _-]/g, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 5);

  if (words.length === 0) {
    return "This CBMP surface";
  }

  return words
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}
