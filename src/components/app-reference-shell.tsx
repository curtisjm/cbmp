"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CalendarClock,
  ChevronLeft,
  Menu,
  PanelLeft,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  appNavItems,
  appSummaryStats,
  competitionFixtures,
  getLifecycleCue,
  productName,
  workflowPanels,
} from "@/lib/cbmp";
import { cn } from "@/lib/utils";

const activeCompetition = competitionFixtures.find(
  (competition) => competition.lifecycle === "running",
);

const upcomingCompetitions = competitionFixtures.filter((competition) =>
  ["published", "entries open", "entries closed"].includes(competition.lifecycle),
);

export function AppReferenceShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() ?? "/app";
  const reduceMotion = useReducedMotion();

  const nav = useMemo(
    () =>
      appNavItems.map((item) => ({
        ...item,
        active: item.href === "/app" ? pathname === "/app" : pathname.startsWith(item.href),
      })),
    [pathname],
  );

  return (
    <TooltipProvider delayDuration={120}>
      <div className="flex min-h-screen bg-background text-foreground">
        <DesktopSidebar
          collapsed={collapsed}
          nav={nav}
          onToggle={() => setCollapsed((value) => !value)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <ReferenceHeader
            collapsed={collapsed}
            mobileOpen={mobileOpen}
            onMobileOpenChange={setMobileOpen}
            onSidebarToggle={() => setCollapsed((value) => !value)}
            nav={nav}
          />

          <main className="flex-1 overflow-y-auto px-3 py-4 sm:px-5 lg:px-7">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto grid max-w-7xl gap-5"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
            >
              <DashboardIntro />
              <SummaryStats />
              <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.75fr)]">
                <CompetitionList />
                <WorkflowReference />
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

type ReferenceNavItem = (typeof appNavItems)[number] & {
  active: boolean;
};

function DesktopSidebar({
  collapsed,
  nav,
  onToggle,
}: {
  collapsed: boolean;
  nav: ReferenceNavItem[];
  onToggle: () => void;
}) {
  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 md:flex",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-3">
        <Link
          aria-label={`${productName} app reference home`}
          className={cn(
            "flex min-w-0 flex-1 items-center gap-2",
            collapsed && "justify-center",
          )}
          href="/app"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">
            CB
          </span>
          {!collapsed ? (
            <span className="truncate text-base font-semibold">{productName}</span>
          ) : null}
        </Link>
        {!collapsed ? (
          <Button
            aria-label="Collapse sidebar"
            className="text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={onToggle}
            size="icon-sm"
            type="button"
            variant="ghost"
          >
            <ChevronLeft aria-hidden="true" />
          </Button>
        ) : null}
      </div>

      <nav aria-label="Reference app navigation" className="flex-1 space-y-1 p-3">
        {nav.map((item) => (
          <DesktopNavLink collapsed={collapsed} item={item} key={item.href} />
        ))}
      </nav>

      {!collapsed ? (
        <div className="border-t border-white/10 p-3">
          <div className="rounded-lg border border-white/10 bg-sidebar-accent/55 p-3 shadow-inset">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="size-4 text-sidebar-primary" aria-hidden="true" />
              Prototype reference
            </div>
            <p className="mt-2 text-xs leading-relaxed text-sidebar-foreground/70">
              Layout and fixture data only. Final permissions and workflows remain
              product work.
            </p>
          </div>
        </div>
      ) : null}
    </aside>
  );
}

function DesktopNavLink({
  collapsed,
  item,
}: {
  collapsed: boolean;
  item: ReferenceNavItem;
}) {
  const Icon = item.icon;
  const content = (
    <Link
      aria-current={item.active ? "page" : undefined}
      aria-disabled={item.soon ? "true" : undefined}
      className={cn(
        "relative flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
        item.active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/76 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground",
        collapsed && "justify-center px-2",
        item.soon && "text-sidebar-foreground/48 hover:text-sidebar-foreground/70",
      )}
      href={item.soon ? "/app" : item.href}
      onClick={(event) => {
        if (item.soon) {
          event.preventDefault();
        }
      }}
    >
      <Icon className="size-4 shrink-0" aria-hidden="true" />
      {!collapsed ? (
        <>
          <span className="min-w-0 flex-1 truncate">{item.label}</span>
          {item.soon ? (
            <Badge className="border-white/10 bg-white/8 text-[10px] text-sidebar-foreground/70">
              soon
            </Badge>
          ) : null}
        </>
      ) : null}
    </Link>
  );

  if (!collapsed) {
    return content;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent side="right">
        <span>{item.label}</span>
        {item.soon ? <span className="ml-2 text-muted-foreground">soon</span> : null}
      </TooltipContent>
    </Tooltip>
  );
}

function ReferenceHeader({
  collapsed,
  mobileOpen,
  nav,
  onMobileOpenChange,
  onSidebarToggle,
}: {
  collapsed: boolean;
  mobileOpen: boolean;
  nav: ReferenceNavItem[];
  onMobileOpenChange: (open: boolean) => void;
  onSidebarToggle: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/88 px-3 backdrop-blur-md sm:px-5 lg:px-7">
      <MobileNav open={mobileOpen} nav={nav} onOpenChange={onMobileOpenChange} />
      {collapsed ? (
        <Button
          aria-label="Expand sidebar"
          className="hidden md:inline-flex"
          onClick={onSidebarToggle}
          size="icon-sm"
          type="button"
          variant="ghost"
        >
          <PanelLeft aria-hidden="true" />
        </Button>
      ) : null}

      <div className="min-w-0 flex-1">
        <div className="relative max-w-xl">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            aria-label="Reference search preview"
            className="h-10 border-transparent bg-muted/55 pl-9"
            placeholder="Reference search preview"
            readOnly
            type="search"
            value=""
          />
        </div>
      </div>

      <Badge className="hidden shrink-0 sm:inline-flex" variant="outline">
        prototype
      </Badge>
    </header>
  );
}

