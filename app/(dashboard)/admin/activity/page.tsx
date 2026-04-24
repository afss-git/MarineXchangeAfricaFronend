"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import {
  Search, Filter, Download, RefreshCw, User, Calendar,
  ChevronLeft, ChevronRight, X, Loader2, Activity,
  ShieldCheck, FileText, CreditCard, Package, Gavel,
  TrendingUp, Ship, Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { activityAdmin, ActivityLogItem, ActivityUser, exportCsv } from "@/lib/api"

// ── Category config ───────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "",            label: "All Activity",   icon: Activity },
  { id: "auth",        label: "Auth",           icon: ShieldCheck },
  { id: "deal",        label: "Deals",          icon: Ship },
  { id: "payment",     label: "Payments",       icon: CreditCard },
  { id: "document",    label: "Documents",      icon: FileText },
  { id: "kyc",         label: "KYC",            icon: User },
  { id: "purchase",    label: "Purchase Reqs",  icon: Package },
  { id: "auction",     label: "Auctions",       icon: Gavel },
  { id: "finance",     label: "Finance",        icon: TrendingUp },
  { id: "marketplace", label: "Marketplace",    icon: Globe },
]

// Action → colour mapping by prefix
function actionColor(action: string): string {
  if (action.startsWith("auth."))         return "bg-purple-100 text-purple-800 border-purple-200"
  if (action.startsWith("deal."))         return "bg-blue-100 text-blue-800 border-blue-200"
  if (action.startsWith("payment."))      return "bg-green-100 text-green-800 border-green-200"
  if (action.startsWith("document.") || action.startsWith("invoice."))
                                          return "bg-orange-100 text-orange-800 border-orange-200"
  if (action.startsWith("kyc."))          return "bg-yellow-100 text-yellow-800 border-yellow-200"
  if (action.startsWith("purchase."))     return "bg-cyan-100 text-cyan-800 border-cyan-200"
  if (action.startsWith("auction."))      return "bg-rose-100 text-rose-800 border-rose-200"
  if (action.startsWith("finance."))      return "bg-indigo-100 text-indigo-800 border-indigo-200"
  if (action.startsWith("product.") || action.startsWith("exchange_rate."))
                                          return "bg-teal-100 text-teal-800 border-teal-200"
  return "bg-gray-100 text-gray-700 border-gray-200"
}

function fmtTs(ts: string) {
  const d = new Date(ts)
  return d.toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  })
}

function tryPretty(raw: string | null) {
  if (!raw) return ""
  try {
    return JSON.stringify(JSON.parse(raw), null, 2)
  } catch {
    return raw
  }
}

// ── User picker ───────────────────────────────────────────────────────────────

