"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
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

  return (
    <div className="auth-entry">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="button button--secondary" type="button">
            <LogIn aria-hidden="true" className="button__icon" />
            <span>Sign in</span>
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="auth-entry__user" aria-label="User menu">
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
}
