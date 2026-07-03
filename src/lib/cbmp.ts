import {
  ClipboardList,
  LogIn,
  type LucideIcon,
} from "lucide-react";

export type LifecycleKey =
  | "published"
  | "entries open"
  | "entries closed"
  | "running"
  | "finished";

export type LifecycleCue = {
  key: LifecycleKey;
  label: string;
  routeLabel: string;
  description: string;
  tone: "published" | "open" | "closed" | "running" | "finished";
};

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const productName = "CBMP";

export const productDescription =
  "Competition management for collegiate ballroom operations.";

export const publicNavItems: NavItem[] = [
  {
    href: "/competitions",
    label: "Competitions",
    icon: ClipboardList,
  },
];

export const lifecycleCues: LifecycleCue[] = [
  {
    key: "published",
    label: "published",
    routeLabel: "public",
    description: "visible before entries open",
    tone: "published",
  },
  {
    key: "entries open",
    label: "entries open",
    routeLabel: "open",
    description: "primary public activity",
    tone: "open",
  },
  {
    key: "entries closed",
    label: "entries closed",
    routeLabel: "review",
    description: "attention and final checks",
    tone: "closed",
  },
  {
    key: "running",
    label: "running",
    routeLabel: "floor",
    description: "scrutineer controls changes",
    tone: "running",
  },
  {
    key: "finished",
    label: "finished",
    routeLabel: "archive",
    description: "stable public reference",
    tone: "finished",
  },
];

export const publicAccessLinks = [
  {
    href: "/competitions",
    label: "Public Competitions",
    description: "Published Competition list",
    icon: ClipboardList,
  },
  {
    href: "/sign-in",
    label: "Sign in",
    description: "Identity access when Clerk is available",
    icon: LogIn,
  },
];
