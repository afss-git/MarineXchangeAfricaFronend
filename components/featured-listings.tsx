"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { MapPin, ArrowRight, Ship, Clock, RefreshCw } from "lucide-react"
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

function conditionLabel(condition: string) {
  return condition?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ?? "—"
}

function availabilityLabel(type: string) {
  if (type === "for_sale") return "For Sale"
  if (type === "for_lease") return "For Lease"
  if (type === "for_auction") return "Auction"
  return type?.replace(/_/g, " ") ?? "—"
}

function availabilityColor(type: string) {
  if (type === "for_sale")    return "bg-ocean/90 text-white"
  if (type === "for_lease")   return "bg-amber-500/90 text-white"
  if (type === "for_auction") return "bg-red-500/90 text-white"
  return "bg-white/90 text-navy"
}

function daysAgo(isoDate: string): string {
  const diff = Math.floor((Date.now() - new Date(isoDate).getTime()) / 86_400_000)
  if (diff === 0) return "today"
  if (diff === 1) return "1 day ago"
  return `${diff} days ago`
}

function fisherYates<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── Sub-components ────────────────────────────────────────────────────────────

function CategoryTabs({
  categories,
  active,
  onSelect,
}: {
  categories: CategoryResponse[]
  active: string | null
  onSelect: (id: string | null) => void
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap" role="tablist" aria-label="Filter by category">
      <button
        role="tab"
        aria-selected={active === null}
        onClick={() => onSelect(null)}
        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
          active === null
            ? "bg-ocean border-ocean text-white"
            : "bg-white border-border text-text-secondary hover:border-ocean hover:text-navy"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          role="tab"
          aria-selected={active === cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
            active === cat.id
              ? "bg-ocean border-ocean text-white"
              : "bg-white border-border text-text-secondary hover:border-ocean hover:text-navy"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}

function ProductCard({ item, index, visible }: { item: ProductListItem; index: number; visible: boolean }) {
  const location = item.location_country

  return (
    <Link
      href={`/listings/${item.id}`}
      className={`group bg-white rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:border-ocean hover:-translate-y-1 flex flex-col ${
        visible ? `animate-fade-up delay-${Math.min(index + 1, 6)}` : "opacity-0"
      }`}
      style={{ boxShadow: "none" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(15, 42, 68, 0.08)"
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none"
      }}
    >
      {/* Image */}
      <div className="relative h-52 bg-surface overflow-hidden shrink-0">
        {item.primary_image_url ? (
          <img
            src={item.primary_image_url}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-navy/5 to-ocean/10">
            <Ship className="w-12 h-12 text-ocean/30" />
          </div>
        )}

        {/* Availability badge — colour-coded */}
        <span className={`absolute top-3 left-3 text-[11px] font-semibold px-2 py-1 rounded-full ${availabilityColor(item.availability_type)}`}>
          {availabilityLabel(item.availability_type)}
        </span>

        {/* Units badge — only when more than 1 unit */}
        {item.available_units != null && item.available_units > 1 && (
          <span className="absolute top-3 right-3 text-[11px] font-semibold px-2 py-1 rounded-full bg-navy/80 text-white">
            {item.available_units} units
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3
          className="text-navy font-bold text-base mb-2 line-clamp-1 group-hover:text-ocean transition-colors"
          style={{ letterSpacing: "-0.01em" }}
        >
          {item.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-text-secondary text-xs mb-3">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        {/* Price + CTA row */}
        <div className="flex items-end justify-between mt-auto pt-3 border-t border-border">
          <div>
            <p className="text-navy font-extrabold text-lg leading-none" style={{ letterSpacing: "-0.02em" }}>
              {formatPrice(item.asking_price, item.currency)}
            </p>
            <p className="text-text-secondary text-[11px] mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3 shrink-0" />
              {conditionLabel(item.condition)} · {daysAgo(item.created_at)}
            </p>
          </div>
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold text-ocean px-3 py-1.5 rounded-full shrink-0 ml-2"
            style={{ background: "rgba(14,165,233,0.1)" }}
          >
            View <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden animate-pulse flex flex-col">
      <div className="h-52 bg-surface shrink-0" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-surface rounded w-3/4" />
        <div className="h-3 bg-surface rounded w-1/2" />
        <div className="h-5 bg-surface rounded w-1/3 mt-2" />
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

const PAGE_SIZE = 12

export function FeaturedListings() {
  const [pool, setPool] = useState<ProductListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<CategoryResponse[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isTabLoading, setIsTabLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Fetch categories once
  useEffect(() => {
    marketplace.getCategories()
      .then((cats) => setCategories(cats.slice(0, 4)))
      .catch(() => {})
  }, [])

  // Fetch listings when category changes
  useEffect(() => {
    setIsTabLoading(true)
    marketplace
      .browse({
        page: 1,
        page_size: 30,
        ...(activeCategory ? { category_id: activeCategory } : {}),
      })
      .then((res) => {
        setPool(fisherYates(res.items ?? []))
      })
      .catch(() => setPool([]))
      .finally(() => {
        setIsLoading(false)
        setIsTabLoading(false)
      })
  }, [activeCategory])

  function handleShuffle() {
    setPool((prev) => fisherYates(prev))
  }

  const displayed = pool.slice(0, PAGE_SIZE)

  if (!isLoading && pool.length === 0) return null

  return (
    <section id="catalog" ref={ref} className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-start sm:justify-between mb-10 gap-6 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <div>
            <span className="text-ocean text-xs font-semibold tracking-[0.15em] uppercase mb-4 block">
              LIVE LISTINGS
            </span>
            <h2
              className="text-navy font-extrabold mb-2"
              style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.03em" }}
            >
              Featured Assets
            </h2>
            <p className="text-text-secondary text-base max-w-lg mb-4">
              Verified, active listings available right now. Sign in to contact sellers or submit an offer.
            </p>

            {/* Category tabs */}
            {categories.length > 0 && (
              <CategoryTabs
                categories={categories}
                active={activeCategory}
                onSelect={(id) => setActiveCategory(id)}
              />
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              onClick={handleShuffle}
              title="Show different listings"
              aria-label="Shuffle listings"
              className="border border-border rounded-lg p-2 text-text-secondary hover:border-ocean hover:text-ocean transition-all"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <Link href="/listings">
              <Button
                variant="outline"
                className="border-border text-text-primary hover:bg-white hover:border-ocean transition-all hover:-translate-y-0.5"
              >
                View All Listings
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div
            className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-200 ${
              isTabLoading ? "opacity-50 pointer-events-none" : "opacity-100"
            }`}
          >
            {displayed.map((item, index) => (
              <ProductCard key={item.id} item={item} index={index} visible={isVisible} />
            ))}
          </div>
        )}

        {/* CTA row */}
        {!isLoading && displayed.length > 0 && (
          <div className={`mt-12 text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <Link href={activeCategory ? `/listings?category_id=${activeCategory}` : "/listings"}>
              <Button className="bg-ocean hover:bg-ocean-dark text-white px-8 py-5 text-sm font-semibold transition-all hover:-translate-y-0.5">
                Browse All{" "}
                {activeCategory
                  ? (categories.find((c) => c.id === activeCategory)?.name ?? "Listings")
                  : "Listings"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
