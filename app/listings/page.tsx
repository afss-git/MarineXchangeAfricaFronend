"use client"

import { useEffect, useState, useCallback, useRef, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  MapPin, Tag, ArrowRight, Ship, Loader2, Search,
  SlidersHorizontal, X, ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { marketplace, type ProductListItem, type CategoryResponse } from "@/lib/api"

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatPrice(price: string, currency: string) {
  const num = parseFloat(price)
  if (isNaN(num)) return `${currency} ${price}`
  if (num >= 1_000_000) return `${currency} ${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${currency} ${(num / 1_000).toFixed(0)}K`
  return `${currency} ${num.toLocaleString()}`
}

function availabilityLabel(type: string) {
  const map: Record<string, string> = {
    for_sale: "For Sale", hire: "For Hire", lease: "For Lease",
    bareboat_charter: "Bareboat Charter", time_charter: "Time Charter",
  }
  return map[type] ?? type?.replace(/_/g, " ") ?? "—"
}

function conditionLabel(c: string) {
  return c?.replace(/_/g, " ").replace(/\b\w/g, x => x.toUpperCase()) ?? "—"
}

// ── Product card ──────────────────────────────────────────────────────────────

function ProductCard({ item }: { item: ProductListItem }) {
  return (
    <Link
      href={`/listings/${item.id}`}
      className="group bg-white rounded-2xl border border-border overflow-hidden transition-all duration-200 hover:border-ocean hover:-translate-y-0.5 hover:shadow-md block"
    >
      <div className="relative h-44 bg-surface overflow-hidden">
        {item.primary_image_url ? (
          <img
            src={item.primary_image_url} alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy/5 to-ocean/10">
            <Ship className="w-10 h-10 text-ocean/25" />
          </div>
        )}
        <span className="absolute top-3 left-3 text-[11px] font-semibold px-2 py-1 rounded-full bg-white/92 text-navy">
          {availabilityLabel(item.availability_type)}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-navy font-bold text-sm mb-1 line-clamp-1 group-hover:text-ocean transition-colors">
          {item.title}
        </h3>
        <div className="flex items-center gap-1.5 text-text-secondary text-xs mb-3">
          <MapPin className="w-3 h-3 shrink-0" />
          <span>{item.location_country}</span>
          {item.category_name && (
            <>
              <span className="text-border mx-0.5">·</span>
              <Tag className="w-3 h-3 shrink-0" />
              <span className="truncate">{item.category_name}</span>
            </>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-navy font-extrabold text-base leading-none">{formatPrice(item.asking_price, item.currency)}</p>
            <p className="text-text-secondary text-xs mt-0.5">{conditionLabel(item.condition)}</p>
          </div>
          <span className="text-xs text-ocean font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            View <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden animate-pulse">
      <div className="h-44 bg-surface" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-surface rounded w-3/4" />
        <div className="h-3 bg-surface rounded w-1/2" />
        <div className="h-5 bg-surface rounded w-1/3" />
      </div>
    </div>
  )
}

// ── Filter sidebar / bar ──────────────────────────────────────────────────────

interface Filters {
  q: string
  category_id: string
  condition: string
  availability_type: string
  location_country: string
}

function FilterBar({
  filters, categories, onChange, onReset, total, loading,
}: {
  filters: Filters
  categories: CategoryResponse[]
  onChange: (k: keyof Filters, v: string) => void
  onReset: () => void
  total: number
  loading: boolean
}) {
  const hasActive = Object.values(filters).some(v => v !== "")

  return (
    <div className="bg-white border border-border rounded-2xl p-4 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
        <input
          value={filters.q}
          onChange={e => onChange("q", e.target.value)}
          placeholder="Search vessels, equipment…"
          className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean/30"
        />
        {filters.q && (
          <button onClick={() => onChange("q", "")} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 block">Category</label>
        <select
          value={filters.category_id}
          onChange={e => onChange("category_id", e.target.value)}
          className="w-full border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30 bg-white"
        >
          <option value="">All Categories</option>
          {flattenCats(categories).map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Availability */}
      <div>
        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 block">Listing Type</label>
        <select
          value={filters.availability_type}
          onChange={e => onChange("availability_type", e.target.value)}
          className="w-full border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30 bg-white"
        >
          <option value="">All Types</option>
          <option value="for_sale">For Sale</option>
          <option value="hire">For Hire</option>
          <option value="lease">For Lease</option>
          <option value="bareboat_charter">Bareboat Charter</option>
          <option value="time_charter">Time Charter</option>
        </select>
      </div>

      {/* Condition */}
      <div>
        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 block">Condition</label>
        <select
          value={filters.condition}
          onChange={e => onChange("condition", e.target.value)}
          className="w-full border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30 bg-white"
        >
          <option value="">Any Condition</option>
          <option value="new">New</option>
          <option value="used">Used</option>
          <option value="refurbished">Refurbished</option>
        </select>
      </div>

      {/* Country */}
      <div>
        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 block">Country</label>
        <input
          value={filters.location_country}
          onChange={e => onChange("location_country", e.target.value)}
          placeholder="e.g. Nigeria, Ghana…"
          className="w-full border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30"
        />
      </div>

      {/* Results count + reset */}
      <div className="flex items-center justify-between pt-1 border-t border-border">
        <p className="text-xs text-text-secondary">
          {loading ? "Loading…" : `${total.toLocaleString()} listing${total !== 1 ? "s" : ""}`}
        </p>
        {hasActive && (
          <button onClick={onReset} className="text-xs text-danger font-semibold hover:underline flex items-center gap-1">
            <X className="w-3 h-3" /> Clear filters
          </button>
        )}
      </div>
    </div>
  )
}

function flattenCats(cats: CategoryResponse[], depth = 0): { id: string; name: string }[] {
  const result: { id: string; name: string }[] = []
  for (const c of cats) {
    result.push({ id: c.id, name: (depth > 0 ? "  ".repeat(depth) + "↳ " : "") + c.name })
    if (c.subcategories?.length) result.push(...flattenCats(c.subcategories, depth + 1))
  }
  return result
}

// ── Main catalog page ─────────────────────────────────────────────────────────

const PAGE_SIZE = 12
const EMPTY_FILTERS: Filters = { q: "", category_id: "", condition: "", availability_type: "", location_country: "" }

function activeParams(f: Filters) {
  return {
    ...(f.q                 ? { q: f.q }                                 : {}),
    ...(f.category_id       ? { category_id: f.category_id }             : {}),
    ...(f.condition         ? { condition: f.condition }                 : {}),
    ...(f.availability_type ? { availability_type: f.availability_type } : {}),
    ...(f.location_country  ? { location_country: f.location_country }   : {}),
  }
}

function CatalogContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [filters, setFilters]     = useState<Filters>(EMPTY_FILTERS)
  const [products, setProducts]   = useState<ProductListItem[]>([])
  const [total, setTotal]         = useState(0)
  const [page, setPage]           = useState(1)
  const [pages, setPages]         = useState(1)
  const [loading, setLoading]     = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [categories, setCategories] = useState<CategoryResponse[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  // Latest values for the observer callback, which is created once
  const stateRef = useRef({ page, pages, loading, loadingMore, filters })
  stateRef.current = { page, pages, loading, loadingMore, filters }

  // Load categories once
  useEffect(() => {
    marketplace.getCategories().then(setCategories).catch(() => {})
  }, [])

  // Filters changed → reset to page 1 and REPLACE results (debounced for the search box)
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setPage(1)
      marketplace.browse({ page: 1, page_size: PAGE_SIZE, ...activeParams(filters) })
        .then(res => {
          setProducts(res.items ?? [])
          setTotal(res.total ?? 0)
          setPages(res.pages ?? 1)
        })
        .catch(() => setProducts([]))
        .finally(() => setLoading(false))
    }, 350)
    return () => clearTimeout(timer)
  }, [filters])

  // Append the next page — called by the scroll sentinel
  const loadMore = useCallback(() => {
    const s = stateRef.current
    if (s.loading || s.loadingMore || s.page >= s.pages) return
    const next = s.page + 1
    setPage(next)
    setLoadingMore(true)
    marketplace.browse({ page: next, page_size: PAGE_SIZE, ...activeParams(s.filters) })
      .then(res => {
        setProducts(prev => [...prev, ...(res.items ?? [])])
        setTotal(res.total ?? 0)
        setPages(res.pages ?? 1)
      })
      .catch(() => {})
      .finally(() => setLoadingMore(false))
  }, [])

  // Observe the sentinel; load more as it nears the viewport
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) loadMore() },
      { rootMargin: "600px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [loadMore])

  function handleFilterChange(k: keyof Filters, v: string) {
    setFilters(prev => ({ ...prev, [k]: v }))
  }

  function handleReset() {
    setFilters(EMPTY_FILTERS)
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
              <Image src="/logo-icon.png" alt="Harbours360" width={32} height={32} className="w-full h-full object-contain" />
            </div>
            <span className="font-extrabold text-navy text-base">Harbours<span className="text-ocean">360</span></span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="outline" size="sm" className="text-xs border-border">Log In</Button>
            </Link>
            <Link href="/signup/buyer">
              <Button size="sm" className="bg-ocean text-white hover:bg-ocean-dark text-xs gap-1">
                Sign Up Free <ExternalLink className="w-3 h-3" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-navy leading-tight" style={{ letterSpacing: "-0.02em" }}>
              Marine Marketplace
            </h1>
            <p className="text-text-secondary text-sm mt-0.5">
              Verified vessels, equipment &amp; maritime assets
            </p>
          </div>
          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilters(v => !v)}
            className="lg:hidden flex items-center gap-1.5 text-sm font-semibold text-text-primary border border-border rounded-xl px-3 py-2 bg-white hover:border-ocean transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="flex gap-7 items-start">
          {/* ── Sidebar filters (desktop always visible, mobile toggleable) ── */}
          <aside className={`w-64 shrink-0 ${showFilters ? "block" : "hidden"} lg:block`}>
            <FilterBar
              filters={filters}
              categories={categories}
              onChange={handleFilterChange}
              onReset={handleReset}
              total={total}
              loading={loading}
            />
          </aside>

          {/* ── Results ──────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-full bg-white border border-border flex items-center justify-center mb-4">
                  <Ship className="w-8 h-8 text-ocean/30" />
                </div>
                <p className="text-navy font-bold mb-1">No listings found</p>
                <p className="text-text-secondary text-sm mb-4">Try adjusting your filters</p>
                <button onClick={handleReset} className="text-sm text-ocean font-semibold hover:underline">
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {products.map(item => <ProductCard key={item.id} item={item} />)}
                </div>

                {/* Loading-more skeletons */}
                {loadingMore && (
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
                    {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
                  </div>
                )}

                {/* Infinite-scroll sentinel — observed to auto-load the next page */}
                <div ref={sentinelRef} className="h-px" aria-hidden />

                {/* End of results */}
                {page >= pages && !loadingMore && (
                  <p className="text-center text-text-secondary text-xs mt-8">
                    End of results · {total.toLocaleString()} listing{total !== 1 ? "s" : ""}
                  </p>
                )}

                {/* Soft CTA at bottom */}
                <div className="mt-10 bg-white rounded-2xl border border-border p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-navy text-sm">Want to contact sellers or submit an offer?</p>
                    <p className="text-text-secondary text-xs mt-0.5">Create a free account — it takes less than 2 minutes.</p>
                  </div>
                  <Link href="/signup/buyer" className="shrink-0">
                    <Button className="bg-ocean text-white hover:bg-ocean-dark gap-2 text-sm">
                      Sign Up Free <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function PublicCatalogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-ocean animate-spin" />
      </div>
    }>
      <CatalogContent />
    </Suspense>
  )
}
