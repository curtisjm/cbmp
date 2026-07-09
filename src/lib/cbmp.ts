import {
  CalendarDays,
  ClipboardList,
  Gavel,
  Home,
  ListChecks,
  LucideIcon,
  Medal,
  Settings,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";

import {
  COMPETITION_LIFECYCLE,
  competitionLifecycleLabel,
  type CompetitionLifecycle,
} from "@/domain/competitions/lifecycle";

export type LifecycleKey = CompetitionLifecycle;

export type LifecycleTone =
  | "draft"
  | "published"
  | "open"
  | "closed"
  | "running"
  | "finished";

export type LifecycleCue = {
  key: LifecycleKey;
  label: string;
  description: string;
  tone: LifecycleTone;
};

export type NavItem = {
  href: string;
  label: string;
};

export type CompetitionFixture = {
  city: string;
  dateLabel: string;
  entriesLabel: string;
  host: string;
  lifecycle: LifecycleKey;
  name: string;
  region: string;
  sessions: string;
  slug: string;
  summary: string;
};

export type AppNavItem = {
  href: string;
  icon: LucideIcon;
  label: string;
  soon?: boolean;
};

export type HomeHeroMockupRow = {
  detail: string;
  id: string;
  name: string;
  status: string;
};

export type HomeHeroMockupStat = {
  id: string;
  label: string;
  value: string;
};

export const productName = "CBMP";

export const productDescription =
  "Competition management for collegiate ballroom hosts, officials, and competitors.";

export const publicNavItems: NavItem[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/competitions",
    label: "Competitions",
  },
  {
    href: "/app",
    label: "App reference",
  },
];

export const lifecycleCues: LifecycleCue[] = [
  {
    key: COMPETITION_LIFECYCLE.draft,
    label: competitionLifecycleLabel(COMPETITION_LIFECYCLE.draft),
    description: "Host setup is still private.",
    tone: "draft",
  },
  {
    key: COMPETITION_LIFECYCLE.published,
    label: competitionLifecycleLabel(COMPETITION_LIFECYCLE.published),
    description: "Listed publicly; entries not yet open.",
    tone: "published",
  },
  {
    key: COMPETITION_LIFECYCLE.entriesOpen,
    label: competitionLifecycleLabel(COMPETITION_LIFECYCLE.entriesOpen),
    description: "Competitors and Organizations can prepare Entries.",
    tone: "open",
  },
  {
    key: COMPETITION_LIFECYCLE.entriesClosed,
    label: competitionLifecycleLabel(COMPETITION_LIFECYCLE.entriesClosed),
    description: "Entry changes move into controlled review.",
    tone: "closed",
  },
  {
    key: COMPETITION_LIFECYCLE.running,
    label: competitionLifecycleLabel(COMPETITION_LIFECYCLE.running),
    description: "The Competition is active on the floor.",
    tone: "running",
  },
  {
    key: COMPETITION_LIFECYCLE.finished,
    label: competitionLifecycleLabel(COMPETITION_LIFECYCLE.finished),
    description: "Competition work is complete and results can be reviewed.",
    tone: "finished",
  },
];

export const publicLifecycleCues = lifecycleCues.filter(
  (cue) => cue.key !== COMPETITION_LIFECYCLE.draft,
);

export const homeHeroMockupNavItems = [
  { id: "overview", label: "Overview" },
  { id: "competitions", label: "Competitions" },
  { id: "entries", label: "Entries" },
  { id: "schedule", label: "Schedule" },
] as const;

export const homeHeroMockupActiveCompetition = {
  badge: "Entries open",
  heading: "MIT Open Ballroom Championships",
  initials: "CB",
  kicker: "Active Competition",
  nextSessionDetail: "Smooth dances · 2:30 PM",
  nextSessionLabel: "Next session",
  referenceLabel: "Reference view",
  workspaceLabel: "Competition desk",
} as const;

export const homeHeroMockupStats = [
  { id: "entries", label: "Entries", value: "238" },
  { id: "sessions", label: "Sessions", value: "4" },
  { id: "officials", label: "Officials", value: "18" },
] as const satisfies readonly HomeHeroMockupStat[];

export const homeHeroMockupRows = [
  {
    id: "entry-check",
    name: "Entry check",
    status: "Entries open",
    detail: "Organizations reviewing 238 Entries",
  },
  {
    id: "officials",
    name: "Officials",
    status: "Assigned",
    detail: "Judges and Scrutineer visible to host staff",
  },
  {
    id: "floor-state",
    name: "Floor state",
    status: "Next session",
    detail: "Deck Captain check-offs queued",
  },
] as const satisfies readonly HomeHeroMockupRow[];

