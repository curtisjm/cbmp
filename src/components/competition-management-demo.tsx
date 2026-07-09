"use client";

import {
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Gavel,
  ListChecks,
  MapPin,
  Menu,
  RotateCcw,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  appNavItems,
  competitionFixtures,
  getLifecycleCue,
  productName,
} from "@/lib/cbmp";
import { cn } from "@/lib/utils";

type CompetitionManagementDemoProps = {
  slug: string;
};

type ModuleKey = "overview" | "entries" | "schedule" | "officials";

type DemoModule = {
  checklistIds: string[];
  description: string;
  icon: LucideIcon;
  id: ModuleKey;
  label: string;
  metricLabel: string;
};

type DemoSession = {
  checklistIds: string[];
  deck: string;
  events: string;
  floor: string;
  id: string;
  label: string;
  lead: string;
  time: string;
};

type ChecklistItem = {
  description: string;
  id: string;
  label: string;
  owner: string;
};

const demoModules = [
  {
    id: "overview",
    label: "Overview",
    description: "Host-facing summary for fixture data and readiness signals.",
    icon: Trophy,
    metricLabel: "Fixture health",
    checklistIds: ["venue-lock", "officials-brief", "deck-print"],
  },
  {
    id: "entries",
    label: "Entries",
    description: "Sample review queue for entries, add/drops, and roster checks.",
    icon: ClipboardList,
    metricLabel: "Entry review",
    checklistIds: ["entry-audit", "late-adds", "roster-check"],
  },
  {
    id: "schedule",
    label: "Schedule",
    description: "Session-level floor readiness without final timing rules.",
    icon: CalendarClock,
    metricLabel: "Session readiness",
    checklistIds: ["deck-print", "music-check", "heat-proof"],
  },
  {
    id: "officials",
    label: "Officials",
    description: "Reference surface for assignments, not final authority behavior.",
    icon: Gavel,
    metricLabel: "Official coverage",
    checklistIds: ["officials-brief", "scrutineer-ready", "runner-standby"],
  },
] satisfies DemoModule[];

const demoSessions = [
  {
    id: "friday-evening",
    label: "Friday evening",
    time: "6:00 PM",
    floor: "Main ballroom",
    events: "Newcomer Smooth and Rhythm",
    lead: "Maya Chen",
    deck: "Deck A",
    checklistIds: ["venue-lock", "entry-audit", "music-check"],
  },
  {
    id: "saturday-morning",
    label: "Saturday morning",
    time: "9:30 AM",
    floor: "Main ballroom",
    events: "Bronze Standard heats",
    lead: "Noah Patel",
    deck: "Deck B",
    checklistIds: ["roster-check", "deck-print", "officials-brief"],
  },
  {
    id: "saturday-afternoon",
    label: "Saturday afternoon",
    time: "2:30 PM",
    floor: "Main ballroom",
    events: "Latin multi-dance rounds",
    lead: "Sofia Morales",
    deck: "Deck A",
    checklistIds: ["late-adds", "heat-proof", "scrutineer-ready"],
  },
  {
    id: "saturday-finals",
    label: "Saturday finals",
    time: "7:45 PM",
    floor: "Showcase floor",
    events: "Open finals and awards",
    lead: "Iris Kim",
    deck: "Deck C",
    checklistIds: ["runner-standby", "scrutineer-ready", "music-check"],
  },
] satisfies DemoSession[];

