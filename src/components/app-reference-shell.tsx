"use client";

import {
  CalendarClock,
  ChevronLeft,
  Menu,
  PanelLeft,
  ShieldCheck,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  appNavItems,
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

  const nav = appNavItems.map((item) => ({
    ...item,
    active: item.href === "/app" ? pathname === "/app" : pathname.startsWith(item.href),
  }));

  return (
    <TooltipProvider delayDuration={120}>
      <div className="flex min-h-dvh bg-background text-foreground">
        <DesktopSidebar
          collapsed={collapsed}
          nav={nav}
          onToggle={() => setCollapsed((value) => !value)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <ReferenceHeader
            collapsed={collapsed}
            mobileOpen={mobileOpen}
            nav={nav}
            onMobileOpenChange={setMobileOpen}
            onSidebarToggle={() => setCollapsed((value) => !value)}
          />

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-8">
              <WorkspaceOverview />
              <div className="grid gap-8 xl:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.72fr)]">
                <CompetitionList />
                <WorkflowReference />
              </div>
            </div>
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
        "sticky top-0 hidden h-dvh shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-150 ease-out motion-reduce:transition-none md:flex",
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
      aria-label={collapsed ? `${item.label}${item.soon ? " soon" : ""}` : undefined}
      className={cn(
        "relative flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors motion-reduce:transition-none",
        item.active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground",
        collapsed && "justify-center px-2",
        item.soon && "text-sidebar-foreground/70 hover:text-sidebar-foreground",
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
            <Badge className="border-white/10 bg-white/10 text-[10px] text-sidebar-foreground">
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
    <header className="sticky top-0 z-30 flex min-h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
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
        <p className="text-xs font-medium text-muted-foreground">Workspace</p>
        <p className="truncate text-sm font-semibold">App reference</p>
      </div>

      <Badge className="shrink-0" variant="outline">
        Preview
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
                    "flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors motion-reduce:transition-none",
                    item.active
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
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
        </div>
      </SheetContent>
    </Sheet>
  );
}

function WorkspaceOverview() {
  return (
    <section aria-labelledby="app-reference-heading">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h1
            className="text-2xl font-semibold tracking-normal text-foreground sm:text-3xl"
            id="app-reference-heading"
          >
            App reference shell
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            A template-informed workspace frame for future CBMP Competition operations,
            using fixture data until product behavior is specified.
          </p>
        </div>

        <div className="flex max-w-lg items-start gap-3 rounded-lg bg-muted/60 px-4 py-3 text-sm">
          <Badge className="mt-0.5 shrink-0" variant="outline">
            Preview
          </Badge>
          <p className="leading-6 text-muted-foreground">
            Prototype/reference fixture only; not Clerk-protected and not an
            authorization surface.
          </p>
        </div>
      </div>

      <dl className="mt-6 grid border-y bg-card sm:grid-cols-[minmax(0,1.5fr)_1fr_1fr] sm:divide-x">
        <SummaryItem
          icon={Trophy}
          label="Current fixture focus"
          value={activeCompetition?.name ?? "No running Competition"}
        />
        <SummaryItem
          label="Location"
          value={
            activeCompetition
              ? `${activeCompetition.city}, ${activeCompetition.region}`
              : "Not available"
          }
        />
        <SummaryItem
          label="Active setup"
          value={`${upcomingCompetitions.length} Competitions`}
        />
      </dl>
    </section>
  );
}

function SummaryItem({
  icon: Icon,
  label,
  value,
}: {
  icon?: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 border-b px-4 py-3 last:border-b-0 sm:border-b-0">
      {Icon ? <Icon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" /> : null}
      <div className="min-w-0">
        <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
        <dd className="mt-1 text-sm font-semibold text-foreground">{value}</dd>
      </div>
    </div>
  );
}

function CompetitionList() {
  return (
    <section aria-labelledby="competition-fixtures-heading" className="min-w-0">
      <div className="flex items-start justify-between gap-4 pb-4">
        <div>
          <h2 className="text-lg font-semibold" id="competition-fixtures-heading">
            Competition fixtures
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Domain-plausible records for layout rhythm and status treatment.
          </p>
        </div>
        <Badge className="shrink-0" variant="muted">
          {upcomingCompetitions.length} active setup
        </Badge>
      </div>

      <ul className="divide-y border-y">
        {competitionFixtures.slice(0, 5).map((competition) => {
          const cue = getLifecycleCue(competition.lifecycle);

          return (
            <li key={competition.slug}>
              <article className="grid gap-4 py-4 sm:grid-cols-[minmax(0,1fr)_auto]">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold">{competition.name}</h3>
                    <Badge variant="outline">{cue?.label ?? competition.lifecycle}</Badge>
                  </div>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                    {competition.summary}
                  </p>
                </div>
                <dl className="grid grid-cols-2 gap-x-5 gap-y-3 text-xs text-muted-foreground sm:min-w-64">
                  <FixtureDetail label="Host" value={competition.host} />
                  <FixtureDetail label="Date" value={competition.dateLabel} />
                  <FixtureDetail label="Entries" value={competition.entriesLabel} />
                  <FixtureDetail label="Sessions" value={competition.sessions} />
                </dl>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function FixtureDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-medium text-foreground">{label}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  );
}

function WorkflowReference() {
  return (
    <aside className="self-start border-t pt-6 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
      <section aria-labelledby="module-reference-heading">
        <h2 className="text-lg font-semibold" id="module-reference-heading">
          Module references
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Future areas, without implied access rules.
        </p>
        <ul className="mt-4 divide-y border-y">
          <ReferenceRow
            body="Session review, result publication, and event timing once scheduling rules exist."
            icon={CalendarClock}
            title="Schedule"
          />
          <ReferenceRow
            body="A neutral module label while permissions and responsibilities remain product work."
            icon={ShieldCheck}
            title="Officials"
          />
        </ul>
      </section>

      <section aria-labelledby="workflow-notes-heading" className="mt-8">
        <h2 className="text-lg font-semibold" id="workflow-notes-heading">
          Workflow notes
        </h2>
        <ul className="mt-4 divide-y border-y">
          {workflowPanels.map((panel) => (
            <ReferenceRow
              body={panel.body}
              icon={panel.icon}
              key={panel.title}
              title={panel.title}
            />
          ))}
        </ul>
      </section>
    </aside>
  );
}

function ReferenceRow({
  body,
  icon: Icon,
  title,
}: {
  body: string;
  icon: LucideIcon;
  title: string;
}) {
  return (
    <li className="flex items-start gap-3 py-4">
      <Icon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{body}</p>
      </div>
    </li>
  );
}
