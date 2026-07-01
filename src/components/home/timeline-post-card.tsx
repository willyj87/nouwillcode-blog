import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { urlFor } from "@/sanity/lib/image"
import { formatDate } from "@/lib/format"
import type { AllPostsQueryResult, HomepageDataQueryResult } from "@/sanity/sanity.types"

// Both query result shapes are structurally identical — accept either.
export type TimelinePostData =
  | HomepageDataQueryResult["recentPosts"][number]
  | AllPostsQueryResult[number]

/**
 * Horizontal article entry used inside the post timeline. Image thumbnail
 * left, content right, byline pinned to bottom. No-image posts show a
 * typographic initial rather than a broken placeholder.
 */
export function TimelinePostCard({ post }: { post: TimelinePostData }) {
  const href = `/posts/${post.slug}`
  const initial = (post.title ?? "?").charAt(0).toUpperCase()

  return (
    <article className="group relative flex items-stretch gap-4 rounded-xl bg-transparent py-1 transition-colors sm:gap-6">
      {/* Thumbnail — fixed dimensions prevent layout shift */}
      <Link
        href={href}
        className="relative h-[4.5rem] w-[4.5rem] shrink-0 self-start overflow-hidden rounded-lg border bg-muted sm:h-24 sm:w-24"
        aria-hidden
        tabIndex={-1}
      >
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(192).height(192).url()}
            alt={post.mainImage.alt || post.title || "Article thumbnail"}
            fill
            sizes="(max-width: 640px) 72px, 96px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
          />
        ) : (
          /* Typographic initial placeholder — composed, not broken */
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="font-mono text-lg font-semibold text-muted-foreground/50 select-none">
              {initial}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-1 sm:gap-1.5">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-muted-foreground sm:text-xs">
          {post.categories?.[0] && (
            <span className="font-medium text-primary/80">
              {post.categories[0].title}
            </span>
          )}
          {post.categories?.[0] && post.publishedAt && (
            <span aria-hidden className="opacity-40">
              ·
            </span>
          )}
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold leading-snug sm:text-base md:text-[1.05rem]">
          <Link
            href={href}
            className={cn(
              "line-clamp-2 transition-colors",
              "before:absolute before:inset-0 before:content-['']",
              "group-hover:text-primary",
              "focus-visible:outline-none",
            )}
          >
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="line-clamp-1 text-xs leading-relaxed text-muted-foreground sm:line-clamp-2 sm:text-sm">
            {post.excerpt}
          </p>
        )}

        {/* Byline */}
        <div className="mt-auto flex items-center gap-1.5 pt-1">
          {post.author?.image ? (
            <span className="relative h-4 w-4 shrink-0 overflow-hidden rounded-full border sm:h-5 sm:w-5">
              <Image
                src={urlFor(post.author.image).width(40).height(40).url()}
                alt={post.author.name ?? "Author"}
                fill
                sizes="20px"
                className="object-cover"
              />
            </span>
          ) : post.author?.name ? (
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-muted text-[9px] font-semibold text-muted-foreground sm:h-5 sm:w-5">
              {post.author.name.charAt(0).toUpperCase()}
            </span>
          ) : null}
          {post.author?.name && (
            <span className="text-[11px] font-medium text-foreground/60 sm:text-xs">
              {post.author.name}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
