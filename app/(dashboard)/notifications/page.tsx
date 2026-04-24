"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Bell, CheckCheck, RefreshCw, Loader2, ChevronLeft, ChevronRight,
  Ship, ShieldCheck, CreditCard, Package, Gavel, Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { notifications as notifApi, type Notification } from "@/lib/api"

function categoryIcon(cat: string) {
  switch (cat) {
    case "deal":             return <Ship className="w-4 h-4" />
    case "kyc":              return <ShieldCheck className="w-4 h-4" />
    case "payment":          return <CreditCard className="w-4 h-4" />
    case "purchase_request": return <Package className="w-4 h-4" />
    case "auction":          return <Gavel className="w-4 h-4" />
    case "marketplace":      return <Globe className="w-4 h-4" />
    default:                 return <Bell className="w-4 h-4" />
  }
}

function categoryColor(cat: string) {
  switch (cat) {
    case "deal":             return "bg-blue-100 text-blue-600"
    case "kyc":              return "bg-yellow-100 text-yellow-600"
    case "payment":          return "bg-green-100 text-green-600"
    case "purchase_request": return "bg-cyan-100 text-cyan-600"
    case "auction":          return "bg-rose-100 text-rose-600"
    case "marketplace":      return "bg-teal-100 text-teal-600"
    default:                 return "bg-gray-100 text-gray-600"
  }
}

function fmtRelative(ts: string) {
  const diff = Date.now() - new Date(ts).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return new Date(ts).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

function NotifRow({ item, onRead }: { item: Notification; onRead: (id: string) => void }) {
  const [marking, setMarking] = useState(false)

  const handleMark = async () => {
    if (item.is_read) return
    setMarking(true)
    try {
      await notifApi.markRead(item.id)
      onRead(item.id)
    } catch { /* silent */ }
    setMarking(false)
  }

  return (
    <div
      className={cn(
        "flex items-start gap-4 px-5 py-4 border-b border-border transition-colors cursor-pointer hover:bg-muted/30",
        !item.is_read && "bg-ocean/3 hover:bg-ocean/6"
      )}
      onClick={handleMark}
    >
      <div className={cn("w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5", categoryColor(item.category))}>
        {categoryIcon(item.category)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={cn("text-sm leading-snug", !item.is_read ? "font-semibold text-text-primary" : "font-medium text-text-primary")}>
            {item.title}
          </p>
          <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0 mt-0.5">{fmtRelative(item.created_at)}</span>
        </div>
        <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{item.body}</p>
        {!item.is_read && (
          <div className="flex items-center gap-1 mt-1.5">
            <div className="w-2 h-2 rounded-full bg-ocean" />
            <span className="text-xs text-ocean font-medium">
              {marking ? "Marking read…" : "Click to mark as read"}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function NotificationsPage() {
  const [page, setPage] = useState(1)
  const [unreadOnly, setUnreadOnly] = useState(false)
  const [data, setData] = useState<{ items: Notification[]; total: number; unread_count: number; pages: number } | null>(null)
  const [loading, setLoading] = useState(false)
  const [markingAll, setMarkingAll] = useState(false)

  const PAGE_SIZE = 20

  const fetchNotifs = useCallback(async (pg: number) => {
    setLoading(true)
    try {
      const res = await notifApi.list({ page: pg, page_size: PAGE_SIZE, unread_only: unreadOnly || undefined })
      setData({ items: res.items, total: res.total, unread_count: res.unread_count, pages: res.pages })
    } catch { /* silent */ }
    setLoading(false)
  }, [unreadOnly])

  useEffect(() => { setPage(1); fetchNotifs(1) }, [unreadOnly, fetchNotifs])
  useEffect(() => { fetchNotifs(page) }, [page, fetchNotifs])

  const handleRead = (id: string) => {
    setData(prev => prev ? {
      ...prev,
      unread_count: Math.max(0, prev.unread_count - 1),
      items: prev.items.map(n => n.id === id ? { ...n, is_read: true } : n),
    } : prev)
  }

  const handleMarkAll = async () => {
    setMarkingAll(true)
    try {
      await notifApi.markAllRead()
      fetchNotifs(page)
    } catch { /* silent */ }
    setMarkingAll(false)
  }

  const unreadCount = data?.unread_count ?? 0
  const pages = data?.pages ?? 1

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-muted-foreground mt-0.5">
              {unreadCount} unread {unreadCount === 1 ? "notification" : "notifications"}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => fetchNotifs(page)} disabled={loading}>
            <RefreshCw className={cn("w-4 h-4 mr-1.5", loading && "animate-spin")} />
            Refresh
          </Button>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={handleMarkAll} disabled={markingAll}>
              {markingAll ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <CheckCheck className="w-4 h-4 mr-1.5" />}
              Mark all read
            </Button>
          )}
        </div>
      </div>

      <div className="flex gap-1 border-b border-border">
        {[{ label: "All", value: false }, { label: "Unread", value: true }].map(t => (
          <button
            key={String(t.value)}
            onClick={() => setUnreadOnly(t.value)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
              unreadOnly === t.value
                ? "border-ocean text-ocean"
                : "border-transparent text-text-secondary hover:text-text-primary"
            )}
          >
            {t.label}
            {t.value && unreadCount > 0 && (
              <span className="ml-2 px-1.5 py-0.5 rounded text-xs font-medium bg-danger text-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-2 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading…</span>
          </div>
        ) : !data || data.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-2 text-muted-foreground">
            <Bell className="w-10 h-10 opacity-20" />
            <p className="text-sm">{unreadOnly ? "No unread notifications" : "No notifications yet"}</p>
          </div>
        ) : (
          <>
            {data.items.map(item => (
              <NotifRow key={item.id} item={item} onRead={handleRead} />
            ))}
            {pages > 1 && (
              <div className="flex items-center justify-center gap-2 px-4 py-3 border-t border-border">
                <Button variant="outline" size="sm" disabled={page <= 1 || loading} onClick={() => setPage(p => p - 1)}>
                  <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                </Button>
                <span className="text-sm text-muted-foreground">{page} / {pages}</span>
                <Button variant="outline" size="sm" disabled={page >= pages || loading} onClick={() => setPage(p => p + 1)}>
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {unreadCount === 0 && !unreadOnly && data && data.items.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-success px-1">
          <CheckCheck className="w-4 h-4" />
          All caught up!
        </div>
      )}
    </div>
  )
}