const checklistItems = [
  {
    id: "venue-lock",
    label: "Confirm venue room handoff",
    description: "Floor access, check-in desk, and warmup space are marked ready.",
    owner: "Host desk",
  },
  {
    id: "entry-audit",
    label: "Review 238 fixture Entries",
    description: "Sample count updates only; this does not validate real Entries.",
    owner: "Registrar",
  },
  {
    id: "late-adds",
    label: "Triage late add/drop requests",
    description: "Prototype workflow state, not a final eligibility decision.",
    owner: "Registrar",
  },
  {
    id: "roster-check",
    label: "Spot-check Organization rosters",
    description: "Fixture roster names are for interface behavior only.",
    owner: "Host desk",
  },
  {
    id: "deck-print",
    label: "Print deck captain packets",
    description: "Visible readiness toggle for session materials.",
    owner: "Deck captain",
  },
  {
    id: "music-check",
    label: "Run music and announcement check",
    description: "Confirms the sample floor operations card.",
    owner: "Floor manager",
  },
  {
    id: "heat-proof",
    label: "Proof heat sheets",
    description: "Fixture review only; no scoring or callbacks are produced.",
    owner: "Scrutineer",
  },
  {
    id: "officials-brief",
    label: "Brief officials on session flow",
    description: "Assignment visibility without final authorization behavior.",
    owner: "Chair",
  },
  {
    id: "scrutineer-ready",
    label: "Confirm Scrutineer station",
    description: "Marks the sample scoring-adjacent station as visibly staffed.",
    owner: "Scrutineer",
  },
  {
    id: "runner-standby",
    label: "Stage runners and awards table",
    description: "Floor logistics signal for the finals session.",
    owner: "Floor manager",
  },
] satisfies ChecklistItem[];

const initialChecklistState = Object.fromEntries(
  checklistItems.map((item, index) => [item.id, index < 4]),
) as Record<string, boolean>;

const lifecycleToneClasses = {
  draft: "border-muted bg-muted text-muted-foreground",
  published: "border-lifecycle-published/30 bg-lifecycle-published/15 text-foreground",
  open: "border-lifecycle-open/35 bg-lifecycle-open/20 text-foreground",
  closed: "border-lifecycle-closed/40 bg-lifecycle-closed/20 text-foreground",
  running: "border-lifecycle-running/35 bg-lifecycle-running/15 text-foreground",
  finished: "border-lifecycle-finished/40 bg-lifecycle-finished/20 text-foreground",
} as const;

