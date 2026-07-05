"use client";

import type { LucideIcon } from "lucide-react";
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

const reducedRevealTransition = {
  duration: 0.26,
  ease: "easeOut",
} satisfies Transition;

function revealMotion(reduceMotion: boolean, y = 18): MotionProps {
  return {
    initial: { opacity: 0, y: reduceMotion ? Math.min(6, y) : y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: reduceMotion ? reducedRevealTransition : revealTransition,
  };
}

function heroIntroMotion(reduceMotion: boolean): MotionProps {
  return {
    initial: { opacity: 0, y: reduceMotion ? 5 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: reduceMotion ? reducedRevealTransition : revealTransition,
  };
}

function heroPreviewMotion(reduceMotion: boolean): MotionProps {
  return {
    initial: {
      opacity: 0,
      scale: reduceMotion ? 0.995 : 0.98,
      y: reduceMotion ? 5 : 18,
    },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: reduceMotion ? reducedRevealTransition : heroPreviewTransition,
  };
}

type CardLinkContent = {
  ariaLabel: string;
  body: string;
  cta: string;
  href: string;
  icon: LucideIcon;
  title: string;
};

type CardLinkMeta = Pick<CardLinkContent, "ariaLabel" | "cta" | "href">;

const roleCards = [
  {
    ariaLabel:
      "Open the Competition Hosts workspace for the MIT Open Ballroom Championships",
    cta: "Open host workspace",
    href: "/app/competitions/mit-open-2026",
    icon: ClipboardCheck,
    title: "Competition Hosts",
    body: "Prepare public listings, Entry windows, officials, and day-of context without mixing in platform-wide authority.",
  },
  {
    ariaLabel: "Preview the Scrutineers surface",
    cta: "Preview scrutineering",
    href: "/coming-soon?surface=scrutineers",
    icon: Gavel,
    title: "Scrutineers",
    body: "See the Competition Lifecycle clearly before running-state decisions become available in later slices.",
  },
  {
    ariaLabel: "Preview the Organizations surface",
    cta: "Preview organizations",
    href: "/coming-soon?surface=organizations",
    icon: Users,
    title: "Organizations",
    body: "Keep Entry work connected to durable Competitor and Organization language as the product grows.",
  },
] satisfies readonly CardLinkContent[];

const workflowCardLinks: Record<string, CardLinkMeta> = {
  "Entry Review": {
    ariaLabel: "Preview the Entry Review surface",
    cta: "Preview entry review",
    href: "/coming-soon?surface=entry-review",
  },
  "Floor Coordination": {
    ariaLabel:
      "Open floor coordination context for the MIT Open Ballroom Championships",
    cta: "Open floor context",
    href: "/app/competitions/mit-open-2026",
  },
  "Public Boundary": {
    ariaLabel: "Browse public Competitions",
    cta: "Browse public view",
    href: "/competitions",
  },
};

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
            <HeroDemoPill reduceMotion={shouldReduceMotion} />
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
          <InteractiveCardLink {...card} key={card.title} />
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
          {workflowPanels.map((panel) => {
            const linkMeta = workflowCardLinks[panel.title];

            return (
              <InteractiveCardLink
                ariaLabel={linkMeta.ariaLabel}
                body={panel.body}
                cta={linkMeta.cta}
                href={linkMeta.href}
                icon={panel.icon}
                key={panel.title}
                title={panel.title}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

function HeroDemoPill({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <Link
      aria-label="Open the Live Demo Webinar competition workspace"
      className="group mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/70 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      href="/app/competitions/mit-open-2026"
    >
      <span className="relative flex size-3 items-center justify-center">
        <motion.span
          animate={{
            opacity: reduceMotion ? [0.55, 0.25, 0.55] : [0.55, 0, 0.55],
            scale: reduceMotion ? [1, 1.25, 1] : [1, 1.75, 1],
          }}
          aria-hidden="true"
          className="absolute size-3 rounded-full bg-emerald-400"
          transition={{
            duration: reduceMotion ? 1.6 : 1.2,
            ease: "easeOut",
            repeat: Infinity,
          }}
        />
        <span
          aria-hidden="true"
          className="relative size-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.14)]"
        />
      </span>
      <span>Live Demo Webinar</span>
      <ArrowRight
        aria-hidden="true"
        className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
      />
    </Link>
  );
}

function InteractiveCardLink({
  ariaLabel,
  body,
  cta,
  href,
  icon: Icon,
  title,
}: CardLinkContent) {
  return (
    <article className="h-full">
      <Link
        aria-label={ariaLabel}
        className="group relative flex h-full min-h-[14rem] flex-col overflow-hidden rounded-lg border bg-card p-5 text-left shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/70 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        href={href}
      >
        <Icon
          aria-hidden="true"
          className="pointer-events-none absolute -right-7 -top-7 size-28 text-primary/[0.07] transition-all duration-300 group-hover:rotate-3 group-hover:scale-110 group-hover:text-primary/[0.12] group-focus-visible:rotate-3 group-focus-visible:scale-110 group-focus-visible:text-primary/[0.12]"
        />
        <span className="relative z-10 grid size-11 place-items-center rounded-lg border border-border/80 bg-muted text-foreground transition-colors duration-200 group-hover:border-primary/40 group-hover:bg-primary/15 group-focus-visible:border-primary/40 group-focus-visible:bg-primary/15">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h3 className="relative z-10 mt-5 text-base font-semibold">{title}</h3>
        <p className="relative z-10 mt-2 text-sm leading-6 text-muted-foreground">
          {body}
        </p>
        <span className="relative z-10 mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-foreground">
          <span>{cta}</span>
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1"
          />
        </span>
      </Link>
    </article>
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
                      {...{
                        initial: { opacity: 0, x: reduceMotion ? -2 : -8 },
                        animate: { opacity: 1, x: 0 },
                        transition: {
                          delay: reduceMotion
                            ? 0.1 + index * 0.03
                            : 0.3 + index * 0.08,
                          duration: reduceMotion ? 0.18 : 0.25,
                        },
                      }}
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
      {...{
        initial: { opacity: 0, y: reduceMotion ? 3 : 10 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: reduceMotion ? { ...transition, duration: 0.18 } : transition,
      }}
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
