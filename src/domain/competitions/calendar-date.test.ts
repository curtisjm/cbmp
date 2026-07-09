import { describe, expect, it } from "vitest";

import { isCalendarDateString } from "./calendar-date";

describe("isCalendarDateString", () => {
  it("accepts valid YYYY-MM-DD calendar dates", () => {
    expect(isCalendarDateString("2026-10-10")).toBe(true);
    expect(isCalendarDateString("2024-02-29")).toBe(true);
  });

  it("rejects malformed and impossible calendar dates", () => {
    expect(isCalendarDateString("2026-1-01")).toBe(false);
    expect(isCalendarDateString("2026-02-29")).toBe(false);
    expect(isCalendarDateString("2026-04-31")).toBe(false);
    expect(isCalendarDateString("2026-13-01")).toBe(false);
    expect(isCalendarDateString("0000-01-01")).toBe(false);
  });
});