export const competitionFixtures: CompetitionFixture[] = [
  {
    city: "Cambridge",
    dateLabel: "Feb 14-15, 2026",
    entriesLabel: "238 Entries",
    host: "MIT Ballroom Dance Team",
    lifecycle: "entries open",
    name: "MIT Open Ballroom Championships",
    region: "MA",
    sessions: "4 sessions",
    slug: "mit-open-2026",
    summary:
      "Entries are open for collegiate and newcomer divisions, with schedule review pending.",
  },
  {
    city: "Berkeley",
    dateLabel: "Mar 7, 2026",
    entriesLabel: "126 expected",
    host: "UC Berkeley DanceSport",
    lifecycle: "published",
    name: "Berkeley Classic",
    region: "CA",
    sessions: "2 sessions",
    slug: "berkeley-classic-2026",
    summary:
      "Public listing is live while host setup continues before Entries open.",
  },
  {
    city: "New York",
    dateLabel: "Jan 31, 2026",
    entriesLabel: "312 Entries",
    host: "Columbia Ballroom",
    lifecycle: "entries closed",
    name: "Big Apple Dancesport Challenge",
    region: "NY",
    sessions: "5 sessions",
    slug: "big-apple-dancesport-2026",
    summary:
      "Entry editing is closed while officials settle late add/drop requests.",
  },
  {
    city: "Columbus",
    dateLabel: "Jan 24, 2026",
    entriesLabel: "284 Entries",
    host: "Ohio State Ballroom",
    lifecycle: "running",
    name: "Midwest Collegiate Championships",
    region: "OH",
    sessions: "Live now",
    slug: "midwest-collegiate-2026",
    summary:
      "The Scrutineer has started the Competition; floor operations are active.",
  },
  {
    city: "Cambridge",
    dateLabel: "Nov 15, 2025",
    entriesLabel: "198 Entries",
    host: "Harvard Ballroom",
    lifecycle: "finished",
    name: "Harvard Invitational",
    region: "MA",
    sessions: "Archive",
    slug: "harvard-invitational-2025",
    summary:
      "Competition work is complete and the result archive is ready for review.",
  },
  {
    city: "Los Angeles",
    dateLabel: "Apr 18, 2026",
    entriesLabel: "154 expected",
    host: "Stanford Ballroom",
    lifecycle: "published",
    name: "Emerald Ball Collegiate",
    region: "CA",
    sessions: "3 sessions",
    slug: "emerald-ball-collegiate-2026",
    summary:
      "A public Competition listing is available before the host opens Entries.",
  },
];

export const appNavItems: AppNavItem[] = [
  {
    href: "/app",
    icon: Home,
    label: "Overview",
  },
  {
    href: "/app/competitions",
    icon: Trophy,
    label: "Competitions",
  },
  {
    href: "/app/entries",
    icon: ClipboardList,
    label: "Entries",
    soon: true,
  },
  {
    href: "/app/schedule",
    icon: CalendarDays,
    label: "Schedule",
    soon: true,
  },
  {
    href: "/app/officials",
    icon: Gavel,
    label: "Officials",
    soon: true,
  },
  {
    href: "/app/results",
    icon: Medal,
    label: "Results",
    soon: true,
  },
  {
    href: "/app/settings",
    icon: Settings,
    label: "Settings",
    soon: true,
  },
];

export const appSummaryStats = [
  {
    label: "Visible Competitions",
    value: "6",
    detail: "Draft records excluded from public discovery",
  },
  {
    label: "Entry Windows",
    value: "2",
    detail: "Open or preparing across prototype fixtures",
  },
  {
    label: "Operational Modules",
    value: "7",
    detail: "Reference navigation, not final permissions",
  },
];

export const workflowPanels = [
  {
    icon: ListChecks,
    title: "Entry Review",
    body: "Track normal Entry windows separately from add/drop review without implying scoring workflows.",
  },
  {
    icon: Users,
    title: "Floor Coordination",
    body: "Keep Scrutineer, Judge, and Deck Captain surfaces visually related while final authority rules remain deferred.",
  },
  {
    icon: ShieldCheck,
    title: "Public Boundary",
    body: "Public Competition discovery stays readable without exposing draft host setup.",
  },
];

export function getLifecycleCue(key: LifecycleKey) {
  return lifecycleCues.find((cue) => cue.key === key);
}
