import { ArrowLeft, Construction, Trophy } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

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
      className="container flex min-h-[calc(100dvh-4rem)] items-center justify-center py-16"
      aria-labelledby="coming-soon-heading"
    >
      <div className="w-full max-w-2xl border-y border-border py-10 sm:py-12">
        <div className="grid size-11 place-items-center rounded-lg bg-primary/20 text-foreground">
          <Construction className="size-5" aria-hidden="true" />
        </div>
        <h1
          id="coming-soon-heading"
          className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl"
        >
          {surface} is coming soon.
        </h1>
        <p className="mt-4 max-w-[62ch] text-sm leading-6 text-muted-foreground">
          This workspace is still being shaped. Public Competition discovery is
          available now, and you can return home for the rest of the current CBMP
          preview.
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
      </div>
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
