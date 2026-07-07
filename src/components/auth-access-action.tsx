"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AuthAccessActionProps = {
  className?: string;
  clerkEnabled: boolean;
  variant?: "default" | "secondary" | "outline" | "dark" | "ghost";
};

export function AuthAccessAction({
  className,
  clerkEnabled,
  variant = "default",
}: AuthAccessActionProps) {
  if (!clerkEnabled) {
    return (
      <Button asChild className={className} variant={variant}>
        <Link href="/sign-in">
          <LogIn aria-hidden="true" data-icon="inline-start" />
          <span>Sign in</span>
        </Link>
      </Button>
    );
  }

  return <ClerkAuthAccessAction className={className} variant={variant} />;
}

function ClerkAuthAccessAction({
  className,
  variant,
}: {
  className?: string;
  variant: NonNullable<AuthAccessActionProps["variant"]>;
}) {
  const { isLoaded, isSignedIn } = useUser();

  if (isLoaded && isSignedIn) {
    return (
      <div className="grid size-10 place-items-center" aria-label="User menu">
        <UserButton />
      </div>
    );
  }

  return (
    <SignInButton mode="modal">
      <Button className={cn(className)} type="button" variant={variant}>
        <LogIn aria-hidden="true" data-icon="inline-start" />
        <span>Sign in</span>
      </Button>
    </SignInButton>
  );
}
