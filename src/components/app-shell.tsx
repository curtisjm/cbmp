"use client";

import {
  Globe2,
  House,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { AuthAccessAction } from "./auth-access-action";
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
            icon={House}
            label="Public home"
          />
        </nav>

        <div className="header-actions">
          <Link className="button button--dark" href="/competitions">
            <Globe2 aria-hidden="true" className="button__icon" />
            <span>Public</span>
          </Link>
          <AuthAccessAction clerkEnabled={clerkEnabled} />
        </div>
      </header>

      {children}
    </div>
  );
}
