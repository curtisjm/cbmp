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
import { productDescription } from "@/lib/cbmp";

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
        heading="Sign in to CBMP"
        label="Sign in"
        summary="Use your configured Clerk identity provider to reach Competition, Organization, and official workflows as they become available."
      />
    );
  }

  return (
    <AuthSplitPanel
      action={<ClerkUnavailableActions />}
      heading="Sign in unavailable"
      label="Sign in unavailable"
      summary="Clerk is not configured for this environment. Public Competitions remain available without signing in."
    />
  );
}

function AuthSplitPanel({
  action,
  heading,
  label,
  summary,
}: {
  action: ReactNode;
  heading: string;
  label: string;
  summary: string;
}) {
  return (
    <section
      aria-label={label}
      className="grid min-h-[calc(100dvh-4rem)] bg-background lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
    >
      <div className="flex items-center justify-center px-4 py-14 sm:px-6 lg:px-10">
        <div className="w-full max-w-md">
          <h1
            id="sign-in-heading"
            className="text-3xl font-semibold tracking-normal text-foreground sm:text-4xl"
          >
            {heading}
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {summary}
          </p>

          <div className="mt-8">{action}</div>
        </div>
      </div>

      <aside className="hidden border-l border-foreground bg-foreground text-background lg:flex lg:items-center">
        <div className="w-full px-12 py-14 xl:px-16">
          <div className="max-w-lg">
            <h2 className="text-2xl font-semibold leading-tight">
              Competition operations, with access boundaries kept clear.
            </h2>
            <p className="mt-4 max-w-[58ch] text-sm leading-6 text-background/72">
              {productDescription} Public discovery stays available before
              signed-in workflows are ready.
            </p>

            <ul className="mt-9 divide-y divide-background/20 border-y border-background/20">
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
            </ul>
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
    <li className="flex items-center gap-4 py-5">
      <span className="grid size-10 shrink-0 place-items-center rounded-md bg-background/10 text-primary">
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold">{label}</p>
        <p className="mt-1 text-xs leading-5 text-background/72">{value}</p>
      </div>
    </li>
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
