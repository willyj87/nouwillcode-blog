import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { HomepageDataQueryResult } from "@/sanity/sanity.types"

type Categories = HomepageDataQueryResult["categories"]

export function TopicsSection({ categories }: { categories: Categories }) {
  const topics = (categories ?? []).filter((c) => c.count > 0)

  if (topics.length === 0) return null

  return (
    <section aria-labelledby="topics-heading" className="w-full">
      <div className="mb-6 flex flex-col items-start justify-between gap-2 md:flex-row md:items-end">
        <div>
          <h2
            id="topics-heading"
            className="text-2xl font-bold tracking-tight md:text-3xl"
          >
            Explore by topic
          </h2>
          <p className="mt-1.5 text-muted-foreground">
            Jump straight to what you&apos;re into.
          </p>
        </div>
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          All articles
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <ul className="flex flex-wrap gap-2.5">
        {topics.map((topic) => (
          <li key={topic._id}>
            <Link
              href={`/blog?tag=${topic.slug}`}
              className={cn(
                "group inline-flex items-center gap-2 rounded-full border px-4 py-2",
                "text-sm font-medium transition-colors",
                "hover:border-primary hover:bg-primary hover:text-primary-foreground",
              )}
            >
              <span>{topic.title}</span>
              <span
                className={cn(
                  "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5",
                  "bg-muted text-xs font-semibold tabular-nums text-muted-foreground",
                  "transition-colors group-hover:bg-primary-foreground/20 group-hover:text-primary-foreground",
                )}
              >
                {topic.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
