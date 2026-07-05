import { Compass } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFoundPage() {
  return (
    <section
      className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-16"
      aria-labelledby="not-found-heading"
    >
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle id="not-found-heading">Route not available</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-muted-foreground">
            The page you requested is not available. Public Competitions remain
            available from the main navigation.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/competitions">
                <Compass aria-hidden="true" />
                <span>Competitions</span>
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">CBMP home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
