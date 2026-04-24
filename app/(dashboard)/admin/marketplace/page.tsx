"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Store, Clock, CheckCircle2, XCircle, Eye, RefreshCw, Search,
  AlertCircle, Loader2, Package, ChevronDown, ChevronUp,
  UserCheck, AlertTriangle, Ban, FileText, PhoneCall, Trash2,
  CalendarClock, ClipboardCheck, ThumbsUp, ThumbsDown, HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import {
  marketplaceAdmin, admin, verificationAgent,
  AdminProductListItem, AdminProductDetail,
  AdminProductDecision, AdminUserItem,
  VerificationAssignmentDetail,
} from "@/lib/api"
import { useAdminListings } from "@/lib/hooks"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

// ── Helpers ────────────────────────────────────────────────────────────────────

function fmtDate(iso: string | null) {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  })
}

function ErrorBar({ msg }: { msg: string }) {
  return (
    <div className="flex items-center gap-2 p-4 bg-danger/10 border border-danger/20 rounded-xl text-danger text-sm">
      <AlertCircle className="w-4 h-4 shrink-0" />{msg}
    </div>
  )
}

// ── Status config ──────────────────────────────────────────────────────────────

const STATUS_CFG: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  draft:               { label: "Draft",              className: "bg-gray-100 text-gray-600 border-gray-200",     icon: Clock },
  submitted:           { label: "Submitted",          className: "bg-warning/10 text-warning border-warning/20",  icon: Clock },
  pending_verification:{ label: "Pending Verify",     className: "bg-ocean/10 text-ocean border-ocean/20",        icon: Eye },
  under_verification:  { label: "Verifying",          className: "bg-ocean/10 text-ocean border-ocean/20",        icon: Eye },
  pending_approval:    { label: "Pending Approval",   className: "bg-warning/10 text-warning border-warning/20",  icon: AlertTriangle },
  approved:            { label: "Approved",           className: "bg-success/10 text-success border-success/20",  icon: CheckCircle2 },
  active:              { label: "Active",             className: "bg-success/10 text-success border-success/20",  icon: CheckCircle2 },
  rejected:            { label: "Rejected",           className: "bg-danger/10 text-danger border-danger/20",     icon: XCircle },
  delisted:            { label: "Delisted",           className: "bg-gray-100 text-gray-500 border-gray-200",     icon: Ban },
  corrections_needed:  { label: "Needs Corrections",  className: "bg-orange-50 text-orange-600 border-orange-200", icon: AlertCircle },
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CFG[status] ?? { label: status, className: "bg-gray-100 text-gray-600 border-gray-200", icon: Clock }
  const Icon = cfg.icon
  return (
    <Badge className={cn("text-xs border gap-1 capitalize", cfg.className)}>
      <Icon className="w-3 h-3" />{cfg.label}
    </Badge>
  )
}

// ── Verification progress steps ────────────────────────────────────────────────

const VERIF_STEPS: { key: string; label: string; icon: React.ElementType }[] = [
  { key: "assigned",             label: "Assigned",            icon: UserCheck },
  { key: "contacted",            label: "Contacted",           icon: PhoneCall },
  { key: "inspection_scheduled", label: "Inspection Scheduled", icon: CalendarClock },
  { key: "inspection_done",      label: "Inspection Done",     icon: ClipboardCheck },
  { key: "report_submitted",     label: "Report Submitted",    icon: FileText },
]

const STEP_ORDER = VERIF_STEPS.map((s) => s.key)

