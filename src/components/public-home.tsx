"use client";

import {
  motion,
  useReducedMotion,
  type MotionProps,
  type Transition,
} from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  ClipboardCheck,
  Gavel,
  Radio,
  Users,
} from "lucide-react";
import Link from "next/link";

import { AuthAccessAction } from "@/components/auth-access-action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  homeHeroMockupActiveCompetition,
  homeHeroMockupNavItems,
  homeHeroMockupRows,
  homeHeroMockupStats,
  lifecycleCues,
  productName,
  workflowPanels,
  type LifecycleCue,
} from "@/lib/cbmp";
import { cn } from "@/lib/utils";

type PublicHomeProps = {
  clerkEnabled: boolean;
};

const revealTransition = {
  duration: 0.45,
  ease: "easeOut",
} satisfies Transition;

const heroPreviewTransition = {
  delay: 0.1,
  duration: 0.5,
  ease: "easeOut",
} satisfies Transition;

function revealMotion(reduceMotion: boolean, y = 18): MotionProps {
  if (reduceMotion) {
    return {};
  }

  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: revealTransition,
  };
}

function heroIntroMotion(reduceMotion: boolean): MotionProps {
  if (reduceMotion) {
    return {};
  }

  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: revealTransition,
  };
}

function heroPreviewMotion(reduceMotion: boolean): MotionProps {
  if (reduceMotion) {
    return {};
  }

  return {
    initial: { opacity: 0, scale: 0.98, y: 18 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: heroPreviewTransition,
  };
}

const roleCards = [
  {
    icon: ClipboardCheck,
    title: "Competition Hosts",
    body: "Prepare public listings, Entry windows, officials, and day-of context without mixing in platform-wide authority.",
  },
  {
    icon: Gavel,
    title: "Scrutineers",
    body: "See the Competition Lifecycle clearly before running-state decisions become available in later slices.",
  },
  {
    icon: Users,
    title: "Organizations",
    body: "Keep Entry work connected to durable Competitor and Organization language as the product grows.",
  },
];

export function PublicHome({ clerkEnabled }: PublicHomeProps) {
  const reduceMotion = useReducedMotion();
  const shouldReduceMotion = reduceMotion ?? false;

  return (
    <div className="overflow-hidden bg-background">
      <section
        className="relative border-b bg-gradient-to-b from-background via-background to-muted/45"
        aria-labelledby="home-heading"
      >
        <div className="container flex min-h-[calc(100svh-4rem)] flex-col items-center py-16 text-center md:py-20">
          <motion.div
            {...heroIntroMotion(shouldReduceMotion)}
            className="mx-auto max-w-3xl"
          >
            <Badge variant="outline" className="mb-5 bg-card">
              {productName} public preview
            </Badge>
            <h1
              id="home-heading"
              className="text-balance text-4xl font-semibold leading-[1.05] tracking-normal text-foreground md:text-5xl lg:text-6xl"
            >
              CBMP Competition operations in one shared workspace.
            </h1>
            <p className="mt-6 max-w-[65ch] text-base leading-7 text-muted-foreground md:text-lg">
              Coordinate collegiate ballroom Competitions across public
              discovery, Entries, officials, schedule context, and lifecycle
              state without turning day-of work into spreadsheet archaeology.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/competitions">
                  <span>Browse Competitions</span>
                  <ArrowRight aria-hidden="true" data-icon="inline-end" />
                </Link>
              </Button>
              <AuthAccessAction
                clerkEnabled={clerkEnabled}
                variant="outline"
              />
            </div>
          </motion.div>

          <HeroOperationsMockup reduceMotion={shouldReduceMotion} />
        </div>
      </section>

      <motion.section
        {...revealMotion(shouldReduceMotion)}
        className="container grid gap-5 py-16 md:grid-cols-3"
        aria-labelledby="role-surfaces-heading"
      >
        <div className="md:col-span-3">
          <h2
            id="role-surfaces-heading"
            className="text-2xl font-semibold leading-tight"
          >
            Built around Competition work, not generic admin noise.
          </h2>
        </div>
        {roleCards.map((card) => (
          <article
            className="rounded-lg border bg-card p-5 shadow-card"
            key={card.title}
          >
            <div className="grid size-10 place-items-center rounded-lg bg-muted text-foreground">
              <card.icon className="size-5" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-base font-semibold">{card.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {card.body}
            </p>
          </article>
        ))}
      </motion.section>

      <section className="border-y bg-card" aria-labelledby="lifecycle-heading">
        <div className="container grid gap-8 py-16 lg:grid-cols-[0.82fr_1.18fr]">
          <motion.div {...revealMotion(shouldReduceMotion)}>
            <h2
              id="lifecycle-heading"
              className="text-2xl font-semibold leading-tight"
            >
              Competition Lifecycle
            </h2>
            <p className="mt-4 max-w-[62ch] text-sm leading-6 text-muted-foreground">
              CBMP uses explicit lifecycle labels so public viewers and
              operational staff can understand what state a Competition is in
              without relying on color alone.
            </p>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2">
            {lifecycleCues.map((cue, index) => (
              <LifecycleTile
                cue={cue}
                delay={index * 0.04}
                key={cue.key}
                reduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16" aria-labelledby="workflow-heading">
        <motion.div {...revealMotion(shouldReduceMotion)} className="max-w-2xl">
          <h2
            id="workflow-heading"
            className="text-2xl font-semibold leading-tight"
          >
            A Competition workspace shaped for future product slices.
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            These reference patterns establish the working surface for later
            Clerk and Convex product work while keeping unsettled permissions
            and scoring workflows out of this pass.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {workflowPanels.map((panel) => (
            <article
              className="rounded-lg border bg-card p-5 shadow-card"
              key={panel.title}
            >
              <panel.icon className="size-5 text-muted-foreground" aria-hidden="true" />
              <h3 className="mt-5 text-base font-semibold">{panel.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {panel.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function HeroOperationsMockup({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      {...heroPreviewMotion(reduceMotion)}
      aria-label="CBMP product interface preview"
      className="relative mx-auto mt-14 w-full max-w-6xl sm:mt-16"
      data-testid="home-hero-preview"
    >
      <div className="relative">
        <div className="rounded-xl border bg-card p-3 shadow-elevated">
          <div className="overflow-hidden rounded-lg border bg-background">
            <div className="flex items-center justify-between border-b bg-foreground px-4 py-3 text-background">
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-md bg-background/12 text-xs font-bold">
                  {homeHeroMockupActiveCompetition.initials}
                </span>
                <span className="text-sm font-semibold">
                  {homeHeroMockupActiveCompetition.workspaceLabel}
                </span>
              </div>
              <div className="hidden items-center gap-2 text-xs text-background/70 sm:flex">
                <Radio className="size-3.5" aria-hidden="true" />
                <span>{homeHeroMockupActiveCompetition.referenceLabel}</span>
              </div>
            </div>
            <div className="grid gap-0 md:grid-cols-[13rem_1fr]">
              <aside className="hidden border-r bg-muted/45 p-3 md:block">
                {homeHeroMockupNavItems.map((item, index) => (
                  <div
                    className={cn(
                      "mb-1 rounded-md px-3 py-2 text-xs font-medium",
                      index === 0
                        ? "bg-card text-foreground shadow-card"
                        : "text-muted-foreground",
                    )}
                    key={item.id}
                  >
                    {item.label}
                  </div>
                ))}
              </aside>
              <div className="p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">
                      {homeHeroMockupActiveCompetition.kicker}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold">
                      {homeHeroMockupActiveCompetition.heading}
                    </h2>
                  </div>
                  <Badge>{homeHeroMockupActiveCompetition.badge}</Badge>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {homeHeroMockupStats.map((stat) => (
                    <div className="rounded-lg border bg-card p-3" key={stat.id}>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="mt-1 text-xl font-semibold tabular">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 overflow-hidden rounded-lg border bg-card">
                  {homeHeroMockupRows.map((row, index) => (
                    <motion.div
                      {...(!reduceMotion && {
                        initial: { opacity: 0, x: -8 },
                        animate: { opacity: 1, x: 0 },
                        transition: {
                          delay: 0.3 + index * 0.08,
                          duration: 0.25,
                        },
                      })}
                      className="border-b p-3 last:border-b-0"
                      key={row.id}
                    >
                      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                        <div>
                          <p className="text-sm font-semibold">{row.name}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {row.detail}
                          </p>
                        </div>
                        <span className="self-start rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                          {row.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-6 right-8 hidden rounded-lg border bg-card p-3 shadow-elevated sm:block">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-full bg-primary/20">
              <CalendarDays className="size-4" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold">
                {homeHeroMockupActiveCompetition.nextSessionLabel}
              </p>
              <p className="text-xs text-muted-foreground">
                {homeHeroMockupActiveCompetition.nextSessionDetail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function LifecycleTile({
  cue,
  delay,
  reduceMotion,
}: {
  cue: LifecycleCue;
  delay: number;
  reduceMotion: boolean;
}) {
  const transition = {
    delay,
    duration: 0.28,
    ease: "easeOut",
  } satisfies Transition;

  return (
    <motion.article
      {...(!reduceMotion && {
        initial: { opacity: 0, y: 10 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition,
      })}
      className="rounded-lg border bg-background p-4"
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "mt-1 size-2.5 shrink-0 rounded-full",
            lifecycleToneClass(cue.tone),
          )}
          aria-hidden="true"
        />
        <div>
          <h3 className="text-sm font-semibold">{cue.label}</h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {cue.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

function lifecycleToneClass(tone: LifecycleCue["tone"]) {
  switch (tone) {
    case "draft":
      return "bg-muted-foreground";
    case "published":
      return "bg-lifecycle-published";
    case "open":
      return "bg-lifecycle-open";
    case "closed":
      return "bg-lifecycle-closed";
    case "running":
      return "bg-lifecycle-running";
    case "finished":
      return "bg-lifecycle-finished";
  }
}