export function CompetitionManagementDemo({ slug }: CompetitionManagementDemoProps) {
  const competition =
    competitionFixtures.find((fixture) => fixture.slug === slug) ??
    competitionFixtures[0];
  const lifecycleCue = getLifecycleCue(competition.lifecycle);
  const [activeModule, setActiveModule] = useState<ModuleKey>("overview");
  const [selectedSessionId, setSelectedSessionId] = useState(demoSessions[2].id);
  const [checkedItems, setCheckedItems] = useState(initialChecklistState);

  const selectedModule =
    demoModules.find((module) => module.id === activeModule) ?? demoModules[0];
  const selectedSession =
    demoSessions.find((session) => session.id === selectedSessionId) ??
    demoSessions[0];

  const completedCount = checklistItems.filter((item) => checkedItems[item.id]).length;
  const completionPercent = Math.round((completedCount / checklistItems.length) * 100);
  const moduleItems = checklistItems.filter((item) =>
    selectedModule.checklistIds.includes(item.id),
  );
  const sessionItems = checklistItems.filter((item) =>
    selectedSession.checklistIds.includes(item.id),
  );
  const sessionReady = selectedSession.checklistIds.every((id) => checkedItems[id]);
  const moduleCompleteCount = moduleItems.filter((item) => checkedItems[item.id]).length;
  const sessionCompleteCount = sessionItems.filter((item) => checkedItems[item.id]).length;

  const highlightedQueue = checklistItems
    .filter((item) => !checkedItems[item.id])
    .slice(0, 3)
    .map((item) => item.label);

  const toggleChecklistItem = (id: string) => {
    setCheckedItems((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  const currentHref = `/app/competitions/${slug}`;
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="flex min-h-dvh">
        <DemoSidebar currentHref={currentHref} />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b bg-background/95 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl items-center gap-3">
              <DemoMobileNav currentHref={currentHref} />
              <Button asChild className="shrink-0" size="icon-sm" variant="ghost">
                <Link aria-label="Back to app reference" href="/app">
                  <ArrowLeft aria-hidden="true" />
                </Link>
              </Button>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Competition management demo
                </p>
                <p className="truncate text-sm font-semibold sm:text-base">
                  {competition.name}
                </p>
              </div>
              <Badge className="hidden sm:inline-flex" variant="outline">
                Preview
              </Badge>
            </div>
          </header>

          <main
            aria-labelledby="competition-management-heading"
            className="flex-1 px-4 py-6 sm:px-6 lg:px-8"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-8">
              <section>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="min-w-0 max-w-3xl">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <Badge variant="outline">playable fixture</Badge>
                      <Badge
                        className={cn(
                          lifecycleCue && lifecycleToneClasses[lifecycleCue.tone],
                        )}
                        variant="outline"
                      >
                        {lifecycleCue?.label ?? competition.lifecycle}
                      </Badge>
                    </div>
                    <h1
                      className="text-2xl font-semibold tracking-normal text-foreground sm:text-3xl"
                      id="competition-management-heading"
                    >
                      {competition.name}
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Sample management workspace for fixture readiness, session
                      context, and host-facing review.
                    </p>
                  </div>
                </div>

                <dl className="mt-6 grid border-y bg-card sm:grid-cols-2 xl:grid-cols-4 xl:divide-x">
                  <OverviewDetail
                    icon={MapPin}
                    label="Location"
                    value={`${competition.city}, ${competition.region}`}
                  />
                  <OverviewDetail
                    icon={Users}
                    label="Entries"
                    value={competition.entriesLabel}
                  />
                  <OverviewDetail
                    icon={CalendarClock}
                    label="Date"
                    value={competition.dateLabel}
                  />
                  <div className="px-4 py-3 sm:border-l xl:border-l-0">
                    <dt className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <ClipboardCheck className="size-4 text-accent" aria-hidden="true" />
                      Demo readiness
                    </dt>
                    <dd className="mt-1">
                      <span aria-live="polite" className="text-sm font-semibold tabular">
                        {completionPercent}%
                      </span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        {completedCount} of {checklistItems.length} sample checks toggled.
                      </span>
                    </dd>
                    <div
                      aria-label={`${completionPercent}% of sample checks complete`}
                      aria-valuemax={100}
                      aria-valuemin={0}
                      aria-valuenow={completionPercent}
                      className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"
                      role="progressbar"
                    >
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${completionPercent}%` }}
                      />
                    </div>
                  </div>
                </dl>
              </section>

              <div className="grid gap-8 xl:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.72fr)]">
                <div className="flex min-w-0 flex-col gap-10">
                  <section aria-labelledby="management-modules-heading">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <h2 className="text-lg font-semibold" id="management-modules-heading">
                          Management modules
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          Switch modules to change the active sample queue.
                        </p>
                      </div>
                      <Button
                        onClick={() => setCheckedItems(initialChecklistState)}
                        size="sm"
                        type="button"
                        variant="outline"
                      >
                        <RotateCcw aria-hidden="true" />
                        Reset sample state
                      </Button>
                    </div>

                    <div
                      aria-label="Competition management module"
                      className="mt-4 flex flex-wrap gap-1 rounded-lg bg-muted/60 p-1"
                      role="group"
                    >
                      {demoModules.map((module) => {
                        const Icon = module.icon;
                        const active = module.id === activeModule;

                        return (
                          <button
                            aria-pressed={active}
                            className={cn(
                              "flex min-h-11 flex-1 basis-36 items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                              active
                                ? "bg-card text-foreground"
                                : "text-muted-foreground hover:bg-card/65 hover:text-foreground",
                            )}
                            key={module.id}
                            onClick={() => setActiveModule(module.id)}
                            type="button"
                          >
                            <Icon
                              className={cn(
                                "size-4 shrink-0",
                                active ? "text-accent" : "text-muted-foreground",
                              )}
                              aria-hidden="true"
                            />
                            <span className="min-w-0">
                              <span className="block font-semibold">{module.label}</span>
                              <span className="block text-xs font-normal text-muted-foreground">
                                {module.metricLabel}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-5 border-t pt-5" key={selectedModule.id}>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-base font-semibold">{selectedModule.label}</h3>
                          <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                            {selectedModule.description}
                          </p>
                        </div>
                        <Badge variant="muted">
                          {moduleCompleteCount}/{moduleItems.length} checks
                        </Badge>
                      </div>

                      <div className="mt-4 divide-y border-y">
                        {moduleItems.map((item) => (
                          <ChecklistRow
                            checked={Boolean(checkedItems[item.id])}
                            item={item}
                            key={item.id}
                            onToggle={toggleChecklistItem}
                          />
                        ))}
                      </div>
                    </div>
                  </section>

                  <section aria-labelledby="session-switcher-heading" className="border-t pt-8">
                    <h2 className="text-lg font-semibold" id="session-switcher-heading">
                      Session switcher
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Pick a session to update floor context and readiness.
                    </p>

                    <div
                      aria-label="Competition session"
                      className="mt-4 flex flex-wrap gap-2"
                      role="group"
                    >
                      {demoSessions.map((session) => {
                        const active = session.id === selectedSession.id;

                        return (
                          <button
                            aria-pressed={active}
                            className={cn(
                              "min-h-11 rounded-full border px-4 py-2 text-left transition-colors motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                              active
                                ? "border-accent bg-accent/10 text-foreground"
                                : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
                            )}
                            key={session.id}
                            onClick={() => setSelectedSessionId(session.id)}
                            type="button"
                          >
                            <span className="text-sm font-semibold">{session.label}</span>
                            <span className="ml-2 text-xs text-muted-foreground">
                              {session.time}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-5 border-t pt-5" key={selectedSession.id}>
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-semibold">{selectedSession.label}</h3>
                            <Badge
                              className={cn(
                                sessionReady
                                  ? "border-success/40 bg-success/20"
                                  : "border-warning/45 bg-warning/20",
                              )}
                              variant="outline"
                            >
                              {sessionReady ? "ready sample" : "needs review"}
                            </Badge>
                          </div>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            {selectedSession.events}
                          </p>
                        </div>
                        <div className="grid gap-1 text-sm text-muted-foreground md:text-right">
                          <span>{selectedSession.floor}</span>
                          <span>
                            {selectedSession.deck} - {selectedSession.lead}
                          </span>
                        </div>
                      </div>

                      <ul className="mt-4 divide-y border-y">
                        {sessionItems.map((item) => (
                          <li className="flex items-start gap-2 py-3 text-sm" key={item.id}>
                            {checkedItems[item.id] ? (
                              <CheckCircle2
                                className="mt-0.5 size-4 shrink-0 text-success-strong"
                                aria-hidden="true"
                              />
                            ) : (
                              <ListChecks
                                className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                                aria-hidden="true"
                              />
                            )}
                            <span className="min-w-0 flex-1">{item.label}</span>
                          </li>
                        ))}
                      </ul>

                      <p aria-live="polite" className="mt-3 text-xs font-medium text-muted-foreground">
                        {sessionCompleteCount} of {sessionItems.length} session checks
                        complete.
                      </p>
                    </div>
                  </section>
                </div>

                <aside className="self-start xl:sticky xl:top-24">
                  <div className="rounded-lg bg-muted/60 p-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Preview</Badge>
                      <p className="text-sm font-semibold">Fixture-only workspace</p>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Controls update local sample state only; no authorization,
                      scoring, or publication behavior is represented.
                    </p>
                  </div>

                  <section aria-labelledby="open-queue-heading" className="mt-8 border-t pt-6">
                    <h2 className="text-base font-semibold" id="open-queue-heading">
                      Open sample queue
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Updates as checklist controls change.
                    </p>
                    {highlightedQueue.length > 0 ? (
                      <ul className="mt-4 divide-y border-y">
                        {highlightedQueue.map((item) => (
                          <li className="py-3 text-sm" key={item}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-4 rounded-lg bg-success/15 p-3 text-sm">
                        All sample checks are complete.
                      </p>
                    )}
                  </section>
                </aside>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function DemoSidebar({ currentHref }: { currentHref: string }) {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex">
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-3">
        <Link
          aria-label={`${productName} app reference home`}
          className="flex min-w-0 flex-1 items-center gap-2"
          href="/app"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">
            CB
          </span>
          <span className="truncate text-base font-semibold">{productName}</span>
        </Link>
      </div>

      <DemoNavigation currentHref={currentHref} label="Demo app navigation" />
    </aside>
  );
}

function DemoMobileNav({ currentHref }: { currentHref: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open Competition management navigation"
          className="md:hidden"
          size="icon-sm"
          type="button"
          variant="ghost"
        >
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex p-0" side="left">
        <div className="flex min-h-full w-full flex-col">
          <SheetHeader className="border-b px-4 py-4">
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-lg bg-foreground text-sm font-bold text-background">
                CB
              </span>
              <div>
                <SheetTitle>{productName} Competition workspace</SheetTitle>
                <SheetDescription>Preview application navigation</SheetDescription>
              </div>
            </div>
          </SheetHeader>
          <DemoNavigation
            currentHref={currentHref}
            label="Mobile demo app navigation"
            onNavigate={() => setOpen(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function DemoNavigation({
  currentHref,
  label,
  onNavigate,
}: {
  currentHref: string;
  label: string;
  onNavigate?: () => void;
}) {
  const mobile = Boolean(onNavigate);

  return (
    <nav aria-label={label} className={cn("flex-1 space-y-1 p-3", mobile && "text-foreground")}>
      {appNavItems.map((item) => {
        const Icon = item.icon;
        const active = item.href === "/app/competitions";

        return (
          <Link
            aria-current={active ? "page" : undefined}
            aria-disabled={item.soon ? "true" : undefined}
            className={cn(
              "relative flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors motion-reduce:transition-none",
              mobile
                ? active
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                : active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground",
              item.soon && (mobile ? "text-muted-foreground" : "text-sidebar-foreground/70"),
            )}
            href={item.soon ? currentHref : item.href}
            key={item.href}
            onClick={(event) => {
              if (item.soon) {
                event.preventDefault();
                return;
              }

              onNavigate?.();
            }}
          >
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
            {item.soon ? (
              <Badge
                className={cn(
                  "text-[10px]",
                  !mobile && "border-white/10 bg-white/10 text-sidebar-foreground",
                )}
                variant={mobile ? "muted" : undefined}
              >
                soon
              </Badge>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

function OverviewDetail({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="px-4 py-3 even:border-l xl:border-l-0">
      <dt className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Icon className="size-4 text-accent" aria-hidden="true" />
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}

function ChecklistRow({
  checked,
  item,
  onToggle,
}: {
  checked: boolean;
  item: ChecklistItem;
  onToggle: (id: string) => void;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 px-1 py-3 transition-colors motion-reduce:transition-none",
        checked && "bg-success/10",
      )}
    >
      <input
        checked={checked}
        className="mt-1 size-4 rounded border-border text-accent focus-visible:ring-ring"
        onChange={() => onToggle(item.id)}
        type="checkbox"
      />
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-semibold">{item.label}</span>
          <Badge variant="muted">{item.owner}</Badge>
        </span>
        <span className="mt-1 block text-sm leading-6 text-muted-foreground">
          {item.description}
        </span>
      </span>
    </label>
  );
}
