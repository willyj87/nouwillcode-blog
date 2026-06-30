import Link from "next/link"
import { Button } from "@/components/ui/button"
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

  return (
    <section aria-labelledby="latest-heading" className="w-full">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2
            id="latest-heading"
            className="text-3xl font-bold tracking-tight md:text-4xl"
          >
            Latest posts
          </h2>
          <p className="mt-2 text-muted-foreground">
            A timeline of recent writing.
          </p>
        </div>
        {hasPosts && (
          <Button
            variant="outline"
            asChild
            className="hidden rounded-full md:inline-flex"
          >
            <Link href="/blog">{cta}</Link>
          </Button>
        )}
      </div>

      {hasPosts ? (
        <>
          <ol className="relative flex flex-col gap-8 sm:gap-8">
            {/* Continuous rail line behind the nodes */}
            <span
              aria-hidden
              className="absolute left-[5px] top-2 bottom-2 w-px bg-border sm:left-[calc(8rem+5px)]"
            />

            {items.map((post) => (
              <li
                key={post._id}
                className="grid grid-cols-[auto_1fr] gap-x-4 sm:grid-cols-[8rem_1fr] sm:gap-x-8"
              >
                {/* Rail: date (desktop) + node */}
                <div className="relative flex sm:justify-end">
                  <div className="flex items-start gap-3 sm:flex-row-reverse sm:items-center sm:gap-3">
                    <span
                      className="relative z-10 mt-1.5 inline-block h-3 w-3 shrink-0 rounded-full border-2 border-primary bg-background sm:mt-0"
                      aria-hidden
                    />
                    {post.publishedAt && (
                      <time
                        dateTime={post.publishedAt}
                        className="hidden text-sm font-medium text-muted-foreground sm:inline-block sm:text-right"
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

          <div className="mt-10 flex justify-center md:hidden">
            <Button
              variant="outline"
              asChild
              className="w-full rounded-full sm:w-auto"
            >
              <Link href="/blog">{cta}</Link>
            </Button>
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-dashed py-20 text-center">
          <p className="text-lg font-medium">No posts yet</p>
          <p className="mt-2 text-muted-foreground">
            The first posts are coming soon. Check back shortly!
          </p>
        </div>
      )}
    </section>
  )
}
