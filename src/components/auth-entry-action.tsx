"use client";

import {
  SignInButton,
  useUser,
  UserButton,
} from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import Link from "next/link";

type AuthEntryActionProps = {
  clerkEnabled: boolean;
};

export function AuthEntryAction({ clerkEnabled }: AuthEntryActionProps) {
  if (!clerkEnabled) {
    return (
      <Link className="button button--secondary" href="/sign-in">
        <LogIn aria-hidden="true" className="button__icon" />
        <span>Sign in</span>
      </Link>
    );
  }

  return <ClerkAuthEntryAction />;
}

function ClerkAuthEntryAction() {
  const { isLoaded, isSignedIn } = useUser();

  if (isLoaded && isSignedIn) {
    return (
      <div className="auth-entry__user" aria-label="User menu">
        <UserButton />
      </div>
    );
  }

  return (
    <div className="auth-entry">
      <SignInButton mode="modal">
        <button className="button button--secondary" type="button">
          <LogIn aria-hidden="true" className="button__icon" />
          <span>Sign in</span>
        </button>
      </SignInButton>
    </div>
  );
}
