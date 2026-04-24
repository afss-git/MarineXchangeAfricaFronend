"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Search, Download, RefreshCw, Calendar, X, Loader2,
  FileText, File, ShieldCheck, CreditCard, ChevronLeft,
  ChevronRight, FolderOpen, AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { documentsHub, DocHubItem } from "@/lib/api"

// ── Document type config ──────────────────────────────────────────────────────

const DOC_TYPES = [
  { id: "",                 label: "All Documents",    icon: FolderOpen,  color: "bg-gray-100 text-gray-700 border-gray-200" },
  { id: "deal_document",   label: "Deal Documents",   icon: FileText,    color: "bg-blue-100 text-blue-800 border-blue-200" },
  { id: "deal_invoice",    label: "Invoices",         icon: File,        color: "bg-green-100 text-green-800 border-green-200" },
  { id: "kyc_document",    label: "KYC Documents",    icon: ShieldCheck, color: "bg-purple-100 text-purple-800 border-purple-200" },
  { id: "payment_evidence",label: "Payment Evidence", icon: CreditCard,  color: "bg-orange-100 text-orange-800 border-orange-200" },
]

function typeColor(docType: string) {
  return DOC_TYPES.find(t => t.id === docType)?.color ?? "bg-gray-100 text-gray-700 border-gray-200"
}

function typeLabel(docType: string) {
  return DOC_TYPES.find(t => t.id === docType)?.label ?? docType
}

function fmtSize(bytes: number | null) {
  if (!bytes) return "—"
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function fmtDate(ts: string | null) {
  if (!ts) return "—"
  return new Date(ts).toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  })
}

// ── Download handler ─────────────────────────────────────────────────────────

async function downloadDoc(docType: string, docId: string) {
  try {
    const { url, file_name } = await documentsHub.getDownloadUrl(docType, docId)
    const a = document.createElement("a")
    a.href = url
    a.download = file_name
    a.target = "_blank"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  } catch (e) {
    alert((e as Error)?.message ?? "Download failed")
  }
}

// ── Document row ─────────────────────────────────────────────────────────────

