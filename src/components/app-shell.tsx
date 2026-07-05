"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, ShieldCheck, Trophy, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { AuthAccessAction } from "@/components/auth-access-action";
import { Button } from "@/components/ui/button";
import { productDescription, productName, publicNavItems } from "@/lib/cbmp";
import { cn } from "@/lib/utils";

type AppShellProps = {
  children: ReactNode;
  clerkEnabled: boolean;
};

export function AppShell({ children, clerkEnabled }: AppShellProps) {
  const pathname = usePathname();

  if (pathname?.startsWith("/app")) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNavbar clerkEnabled={clerkEnabled} pathname={pathname ?? "/"} />
      <main className="pt-16">{children}</main>
      <PublicFooter />
    </div>
  );
}

function PublicNavbar({
  clerkEnabled,
  pathname,
}: {
  clerkEnabled: boolean;
  pathname: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 8);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinkClass = (href: string) => {
    const current = href === "/" ? pathname === href : pathname.startsWith(href);

    return cn(
      "rounded-full px-3 py-2 text-sm font-medium transition-colors",
      current
        ? "bg-foreground text-background"
        : "text-muted-foreground hover:bg-muted hover:text-foreground",
    );
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-200",
        scrolled || mobileOpen
          ? "border-border bg-background/95 backdrop-blur-md"
          : "border-transparent bg-background/70 backdrop-blur-sm",
      )}
    >
      <div className="container flex h-16 items-center gap-4">
        <Link
          className="flex min-w-0 items-center gap-2"
          href="/"
          aria-label={`${productName} home`}
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-foreground text-sm font-bold text-background">
            CB
          </span>
          <span className="truncate text-lg font-semibold">{productName}</span>
        </Link>

        <nav
          aria-label="Global navigation"
          className="hidden flex-1 items-center gap-1 md:flex"
        >
          {publicNavItems.map((item) => (
            <Link
              aria-current={
                (item.href === "/" ? pathname === item.href : pathname.startsWith(item.href))
                  ? "page"
                  : undefined
              }
              className={navLinkClass(item.href)}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <AuthAccessAction clerkEnabled={clerkEnabled} variant="outline" />
        </div>

        <Button
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          className="ml-auto md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          size="icon"
          type="button"
          variant="ghost"
        >
          {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen ? (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="overflow-hidden border-t bg-background md:hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
          >
            <nav
              aria-label="Mobile navigation"
              className="container flex flex-col gap-1 py-4"
            >
              {publicNavItems.map((item) => (
                <Link
                  className={cn(
                    "rounded-lg px-3 py-3 text-sm font-medium",
                    item.href === "/"
                      ? pathname === item.href && "bg-muted"
                      : pathname.startsWith(item.href) && "bg-muted",
                  )}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 border-t pt-4">
                <AuthAccessAction
                  className="w-full"
                  clerkEnabled={clerkEnabled}
                  variant="default"
                />
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function PublicFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="container grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Link className="flex items-center gap-2" href="/">
            <span className="grid size-8 place-items-center rounded-lg bg-foreground text-xs font-bold text-background">
              CB
            </span>
            <span className="text-base font-semibold">{productName}</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {productDescription}
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Product</h2>
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <Link className="hover:text-foreground" href="/competitions">
              Public Competitions
            </Link>
            <Link className="hover:text-foreground" href="/app">
              App reference
            </Link>
            <Link className="hover:text-foreground" href="/sign-in">
              Sign in
            </Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Boundaries</h2>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Trophy className="size-4" aria-hidden="true" />
              Competition discovery is public.
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4" aria-hidden="true" />
              Clerk remains identity only.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
