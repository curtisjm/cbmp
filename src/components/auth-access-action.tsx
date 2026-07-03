"use client";

import {
  SignInButton,
  useUser,
  UserButton,
} from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import Link from "next/link";

type AuthAccessActionProps = {
  clerkEnabled: boolean;
  variant?: "primary" | "secondary";
};

export function AuthAccessAction({
  clerkEnabled,
  variant = "primary",
}: AuthAccessActionProps) {
  const className = `button button--${variant}`;

  if (!clerkEnabled) {
    return (
      <Link className={className} href="/sign-in">
        <LogIn aria-hidden="true" className="button__icon" />
        <span>Sign in</span>
      </Link>
    );
  }

  return <ClerkAuthAccessAction className={className} />;
}

function ClerkAuthAccessAction({ className }: { className: string }) {
  const { isLoaded, isSignedIn } = useUser();

  if (isLoaded && isSignedIn) {
    return (
      <div className="user-control" aria-label="User menu">
        <UserButton />
      </div>
    );
  }

  return (
    <div className="auth-access">
      <SignInButton mode="modal">
        <button className={className} type="button">
          <LogIn aria-hidden="true" className="button__icon" />
          <span>Sign in</span>
        </button>
      </SignInButton>
    </div>
  );
}
