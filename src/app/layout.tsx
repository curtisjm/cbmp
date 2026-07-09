import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import { AppProviders, isClerkEnabled } from "../components/app-providers";
import { AppShell } from "../components/app-shell";
import { productDescription, productName } from "../lib/cbmp";
import "./globals.css";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: productName,
    template: `%s | ${productName}`,
  },
  description: productDescription,
  applicationName: productName,
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const clerkEnabled = isClerkEnabled();

  return (
    <html className={inter.variable} data-scroll-behavior="smooth" lang="en">
      <body>
        <AppProviders>
          <AppShell clerkEnabled={clerkEnabled}>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
