"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Ban,
  Users,
  ShoppingBag,
  Store,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { adminAccounts, type PendingAccount, ApiRequestError } from "@/lib/api"
import useSWR from "swr"

const roleTabs = [
  { label: "All",     role: undefined },
  { label: "Buyers",  role: "buyer" },
  { label: "Sellers", role: "seller" },
]

function RowSkeleton() {
  return (
    <tr className="border-b border-border animate-pulse">
      {[1, 2, 3, 4, 5].map((i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </td>
      ))}
    </tr>
  )
}

function PendingBadge({ days, overdue }: { days: number; overdue: boolean }) {
  if (overdue) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-danger">
        <AlertTriangle className="w-3 h-3" />
        {days}d overdue
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs text-text-secondary">
      <Clock className="w-3 h-3" />
      {days}d waiting
    </span>
  )
}

export default function PendingAccountsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("All")
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 20

  const tab = roleTabs.find((t) => t.label === activeTab) ?? roleTabs[0]

  const { data, isLoading, error: swrError, mutate } = useSWR(
    ["admin-pending-accounts", tab.role, page],
    () => adminAccounts.listPending({ role: tab.role, page, page_size: PAGE_SIZE }),
    { refreshInterval: 30000 }
  )

  const items = data?.items ?? []
  const total = data?.total ?? 0
  const pages = data?.pages ?? 1

  const handleRowClick = (account: PendingAccount) => {
    if (account.roles.includes("buyer")) {
      router.push(`/admin/buyers/${account.id}`)
    } else if (account.roles.includes("seller")) {
      router.push(`/admin/sellers/${account.id}`)
    }
  }

  const overdueCount = items.filter((a) => a.overdue).length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Pending Approvals</h1>
          <p className="text-text-secondary text-sm mt-1">
            Review and approve new buyer and seller accounts before they get full system access.
          </p>
        </div>
        {total > 0 && (
          <div className="flex items-center gap-3">
            <Badge className="bg-ocean/10 text-ocean border-ocean/20">
              {total} pending
            </Badge>
            {overdueCount > 0 && (
              <Badge className="bg-danger/10 text-danger border-danger/20">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {overdueCount} overdue
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Info banner */}
      <div className="p-4 rounded-lg bg-ocean/5 border border-ocean/20 text-sm text-text-secondary">
        <p>
          <span className="font-medium text-text-primary">How it works:</span>{" "}
          New sign-ups stay here until approved. Only approved accounts appear in the main Users, Buyers, and Sellers lists.
          Accounts pending for 7+ days are flagged as overdue. Click any row to review the full profile and take action.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {roleTabs.map((t) => (
          <button
            key={t.label}
            onClick={() => { setActiveTab(t.label); setPage(1) }}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
              activeTab === t.label
                ? "border-ocean text-ocean"
                : "border-transparent text-text-secondary hover:text-text-primary"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Company / Name</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Email</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Role</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Activity</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Waiting</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && Array.from({ length: 5 }).map((_, i) => <RowSkeleton key={i} />)}
            {!isLoading && items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-text-secondary">
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-success" />
                  <p className="font-medium">No pending accounts</p>
                  <p className="text-xs mt-1">All accounts have been reviewed.</p>
                </td>
              </tr>
            )}
            {!isLoading && items.map((account) => (
              <tr
                key={account.id}
                onClick={() => handleRowClick(account)}
                className={cn(
                  "border-b border-border cursor-pointer transition-colors hover:bg-gray-50",
                  account.overdue && "bg-danger/5 hover:bg-danger/10"
                )}
              >
                <td className="px-4 py-3">
                  <div className="font-medium text-text-primary">
                    {account.company_name || account.full_name || "—"}
                  </div>
                  {account.company_name && account.full_name && (
                    <div className="text-xs text-text-secondary">{account.full_name}</div>
                  )}
                </td>
                <td className="px-4 py-3 text-text-secondary">{account.email}</td>
                <td className="px-4 py-3">
                  {account.roles.includes("buyer") && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-ocean bg-ocean/10 px-2 py-0.5 rounded-full">
                      <ShoppingBag className="w-3 h-3" />
                      Buyer
                    </span>
                  )}
                  {account.roles.includes("seller") && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <Store className="w-3 h-3" />
                      Seller
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-text-secondary">
                  {account.roles.includes("buyer") && account.pending_requests > 0 && (
                    <span className="text-xs">{account.pending_requests} purchase request{account.pending_requests > 1 ? "s" : ""}</span>
                  )}
                  {account.roles.includes("seller") && account.pending_listings > 0 && (
                    <span className="text-xs">{account.pending_listings} listing draft{account.pending_listings > 1 ? "s" : ""}</span>
                  )}
                  {account.pending_requests === 0 && account.pending_listings === 0 && (
                    <span className="text-xs text-text-secondary/60">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <PendingBadge days={account.pending_days} overdue={account.overdue} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <span>Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of {total}</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span>Page {page} of {pages}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page >= pages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
