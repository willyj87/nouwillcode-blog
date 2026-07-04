import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { HomepageDataQueryResult } from "@/sanity/sanity.types"

type FeaturedTopics = NonNullable<
  HomepageDataQueryResult["homepage"]
>["featuredTopics"]

export function TopicsSection({ topics }: { topics: FeaturedTopics }) {
  const items = (topics ?? []).filter((t) => t.category)

  if (items.length === 0) return null

  return (
    <section aria-labelledby="topics-heading" className="w-full">
      <div className="mb-6 flex flex-col gap-1">
        <h2 id="topics-heading" className="font-heading text-xl md:text-2xl">
          Start here
        </h2>
        <p className="text-sm text-muted-foreground">
          A few topics I write about most. Pick one to dive in.
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map(({ blurb, category }) => {
          const description = blurb ?? category.description
          const postLabel =
            category.count === 1 ? "1 article" : `${category.count} articles`

          return (
            <li key={category._id}>
              <Link
                href={`/posts?category=${category.slug}`}
                className={cn(
                  "group block h-full rounded-xl",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                <Card
                  className={cn(
                    "h-full transition-colors",
                    "group-hover:ring-primary/40 group-hover:bg-primary/[0.03]",
                  )}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <span>{category.title}</span>
                      <ArrowRightIcon
                        className={cn(
                          "h-4 w-4 text-muted-foreground transition-all",
                          "group-hover:translate-x-0.5 group-hover:text-primary",
                        )}
                        aria-hidden
                      />
                    </CardTitle>
                    {description ? (
                      <CardDescription>{description}</CardDescription>
                    ) : null}
                  </CardHeader>
                  <CardContent>
                    <span className="text-xs font-medium tabular-nums text-muted-foreground">
                      {postLabel}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
