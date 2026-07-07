import type { Metadata } from "next";

import { AppReferenceShell } from "@/components/app-reference-shell";

export const metadata: Metadata = {
  title: "App reference",
  description:
    "Prototype reference shell for future CBMP Competition management surfaces.",
};

export default function AppReferencePage() {
  return <AppReferenceShell />;
}
