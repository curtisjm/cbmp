import {
  ClipboardList,
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
    label: "Published",
    description: "Listed publicly; entries not yet open.",
    tone: "published",
  },
  {
    key: "entries open",
    label: "Entries open",
    description: "Accepting Competitor entries.",
    tone: "open",
  },
  {
    key: "entries closed",
    label: "Entries closed",
    description: "Entry window closed; awaiting the run.",
    tone: "closed",
  },
  {
    key: "running",
    label: "Running",
    description: "Live on the floor.",
    tone: "running",
  },
  {
    key: "finished",
    label: "Finished",
    description: "Completed; results final.",
    tone: "finished",
  },
];
