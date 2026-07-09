import {
  ArrowRight,
  CalendarDays,
  ClipboardCheck,
  Gavel,
  Radio,
  Users,
  type LucideIcon,
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

type SurfaceLink = {
  ariaLabel: string;
  body: string;
  cta: string;
  href: string;
  icon: LucideIcon;
  title: string;
};

type SurfaceLinkMeta = Pick<SurfaceLink, "ariaLabel" | "cta" | "href">;

const roleSurfaces = [
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
] satisfies readonly SurfaceLink[];

const workflowLinks: Record<string, SurfaceLinkMeta> = {
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
  return (
    <div className="overflow-hidden bg-background">
      <section className="border-b bg-muted/30" aria-labelledby="home-heading">
        <div className="container grid gap-12 py-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(34rem,1.2fr)] lg:items-center lg:py-20">
          <div className="max-w-2xl">
            <HeroDemoLink />
            <h1
              id="home-heading"
              className="text-balance text-4xl font-semibold leading-[1.08] tracking-normal text-foreground md:text-5xl"
            >
              CBMP Competition operations in one shared workspace.
            </h1>
            <p className="mt-6 max-w-[65ch] text-base leading-7 text-muted-foreground md:text-lg">
              Coordinate collegiate ballroom Competitions across public discovery,
              Entries, officials, schedule context, and lifecycle state without
              turning day-of work into spreadsheet archaeology.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/competitions">
                  <span>Browse Competitions</span>
                  <ArrowRight aria-hidden="true" data-icon="inline-end" />
                </Link>
              </Button>
              <AuthAccessAction clerkEnabled={clerkEnabled} variant="outline" />
            </div>
          </div>

          <HeroOperationsPreview />
        </div>
      </section>

      <section
        className="container grid gap-10 py-16 lg:grid-cols-[minmax(15rem,0.6fr)_minmax(0,1.4fr)] lg:py-20"
        aria-labelledby="role-surfaces-heading"
      >
        <div>
          <h2
            id="role-surfaces-heading"
            className="text-balance text-2xl font-semibold leading-tight"
          >
            Built around Competition work, not generic admin noise.
          </h2>
          <p className="mt-4 max-w-[52ch] text-sm leading-6 text-muted-foreground">
            Each surface keeps role context close to the work while leaving final
            permissions and authority to the product slices that define them.
          </p>
        </div>

        <div className="border-y border-border">
          {roleSurfaces.map((surface) => (
            <SurfaceLinkRow key={surface.title} surface={surface} />
          ))}
        </div>
      </section>

      <section className="border-y bg-card" aria-labelledby="lifecycle-heading">
        <div className="container py-16 lg:py-20">
          <div className="grid gap-5 lg:grid-cols-[minmax(14rem,0.55fr)_minmax(0,1.45fr)] lg:items-end">
            <h2
              id="lifecycle-heading"
              className="text-2xl font-semibold leading-tight"
            >
              Competition Lifecycle
            </h2>
            <p className="max-w-[68ch] text-sm leading-6 text-muted-foreground">
              Explicit labels help public viewers and operational staff understand
              Competition state without relying on color alone.
            </p>
          </div>

          <ol className="mt-8 grid border-y border-border sm:grid-cols-2 lg:grid-cols-3">
            {lifecycleCues.map((cue) => (
              <LifecycleStep cue={cue} key={cue.key} />
            ))}
          </ol>
        </div>
      </section>

      <section
        className="bg-foreground text-background"
        aria-labelledby="workflow-heading"
      >
        <div className="container py-16 lg:py-20">
          <div className="max-w-2xl">
            <h2 id="workflow-heading" className="text-2xl font-semibold leading-tight">
              A foundation for later product slices.
            </h2>
            <p className="mt-4 text-sm leading-6 text-background/72">
              These paths establish a consistent working surface while keeping
              unsettled permissions and scoring behavior out of this pass.
            </p>
          </div>

          <div className="mt-9 grid border-y border-background/20 lg:grid-cols-3 lg:divide-x lg:divide-background/20">
            {workflowPanels.map((panel) => {
              const link = workflowLinks[panel.title];
              const Icon = panel.icon;

              return (
                <Link
                  aria-label={link.ariaLabel}
                  className="group flex min-h-52 flex-col py-6 transition-colors hover:bg-background/[0.06] focus-visible:bg-background/[0.06] lg:px-6 lg:first:pl-0 lg:last:pr-0"
                  href={link.href}
                  key={panel.title}
                >
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-5 text-base font-semibold">{panel.title}</h3>
                  <p className="mt-2 max-w-[42ch] text-sm leading-6 text-background/72">
                    {panel.body}
                  </p>
                  <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold">
                    {link.cta}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroDemoLink() {
  return (
    <Link
      aria-label="Open the Live Demo Webinar competition workspace"
      className="mb-5 inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/70 hover:bg-primary/10"
      href="/app/competitions/mit-open-2026"
    >
      <span className="size-2 rounded-full bg-success" aria-hidden="true" />
      <span>Live Demo Webinar</span>
      <ArrowRight aria-hidden="true" className="size-3.5" />
    </Link>
  );
}

function SurfaceLinkRow({ surface }: { surface: SurfaceLink }) {
  const Icon = surface.icon;

  return (
    <Link
      aria-label={surface.ariaLabel}
      className="group grid gap-4 border-b border-border py-6 last:border-b-0 sm:grid-cols-[2.75rem_minmax(0,1fr)_auto] sm:items-center"
      href={surface.href}
    >
      <span className="grid size-11 place-items-center rounded-lg bg-muted text-foreground transition-colors group-hover:bg-primary/20 group-focus-visible:bg-primary/20">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-base font-semibold">{surface.title}</span>
        <span className="mt-1 block max-w-[62ch] text-sm leading-6 text-muted-foreground">
          {surface.body}
        </span>
      </span>
      <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
        {surface.cta}
        <ArrowRight aria-hidden="true" className="size-4" />
      </span>
    </Link>
  );
}

function HeroOperationsPreview() {
  return (
    <div
      aria-label="CBMP product interface preview"
      className="overflow-hidden rounded-xl border border-border bg-card"
      data-testid="home-hero-preview"
      role="img"
    >
      <div className="flex items-center justify-between bg-foreground px-4 py-3 text-background">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-md bg-background/12 text-xs font-bold">
            {homeHeroMockupActiveCompetition.initials}
          </span>
          <span className="text-sm font-semibold">
            {homeHeroMockupActiveCompetition.workspaceLabel}
          </span>
        </div>
        <div className="hidden items-center gap-2 text-xs text-background/72 sm:flex">
          <Radio className="size-3.5" aria-hidden="true" />
          <span>{homeHeroMockupActiveCompetition.referenceLabel}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-[11rem_minmax(0,1fr)]">
        <aside className="hidden border-r border-border bg-muted/45 p-3 md:block">
          {homeHeroMockupNavItems.map((item, index) => (
            <div
              className={cn(
                "mb-1 rounded-md px-3 py-2 text-xs font-medium",
                index === 0 ? "bg-card text-foreground" : "text-muted-foreground",
              )}
              key={item.id}
            >
              {item.label}
            </div>
          ))}
        </aside>

        <div className="min-w-0">
          <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-start sm:justify-between">
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

          <dl className="grid border-y border-border bg-muted/25 sm:grid-cols-3 sm:divide-x sm:divide-border">
            {homeHeroMockupStats.map((stat) => (
              <div className="px-4 py-3" key={stat.id}>
                <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                <dd className="mt-1 text-xl font-semibold tabular">{stat.value}</dd>
              </div>
            ))}
          </dl>

          <div className="divide-y divide-border">
            {homeHeroMockupRows.map((row) => (
              <div className="grid gap-2 px-4 py-3 sm:grid-cols-[1fr_auto]" key={row.id}>
                <div>
                  <p className="text-sm font-semibold">{row.name}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {row.detail}
                  </p>
                </div>
                <span className="self-start text-xs font-semibold text-muted-foreground">
                  {row.status}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 border-t border-border bg-muted/25 px-4 py-3">
            <span className="grid size-8 place-items-center rounded-full bg-primary/20">
              <CalendarDays className="size-4" aria-hidden="true" />
            </span>
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
    </div>
  );
}

function LifecycleStep({ cue }: { cue: LifecycleCue }) {
  return (
    <li className="flex min-h-36 gap-3 border-b border-border px-1 py-5 last:border-b-0 sm:px-5 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b lg:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-last-child(-n+3)]:border-b-0">
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
    </li>
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
