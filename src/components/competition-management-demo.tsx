"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Gavel,
  Home,
  ListChecks,
  MapPin,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  const highlightedQueue = useMemo(
    () =>
      checklistItems
        .filter((item) => !checkedItems[item.id])
        .slice(0, 3)
        .map((item) => item.label),
    [checkedItems],
  );

  const toggleChecklistItem = (id: string) => {
    setCheckedItems((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <DemoSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl items-center gap-3">
              <Button asChild className="shrink-0" size="icon-sm" variant="ghost">
                <Link aria-label="Back to app reference" href="/app">
                  <ArrowLeft aria-hidden="true" />
                </Link>
              </Button>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase text-muted-foreground">
                  Competition management demo
                </p>
                <p className="truncate text-sm font-semibold sm:text-base">
                  {competition.name}
                </p>
              </div>
              <Badge className="hidden sm:inline-flex" variant="outline">
                prototype/reference
              </Badge>
            </div>
          </header>

          <main
            aria-labelledby="competition-management-heading"
            className="flex-1 px-4 py-5 sm:px-6 lg:px-8"
          >
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto grid max-w-7xl gap-5"
              initial={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <section className="grid gap-4 rounded-lg border bg-card p-4 shadow-card lg:grid-cols-[minmax(0,1fr)_22rem] lg:p-5">
                <div className="min-w-0">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <Badge variant="outline">playable fixture</Badge>
                    <Badge
                      className={cn(
                        lifecycleCue &&
                          lifecycleToneClasses[lifecycleCue.tone],
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
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    Sample management workspace for fixture data. This demo does
                    not enforce authorization, publish scores, or represent final
                    CBMP workflow behavior.
                  </p>
                  <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
                    <InfoPill
                      icon={MapPin}
                      label="Location"
                      value={`${competition.city}, ${competition.region}`}
                    />
                    <InfoPill
                      icon={Users}
                      label="Entries"
                      value={competition.entriesLabel}
                    />
                    <InfoPill
                      icon={CalendarClock}
                      label="Date"
                      value={competition.dateLabel}
                    />
                  </div>
                </div>

                <div className="rounded-lg border bg-background p-4">
                  <div className="flex items-start gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
                      <ClipboardCheck className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">Demo readiness</p>
                      <p
                        aria-live="polite"
                        className="mt-1 text-2xl font-semibold tabular"
                      >
                        {completionPercent}%
                      </p>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {completedCount} of {checklistItems.length} sample checks
                        toggled.
                      </p>
                    </div>
                  </div>
                  <div
                    aria-hidden="true"
                    className="mt-4 h-2 overflow-hidden rounded-full bg-muted"
                  >
                    <motion.div
                      animate={{ width: `${completionPercent}%` }}
                      className="h-full rounded-full bg-accent"
                      initial={false}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </section>

              <section className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.8fr)]">
                <div className="grid gap-5">
                  <Card>
                    <CardHeader className="gap-3">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <CardTitle>Management modules</CardTitle>
                          <CardDescription>
                            Switch modules to change the active sample queue.
                          </CardDescription>
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
                        className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4"
                        role="group"
                      >
                        {demoModules.map((module) => {
                          const Icon = module.icon;
                          const active = module.id === activeModule;

                          return (
                            <button
                              aria-pressed={active}
                              className={cn(
                                "flex min-h-20 items-start gap-3 rounded-lg border bg-background p-3 text-left text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                active
                                  ? "border-accent bg-accent/10 text-foreground"
                                  : "hover:bg-muted/55",
                              )}
                              key={module.id}
                              onClick={() => setActiveModule(module.id)}
                              type="button"
                            >
                              <Icon
                                className={cn(
                                  "mt-0.5 size-4 shrink-0",
                                  active ? "text-accent" : "text-muted-foreground",
                                )}
                                aria-hidden="true"
                              />
                              <span className="min-w-0">
                                <span className="block font-semibold">
                                  {module.label}
                                </span>
                                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                                  {module.metricLabel}
                                </span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </CardHeader>

                    <CardContent>
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-lg border bg-background p-4"
                          exit={{ opacity: 0, y: -6 }}
                          initial={{ opacity: 0, y: 6 }}
                          key={selectedModule.id}
                          transition={{ duration: 0.16, ease: "easeOut" }}
                        >
                          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                            <div>
                              <h2 className="text-lg font-semibold">
                                {selectedModule.label}
                              </h2>
                              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                                {selectedModule.description}
                              </p>
                            </div>
                            <Badge variant="muted">
                              {moduleCompleteCount}/{moduleItems.length} checks
                            </Badge>
                          </div>

                          <div className="mt-4 grid gap-3">
                            {moduleItems.map((item) => (
                              <ChecklistRow
                                checked={Boolean(checkedItems[item.id])}
                                item={item}
                                key={item.id}
                                onToggle={toggleChecklistItem}
                              />
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Session switcher</CardTitle>
                      <CardDescription>
                        Pick a session to update the floor card and readiness list.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div
                        aria-label="Competition session"
                        className="grid gap-2 md:grid-cols-4"
                        role="group"
                      >
                        {demoSessions.map((session) => {
                          const active = session.id === selectedSession.id;

                          return (
                            <button
                              aria-pressed={active}
                              className={cn(
                                "rounded-lg border bg-background p-3 text-left transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                active
                                  ? "border-accent bg-accent/10"
                                  : "hover:bg-muted/55",
                              )}
                              key={session.id}
                              onClick={() => setSelectedSessionId(session.id)}
                              type="button"
                            >
                              <span className="block text-sm font-semibold">
                                {session.label}
                              </span>
                              <span className="mt-1 block text-xs text-muted-foreground">
                                {session.time}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          animate={{ opacity: 1, scale: 1 }}
                          className="rounded-lg border bg-background p-4"
                          exit={{ opacity: 0, scale: 0.985 }}
                          initial={{ opacity: 0, scale: 0.985 }}
                          key={selectedSession.id}
                          transition={{ duration: 0.16, ease: "easeOut" }}
                        >
                          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-lg font-semibold">
                                  {selectedSession.label}
                                </h2>
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
                              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
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

                          <div className="mt-4 grid gap-2">
                            {sessionItems.map((item) => (
                              <div
                                className="flex items-start gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm"
                                key={item.id}
                              >
                                {checkedItems[item.id] ? (
                                  <CheckCircle2
                                    className="mt-0.5 size-4 shrink-0 text-success"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <ListChecks
                                    className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                                    aria-hidden="true"
                                  />
                                )}
                                <span className="min-w-0 flex-1">{item.label}</span>
                              </div>
                            ))}
                          </div>

                          <p
                            aria-live="polite"
                            className="mt-4 text-xs font-medium text-muted-foreground"
                          >
                            {sessionCompleteCount} of {sessionItems.length} session
                            checks complete.
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </div>

                <aside className="grid gap-5 self-start xl:sticky xl:top-24">
                  <Card>
                    <CardHeader>
                      <CardTitle>Prototype boundary</CardTitle>
                      <CardDescription>
                        This screen is intentionally not production behavior.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                      <BoundaryNote
                        icon={ShieldAlert}
                        title="No authorization model"
                        body="Every control is local demo state. It does not decide who can edit a real Competition."
                      />
                      <BoundaryNote
                        icon={Sparkles}
                        title="No scoring behavior"
                        body="Readiness toggles never create callbacks, marks, placements, or publishable results."
                      />
                      <BoundaryNote
                        icon={ClipboardCheck}
                        title="Fixture-only data"
                        body="Counts, staff names, and sessions are interface samples tied to the selected fixture."
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Open sample queue</CardTitle>
                      <CardDescription>
                        Updates as checklist controls change.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AnimatePresence mode="popLayout" initial={false}>
                        {highlightedQueue.length > 0 ? (
                          <motion.ul
                            animate={{ opacity: 1 }}
                            className="grid gap-2"
                            exit={{ opacity: 0 }}
                            initial={{ opacity: 0 }}
                            key="queue"
                            transition={{ duration: 0.14 }}
                          >
                            {highlightedQueue.map((item) => (
                              <motion.li
                                animate={{ opacity: 1, x: 0 }}
                                className="rounded-lg border bg-background px-3 py-2 text-sm"
                                exit={{ opacity: 0, x: 8 }}
                                initial={{ opacity: 0, x: -8 }}
                                key={item}
                                layout
                                transition={{ duration: 0.14 }}
                              >
                                {item}
                              </motion.li>
                            ))}
                          </motion.ul>
                        ) : (
                          <motion.div
                            animate={{ opacity: 1, scale: 1 }}
                            className="rounded-lg border border-success/30 bg-success/15 p-3 text-sm"
                            exit={{ opacity: 0, scale: 0.985 }}
                            initial={{ opacity: 0, scale: 0.985 }}
                            key="complete"
                            transition={{ duration: 0.14 }}
                          >
                            All sample checks are complete.
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </aside>
              </section>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}

function DemoSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex">
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

      <nav aria-label="Demo app navigation" className="flex-1 space-y-1 p-3">
        {appNavItems.map((item) => {
          const Icon = item.icon;
          const active = item.href === "/app/competitions";

          return (
            <Link
              aria-current={active ? "page" : undefined}
              aria-disabled={item.soon ? "true" : undefined}
              className={cn(
                "relative flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/76 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground",
                item.soon && "text-sidebar-foreground/48 hover:text-sidebar-foreground/70",
              )}
              href={item.soon ? "/app/competitions/mit-open-2026" : item.href}
              key={item.href}
              onClick={(event) => {
                if (item.soon) {
                  event.preventDefault();
                }
              }}
            >
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              {item.soon ? (
                <Badge className="border-white/10 bg-white/8 text-[10px] text-sidebar-foreground/70">
                  soon
                </Badge>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <div className="rounded-lg border border-white/10 bg-sidebar-accent/55 p-3 shadow-inset">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Trophy className="size-4 text-sidebar-primary" aria-hidden="true" />
            Fixture demo
          </div>
          <p className="mt-2 text-xs leading-relaxed text-sidebar-foreground/70">
            Local state only. Final CBMP permissions, scoring, and publication
            workflows remain outside this sample.
          </p>
        </div>
      </div>
    </aside>
  );
}

function InfoPill({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2 rounded-lg border bg-background px-3 py-2">
      <Icon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
      <span className="min-w-0">
        <span className="block text-xs font-medium text-muted-foreground">
          {label}
        </span>
        <span className="block truncate font-semibold text-foreground">{value}</span>
      </span>
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
        "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors",
        checked ? "border-success/35 bg-success/15" : "bg-card hover:bg-muted/45",
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
        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </span>
      </span>
      {checked ? (
        <CheckCircle2
          className="mt-0.5 size-4 shrink-0 text-success"
          aria-hidden="true"
        />
      ) : null}
    </label>
  );
}

function BoundaryNote({
  body,
  icon: Icon,
  title,
}: {
  body: string;
  icon: LucideIcon;
  title: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-background p-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}
