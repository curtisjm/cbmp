import * as React from "react"
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  ClipboardList,
  Filter,
  Gauge,
  Layers3,
  LayoutDashboard,
  LogIn,
  MoreHorizontal,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type VariantKey = "A" | "B" | "C"
type LifecycleKey =
  | "published"
  | "entries open"
  | "entries closed"
  | "running"
  | "finished"

const variants: Record<VariantKey, string> = {
  A: "Operations deck",
  B: "Lifecycle board",
  C: "Public registry",
}

const variantKeys = Object.keys(variants) as VariantKey[]

const competitions: Array<{
  name: string
  description: string
  lifecycle: LifecycleKey
  host: string
  route: string
  date: string
  entries: number
}> = [
  {
    name: "Sample Competition",
    description: "Representative public row",
    lifecycle: "entries open",
    host: "Host Organization",
    route: "/competitions/sample",
    date: "Mar 22",
    entries: 218,
  },
  {
    name: "Published Competition",
    description: "Sparse listing state",
    lifecycle: "published",
    host: "Host Organization",
    route: "/competitions/published",
    date: "Apr 05",
    entries: 0,
  },
  {
    name: "Closed Entry Window",
    description: "Lifecycle contrast check",
    lifecycle: "entries closed",
    host: "Host Organization",
    route: "/competitions/closed",
    date: "Apr 19",
    entries: 384,
  },
  {
    name: "Running Competition",
    description: "Higher-attention operational state",
    lifecycle: "running",
    host: "Host Organization",
    route: "/competitions/running",
    date: "Today",
    entries: 412,
  },
  {
    name: "Finished Competition",
    description: "Stable public archive state",
    lifecycle: "finished",
    host: "Host Organization",
    route: "/competitions/finished",
    date: "Feb 18",
    entries: 297,
  },
]

const lifecycle = [
  {
    key: "published" as LifecycleKey,
    route: "public",
    note: "visible, entries not open yet",
    color: "#81a1c1",
  },
  {
    key: "entries open" as LifecycleKey,
    route: "entry",
    note: "primary public activity",
    color: "#88c0d0",
  },
  {
    key: "entries closed" as LifecycleKey,
    route: "review",
    note: "attention and final checks",
    color: "#ebcb8b",
  },
  {
    key: "running" as LifecycleKey,
    route: "floor",
    note: "scrutineer controls changes",
    color: "#bf616a",
  },
  {
    key: "finished" as LifecycleKey,
    route: "archive",
    note: "stable public reference",
    color: "#a3be8c",
  },
]

const lifecycleTone: Record<LifecycleKey, string> = {
  published: "border-[#81a1c1] text-nord-0",
  "entries open": "border-[#88c0d0] text-nord-0",
  "entries closed": "border-[#ebcb8b] text-nord-0",
  running: "border-[#bf616a] text-nord-0",
  finished: "border-[#a3be8c] text-nord-0",
}

