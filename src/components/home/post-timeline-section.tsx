import Link from "next/link"
import { formatDate } from "@/lib/format"
import type { HomepageDataQueryResult } from "@/sanity/sanity.types"
import { TimelinePostCard } from "./timeline-post-card"

type RecentPosts = HomepageDataQueryResult["recentPosts"]

export function PostTimelineSection({
  posts,
  ctaText,
}: {
  posts: RecentPosts
  ctaText?: string | null
}) {
  const cta = ctaText || "View all posts"
  const items = posts ?? []
  const hasPosts = items.length > 0

  // When the timeline is empty (featured is the only post), show a quiet
  // "more coming" affordance rather than a broken-looking empty grid.
  if (!hasPosts) {
    return (
      <section aria-labelledby="latest-heading" className="w-full">
        <h2 id="latest-heading" className="sr-only">
          Latest posts
        </h2>
        <div className="flex flex-col items-start gap-3 border-l border-dashed pl-6 py-2">
          <p className="text-sm font-medium text-foreground">More coming soon</p>
          <p className="text-sm text-muted-foreground">
            The next post is in the works. Come back shortly.
          </p>
          <Link
            href="/blog"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            {cta}
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section aria-labelledby="latest-heading" className="w-full">
      {/* Section header — quiet label, not a full heading block */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <h2
          id="latest-heading"
          className="text-sm font-semibold text-muted-foreground"
        >
          Recent posts
        </h2>
        <Link
          href="/blog"
          className="hidden text-xs font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
        >
          {cta}
        </Link>
      </div>

      <ol className="relative flex flex-col gap-8">
        {/* Vertical rail line — sits behind nodes */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-[5.5px] top-2 bottom-2 w-px bg-border sm:left-[calc(6.5rem+5.5px)]"
        />

        {items.map((post) => (
          <li
            key={post._id}
            className="grid grid-cols-[auto_1fr] gap-x-5 sm:grid-cols-[6.5rem_1fr] sm:gap-x-8"
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

      {/* Mobile CTA */}
      <div className="mt-10 md:hidden">
        <Link
          href="/blog"
          className="inline-flex h-10 w-full items-center justify-center rounded-full border text-sm font-medium transition-colors hover:bg-muted sm:w-auto sm:px-8"
        >
          {cta}
        </Link>
      </div>
    </section>
  )
}
