import type { ReactNode } from "react";

import { ClientAppProviders } from "./client-app-providers";
import { isClerkPublishableKeyConfigured } from "../lib/clerk";
import { getConfiguredConvexUrl } from "../lib/convex";

type AppProvidersProps = {
  children: ReactNode;
};

export function isClerkEnabled() {
  return isClerkPublishableKeyConfigured(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  );
}

export function AppProviders({ children }: AppProvidersProps) {
  const clerkEnabled = isClerkEnabled();
  const convexUrl = getConfiguredConvexUrl(
    process.env.NEXT_PUBLIC_CONVEX_URL,
  );

  return (
    <ClientAppProviders clerkEnabled={clerkEnabled} convexUrl={convexUrl}>
      {children}
    </ClientAppProviders>
  );
}
