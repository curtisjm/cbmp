import type { ReactNode } from "react";

import { ClientAppProviders } from "./client-app-providers";
import { isClerkPublishableKeyConfigured } from "../lib/clerk";

type AppProvidersProps = {
  children: ReactNode;
};

export function isClerkEnabled() {
  return isClerkPublishableKeyConfigured(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  );
}

export function getConfiguredConvexUrl() {
  const value = process.env.NEXT_PUBLIC_CONVEX_URL?.trim();

  if (!value || /(?:placeholder|replace|example|your[-_]|[<>])/i.test(value)) {
    return undefined;
  }

  try {
    const url = new URL(value);

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return undefined;
    }

    return url.toString().replace(/\/$/, "");
  } catch {
    return undefined;
  }
}

export function isConvexEnabled() {
  return getConfiguredConvexUrl() !== undefined;
}

export function AppProviders({ children }: AppProvidersProps) {
  const clerkEnabled = isClerkEnabled();
  const convexUrl = getConfiguredConvexUrl();

  return (
    <ClientAppProviders clerkEnabled={clerkEnabled} convexUrl={convexUrl}>
      {children}
    </ClientAppProviders>
  );
}
