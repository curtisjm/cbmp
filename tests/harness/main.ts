import { createElement } from "react";
import { createRoot } from "react-dom/client";

import { CompetitionDirectory } from "../../src/components/public-competition-directory";
import { PublicCompetitionsTable } from "../../src/components/public-competitions-table";
import { publicCompetitionFixtures } from "./public-competition-fixtures";

const rootElement = document.querySelector("#root");

if (!rootElement) {
  throw new Error("Competition directory harness root is missing");
}

const scenario = new URL(window.location.href).searchParams.get("scenario");
const competitions =
  scenario === "list"
    ? publicCompetitionFixtures
    : [];

const directory =
  scenario?.startsWith("query-")
    ? createElement(PublicCompetitionsTable, { convexEnabled: true })
    : createElement(CompetitionDirectory, { competitions });

createRoot(rootElement).render(
  createElement(
    "main",
    { "aria-label": "Competition directory test harness" },
    directory,
  ),
);