function useVariant() {
  const readVariant = React.useCallback((): VariantKey => {
    const value = new URLSearchParams(window.location.search).get("variant")
    return value === "B" || value === "C" ? value : "A"
  }, [])

  const [variant, setVariantState] = React.useState<VariantKey>(readVariant)

  const setVariant = React.useCallback((next: VariantKey) => {
    const url = new URL(window.location.href)
    url.searchParams.set("variant", next)
    window.history.replaceState(null, "", url)
    setVariantState(next)
  }, [])

  React.useEffect(() => {
    const onPopState = () => setVariantState(readVariant())
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [readVariant])

  return [variant, setVariant] as const
}

function App() {
  const [variant, setVariant] = useVariant()

  return (
    <main className="min-h-screen px-4 pb-20 pt-4 sm:px-6 sm:pb-24 lg:px-8">
      <div className="mx-auto flex max-w-[1480px] flex-col gap-5">
        <TopNav variant={variant} />
        {variant === "A" ? <VariantA /> : null}
        {variant === "B" ? <VariantB /> : null}
        {variant === "C" ? <VariantC /> : null}
      </div>
      <PrototypeSwitcher current={variant} onChange={setVariant} />
    </main>
  )
}

function TopNav({ variant }: { variant: VariantKey }) {
  return (
    <header className="frosted-nav sticky top-3 z-40 rounded-2xl px-3 py-2.5 text-nord-6 sm:px-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid size-9 place-items-center rounded-xl border border-white/[0.15] bg-nord-0 text-sm font-black text-nord-8">
            C
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-base font-semibold leading-tight">CBMP</h1>
              <Badge variant="dark" className="bg-white/10">
                PROTOTYPE
              </Badge>
            </div>
            <p className="text-xs leading-tight text-nord-5">
              Nord shadcn component pass · {variant} — {variants[variant]}
            </p>
          </div>
        </div>

        <nav
          aria-label="Primary prototype navigation"
          className="flex flex-wrap items-center gap-1 rounded-xl bg-nord-0/[0.42] p-1 text-sm text-nord-5 sm:flex-nowrap"
        >
          {[
            { label: "Competitions", icon: ClipboardList, current: true },
            { label: "Lifecycle", icon: CircleDot },
            { label: "User Profile", icon: Users },
          ].map((item) => (
            <a
              key={item.label}
              aria-current={item.current ? "page" : undefined}
              className={cn(
                "inline-flex h-8 items-center gap-2 whitespace-nowrap rounded-lg px-3 font-medium transition-colors hover:bg-white/10 hover:text-nord-6",
                item.current && "bg-white text-nord-0 shadow-sm",
              )}
              href="#"
            >
              <item.icon className="size-4" />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative min-w-[220px] sm:w-[250px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-nord-5" />
            <Input
              aria-label="Search competitions"
              className="glass-input h-10 pl-9"
              placeholder="Search competitions"
            />
          </div>
          <ViewMenu />
          <Button variant="dark" type="button">
            Profile
          </Button>
          <Button type="button">
            <LogIn className="size-4" />
            Sign in
          </Button>
        </div>
      </div>
    </header>
  )
}

function ViewMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="dark" type="button">
          <SlidersHorizontal className="size-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Public competition views</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>
          Public list
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>
          Lifecycle review
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>
          Empty states
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Export visible rows
          <MoreHorizontal className="ml-auto size-4 opacity-60" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function VariantA() {
  return (
    <section className="grid gap-5 xl:grid-cols-[240px_minmax(0,1fr)] 2xl:grid-cols-[260px_minmax(0,1fr)_320px]">
      <aside className="dark-panel rounded-2xl p-4">
        <SectionLabel icon={LayoutDashboard} title="Operations deck" />
        <div className="mt-4 grid gap-2">
          {["Public competitions", "Entry windows", "Lifecycle review", "User Profile"].map(
            (item, index) => (
              <button
                key={item}
                className={cn(
                  "flex h-10 items-center rounded-xl px-3 text-left text-sm font-semibold text-nord-5 transition-colors hover:bg-white/10",
                  index === 0 && "bg-nord-0 text-nord-6 ring-1 ring-nord-8/40",
                )}
                type="button"
              >
                {item}
              </button>
            ),
          )}
        </div>
        <Separator className="my-4 bg-white/10" />
        <LifecycleList compact />
      </aside>

      <div className="grid min-w-0 gap-5">
        <DarkLifecycleStrip />
        <CompetitionTable title="Public competitions" />
        <EmptyStateCard />
      </div>

      <aside className="grid content-start gap-5 xl:col-span-2 xl:grid-cols-2 2xl:col-span-1 2xl:grid-cols-1">
        <PrototypeState variant="A" />
        <RoleMappingCard />
      </aside>
    </section>
  )
}

function VariantB() {
  return (
    <section className="grid gap-5">
      <div className="dark-panel grid gap-5 rounded-2xl p-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <SectionLabel icon={Gauge} title="Lifecycle board" />
              <h2 className="mt-3 text-2xl font-semibold tracking-normal text-nord-6">
                Public competitions by operational state
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-nord-5">
                Dark surfaces carry lifecycle state and review pressure. The
                table remains light below so repeated scanning stays readable.
              </p>
            </div>
            <Button type="button">
              <Filter className="size-4" />
              Filter rows
            </Button>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-5">
            {lifecycle.map((step) => (
              <div
                key={step.key}
                className="rounded-2xl border border-white/10 bg-nord-0/[0.58] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="dark">{step.route}</Badge>
                  <span
                    className="status-dot"
                    style={{ "--status-color": step.color } as React.CSSProperties}
                  />
                </div>
                <div className="mt-4 text-sm font-semibold text-nord-6">
                  {step.key}
                </div>
                <p className="mt-1 text-xs leading-5 text-nord-5">{step.note}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="dark-panel-soft rounded-2xl text-nord-6 shadow-nord-dark">
          <CardHeader>
            <CardTitle>Review posture</CardTitle>
            <CardDescription className="text-nord-5">
              Public list excludes draft competitions and surfaces state before
              action.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Metric label="Open entries" value="1" />
            <Metric label="Needs attention" value="2" />
            <Metric label="Public archive" value="1" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <CompetitionTable title="Competition registry" />
        <PrototypeState variant="B" />
      </div>
    </section>
  )
}

function VariantC() {
  return (
    <section className="grid gap-5 xl:grid-cols-[340px_minmax(0,1fr)]">
      <aside className="grid content-start gap-5">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Public registry filters</CardTitle>
            <CardDescription>
              Component-backed filter surface for the public list.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Input placeholder="Host Organization" />
            <Input placeholder="Competition Lifecycle" />
            <Button type="button" className="w-full">
              Apply filters
            </Button>
            <Button type="button" variant="outline" className="w-full">
              Clear filters
            </Button>
          </CardContent>
        </Card>
        <PrototypeState variant="C" />
      </aside>

      <div className="grid min-w-0 gap-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Public competitions</CardTitle>
              <CardDescription>
                A lighter registry treatment with dark state modules reserved
                for high-signal surfaces.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All public</TabsTrigger>
                  <TabsTrigger value="open">Entries open</TabsTrigger>
                  <TabsTrigger value="archive">Archive</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>
          <Card className="dark-panel-soft rounded-2xl p-5 text-nord-6 shadow-nord-dark">
            <SectionLabel icon={ShieldCheck} title="Authority cue" />
            <p className="mt-3 text-sm leading-6 text-nord-5">
              Public users can inspect competitions. Competition Host and
              Scrutineer actions stay outside this public surface.
            </p>
          </Card>
        </div>
        <CompetitionTable title="Registry sheet" />
        <DarkLifecycleStrip />
      </div>
    </section>
  )
}

function CompetitionTable({ title }: { title: string }) {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <CardHeader className="flex flex-col gap-2 bg-nord-2 px-4 py-3 text-nord-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="text-nord-5">
            draft excluded from public list
          </CardDescription>
        </div>
        <Badge variant="dark">{competitions.length} visible</Badge>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-nord-0">
            <TableRow className="border-nord-2 hover:bg-nord-0">
              <TableHead className="min-w-[210px] text-nord-6">Competition</TableHead>
              <TableHead className="min-w-[150px] text-nord-6">Competition Lifecycle</TableHead>
              <TableHead className="min-w-[130px] text-nord-6">Host</TableHead>
              <TableHead className="min-w-[72px] text-right text-nord-6">Entries</TableHead>
              <TableHead className="min-w-[175px] text-nord-6">Route</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {competitions.map((competition) => (
              <TableRow key={competition.route}>
                <TableCell>
                  <div className="font-semibold">{competition.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {competition.description} · {competition.date}
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={competition.lifecycle} />
                </TableCell>
                <TableCell>{competition.host}</TableCell>
                <TableCell className="text-right font-medium">{competition.entries}</TableCell>
                <TableCell className="whitespace-nowrap font-mono text-xs">{competition.route}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function DarkLifecycleStrip() {
  return (
    <Card className="dark-panel overflow-hidden rounded-2xl">
      <CardHeader className="flex flex-row items-start justify-between gap-4 bg-nord-2/70 px-4 py-3">
        <div>
          <CardTitle className="text-nord-6">Competition Lifecycle</CardTitle>
          <CardDescription className="text-nord-5">
            status labels are text plus color
          </CardDescription>
        </div>
        <Badge variant="dark">public route</Badge>
      </CardHeader>
      <CardContent className="grid gap-0 p-0 md:grid-cols-5">
        {lifecycle.map((step) => (
          <div
            key={step.key}
            className="border-b border-white/10 p-3.5 md:border-b-0 md:border-r last:border-0"
          >
            <div className="flex items-center justify-between gap-2">
              <Badge variant="dark">{step.route}</Badge>
              <span
                className="status-dot"
                style={{ "--status-color": step.color } as React.CSSProperties}
              />
            </div>
            <div className="mt-4 text-sm font-semibold text-nord-6">{step.key}</div>
            <p className="mt-1 text-xs leading-5 text-nord-5">{step.note}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function LifecycleList({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid gap-2">
      {lifecycle.map((step) => (
        <div
          key={step.key}
          className={cn(
            "rounded-2xl border border-white/10 bg-nord-0/[0.42] p-3",
            compact && "p-2.5",
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-nord-6">{step.key}</span>
            <span
              className="status-dot"
              style={{ "--status-color": step.color } as React.CSSProperties}
            />
          </div>
          <p className="mt-1 text-xs leading-5 text-nord-5">{step.note}</p>
        </div>
      ))}
    </div>
  )
}

function StatusBadge({ status }: { status: LifecycleKey }) {
  const color = lifecycle.find((step) => step.key === status)?.color ?? "#88c0d0"
  return (
    <Badge
      variant="outline"
      className={cn("gap-2 bg-white", lifecycleTone[status])}
    >
      <span
        className="status-dot"
        style={{ "--status-color": color } as React.CSSProperties}
      />
      {status}
    </Badge>
  )
}

function PrototypeState({ variant }: { variant: VariantKey }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Prototype state</CardTitle>
        <CardDescription>
          Full relevant state is rendered for review.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-4 gap-y-2 text-sm">
          <dt className="text-muted-foreground">Variant</dt>
          <dd className="font-semibold">
            {variant} — {variants[variant]}
          </dd>
          <dt className="text-muted-foreground">Components</dt>
          <dd>Button, Card, Input, Badge, Tabs, DropdownMenu, Table</dd>
          <dt className="text-muted-foreground">Palette</dt>
          <dd>Official Nord colors, light product base</dd>
          <dt className="text-muted-foreground">Radius</dt>
          <dd>rounded panels, pill controls</dd>
        </dl>
      </CardContent>
    </Card>
  )
}

function RoleMappingCard() {
  return (
    <Card className="dark-panel-soft rounded-2xl text-nord-6 shadow-nord-dark">
      <CardHeader>
        <CardTitle>Role mapping</CardTitle>
        <CardDescription className="text-nord-5">
          Domain vocabulary stays visible without inventing dashboards.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 text-sm">
        {["Competition Host", "Scrutineer", "Judge", "Deck Captain"].map((role) => (
          <div
            key={role}
            className="flex items-center justify-between rounded-2xl bg-white/[0.08] px-3 py-2 text-nord-6"
          >
            <span>{role}</span>
            <Badge variant="dark">defined</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function EmptyStateCard() {
  return (
    <Card className="rounded-2xl border-dashed">
      <CardHeader>
        <CardTitle>No competitions match this filter</CardTitle>
        <CardDescription>
          Clear the search or check whether the Competition is still in draft.
          Draft competitions are not shown on the public list.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" type="button">
          Clear search
        </Button>
      </CardContent>
    </Card>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.08] px-4 py-3">
      <div className="text-xs text-nord-5">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-nord-6">{value}</div>
    </div>
  )
}

function SectionLabel({
  icon: Icon,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
}) {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-nord-6">
      <span className="grid size-8 place-items-center rounded-2xl bg-white/10 text-nord-8">
        <Icon className="size-4" />
      </span>
      {title}
    </div>
  )
}

function PrototypeSwitcher({
  current,
  onChange,
}: {
  current: VariantKey
  onChange: (variant: VariantKey) => void
}) {
  const go = React.useCallback(
    (direction: -1 | 1) => {
      const index = variantKeys.indexOf(current)
      const next = variantKeys[(index + direction + variantKeys.length) % variantKeys.length]
      onChange(next)
    },
    [current, onChange],
  )

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return
      }
      if (event.key === "ArrowLeft") go(-1)
      if (event.key === "ArrowRight") go(1)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [go])

  if (import.meta.env.PROD) return null

  return (
    <div className="prototype-bar fixed bottom-3 right-3 z-50 flex w-auto items-center justify-between gap-2 rounded-2xl px-2 py-2">
      <Button
        aria-label="Previous variant"
        className="size-9"
        size="icon"
        type="button"
        variant="dark"
        onClick={() => go(-1)}
      >
        <ChevronLeft className="size-4" />
      </Button>
      <div className="min-w-0 px-1 text-center text-sm">
        <div className="font-semibold">{current}</div>
      </div>
      <Button
        aria-label="Next variant"
        className="size-9"
        size="icon"
        type="button"
        variant="dark"
        onClick={() => go(1)}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  )
}

export default App
