import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CompetitionManagementDemo } from "@/components/competition-management-demo";
import { competitionFixtures } from "@/lib/cbmp";

type CompetitionManagementPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return competitionFixtures.map((competition) => ({
    slug: competition.slug,
  }));
}

export async function generateMetadata({
  params,
}: CompetitionManagementPageProps): Promise<Metadata> {
  const { slug } = await params;
  const competition = competitionFixtures.find((item) => item.slug === slug);

  if (!competition) {
    return {
      title: "Competition management demo",
    };
  }

  return {
    title: `${competition.name} demo`,
    description:
      "Playable prototype reference for a CBMP Competition management route.",
  };
}

export default async function CompetitionManagementPage({
  params,
}: CompetitionManagementPageProps) {
  const { slug } = await params;
  const competition = competitionFixtures.find((item) => item.slug === slug);

  if (!competition) {
    notFound();
  }

  return <CompetitionManagementDemo slug={slug} />;
}
