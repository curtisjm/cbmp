"use client";

import {
  Globe2,
  LogIn,
  Route,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  SignInButton,
  useUser,
  UserButton,
} from "@clerk/nextjs";

import { productName, publicNavItems } from "../lib/cbmp";

type AppShellProps = {
  children: ReactNode;
  clerkEnabled: boolean;
};

type IconLinkProps = {
  href: string;
  label: string;
  icon: LucideIcon;
  current?: boolean;
};

function IconLink({ href, label, icon: Icon, current = false }: IconLinkProps) {
  return (
    <Link
      aria-current={current ? "page" : undefined}
      className="nav-link"
      data-current={current ? "true" : undefined}
      href={href}
    >
      <Icon aria-hidden="true" className="nav-link__icon" />
      <span>{label}</span>
    </Link>
  );
}

function AuthControls({ clerkEnabled }: { clerkEnabled: boolean }) {
  if (!clerkEnabled) {
    return (
      <Link className="button button--primary" href="/sign-in">
        <LogIn aria-hidden="true" className="button__icon" />
        <span>Sign in</span>
      </Link>
    );
  }

  return <ClerkAuthControls />;
}

function ClerkAuthControls() {
  const { isLoaded, isSignedIn } = useUser();

  if (isLoaded && isSignedIn) {
    return (
      <div className="user-control" aria-label="User menu">
        <UserButton />
      </div>
    );
  }

  return (
    <div className="auth-controls">
      <SignInButton mode="modal">
        <button className="button button--primary" type="button">
          <LogIn aria-hidden="true" className="button__icon" />
          <span>Sign in</span>
        </button>
      </SignInButton>
    </div>
  );
}

export function AppShell({ children, clerkEnabled }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="app-frame">
      <header className="app-header">
        <div className="brand-cluster">
          <Link className="brand-mark" href="/" aria-label={`${productName} home`}>
            C
          </Link>
          <div className="brand-copy">
            <Link className="brand-name" href="/">
              {productName}
            </Link>
            <span className="brand-support">Competition operations</span>
          </div>
        </div>

        <nav aria-label="Global navigation" className="global-nav">
          {publicNavItems.map((item) => (
            <IconLink
              key={item.href}
              current={pathname === item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}
          <IconLink
            current={pathname === "/"}
            href="/"
            icon={Route}
            label="Public entry"
          />
        </nav>

        <div className="header-actions">
          <Link className="button button--dark" href="/competitions">
            <Globe2 aria-hidden="true" className="button__icon" />
            <span>Public</span>
          </Link>
          <AuthControls clerkEnabled={clerkEnabled} />
        </div>
      </header>

      {children}
    </div>
  );
}
