"use client"

import { useEffect, useRef, useState } from "react"
import { X, Bell, Ship, ShieldCheck, CreditCard, Package, Gavel, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { notifications as notifApi } from "@/lib/api"

interface ToastItem {
  id: string
  title: string
  body: string
  category: string
}

function CategoryIcon({ cat }: { cat: string }) {
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

function categoryBorder(cat: string) {
  switch (cat) {
    case "deal":             return "border-l-blue-500"
    case "kyc":              return "border-l-yellow-500"
    case "payment":          return "border-l-green-500"
    case "purchase_request": return "border-l-cyan-500"
    case "auction":          return "border-l-rose-500"
    case "marketplace":      return "border-l-teal-500"
    default:                 return "border-l-ocean"
  }
}

// ── Single toast card ─────────────────────────────────────────────────────────

function Toast({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 6000)
    return () => clearTimeout(t)
  }, [onDismiss])

  return (
    <div
      className={cn(
        "relative flex items-start gap-3 w-80 bg-white rounded-xl shadow-lg border border-border border-l-4 px-4 py-3.5 animate-in slide-in-from-right-full duration-300",
        categoryBorder(item.category)
      )}
    >
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5 text-text-secondary">
        <CategoryIcon cat={item.category} />
      </div>
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-sm font-semibold text-text-primary leading-snug">{item.title}</p>
        <p className="text-xs text-text-secondary mt-0.5 leading-relaxed line-clamp-2">{item.body}</p>
      </div>
      <button
        onClick={onDismiss}
        className="absolute top-2.5 right-2.5 p-1 rounded-md hover:bg-gray-100 transition-colors text-text-secondary"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

// ── Toast provider — poll unread count, flash on new notifications ────────────

const POLL_INTERVAL = 30_000 // 30 seconds

export function NotificationToastProvider() {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const prevCount = useRef<number | null>(null)

  useEffect(() => {
    let cancelled = false

    const poll = async () => {
      if (cancelled) return
      try {
        const { unread_count } = await notifApi.unreadCount()
        if (
          prevCount.current !== null &&
          unread_count > prevCount.current
        ) {
          // Fetch the latest notification(s) to show in toast
          const res = await notifApi.list({ page: 1, page_size: unread_count - prevCount.current, unread_only: true })
          for (const n of res.items.slice(0, 3)) {
            const toast: ToastItem = { id: n.id, title: n.title, body: n.body, category: n.category }
            setToasts(prev => {
              if (prev.some(t => t.id === toast.id)) return prev
              return [...prev, toast]
            })
          }
        }
        prevCount.current = unread_count
      } catch { /* silent — never crash the app */ }
    }

    // Initial poll
    poll()
    const interval = setInterval(poll, POLL_INTERVAL)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  const dismiss = (id: string) => setToasts(prev => prev.filter(t => t.id !== id))

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-5 right-5 z-[200] flex flex-col gap-2.5 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className="pointer-events-auto">
          <Toast item={t} onDismiss={() => dismiss(t.id)} />
        </div>
      ))}
    </div>
  )
}