function UserPicker({
  selected, onSelect,
}: {
  selected: ActivityUser | null
  onSelect: (u: ActivityUser | null) => void
}) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<ActivityUser[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const search = useCallback(async (q: string) => {
    setLoading(true)
    try {
      const res = await activityAdmin.searchUsers(q || undefined)
      setResults(res)
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (open) search(query)
  }, [open, query, search])

  const roleLabel = (roles: string[]) =>
    roles.includes("admin") ? "Admin"
    : roles.includes("finance_admin") ? "Finance Admin"
    : roles.includes("agent") ? "Agent"
    : roles.includes("seller") ? "Seller"
    : roles.includes("buyer") ? "Buyer"
    : "User"

  return (
    <div ref={ref} className="relative">
      {selected ? (
        <div className="flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-background text-sm">
          <User className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="font-medium">{selected.full_name || selected.email}</span>
          <span className="text-muted-foreground text-xs">{roleLabel(selected.roles)}</span>
          <button
            onClick={() => onSelect(null)}
            className="ml-auto text-muted-foreground hover:text-foreground"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <User className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-8 h-9 text-sm w-64"
            placeholder="All users…"
            value={query}
            onChange={e => { setQuery(e.target.value); setOpen(true) }}
            onFocus={() => setOpen(true)}
          />
        </div>
      )}

      {open && !selected && (
        <div className="absolute z-50 top-10 left-0 w-72 bg-background border border-border rounded-md shadow-lg max-h-64 overflow-y-auto">
          {loading ? (
            <div className="p-3 text-sm text-muted-foreground flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Searching…
            </div>
          ) : results.length === 0 ? (
            <div className="p-3 text-sm text-muted-foreground">No users found</div>
          ) : (
            results.map(u => (
              <button
                key={u.id}
                className="w-full text-left px-3 py-2 hover:bg-muted text-sm flex items-center justify-between"
                onClick={() => { onSelect(u); setOpen(false); setQuery("") }}
              >
                <div>
                  <div className="font-medium">{u.full_name || "(no name)"}</div>
                  <div className="text-xs text-muted-foreground">{u.email}</div>
                </div>
                <span className="text-xs text-muted-foreground ml-2">{roleLabel(u.roles)}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}

// ── Log row (expandable) ──────────────────────────────────────────────────────

function LogRow({ item }: { item: ActivityLogItem }) {
  const [expanded, setExpanded] = useState(false)
  const hasDetail = item.old_state || item.new_state || item.metadata

  return (
    <>
      <tr
        className={`border-b border-border text-sm hover:bg-muted/30 transition-colors ${hasDetail ? "cursor-pointer" : ""}`}
        onClick={() => hasDetail && setExpanded(e => !e)}
      >
        <td className="px-4 py-2.5 whitespace-nowrap text-muted-foreground font-mono text-xs">
          {fmtTs(item.timestamp)}
        </td>
        <td className="px-4 py-2.5">
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${actionColor(item.action)}`}>
            {item.action}
          </span>
        </td>
        <td className="px-4 py-2.5">
          <div className="font-medium text-xs">{item.actor_name || "—"}</div>
          {item.actor_email && (
            <div className="text-muted-foreground text-xs">{item.actor_email}</div>
          )}
        </td>
        <td className="px-4 py-2.5">
          {item.actor_role ? (
            <Badge variant="outline" className="text-xs capitalize">
              {item.actor_role.replace(/_/g, " ")}
            </Badge>
          ) : (
            <span className="text-muted-foreground text-xs">system</span>
          )}
        </td>
        <td className="px-4 py-2.5">
          <span className="text-xs text-muted-foreground">{item.resource_type}</span>
        </td>
        <td className="px-4 py-2.5">
          {hasDetail && (
            <span className="text-xs text-muted-foreground">
              {expanded ? "▲ hide" : "▼ details"}
            </span>
          )}
        </td>
      </tr>
      {expanded && hasDetail && (
        <tr className="bg-muted/20 border-b border-border">
          <td colSpan={6} className="px-4 py-3">
            <div className="grid grid-cols-3 gap-3 text-xs font-mono">
              {item.old_state && (
                <div>
                  <div className="text-muted-foreground mb-1 font-sans font-medium">old_state</div>
                  <pre className="bg-background border border-border rounded p-2 overflow-x-auto whitespace-pre-wrap text-xs leading-relaxed">
                    {tryPretty(item.old_state)}
                  </pre>
                </div>
              )}
              {item.new_state && (
                <div>
                  <div className="text-muted-foreground mb-1 font-sans font-medium">new_state</div>
                  <pre className="bg-background border border-border rounded p-2 overflow-x-auto whitespace-pre-wrap text-xs leading-relaxed">
                    {tryPretty(item.new_state)}
                  </pre>
                </div>
              )}
              {item.metadata && (
                <div>
                  <div className="text-muted-foreground mb-1 font-sans font-medium">metadata</div>
                  <pre className="bg-background border border-border rounded p-2 overflow-x-auto whitespace-pre-wrap text-xs leading-relaxed">
                    {tryPretty(item.metadata)}
                  </pre>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ActivityPage() {
  const [selectedUser, setSelectedUser] = useState<ActivityUser | null>(null)
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [useRange, setUseRange] = useState(false)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [data, setData] = useState<{ total: number; pages: number; items: ActivityLogItem[] } | null>(null)
  const [loading, setLoading] = useState(false)
  const [exporting, setExporting] = useState(false)

  const fetchLogs = useCallback(async (pg = page) => {
    setLoading(true)
    try {
      const res = await activityAdmin.getLogs({
        user_id: selectedUser?.id,
        date: !useRange && date ? date : undefined,
        date_from: useRange && dateFrom ? dateFrom : undefined,
        date_to: useRange && dateTo ? dateTo : undefined,
        category: category || undefined,
        search: search || undefined,
        page: pg,
        per_page: 50,
      })
      setData({ total: res.total, pages: res.pages, items: res.items })
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [selectedUser, category, date, dateFrom, dateTo, useRange, search, page])

  useEffect(() => {
    setPage(1)
    fetchLogs(1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser, category, date, dateFrom, dateTo, useRange, search])

  useEffect(() => {
    fetchLogs(page)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  async function handleExport() {
    setExporting(true)
    try {
      const qs = new URLSearchParams()
      if (selectedUser) qs.set("user_id", selectedUser.id)
      if (!useRange && date) qs.set("date", date)
      if (useRange && dateFrom) qs.set("date_from", dateFrom)
      if (useRange && dateTo) qs.set("date_to", dateTo)
      if (category) qs.set("category", category)
      const q = qs.toString() ? `?${qs}` : ""
      await exportCsv(`/admin/activity/export${q}`)
    } catch (e) {
      alert((e as Error)?.message ?? "Export failed")
    } finally {
      setExporting(false)
    }
  }

  function setQuickDate(days: number) {
    const d = new Date()
    d.setDate(d.getDate() - days)
    setDate(d.toISOString().slice(0, 10))
    setUseRange(false)
  }

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Activity Log</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Full audit trail — every action, every user, every event
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => fetchLogs(page)} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport} disabled={exporting}>
            {exporting
              ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
              : <Download className="w-4 h-4 mr-1.5" />}
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <div className="flex flex-wrap gap-3 items-end">
          {/* User picker */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">User</label>
            <UserPicker selected={selectedUser} onSelect={u => { setSelectedUser(u); setPage(1) }} />
          </div>

          {/* Date mode toggle */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Date mode</label>
            <div className="flex rounded-md border border-border overflow-hidden h-9">
              <button
                className={`px-3 text-sm transition-colors ${!useRange ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                onClick={() => setUseRange(false)}
              >
                Single day
              </button>
              <button
                className={`px-3 text-sm transition-colors ${useRange ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                onClick={() => setUseRange(true)}
              >
                Range
              </button>
            </div>
          </div>

          {/* Date inputs */}
          {!useRange ? (
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Date</label>
              <Input
                type="date"
                className="h-9 text-sm w-44"
                value={date}
                onChange={e => { setDate(e.target.value); setPage(1) }}
              />
            </div>
          ) : (
            <>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">From</label>
                <Input type="date" className="h-9 text-sm w-40" value={dateFrom}
                  onChange={e => { setDateFrom(e.target.value); setPage(1) }} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">To</label>
                <Input type="date" className="h-9 text-sm w-40" value={dateTo}
                  onChange={e => { setDateTo(e.target.value); setPage(1) }} />
              </div>
            </>
          )}

          {/* Quick date shortcuts */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Quick</label>
            <div className="flex gap-1">
              {[
                { label: "Today",     days: 0 },
                { label: "Yesterday", days: 1 },
                { label: "7 days",    days: 6 },
              ].map(q => (
                <button
                  key={q.label}
                  className="px-2.5 py-1.5 text-xs border border-border rounded hover:bg-muted transition-colors h-9"
                  onClick={() => { setPage(1); setQuickDate(q.days) }}
                >
                  {q.label}
                </button>
              ))}
              <button
                className="px-2.5 py-1.5 text-xs border border-border rounded hover:bg-muted transition-colors h-9 text-muted-foreground"
                onClick={() => { setDate(""); setDateFrom(""); setDateTo(""); setPage(1) }}
              >
                All time
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="space-y-1 flex-1 min-w-48">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Search action</label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-8 h-9 text-sm"
                placeholder="e.g. deal.accepted"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }}
              />
            </div>
          </div>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon
            const active = category === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => { setCategory(cat.id); setPage(1) }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border hover:bg-muted"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Active filters summary */}
      {(selectedUser || date || dateFrom || dateTo || category || search) && (
        <div className="flex flex-wrap gap-2 items-center text-sm">
          <span className="text-muted-foreground text-xs">Filtering by:</span>
          {selectedUser && (
            <span className="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-800 px-2.5 py-0.5 rounded-full text-xs">
              <User className="w-3 h-3" />
              {selectedUser.full_name || selectedUser.email}
              <button onClick={() => setSelectedUser(null)} className="ml-0.5"><X className="w-3 h-3" /></button>
            </span>
          )}
          {date && !useRange && (
            <span className="inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-800 px-2.5 py-0.5 rounded-full text-xs">
              <Calendar className="w-3 h-3" />
              {date}
              <button onClick={() => setDate("")}><X className="w-3 h-3" /></button>
            </span>
          )}
          {useRange && (dateFrom || dateTo) && (
            <span className="inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-800 px-2.5 py-0.5 rounded-full text-xs">
              <Calendar className="w-3 h-3" />
              {dateFrom || "…"} → {dateTo || "…"}
              <button onClick={() => { setDateFrom(""); setDateTo("") }}><X className="w-3 h-3" /></button>
            </span>
          )}
          {category && (
            <span className="inline-flex items-center gap-1 bg-purple-50 border border-purple-200 text-purple-800 px-2.5 py-0.5 rounded-full text-xs capitalize">
              <Filter className="w-3 h-3" />
              {CATEGORIES.find(c => c.id === category)?.label}
              <button onClick={() => setCategory("")}><X className="w-3 h-3" /></button>
            </span>
          )}
          {search && (
            <span className="inline-flex items-center gap-1 bg-orange-50 border border-orange-200 text-orange-800 px-2.5 py-0.5 rounded-full text-xs">
              <Search className="w-3 h-3" />
              "{search}"
              <button onClick={() => setSearch("")}><X className="w-3 h-3" /></button>
            </span>
          )}
        </div>
      )}

      {/* Results */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
          <span className="text-sm font-medium">
            {loading ? "Loading…" : `${data?.total ?? 0} events`}
          </span>
          {data && data.pages > 1 && (
            <div className="flex items-center gap-2 text-sm">
              <Button
                variant="ghost" size="icon"
                className="w-7 h-7"
                disabled={page <= 1 || loading}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-muted-foreground text-xs">
                Page {page} of {data.pages}
              </span>
              <Button
                variant="ghost" size="icon"
                className="w-7 h-7"
                disabled={page >= data.pages || loading}
                onClick={() => setPage(p => p + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading activity…</span>
          </div>
        ) : !data || data.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
            <Activity className="w-8 h-8 opacity-30" />
            <span className="text-sm">No activity found for the selected filters</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-medium text-muted-foreground uppercase tracking-wide border-b border-border">
                  <th className="px-4 py-2.5 text-left">Timestamp</th>
                  <th className="px-4 py-2.5 text-left">Action</th>
                  <th className="px-4 py-2.5 text-left">Actor</th>
                  <th className="px-4 py-2.5 text-left">Role</th>
                  <th className="px-4 py-2.5 text-left">Resource</th>
                  <th className="px-4 py-2.5 text-left">Detail</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map(item => (
                  <LogRow key={item.id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {data && data.pages > 1 && (
          <div className="flex items-center justify-center gap-2 px-4 py-3 border-t border-border">
            <Button variant="outline" size="sm" disabled={page <= 1 || loading} onClick={() => setPage(p => p - 1)}>
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              {page} / {data.pages}
            </span>
            <Button variant="outline" size="sm" disabled={page >= data.pages || loading} onClick={() => setPage(p => p + 1)}>
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