function DocRow({ item }: { item: DocHubItem }) {
  const [downloading, setDownloading] = useState(false)

  async function handleDownload() {
    setDownloading(true)
    await downloadDoc(item.doc_type, item.id)
    setDownloading(false)
  }

  return (
    <tr className="border-b border-border text-sm hover:bg-muted/30 transition-colors">
      <td className="px-4 py-3">
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${typeColor(item.doc_type)}`}>
          {typeLabel(item.doc_type)}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="font-medium text-sm max-w-xs truncate" title={item.file_name}>
          {item.file_name}
        </div>
        {item.doc_category && item.doc_category !== item.doc_type && (
          <div className="text-xs text-muted-foreground capitalize mt-0.5">
            {item.doc_category.replace(/_/g, " ")}
          </div>
        )}
        {item.description && (
          <div className="text-xs text-muted-foreground mt-0.5 truncate max-w-xs">{item.description}</div>
        )}
      </td>
      <td className="px-4 py-3">
        {item.entity_ref ? (
          <div>
            <div className="text-xs font-mono font-medium">{item.entity_ref}</div>
            <div className="text-xs text-muted-foreground capitalize">{item.entity_type.replace(/_/g, " ")}</div>
          </div>
        ) : (
          <div>
            <div className="text-xs font-mono text-muted-foreground truncate max-w-[120px]">{item.entity_id.slice(0, 8)}…</div>
            <div className="text-xs text-muted-foreground capitalize">{item.entity_type.replace(/_/g, " ")}</div>
          </div>
        )}
      </td>
      <td className="px-4 py-3">
        <div className="text-xs font-medium">{item.uploader_name || "—"}</div>
        {item.uploader_email && (
          <div className="text-xs text-muted-foreground">{item.uploader_email}</div>
        )}
      </td>
      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
        {fmtSize(item.file_size_bytes)}
      </td>
      <td className="px-4 py-3">
        {item.status ? (
          <Badge variant="outline" className="text-xs capitalize">{item.status}</Badge>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        )}
      </td>
      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
        {fmtDate(item.created_at)}
      </td>
      <td className="px-4 py-3">
        <Button
          variant="ghost" size="sm"
          className="h-7 px-2 text-xs"
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading
            ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
            : <Download className="w-3.5 h-3.5" />}
        </Button>
      </td>
    </tr>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function DocumentsHubPage() {
  const [docType, setDocType] = useState("")
  const [date, setDate] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [useRange, setUseRange] = useState(false)
  const [search, setSearch] = useState("")
  const [entityId, setEntityId] = useState("")
  const [page, setPage] = useState(1)
  const [data, setData] = useState<{ total: number; pages: number; items: DocHubItem[] } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchDocs = useCallback(async (pg = page) => {
    setLoading(true)
    setError("")
    try {
      const res = await documentsHub.list({
        doc_type: docType || undefined,
        entity_id: entityId || undefined,
        search: search || undefined,
        date: !useRange && date ? date : undefined,
        date_from: useRange && dateFrom ? dateFrom : undefined,
        date_to: useRange && dateTo ? dateTo : undefined,
        page: pg,
        per_page: 50,
      })
      setData({ total: res.total, pages: res.pages, items: res.items })
    } catch (e) {
      setError((e as Error)?.message ?? "Failed to load documents")
    } finally {
      setLoading(false)
    }
  }, [docType, entityId, search, date, dateFrom, dateTo, useRange, page])

  useEffect(() => {
    setPage(1)
    fetchDocs(1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docType, entityId, search, date, dateFrom, dateTo, useRange])

  useEffect(() => { fetchDocs(page) }, [page]) // eslint-disable-line react-hooks/exhaustive-deps

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
          <h1 className="text-2xl font-semibold">Documents Hub</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            All documents — deal files, invoices, KYC submissions, payment evidence
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => fetchDocs(page)} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <div className="flex flex-wrap gap-3 items-end">
          {/* Entity ID search */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Deal / Entity ID</label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-8 h-9 text-sm w-72"
                placeholder="Paste deal ID or submission ID…"
                value={entityId}
                onChange={e => { setEntityId(e.target.value.trim()); setPage(1) }}
              />
              {entityId && (
                <button className="absolute right-2 top-2.5" onClick={() => setEntityId("")}>
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>

          {/* File name search */}
          <div className="space-y-1 flex-1 min-w-40">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">File Name</label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-8 h-9 text-sm"
                placeholder="Search by filename…"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }}
              />
            </div>
          </div>

          {/* Date mode */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Date mode</label>
            <div className="flex rounded-md border border-border overflow-hidden h-9">
              <button
                className={`px-3 text-sm transition-colors ${!useRange ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                onClick={() => setUseRange(false)}
              >Single day</button>
              <button
                className={`px-3 text-sm transition-colors ${useRange ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                onClick={() => setUseRange(true)}
              >Range</button>
            </div>
          </div>

          {/* Date inputs */}
          {!useRange ? (
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Date</label>
              <Input type="date" className="h-9 text-sm w-44" value={date}
                onChange={e => { setDate(e.target.value); setPage(1) }} />
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

          {/* Quick dates */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Quick</label>
            <div className="flex gap-1">
              {[{ l: "Today", d: 0 }, { l: "Yesterday", d: 1 }, { l: "7 days", d: 6 }].map(q => (
                <button key={q.l}
                  className="px-2.5 py-1.5 text-xs border border-border rounded hover:bg-muted transition-colors h-9"
                  onClick={() => { setPage(1); setQuickDate(q.d) }}
                >{q.l}</button>
              ))}
              <button
                className="px-2.5 py-1.5 text-xs border border-border rounded hover:bg-muted transition-colors h-9 text-muted-foreground"
                onClick={() => { setDate(""); setDateFrom(""); setDateTo(""); setPage(1) }}
              >All time</button>
            </div>
          </div>
        </div>

        {/* Type chips */}
        <div className="flex flex-wrap gap-2">
          {DOC_TYPES.map(t => {
            const Icon = t.icon
            const active = docType === t.id
            return (
              <button key={t.id} onClick={() => { setDocType(t.id); setPage(1) }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  active ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:bg-muted"
                }`}>
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Active filter pills */}
      {(entityId || date || dateFrom || dateTo || docType || search) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-muted-foreground">Filtering by:</span>
          {entityId && (
            <span className="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-800 px-2.5 py-0.5 rounded-full text-xs">
              Entity: {entityId.slice(0, 8)}…
              <button onClick={() => setEntityId("")}><X className="w-3 h-3" /></button>
            </span>
          )}
          {docType && (
            <span className="inline-flex items-center gap-1 bg-purple-50 border border-purple-200 text-purple-800 px-2.5 py-0.5 rounded-full text-xs">
              {typeLabel(docType)}
              <button onClick={() => setDocType("")}><X className="w-3 h-3" /></button>
            </span>
          )}
          {date && !useRange && (
            <span className="inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-800 px-2.5 py-0.5 rounded-full text-xs">
              <Calendar className="w-3 h-3" />{date}
              <button onClick={() => setDate("")}><X className="w-3 h-3" /></button>
            </span>
          )}
          {useRange && (dateFrom || dateTo) && (
            <span className="inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-800 px-2.5 py-0.5 rounded-full text-xs">
              <Calendar className="w-3 h-3" />{dateFrom || "…"} → {dateTo || "…"}
              <button onClick={() => { setDateFrom(""); setDateTo("") }}><X className="w-3 h-3" /></button>
            </span>
          )}
          {search && (
            <span className="inline-flex items-center gap-1 bg-orange-50 border border-orange-200 text-orange-800 px-2.5 py-0.5 rounded-full text-xs">
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
            {loading ? "Loading…" : `${data?.total ?? 0} documents`}
          </span>
          {data && data.pages > 1 && (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="w-7 h-7"
                disabled={page <= 1 || loading} onClick={() => setPage(p => p - 1)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-xs text-muted-foreground">Page {page} of {data.pages}</span>
              <Button variant="ghost" size="icon" className="w-7 h-7"
                disabled={page >= data.pages || loading} onClick={() => setPage(p => p + 1)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 px-4 py-3 text-sm text-red-600 bg-red-50">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading documents…</span>
          </div>
        ) : !data || data.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
            <FolderOpen className="w-8 h-8 opacity-30" />
            <span className="text-sm">No documents found for the selected filters</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-medium text-muted-foreground uppercase tracking-wide border-b border-border">
                  <th className="px-4 py-2.5 text-left">Type</th>
                  <th className="px-4 py-2.5 text-left">File</th>
                  <th className="px-4 py-2.5 text-left">Entity</th>
                  <th className="px-4 py-2.5 text-left">Uploaded By</th>
                  <th className="px-4 py-2.5 text-left">Size</th>
                  <th className="px-4 py-2.5 text-left">Status</th>
                  <th className="px-4 py-2.5 text-left">Date</th>
                  <th className="px-4 py-2.5 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {data.items.map(item => <DocRow key={`${item.doc_type}-${item.id}`} item={item} />)}
              </tbody>
            </table>
          </div>
        )}

        {data && data.pages > 1 && (
          <div className="flex items-center justify-center gap-2 px-4 py-3 border-t border-border">
            <Button variant="outline" size="sm" disabled={page <= 1 || loading} onClick={() => setPage(p => p - 1)}>
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous
            </Button>
            <span className="text-sm text-muted-foreground">{page} / {data.pages}</span>
            <Button variant="outline" size="sm" disabled={page >= data.pages || loading} onClick={() => setPage(p => p + 1)}>
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
