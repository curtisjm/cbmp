import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";

type AppProvidersProps = {
  children: ReactNode;
};

export function isClerkEnabled() {
  return Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
}

export function AppProviders({ children }: AppProvidersProps) {
  if (!isClerkEnabled()) {
    return <>{children}</>;
  }

  return <ClerkProvider>{children}</ClerkProvider>;
}