function MobileNav({
  nav,
  onOpenChange,
  open,
}: {
  nav: ReferenceNavItem[];
  onOpenChange: (open: boolean) => void;
  open: boolean;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open app reference navigation"
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
                <SheetTitle>{productName} app reference</SheetTitle>
                <SheetDescription>Prototype navigation surface</SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <nav aria-label="Mobile reference app navigation" className="grid gap-1 p-3">
            {nav.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  aria-current={item.active ? "page" : undefined}
                  aria-disabled={item.soon ? "true" : undefined}
                  className={cn(
                    "flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                    item.active
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    item.soon && "text-muted-foreground/70",
                  )}
                  href={item.soon ? "/app" : item.href}
                  key={item.href}
                  onClick={(event) => {
                    if (item.soon) {
                      event.preventDefault();
                      return;
                    }

                    onOpenChange(false);
                  }}
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {item.soon ? (
                    <Badge className="px-2 py-0.5 text-[10px]" variant="muted">
                      soon
                    </Badge>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto border-t p-4">
            <p className="text-xs leading-relaxed text-muted-foreground">
              This public route demonstrates shell patterns without Clerk protection
              or production workflow behavior.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function DashboardIntro() {
  return (
    <section className="grid gap-4 rounded-lg border bg-card p-4 shadow-card sm:p-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="min-w-0">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="outline">prototype/reference</Badge>
          <Badge variant="muted">not Clerk-protected</Badge>
        </div>
        <h1 className="text-2xl font-semibold tracking-normal text-foreground sm:text-3xl">
          App reference shell
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          A template-inspired workspace frame for future CBMP Competition operations,
          using fixture data and inert module links until product behavior is specified.
        </p>
      </div>

      <div className="rounded-lg border bg-muted/45 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Trophy className="size-4 text-accent" aria-hidden="true" />
          Current fixture focus
        </div>
        <p className="mt-2 text-base font-semibold">
          {activeCompetition?.name ?? "No running Competition"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {activeCompetition
            ? `${activeCompetition.city}, ${activeCompetition.region} - ${activeCompetition.sessions}`
            : "Fixture set does not include an active Competition."}
        </p>
      </div>
    </section>
  );
}

function SummaryStats() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-label="Prototype summary" className="grid gap-3 sm:grid-cols-3">
      {appSummaryStats.map((stat, index) => (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          key={stat.label}
          transition={{
            delay: reduceMotion ? 0 : index * 0.04,
            duration: reduceMotion ? 0 : 0.18,
          }}
        >
          <Card className="h-full">
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-2 text-2xl font-semibold tabular">{stat.value}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {stat.detail}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </section>
  );
}

function CompetitionList() {
  const reduceMotion = useReducedMotion();

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>Competition fixtures</CardTitle>
          <CardDescription>
            Domain-plausible records for layout rhythm and status treatment.
          </CardDescription>
        </div>
        <Badge variant="muted">{upcomingCompetitions.length} active setup</Badge>
      </CardHeader>
      <CardContent className="grid gap-2">
        <AnimatePresence initial={false}>
          {competitionFixtures.slice(0, 5).map((competition, index) => {
            const cue = getLifecycleCue(competition.lifecycle);

            return (
              <motion.article
                animate={{ opacity: 1, x: 0 }}
                className="grid gap-3 rounded-lg border bg-background p-3 transition-colors hover:bg-muted/35 sm:grid-cols-[minmax(0,1fr)_auto]"
                exit={reduceMotion ? undefined : { opacity: 0, x: -8 }}
                initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                key={competition.slug}
                transition={{
                  delay: reduceMotion ? 0 : index * 0.025,
                  duration: reduceMotion ? 0 : 0.16,
                }}
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="truncate text-sm font-semibold">
                      {competition.name}
                    </h2>
                    <Badge variant="outline">{cue?.label ?? competition.lifecycle}</Badge>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {competition.summary}
                  </p>
                </div>
                <dl className="grid grid-cols-2 gap-3 text-xs text-muted-foreground sm:min-w-56">
                  <div>
                    <dt className="font-medium text-foreground">Host</dt>
                    <dd className="mt-1 truncate">{competition.host}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-foreground">Date</dt>
                    <dd className="mt-1">{competition.dateLabel}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-foreground">Entries</dt>
                    <dd className="mt-1">{competition.entriesLabel}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-foreground">Sessions</dt>
                    <dd className="mt-1">{competition.sessions}</dd>
                  </div>
                </dl>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

function WorkflowReference() {
  return (
    <div className="grid gap-5">
      <Card>
        <CardHeader>
          <CardTitle>Module references</CardTitle>
          <CardDescription>
            Future areas are visible without suggesting final access rules.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="flex items-start gap-3 rounded-lg border bg-background p-3">
            <CalendarClock className="mt-0.5 size-4 text-accent" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold">Schedule</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Useful for session review, result publication, and event timing once
                scheduling rules exist.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border bg-background p-3">
            <ShieldCheck className="mt-0.5 size-4 text-accent" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold">Officials</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Kept as a neutral module label while permissions and responsibilities
                stay outside this prototype.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Workflow notes</CardTitle>
          <CardDescription>
            Existing product language, presented as reference-safe cards.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {workflowPanels.map((panel) => {
            const Icon = panel.icon;

            return (
              <div className="rounded-lg border bg-background p-3" key={panel.title}>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Icon className="size-4 text-accent" aria-hidden="true" />
                  {panel.title}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {panel.body}
                </p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
