import { track as vercelTrack } from "@vercel/analytics"

/**
 * Typed wrapper around Vercel Web Analytics custom events.
 *
 * Centralising event names and payload shapes here keeps call sites honest
 * (no stray strings), avoids high-cardinality/PII values, and makes it easy
 * to evolve the analytics schema in one place.
 *
 * Vercel custom events accept string | number | boolean | null property
 * values only, so payloads below stick to those primitives.
 */

type ShareMethod = "native" | "clipboard" | "x" | "linkedin"

type ScrollMilestone = 25 | 50 | 75 | 100

export type AnalyticsEvent =
  | {
      name: "article_read"
      props: {
        slug: string
        title: string
        /** Seconds the article was actively visible before this event. */
        seconds: number
      }
    }
  | {
      name: "scroll_depth"
      props: {
        slug: string
        milestone: ScrollMilestone
      }
    }
  | {
      name: "article_share"
      props: {
        slug: string
        method: ShareMethod
      }
    }
  | {
      name: "posts_search"
      props: {
        /** Normalised (trimmed, lowercased) query. */
        query: string
        /** Length bucket keeps cardinality low while staying useful. */
        length: number
        results: number
      }
    }
  | {
      name: "posts_filter"
      props: {
        /** Category slug, or "all" when the filter is cleared. */
        category: string
      }
    }

/**
 * Send a typed custom event to Vercel Web Analytics.
 *
 * No-ops safely on the server and when analytics is unavailable; the Vercel
 * SDK only reports in production (events are logged to the console in dev).
 */
export function track<E extends AnalyticsEvent>(name: E["name"], props: E["props"]): void {
  vercelTrack(name, props)
}
