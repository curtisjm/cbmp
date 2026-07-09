export const COMPETITION_LIFECYCLE = {
  draft: "draft",
  published: "published",
  entriesOpen: "entries open",
  entriesClosed: "entries closed",
  running: "running",
  finished: "finished",
} as const;

export type CompetitionLifecycle =
  (typeof COMPETITION_LIFECYCLE)[keyof typeof COMPETITION_LIFECYCLE];

export const PUBLIC_COMPETITION_LIFECYCLES = [
  COMPETITION_LIFECYCLE.published,
  COMPETITION_LIFECYCLE.entriesOpen,
  COMPETITION_LIFECYCLE.entriesClosed,
  COMPETITION_LIFECYCLE.running,
  COMPETITION_LIFECYCLE.finished,
] as const satisfies readonly CompetitionLifecycle[];

export const COMPETITION_LIFECYCLE_LABELS = {
  [COMPETITION_LIFECYCLE.draft]: "Draft",
  [COMPETITION_LIFECYCLE.published]: "Published",
  [COMPETITION_LIFECYCLE.entriesOpen]: "Entries open",
  [COMPETITION_LIFECYCLE.entriesClosed]: "Entries closed",
  [COMPETITION_LIFECYCLE.running]: "Running",
  [COMPETITION_LIFECYCLE.finished]: "Finished",
} as const satisfies Record<CompetitionLifecycle, string>;

export function competitionLifecycleLabel(
  lifecycle: CompetitionLifecycle,
): string {
  return COMPETITION_LIFECYCLE_LABELS[lifecycle];
}
