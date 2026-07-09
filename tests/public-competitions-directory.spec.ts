import { expect, test } from "@playwright/test";

test.use({ baseURL: "http://127.0.0.1:4173" });

test.describe("public Competition directory", () => {
  test("explains when a connected query returns no public Competitions", async ({
    page,
  }) => {
    await page.goto("/");

    const emptyState = page.getByRole("status");
    await expect(emptyState).toContainText("No public Competitions yet");
    await expect(emptyState).toContainText(
      "Published Competitions will appear here",
    );
    await expect(
      page.getByRole("list", { name: "Public Competitions" }),
    ).toHaveCount(0);
  });

  test("searches, filters, clears, and names Competition Lifecycle states", async ({
    page,
  }) => {
    await page.goto("/?scenario=list");

    const list = page.getByRole("list", { name: "Public Competitions" });
    await expect(list).toBeVisible();

    const cascadeCompetition = page.getByRole("article", {
      name: "Cascade Collegiate Classic",
    });
    await expect(cascadeCompetition.getByText("Entries open")).toBeVisible();
    await expect(
      cascadeCompetition.getByText("Northwest Ballroom Alliance"),
    ).toBeVisible();

    const search = page.getByRole("searchbox", {
      name: "Search Competitions",
    });
    await search.fill("Northwest Ballroom Alliance");

    await expect(cascadeCompetition).toBeVisible();
    await expect(
      page.getByRole("article", { name: "Capital Ballroom Invitational" }),
    ).toHaveCount(0);
    await expect(page.getByText("1 of 3 Competitions")).toBeVisible();

    await search.clear();
    await page.getByRole("button", { name: "Published" }).click();

    await expect(
      page.getByRole("article", { name: "Capital Ballroom Invitational" }),
    ).toBeVisible();
    await expect(cascadeCompetition).toHaveCount(0);

    await search.fill("no matching Competition");
    await expect(
      page.getByRole("heading", {
        name: "No Competitions match these filters",
      }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Clear filters" }).click();

    await expect(search).toHaveValue("");
    await expect(page.getByRole("button", { name: "All" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(list.getByRole("article")).toHaveCount(3);
  });
});
