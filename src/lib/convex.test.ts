import { describe, expect, it } from "vitest";

import { getConfiguredConvexUrl, isConvexEnabled } from "./convex";

describe("getConfiguredConvexUrl", () => {
  it("rejects missing, blank, and placeholder configuration", () => {
    expect(getConfiguredConvexUrl(undefined)).toBeUndefined();
    expect(getConfiguredConvexUrl("   ")).toBeUndefined();
    expect(
      getConfiguredConvexUrl("https://your-deployment.convex.cloud"),
    ).toBeUndefined();
    expect(
      getConfiguredConvexUrl("https://example.convex.cloud"),
    ).toBeUndefined();
  });

  it("rejects invalid URLs and disallowed protocols", () => {
    expect(getConfiguredConvexUrl("not a URL")).toBeUndefined();
    expect(getConfiguredConvexUrl("ftp://127.0.0.1:3210")).toBeUndefined();
  });

  it("accepts HTTP and HTTPS URLs", () => {
    expect(getConfiguredConvexUrl("http://127.0.0.1:3210")).toBe(
      "http://127.0.0.1:3210",
    );
    expect(
      getConfiguredConvexUrl("https://brilliant-otter-123.convex.cloud"),
    ).toBe("https://brilliant-otter-123.convex.cloud");
  });

  it("removes a trailing slash", () => {
    expect(
      getConfiguredConvexUrl("https://brilliant-otter-123.convex.cloud/"),
    ).toBe("https://brilliant-otter-123.convex.cloud");
  });
});

describe("isConvexEnabled", () => {
  it("reports whether a usable URL is configured", () => {
    expect(isConvexEnabled(undefined)).toBe(false);
    expect(isConvexEnabled("https://brilliant-otter-123.convex.cloud")).toBe(
      true,
    );
  });
});
