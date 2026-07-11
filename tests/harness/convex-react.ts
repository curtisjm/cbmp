import { publicCompetitionFixtures } from "./public-competition-fixtures";

export function useQuery() {
  const scenario = new URL(window.location.href).searchParams.get("scenario");

  if (scenario === "query-error") {
    throw new Error("Simulated connected query failure");
  }

  if (scenario === "query-success") {
    return publicCompetitionFixtures;
  }

  return undefined;
}
