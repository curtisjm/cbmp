import { describe, expect, it } from "vitest";

import {
  isCalendarDateString,
  parseCalendarDateString,
} from "./calendar-date";

describe("parseCalendarDateString", () => {
  it("returns numeric parts for a valid calendar date", () => {
    expect(parseCalendarDateString("2024-02-29")).toEqual({
      day: 29,
      month: 2,
      year: 2024,
    });
  });

  it("returns undefined for malformed or impossible dates", () => {
    expect(parseCalendarDateString("2026-1-01")).toBeUndefined();
    expect(parseCalendarDateString("2026-02-29")).toBeUndefined();
  });
});

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
