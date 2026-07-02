"use client"

import { useEffect, useRef } from "react"

import { track } from "@/lib/analytics"

interface ArticleReadTrackerProps {
  slug: string
  title: string
}

const MILESTONES = [25, 50, 75, 100] as const

/**
 * Invisible client island that measures reading engagement for an article:
 *
 * - **Scroll depth**: fires a `scroll_depth` event once per 25/50/75/100%
 *   milestone reached. Uses a passive scroll listener throttled with
 *   requestAnimationFrame to avoid layout thrash.
 * - **Active reading time**: accumulates the time the tab is actually visible
 *   (Page Visibility API) and reports it via `article_read` when the reader
 *   leaves the tab or navigates away.
 *
 * Renders nothing.
 */
export function ArticleReadTracker({ slug, title }: ArticleReadTrackerProps) {
  const firedMilestones = useRef<Set<number>>(new Set())
  // Active-time accounting kept in refs so it survives re-renders without
  // triggering any (there is no visible state here).
  const activeMsRef = useRef(0)
  const lastStartRef = useRef<number | null>(null)
  const reportedRef = useRef(false)

  useEffect(() => {
    firedMilestones.current = new Set()
    activeMsRef.current = 0
    reportedRef.current = false
    lastStartRef.current = document.visibilityState === "visible" ? performance.now() : null

    let rafScheduled = false

    const evaluateScroll = () => {
      rafScheduled = false
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      const percent =
        scrollable <= 0 ? 100 : Math.min(100, Math.round((window.scrollY / scrollable) * 100))

      for (const milestone of MILESTONES) {
        if (percent >= milestone && !firedMilestones.current.has(milestone)) {
          firedMilestones.current.add(milestone)
          track("scroll_depth", { slug, milestone })
        }
      }
    }

    const onScroll = () => {
      if (rafScheduled) return
      rafScheduled = true
      requestAnimationFrame(evaluateScroll)
    }

    const accumulateActive = () => {
      if (lastStartRef.current !== null) {
        activeMsRef.current += performance.now() - lastStartRef.current
        lastStartRef.current = null
      }
    }

    const reportRead = () => {
      accumulateActive()
      const seconds = Math.round(activeMsRef.current / 1000)
      if (reportedRef.current || seconds <= 0) return
      reportedRef.current = true
      track("article_read", { slug, title, seconds })
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        lastStartRef.current = performance.now()
      } else {
        // Tab hidden: banked as a read so we don't lose the session.
        reportedRef.current = false
        reportRead()
      }
    }

    // Initial evaluation in case the article is already partly scrolled
    // (e.g. deep link with a hash). Deferred to idle to avoid blocking paint.
    const initId = requestAnimationFrame(evaluateScroll)

    window.addEventListener("scroll", onScroll, { passive: true })
    document.addEventListener("visibilitychange", onVisibilityChange)
    window.addEventListener("pagehide", reportRead)

    return () => {
      cancelAnimationFrame(initId)
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      window.removeEventListener("pagehide", reportRead)
      // Report on unmount (client-side navigation away from the article).
      reportedRef.current = false
      reportRead()
    }
  }, [slug, title])

  return null
}
