"use client"

import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AllCategoriesQueryResult } from "@/sanity/sanity.types"

interface PostsDiscoveryBarProps {
  categories: AllCategoriesQueryResult
  search: string
  activeCategory: string | null
  totalCount: number
  filteredCount: number
  onSearchChange: (value: string) => void
  onCategoryChange: (slug: string | null) => void
}

/**
 * Quiet discovery bar: search input + category filter chips + result count.
 * Intentionally secondary to the writing — small type, minimal chrome.
 */
export function PostsDiscoveryBar({
  categories,
  search,
  activeCategory,
  totalCount,
  filteredCount,
  onSearchChange,
  onCategoryChange,
}: PostsDiscoveryBarProps) {
  const isFiltered = search.trim().length > 0 || activeCategory !== null
  const countLabel = isFiltered
    ? `${filteredCount} of ${totalCount} posts`
    : `${totalCount} posts`

  return (
    <div className="flex flex-col gap-3" role="search" aria-label="Filter posts">
      {/* Search + count row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search input */}
        <div className="relative w-full max-w-sm">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            aria-label="Search posts"
            placeholder="Search posts…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className={cn(
              "h-9 w-full rounded-md border border-input bg-background pl-8 pr-8 text-sm",
              "placeholder:text-muted-foreground/60",
              "transition-[border-color,box-shadow] duration-150",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              "dark:bg-muted/20",
            )}
          />
          {search.length > 0 && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className={cn(
                "absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5",
                "text-muted-foreground/60 transition-colors hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              )}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Result count — quiet metadata */}
        <p className="shrink-0 text-xs text-muted-foreground" aria-live="polite" aria-atomic>
          {countLabel}
        </p>
      </div>

      {/* Category filter chips — only shown when categories exist */}
      {categories.length > 0 && (
        <div
          role="group"
          aria-label="Filter by category"
          className="flex flex-wrap items-center gap-1.5"
        >
          {/* "All" reset chip */}
          <button
            type="button"
            onClick={() => onCategoryChange(null)}
            aria-pressed={activeCategory === null}
            className={cn(
              "inline-flex h-7 items-center rounded-full px-3 text-xs font-medium",
              "transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              activeCategory === null
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground",
            )}
          >
            All
          </button>

          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug
            return (
              <button
                key={cat._id}
                type="button"
                onClick={() => onCategoryChange(isActive ? null : cat.slug)}
                aria-pressed={isActive}
                className={cn(
                  "inline-flex h-7 items-center gap-1 rounded-full px-3 text-xs font-medium",
                  "transition-colors duration-150",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                )}
              >
                {cat.title}
                {cat.count > 0 && (
                  <span
                    className={cn(
                      "ml-0.5 font-normal tabular-nums opacity-60",
                    )}
                    aria-label={`${cat.count} posts`}
                  >
                    {cat.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
