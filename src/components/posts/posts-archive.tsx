"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { formatDate } from "@/lib/format"
import { track } from "@/lib/analytics"
import type { AllPostsQueryResult, AllCategoriesQueryResult } from "@/sanity/sanity.types"
import { FeaturedPost } from "./featured-post"
import { PostsDiscoveryBar } from "./posts-discovery-bar"
import { TimelinePostCard } from "@/components/home/timeline-post-card"

const FEATURED_COUNT = 3
const POSTS_PER_PAGE = 8
const SEARCH_TRACK_DELAY = 500

interface PostsArchiveProps {
  posts: AllPostsQueryResult
  categories: AllCategoriesQueryResult
}

/**
 * Client island that owns search + filter state for the posts archive.
 * Server-side RSC fetches and passes all posts + categories here.
 * Featured band (top 3) hides when a filter is active.
 */
export function PostsArchive({ posts, categories }: PostsArchiveProps) {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const isFiltering = search.trim().length > 0 || activeCategory !== null

  // Reset pagination when the active filter changes, adjusting state during
  // render instead of in an effect to avoid cascading re-renders.
  const filterKey = `${search}|${activeCategory ?? ""}`
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey)
  if (prevFilterKey !== filterKey) {
    setPrevFilterKey(filterKey)
    setCurrentPage(1)
  }

  /** All posts filtered by search and/or category. */
  const filteredPosts = useMemo(() => {
    let result = posts
    if (activeCategory) {
      result = result.filter((p) =>
        p.categories?.some((c) => c.slug === activeCategory),
      )
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          p.categories?.some((c) => c.title?.toLowerCase().includes(q)),
      )
    }
    return result
  }, [posts, search, activeCategory])

  /** Featured band: newest 3 posts (always from the full unfiltered list). */
  const featuredPosts = useMemo(() => posts.slice(0, FEATURED_COUNT), [posts])

  /** Stream source: all non-featured posts or filtered posts when active. */
  const streamSourcePosts = useMemo(() => {
    if (isFiltering) return filteredPosts
    return posts.slice(FEATURED_COUNT)
  }, [posts, filteredPosts, isFiltering])

  const totalPages = Math.max(1, Math.ceil(streamSourcePosts.length / POSTS_PER_PAGE))

  // Clamp the page during render so it never exceeds the available pages
  // (e.g. after the source list shrinks) without a state-syncing effect.
  const safePage = Math.min(currentPage, totalPages)

  const streamPosts = useMemo(() => {
    const start = (safePage - 1) * POSTS_PER_PAGE
    const end = start + POSTS_PER_PAGE
    return streamSourcePosts.slice(start, end)
  }, [safePage, streamSourcePosts])

  // Keep the latest result count in a ref so the debounced search-tracking
  // effect can read it without re-subscribing on every filter recompute.
  const filteredCountRef = useRef(filteredPosts.length)
  useEffect(() => {
    filteredCountRef.current = filteredPosts.length
  }, [filteredPosts.length])

  // Track searches, debounced, so we log intent (not every keystroke) and
  // never send high-cardinality raw queries without normalising them first.
  useEffect(() => {
    const query = search.trim().toLowerCase()
    if (!query) return
    const timer = window.setTimeout(() => {
      track("posts_search", {
        query,
        length: query.length,
        results: filteredCountRef.current,
      })
    }, SEARCH_TRACK_DELAY)
    return () => window.clearTimeout(timer)
  }, [search])

  const handleCategoryChange = useCallback((category: string | null) => {
    setActiveCategory(category)
    track("posts_filter", { category: category ?? "all" })
  }, [])

  return (
    <div className="flex flex-col gap-12">
      {/* ── Discovery bar ── */}
      <PostsDiscoveryBar
        categories={categories}
        search={search}
        activeCategory={activeCategory}
        totalCount={posts.length}
        filteredCount={filteredPosts.length}
        onSearchChange={setSearch}
        onCategoryChange={handleCategoryChange}
      />

      {/* ── Featured band — suppressed while filtering ── */}
      {!isFiltering && featuredPosts.length > 0 && (
        <section aria-labelledby="featured-heading">
          <h2 id="featured-heading" className="sr-only">
            Latest posts
          </h2>
          <div
            className={
              featuredPosts.length === 1
                ? "grid grid-cols-1"
                : "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 md:gap-10"
            }
          >
            {featuredPosts.map((post, i) => (
              <FeaturedPost key={post._id} post={post} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* ── Archive stream ── */}
      {streamPosts.length > 0 ? (
        <section aria-labelledby="archive-heading">
          <h2
            id="archive-heading"
            className="mb-8 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60"
          >
            {isFiltering ? "Results" : "Archive"}
          </h2>

          <ol className="relative flex flex-col gap-8">
            {/* Vertical timeline rail */}
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-2 left-[5.5px] top-2 w-px bg-border sm:left-[calc(6.5rem+5.5px)]"
            />

            {streamPosts.map((post, idx) => (
              <li
                key={post._id}
                className="grid animate-in fade-in slide-in-from-bottom-2 grid-cols-[auto_1fr] gap-x-5 sm:grid-cols-[6.5rem_1fr] sm:gap-x-8"
                style={{ animationDelay: `${Math.min(idx * 40, 400)}ms`, animationFillMode: "both" }}
              >
                {/* Rail column: date (sm+) + node dot */}
                <div className="relative flex sm:justify-end">
                  <div className="flex items-start gap-3 sm:flex-row-reverse sm:items-center sm:gap-3">
                    <span
                      className="relative z-10 mt-2 inline-block h-2.5 w-2.5 shrink-0 rounded-full border-2 border-primary bg-background sm:mt-0"
                      aria-hidden
                    />
                    {post.publishedAt && (
                      <time
                        dateTime={post.publishedAt}
                        className="hidden text-[11px] font-medium leading-tight text-muted-foreground sm:inline-block sm:text-right"
                      >
                        {formatDate(post.publishedAt)}
                      </time>
                    )}
                  </div>
                </div>

                <TimelinePostCard post={post} />
              </li>
            ))}
          </ol>

          {totalPages > 1 && (
            <nav
              aria-label="Posts pagination"
              className="mt-10 flex flex-wrap items-center gap-2"
            >
              <button
                type="button"
                onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
                disabled={safePage === 1}
                className="inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-45"
              >
                Previous
              </button>

              <div className="flex flex-wrap items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const isActive = page === safePage
                  return (
                    <button
                      key={page}
                      type="button"
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setCurrentPage(page)}
                      className={
                        isActive
                          ? "inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-primary px-3 text-sm font-medium text-primary-foreground"
                          : "inline-flex h-9 min-w-9 items-center justify-center rounded-full border px-3 text-sm font-medium transition-colors hover:bg-muted"
                      }
                    >
                      {page}
                    </button>
                  )
                })}
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage(Math.min(totalPages, safePage + 1))}
                disabled={safePage === totalPages}
                className="inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-45"
              >
                Next
              </button>
            </nav>
          )}
        </section>
      ) : isFiltering ? (
        /* No-results state */
        <div className="flex flex-col items-start gap-2 py-12">
          <p className="text-sm font-medium text-foreground">No posts found</p>
          <p className="text-sm text-muted-foreground">
            Try different keywords or{" "}
            <button
              type="button"
              className="font-medium text-primary underline-offset-4 hover:underline"
              onClick={() => {
                setSearch("")
                handleCategoryChange(null)
              }}
            >
              clear the filter
            </button>
            .
          </p>
        </div>
      ) : (
        /* Empty archive */
        <div className="flex flex-col items-start gap-2 py-12">
          <p className="text-sm font-medium text-foreground">Nothing here yet</p>
          <p className="text-sm text-muted-foreground">
            The first post is on its way.
          </p>
        </div>
      )}
    </div>
  )
}
