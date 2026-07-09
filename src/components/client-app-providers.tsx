"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";
import { useMemo } from "react";

type ClientAppProvidersProps = {
  children: ReactNode;
  clerkEnabled: boolean;
  convexUrl?: string;
};

export function ClientAppProviders({
  children,
  clerkEnabled,
  convexUrl,
}: ClientAppProvidersProps) {
  const convexClient = useMemo(
    () => (convexUrl ? new ConvexReactClient(convexUrl) : null),
    [convexUrl],
  );

  if (clerkEnabled && convexClient) {
    return (
      <ClerkProvider>
        <ConvexProvider client={convexClient}>{children}</ConvexProvider>
      </ClerkProvider>
    );
  }

  if (clerkEnabled) {
    return <ClerkProvider>{children}</ClerkProvider>;
  }

  if (convexClient) {
    return <ConvexProvider client={convexClient}>{children}</ConvexProvider>;
  }

  return <>{children}</>;
}