function VerificationSteps({ status }: { status: string }) {
  const currentIdx = STEP_ORDER.indexOf(status)
  return (
    <div className="flex items-center gap-0">
      {VERIF_STEPS.map((step, idx) => {
        const done    = idx <= currentIdx
        const current = idx === currentIdx
        const Icon    = step.icon
        return (
          <div key={step.key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors",
                done
                  ? "bg-ocean border-ocean text-white"
                  : "bg-white border-gray-200 text-gray-300"
              )}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className={cn(
                "text-[10px] text-center leading-tight w-16",
                current ? "text-ocean font-semibold" : done ? "text-text-secondary" : "text-gray-300"
              )}>
                {step.label}
              </span>
            </div>
            {idx < VERIF_STEPS.length - 1 && (
              <div className={cn(
                "h-0.5 flex-1 mx-1 mb-4 rounded-full transition-colors",
                idx < currentIdx ? "bg-ocean" : "bg-gray-200"
              )} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function VerificationReportCard({ report }: { report: import("@/lib/api").VerificationReportOut }) {
  const OUTCOME_CFG = {
    approve:             { label: "Recommend Approve", icon: ThumbsUp,    className: "text-success bg-success/10 border-success/20" },
    reject:              { label: "Recommend Reject",  icon: ThumbsDown,  className: "text-danger bg-danger/10 border-danger/20" },
    request_corrections: { label: "Needs Corrections", icon: HelpCircle,  className: "text-warning bg-warning/10 border-warning/20" },
  } as const
  const cfg = OUTCOME_CFG[report.recommendation as keyof typeof OUTCOME_CFG]
  const Icon = cfg?.icon ?? HelpCircle

  return (
    <div className="rounded-xl border border-border bg-white overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-border flex items-center justify-between">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Verification Report</p>
        <span className={cn("flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border", cfg?.className)}>
          <Icon className="w-3 h-3" />{cfg?.label ?? report.recommendation}
        </span>
      </div>
      <div className="p-4 space-y-3 text-sm">
        {report.condition_confirmed && (
          <div>
            <p className="text-xs text-text-secondary font-medium mb-0.5">Condition Confirmed</p>
            <p className="text-text-primary">{report.condition_confirmed}</p>
          </div>
        )}
        {report.price_assessment && (
          <div>
            <p className="text-xs text-text-secondary font-medium mb-0.5">Price Assessment</p>
            <p className="text-text-primary">{report.price_assessment}</p>
          </div>
        )}
        <div>
          <p className="text-xs text-text-secondary font-medium mb-0.5">Documentation</p>
          <p className={cn("font-medium", report.documentation_complete ? "text-success" : "text-danger")}>
            {report.documentation_complete ? "Complete" : "Incomplete"}
          </p>
        </div>
        <div>
          <p className="text-xs text-text-secondary font-medium mb-0.5">Agent Notes</p>
          <p className="text-text-primary whitespace-pre-line leading-relaxed">{report.notes}</p>
        </div>
        <p className="text-xs text-text-secondary">
          Submitted {new Date(report.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
        </p>
      </div>
    </div>
  )
}

// ── Inline document viewer ─────────────────────────────────────────────────────

function fmtBytes(n: number | null) {
  if (!n) return null
  return n < 1024 * 1024 ? `${Math.round(n / 1024)} KB` : `${(n / (1024 * 1024)).toFixed(1)} MB`
}

function DocRow({ doc, watermark }: { doc: import("@/lib/api").ProductDocument | import("@/lib/api").VerificationEvidenceFile; watermark?: boolean }) {
  const [open, setOpen]       = useState(false)
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const isPdf   = ("mime_type" in doc ? doc.mime_type : null)?.startsWith("application/pdf") ?? doc.signed_url.includes(".pdf")
  const isImage = ("mime_type" in doc ? doc.mime_type : null)?.startsWith("image/") ?? ("file_type" in doc && doc.file_type === "image")
  const mimeType = ("mime_type" in doc ? doc.mime_type : null) ?? (isPdf ? "application/pdf" : isImage ? "image/jpeg" : "application/octet-stream")
  const name     = ("original_name" in doc ? doc.original_name : null) ?? ("description" in doc ? doc.description : null) ?? "Document"
  const size     = "file_size_bytes" in doc ? fmtBytes(doc.file_size_bytes ?? null) : null

  // Fetch raw bytes and build a blob URL with explicit MIME type.
  // This bypasses incorrect Content-Type headers on the Supabase signed URL.
  async function getOrCreateBlobUrl(): Promise<string> {
    if (blobUrl) return blobUrl
    setLoading(true)
    try {
      const res = await fetch(doc.signed_url)
      const bytes = await res.arrayBuffer()
      const blob = new Blob([bytes], { type: mimeType })
      const url = URL.createObjectURL(blob)
      setBlobUrl(url)
      return url
    } finally {
      setLoading(false)
    }
  }

  async function handlePreview() {
    if (!open) await getOrCreateBlobUrl()
    setOpen((v) => !v)
  }

  async function handleOpenNew() {
    const url = await getOrCreateBlobUrl()
    window.open(url, "_blank")
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="flex items-center gap-3 p-2.5 bg-gray-50 hover:bg-gray-100 transition-colors">
        <FileText className="w-4 h-4 text-ocean shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text-primary truncate">{name}</p>
          {size && <p className="text-xs text-text-secondary">{size}</p>}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleOpenNew} disabled={loading}
            className="text-xs text-ocean hover:underline px-2 py-1 disabled:opacity-50">
            {loading ? "…" : "Open ↗"}
          </button>
          {(isPdf || isImage) && (
            <button onClick={handlePreview} disabled={loading}
              className="text-xs text-text-secondary hover:text-text-primary px-2 py-1 border-l border-border disabled:opacity-50">
              {loading ? "Loading…" : open ? "Hide" : "Preview"}
            </button>
          )}
        </div>
      </div>
      {open && blobUrl && isPdf && (
        <div className="relative bg-gray-800" style={{ height: 520 }}>
          {watermark && (
            <div className="absolute inset-0 pointer-events-none z-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='100'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='14' fill='rgba(255,255,255,0.18)' transform='rotate(-30,150,50)' font-family='sans-serif' font-weight='bold'%3EFOR VERIFICATION ONLY%3C/text%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }} />
          )}
          <object
            data={blobUrl}
            type="application/pdf"
            className="w-full h-full border-0"
            style={{ opacity: watermark ? 0.75 : 1 }}
          >
            <p className="text-white text-sm p-4">
              PDF cannot be displayed.{" "}
              <button onClick={handleOpenNew} className="underline">Open in new tab</button>
            </p>
          </object>
        </div>
      )}
      {open && blobUrl && isImage && (
        <div className="p-3 bg-gray-900 flex items-center justify-center" style={{ maxHeight: 400 }}>
          <img src={blobUrl} alt={name} className="max-w-full max-h-80 object-contain rounded" />
        </div>
      )}
    </div>
  )
}

function SellerDocViewer({ docs, label, watermark }: {
  docs: (import("@/lib/api").ProductDocument | import("@/lib/api").VerificationEvidenceFile)[]
  label: string
  watermark?: boolean
}) {
  if (!docs.length) return null
  return (
    <div className="px-5 pb-4 border-t border-border pt-4">
      <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">
        {label} ({docs.length})
      </p>
      <div className="space-y-2">
        {docs.map((doc) => <DocRow key={doc.id} doc={doc} watermark={watermark} />)}
      </div>
    </div>
  )
}

// ── Product detail panel ───────────────────────────────────────────────────────

function ProductPanel({ item, onActioned }: {
  item: AdminProductListItem
  onActioned: () => void
}) {
  const [detail, setDetail]     = useState<AdminProductDetail | null>(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)

  // Verification assignment
  const [assignment, setAssignment]         = useState<VerificationAssignmentDetail | null>(null)
  const [assignmentLoading, setAssignmentLoading] = useState(false)
  const [showReport, setShowReport]         = useState(false)

  // Assign agent
  const [agentId, setAgentId]           = useState("")
  const [agents, setAgents]             = useState<AdminUserItem[]>([])
  const [assigning, setAssigning]       = useState(false)
  const [assignError, setAssignError]   = useState<string | null>(null)
  const [assigned, setAssigned]         = useState(false)

  // Decision
  const [decision, setDecision]         = useState<AdminProductDecision["decision"]>("approve")
  const [reason, setReason]             = useState("")
  const [adminNotes, setAdminNotes]     = useState("")
  const [deciding, setDeciding]         = useState(false)
  const [decideError, setDecideError]   = useState<string | null>(null)
  const [decided, setDecided]           = useState(false)

  // Delist
  const [delistReason, setDelistReason] = useState("")
  const [delisting, setDelisting]       = useState(false)
  const [delistError, setDelistError]   = useState<string | null>(null)
  const [delisted, setDelisted]         = useState(false)

  // Relist
  const [relisting, setRelisting]       = useState(false)
  const [relistError, setRelistError]   = useState<string | null>(null)
  const [relisted, setRelisted]         = useState(false)

  // Delete
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting]           = useState(false)
  const [deleteError, setDeleteError]     = useState<string | null>(null)

  useEffect(() => {
    marketplaceAdmin.get(item.id)
      .then((d) => {
        setDetail(d)
        // Load assignment detail if one exists
        if (d.verification_assignment_id) {
          setAssignmentLoading(true)
          verificationAgent.getAssignment(d.verification_assignment_id)
            .then(setAssignment)
            .catch(() => {/* non-critical */})
            .finally(() => setAssignmentLoading(false))
        }
      })
      .catch((e) => setError(e.message ?? "Failed to load product"))
      .finally(() => setLoading(false))
    // Load verification agents for the dropdown
    admin.listUsers({ role: "verification_agent", is_active: true, page_size: 100 })
      .then((res) => setAgents(res.items ?? []))
      .catch(() => {/* non-critical */})
  }, [item.id])

  async function handleAssignAgent() {
    if (!agentId) { setAssignError("Please select an agent."); return }
    setAssigning(true); setAssignError(null)
    try {
      await marketplaceAdmin.assignAgent(item.id, agentId.trim())
      setAssigned(true); onActioned()
    } catch (e: unknown) { setAssignError((e as Error)?.message ?? "Failed to assign agent") }
    finally { setAssigning(false) }
  }

  async function handleDecide() {
    if ((decision === "reject" || decision === "request_corrections") && !reason.trim()) {
      setDecideError("Reason is required for rejection / corrections."); return
    }
    setDeciding(true); setDecideError(null)
    try {
      await marketplaceAdmin.decide(item.id, {
        decision,
        ...(reason.trim()     ? { reason: reason.trim() }          : {}),
        ...(adminNotes.trim() ? { admin_notes: adminNotes.trim() } : {}),
      })
      setDecided(true); onActioned()
    } catch (e: unknown) { setDecideError((e as Error)?.message ?? "Failed to submit decision") }
    finally { setDeciding(false) }
  }

  async function handleDelist() {
    setDelisting(true); setDelistError(null)
    try {
      await marketplaceAdmin.delist(item.id, delistReason.trim() || undefined)
      setDelisted(true); onActioned()
    } catch (e: unknown) { setDelistError((e as Error)?.message ?? "Failed to delist") }
    finally { setDelisting(false) }
  }

  async function handleRelist() {
    setRelisting(true); setRelistError(null)
    try {
      await marketplaceAdmin.relist(item.id)
      setRelisted(true); onActioned()
    } catch (e: unknown) { setRelistError((e as Error)?.message ?? "Failed to re-list") }
    finally { setRelisting(false) }
  }

  async function handleDelete() {
    setDeleting(true); setDeleteError(null)
    try {
      await marketplaceAdmin.deleteProduct(item.id)
      onActioned()
    } catch (e: unknown) { setDeleteError((e as Error)?.message ?? "Failed to delete listing"); setConfirmDelete(false) }
    finally { setDeleting(false) }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-10 gap-2 text-text-secondary text-sm border-t border-border">
      <Loader2 className="w-4 h-4 animate-spin" /> Loading…
    </div>
  )
  if (error) return <div className="p-5 border-t border-border"><ErrorBar msg={error} /></div>
  if (!detail) return null

  const canDecide  = ["pending_approval"].includes(detail.status)
  const canAssign  = ["submitted", "pending_verification"].includes(detail.status)
  const canDelist  = ["active", "approved"].includes(detail.status)
  const canRelist  = detail.status === "delisted"

  return (
    <div className="border-t border-border">
      {/* Product details grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-5 py-4 bg-gray-50/50 text-sm">
        {[
          ["Seller", detail.seller_company ?? "—"],
          ["Seller Email", detail.seller_email ?? "—"],
          ["Seller Phone", detail.seller_phone ?? "—"],
          ["Asking Price", `${parseFloat(detail.asking_price).toLocaleString()} ${detail.currency}`],
          ["Condition", detail.condition.replace(/_/g, " ")],
          ["Availability", detail.availability_type.replace(/_/g, " ")],
          ["Location", `${detail.location_country}${detail.location_port ? `, ${detail.location_port}` : ""}`],
          ["Category", detail.category_name ?? "—"],
          ["Submitted", fmtDate(detail.submitted_at)],
          ...(detail.verification_agent ? [["Verif. Agent", detail.verification_agent]] : []),
          ...(detail.admin_notes ? [["Admin Notes", detail.admin_notes]] : []),
          ...(detail.rejection_reason ? [["Rejection Reason", detail.rejection_reason]] : []),
        ].map(([label, value]) => (
          <div key={label}>
            <p className="text-xs text-text-secondary mb-0.5">{label}</p>
            <p className="font-medium text-text-primary">{value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar — export */}
      <div className="px-5 py-2 border-b border-border flex items-center gap-2 bg-gray-50/50">
        <Button size="sm" variant="outline"
          className="gap-1.5 text-xs h-7"
          onClick={() => marketplaceAdmin.exportActivityCsv(item.id)}>
          <FileText className="w-3 h-3" /> Export Activity (CSV)
        </Button>
      </div>

      {/* Description */}
      {detail.description && (
        <div className="px-5 pb-4 pt-3">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1">Description</p>
          <p className="text-sm text-text-primary whitespace-pre-line">{detail.description}</p>
        </div>
      )}

      {/* Verification Progress */}
      {(assignment || assignmentLoading) && (
        <div className="px-5 py-4 border-t border-border space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Verification Progress</p>
            {assignment?.report_submitted && (
              <button
                onClick={() => setShowReport((v) => !v)}
                className="flex items-center gap-1.5 text-xs font-medium text-ocean hover:text-ocean-dark transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                {showReport ? "Hide Report" : "View Full Report"}
              </button>
            )}
          </div>

          {assignmentLoading ? (
            <div className="flex items-center gap-2 text-text-secondary text-sm">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading verification status…
            </div>
          ) : assignment ? (
            <>
              {/* Status steps */}
              <VerificationSteps status={assignment.status} />

              {/* Assignment meta */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                {assignment.scheduled_date && (
                  <div>
                    <p className="text-text-secondary mb-0.5">Inspection Date</p>
                    <p className="font-medium text-text-primary">{new Date(assignment.scheduled_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</p>
                  </div>
                )}
                {assignment.contact_notes && (
                  <div className="col-span-2">
                    <p className="text-text-secondary mb-0.5">Agent Notes</p>
                    <p className="font-medium text-text-primary whitespace-pre-line">{assignment.contact_notes}</p>
                  </div>
                )}
              </div>

              {/* Full report */}
              {showReport && assignment.report && (
                <VerificationReportCard report={assignment.report} />
              )}

              {/* Agent evidence files */}
              {(assignment.evidence_files?.length ?? 0) > 0 && (
                <SellerDocViewer
                  docs={assignment.evidence_files}
                  label="Agent Inspection Evidence"
                />
              )}
            </>
          ) : null}
        </div>
      )}

      {/* Images */}
      {detail.images.length > 0 && (
        <div className="px-5 pb-4">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">Images ({detail.images.length})</p>
          <div className="flex gap-3 flex-wrap">
            {detail.images.map((img) => (
              <a key={img.id} href={img.signed_url} target="_blank" rel="noopener noreferrer">
                <div className="w-24 h-24 rounded-lg border border-border overflow-hidden bg-gray-100 hover:opacity-80 transition-opacity">
                  <img src={img.signed_url} alt="" className="w-full h-full object-cover" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Seller Documents */}
      {(detail.documents?.length ?? 0) > 0 && (
        <SellerDocViewer docs={detail.documents} label="Seller Documents" />
      )}

      {/* Assign Agent */}
      {canAssign && (
        <div className="px-5 py-4 border-t border-border space-y-3">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Assign Verification Agent</p>
          {detail.verification_agent && !assigned && (
            <p className="text-xs text-text-secondary flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-ocean" />
              Currently assigned: <span className="font-medium text-text-primary">{detail.verification_agent}</span>
            </p>
          )}
          {assigned ? (
            <p className="text-sm text-success flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Agent assigned.</p>
          ) : (
            <div className="flex gap-2">
              <Select value={agentId} onValueChange={setAgentId}>
                <SelectTrigger className="flex-1 bg-white text-sm">
                  <SelectValue placeholder={agents.length === 0 ? "No agents available" : "Select a verification agent…"} />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((a) => (
                    <SelectItem key={a.id} value={a.id}>
                      <span className="font-medium">{a.full_name || a.email}</span>
                      {a.full_name && <span className="text-text-secondary ml-1.5 text-xs">{a.email}</span>}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleAssignAgent} disabled={assigning || !agentId} size="sm" className="bg-ocean hover:bg-ocean-dark text-white gap-1.5">
                {assigning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UserCheck className="w-3.5 h-3.5" />}
                Assign
              </Button>
            </div>
          )}
          {assignError && <ErrorBar msg={assignError} />}
        </div>
      )}

      {/* Decision */}
      {decided ? (
        <div className="px-5 py-4 bg-success/5 border-t border-border">
          <div className="flex items-center gap-2 text-success text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" /> Decision submitted.
          </div>
        </div>
      ) : canDecide ? (
        <div className="px-5 py-4 bg-gray-50/50 border-t border-border space-y-4">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Make Decision</p>

          <div className="flex gap-2 flex-wrap">
            {(["approve", "reject", "request_corrections"] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDecision(d)}
                className={cn(
                  "px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors",
                  decision === d
                    ? d === "approve" ? "bg-success text-white border-success"
                      : d === "reject" ? "bg-danger text-white border-danger"
                      : "bg-warning text-white border-warning"
                    : "bg-white text-text-secondary border-border hover:border-gray-300"
                )}
              >
                {d === "approve" ? "Approve" : d === "reject" ? "Reject" : "Request Corrections"}
              </button>
            ))}
          </div>

          {(decision === "reject" || decision === "request_corrections") && (
            <div>
              <label className="text-xs font-medium text-text-secondary block mb-1">
                Reason <span className="text-danger">*</span> (shown to seller)
              </label>
              <Textarea
                rows={2} value={reason} onChange={(e) => setReason(e.target.value)}
                placeholder="Explain what needs to be fixed or why it's rejected…"
                className="text-sm resize-none"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-text-secondary block mb-1">Admin Notes (internal)</label>
            <Textarea
              rows={2} value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Internal notes (not visible to seller)…"
              className="text-sm resize-none"
            />
          </div>

          {decideError && <ErrorBar msg={decideError} />}

          <div className="flex justify-end">
            <Button
              onClick={handleDecide} disabled={deciding}
              className={cn("gap-1.5 text-white",
                decision === "approve" ? "bg-success hover:bg-success/90"
                  : decision === "reject" ? "bg-danger hover:bg-danger/90"
                  : "bg-warning hover:bg-warning/90"
              )}
            >
              {deciding ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              {deciding ? "Submitting…" : "Submit Decision"}
            </Button>
          </div>
        </div>
      ) : null}

      {/* Delist */}
      {canDelist && !delisted && (
        <div className="px-5 py-4 border-t border-border space-y-3">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Delist Listing</p>
          {delisted ? (
            <p className="text-sm text-success flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Listing delisted.</p>
          ) : (
            <>
              <div className="flex gap-2">
                <Input
                  value={delistReason} onChange={(e) => setDelistReason(e.target.value)}
                  placeholder="Reason for delisting (optional)"
                  className="text-sm flex-1"
                />
                <Button
                  onClick={handleDelist} disabled={delisting} size="sm" variant="outline"
                  className="text-danger border-danger/30 hover:bg-danger/5 gap-1.5 shrink-0"
                >
                  {delisting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Ban className="w-3.5 h-3.5" />}
                  Delist
                </Button>
              </div>
              {delistError && <ErrorBar msg={delistError} />}
            </>
          )}
        </div>
      )}

      {/* Re-list */}
      {canRelist && (
        <div className="px-5 py-4 border-t border-border space-y-3">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Re-list Listing</p>
          {relisted ? (
            <p className="text-sm text-success flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Listing is now active again.
            </p>
          ) : (
            <>
              <p className="text-xs text-text-secondary">Restore this delisted listing to active status so it appears in the public marketplace.</p>
              <Button
                onClick={handleRelist} disabled={relisting} size="sm"
                className="bg-success hover:bg-success/90 text-white gap-1.5"
              >
                {relisting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                {relisting ? "Re-listing…" : "Re-list as Active"}
              </Button>
              {relistError && <ErrorBar msg={relistError} />}
            </>
          )}
        </div>
      )}

      {/* Admin Delete */}
      <div className="px-5 py-4 border-t border-border space-y-2">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Delete Listing</p>
        <p className="text-xs text-text-secondary">Permanently removes this listing. Not allowed if an active deal exists.</p>
        {deleteError && <ErrorBar msg={deleteError} />}
        {!confirmDelete ? (
          <Button
            size="sm" variant="outline"
            onClick={() => setConfirmDelete(true)}
            className="text-danger border-danger/30 hover:bg-danger/5 gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete Listing
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs text-danger font-medium">Are you sure? This cannot be undone.</span>
            <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(false)} disabled={deleting}
              className="h-7 px-2 text-xs text-text-secondary">
              Cancel
            </Button>
            <Button size="sm" onClick={handleDelete} disabled={deleting}
              className="h-7 px-2 text-xs bg-danger hover:bg-danger/90 text-white">
              {deleting ? <Loader2 className="w-3 h-3 animate-spin" /> : "Confirm Delete"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

const STATUS_TABS = [
  { value: "",                  label: "All" },
  { value: "pending_approval",  label: "Pending Approval" },
  { value: "pending_verification", label: "Pending Verify" },
  { value: "active",            label: "Active" },
  { value: "rejected",          label: "Rejected" },
  { value: "delisted",          label: "Delisted" },
]

export default function AdminMarketplacePage() {
  const router = useRouter()
  const [page, setPage]                 = useState(1)
  const [search, setSearch]             = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [expanded, setExpanded]         = useState<string | null>(null)

  const [sendingDigest, setSendingDigest] = useState(false)
  const [digestMsg, setDigestMsg]         = useState<string | null>(null)

  async function handleSendTestDigest() {
    setSendingDigest(true); setDigestMsg(null)
    try {
      const res = await marketplaceAdmin.sendTestDigest()
      setDigestMsg(res.message)
    } catch (e: unknown) { setDigestMsg((e as Error)?.message ?? "Failed") }
    finally { setSendingDigest(false) }
  }

  const { data, isLoading: loading, error: swrError, mutate } = useAdminListings({
    page, page_size: 20,
    status: statusFilter || undefined,
  })
  const items = data?.items ?? []
  const total = data?.total ?? 0
  const pages = data?.pages ?? 1
  const error = swrError?.message ?? null

  const filtered = search.trim()
    ? items.filter((i) =>
        i.title.toLowerCase().includes(search.toLowerCase()) ||
        (i.seller_company ?? "").toLowerCase().includes(search.toLowerCase())
      )
    : items

  const pendingApprovalCount = items.filter((i) => i.status === "pending_approval").length

  return (
    <div className="space-y-5">
      {/* Top bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <Input
            placeholder="Search by title or seller…"
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>
        <div className="flex items-center gap-2">
          {pendingApprovalCount > 0 && (
            <span className="flex items-center gap-1.5 text-sm text-warning">
              <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
              {pendingApprovalCount} awaiting approval
            </span>
          )}
          <Button variant="outline" size="sm" onClick={() => mutate()} disabled={loading} className="gap-1.5">
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} /> Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleSendTestDigest} disabled={sendingDigest} className="gap-1.5 text-ocean border-ocean/30 hover:bg-ocean/5">
            {sendingDigest ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
            {sendingDigest ? "Sending…" : "Send Digest"}
          </Button>
        </div>
      </div>
      {digestMsg && (
        <div className={cn("flex items-center gap-2 p-3 rounded-xl text-sm border",
          digestMsg.includes("Digest sent") ? "bg-success/10 border-success/20 text-success" : "bg-danger/10 border-danger/20 text-danger")}>
          <AlertCircle className="w-4 h-4 shrink-0" />{digestMsg}
        </div>
      )}

      {/* Status tabs */}
      <div className="flex gap-1 border-b border-border overflow-x-auto">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => { setStatusFilter(tab.value); setExpanded(null); setPage(1) }}
            className={cn(
              "px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px shrink-0",
              statusFilter === tab.value
                ? "border-ocean text-ocean"
                : "border-transparent text-text-secondary hover:text-text-primary"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error && <ErrorBar msg={error} />}

      {loading && items.length === 0 ? (
        <div className="flex items-center justify-center py-16 gap-2 text-text-secondary text-sm">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading listings…
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <Store className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <p className="text-text-secondary">No listings found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => {
            const isOpen = expanded === item.id
            return (
              <div key={item.id} className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                <div
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpanded(isOpen ? null : item.id)}
                >
                  {/* Thumbnail */}
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                    {item.primary_image_url
                      ? <img src={item.primary_image_url} alt="" className="w-full h-full object-cover" />
                      : <Package className="w-5 h-5 text-gray-400" />
                    }
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-primary truncate">{item.title}</p>
                    <p className="text-xs text-text-secondary truncate">
                      {item.seller_company ?? "—"} · {item.location_country}
                      {" "}· {parseFloat(item.asking_price).toLocaleString()} {item.currency}
                      {" "}· {fmtDate(item.created_at)}
                    </p>
                    {item.verification_agent && (
                      <p className="text-xs text-ocean mt-0.5 flex items-center gap-1">
                        <UserCheck className="w-3 h-3 shrink-0" />
                        {item.verification_agent}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <StatusBadge status={item.status} />
                    {isOpen ? <ChevronUp className="w-4 h-4 text-text-secondary" /> : <ChevronDown className="w-4 h-4 text-text-secondary" />}
                  </div>
                </div>

                {isOpen && (
                  <ProductPanel item={item} onActioned={() => mutate()} />
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-text-secondary">Page {page} of {pages} · {total} total</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage((p) => p - 1)} disabled={page <= 1 || loading}>Previous</Button>
            <Button variant="outline" size="sm" onClick={() => setPage((p) => p + 1)} disabled={page >= pages || loading}>Next</Button>
          </div>
        </div>
      )}
    </div>
  )
}
