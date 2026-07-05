import { SignIn } from "@clerk/nextjs";
import {
  ArrowRight,
  CalendarCheck,
  ClipboardList,
  House,
  type LucideIcon,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { productDescription, productName } from "@/lib/cbmp";

import { isClerkEnabled } from "../../components/app-providers";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignInPage() {
  if (isClerkEnabled()) {
    return (
      <AuthSplitPanel
        action={
          <div className="flex justify-center lg:justify-start">
            <SignIn
              fallbackRedirectUrl="/"
              routing="hash"
              transferable={false}
              withSignUp={false}
            />
          </div>
        }
        eyebrow="Clerk sign in"
        heading="Sign in to CBMP"
        label="Sign in"
        summary="Use your configured Clerk identity provider to reach Competition, Organization, and official workflows as they become available."
      />
    );
  }

  return (
    <AuthSplitPanel
      action={<ClerkUnavailableActions />}
      eyebrow="Public fallback"
      heading="Sign in unavailable"
      label="Sign in unavailable"
      summary="Clerk is not configured for this environment. Public Competitions remain available without signing in."
    />
  );
}

function AuthSplitPanel({
  action,
  eyebrow,
  heading,
  label,
  summary,
}: {
  action: ReactNode;
  eyebrow: string;
  heading: string;
  label: string;
  summary: string;
}) {
  return (
    <section
      aria-label={label}
      className="grid min-h-[calc(100vh-4rem)] bg-background lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
    >
      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-10">
        <div className="w-full max-w-md">
          <Link
            className="mb-10 inline-flex items-center gap-2"
            href="/"
            aria-label={`${productName} home`}
          >
            <span className="grid size-9 place-items-center rounded-lg bg-foreground text-sm font-bold text-background">
              CB
            </span>
            <span className="text-lg font-semibold">{productName}</span>
          </Link>

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {eyebrow}
          </p>
          <h1
            id={label === "Sign in unavailable" ? "sign-in-heading" : undefined}
            className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-4xl"
          >
            {heading}
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {summary}
          </p>

          <div className="mt-8">{action}</div>
        </div>
      </div>

      <aside className="hidden overflow-hidden border-l bg-card lg:block">
        <div className="relative flex h-full min-h-[calc(100vh-4rem)] items-center justify-center p-10">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--primary)/0.16),transparent_42%,hsl(var(--accent)/0.10))]" />
          <div className="relative w-full max-w-lg">
            <Card className="overflow-hidden border-border/80 shadow-elevated">
              <div className="border-b bg-muted/50 px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold">
                      Competition operations
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Public discovery first, signed-in work later.
                    </p>
                  </div>
                  <span className="rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                    Reference
                  </span>
                </div>
              </div>
              <div className="grid gap-3 p-5">
                <AuthPreviewRow
                  icon={Trophy}
                  label="Competitions"
                  value="Published discovery"
                />
                <AuthPreviewRow
                  icon={Users}
                  label="Organizations"
                  value="Entry authority boundaries"
                />
                <AuthPreviewRow
                  icon={CalendarCheck}
                  label="Sessions"
                  value="Day-of operational context"
                />
                <AuthPreviewRow
                  icon={ShieldCheck}
                  label="Identity"
                  value="Clerk sign-in, Convex-owned data"
                />
              </div>
            </Card>
            <p className="mt-6 max-w-md text-sm leading-6 text-muted-foreground">
              {productDescription}
            </p>
          </div>
        </div>
      </aside>
    </section>
  );
}

function AuthPreviewRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-background p-3">
      <span className="grid size-9 place-items-center rounded-md bg-primary/20 text-foreground">
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="truncate text-xs text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}

function ClerkUnavailableActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button asChild>
        <Link href="/competitions">
          <ClipboardList aria-hidden="true" />
          <span>Competitions</span>
          <ArrowRight aria-hidden="true" />
        </Link>
      </Button>
      <Button asChild variant="outline">
        <Link href="/">
          <House aria-hidden="true" />
          <span>Home</span>
        </Link>
      </Button>
    </div>
  );
}
