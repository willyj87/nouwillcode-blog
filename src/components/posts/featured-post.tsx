import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import { formatDate } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { AllPostsQueryResult } from "@/sanity/sanity.types"

type PostData = AllPostsQueryResult[number]

interface FeaturedPostProps {
  post: PostData
  /** Index within the featured band (0 = lead, 1-2 = secondary). */
  index: number
}

/**
 * Editorial featured entry used in the top band of the posts archive.
 * Lead post (index 0) gets a larger cover image + long excerpt.
 * Secondary posts (index 1–2) are more compact but still have editorial weight.
 */
export function FeaturedPost({ post, index }: FeaturedPostProps) {
  const href = `/posts/${post.slug}`
  const isLead = index === 0
  const initial = (post.title ?? "?").charAt(0).toUpperCase()
  const primaryCategory = post.categories?.[0]

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-4",
        isLead ? "sm:col-span-1" : "",
      )}
    >
      {/* Cover image */}
      <Link
        href={href}
        className={cn(
          "relative block overflow-hidden rounded-lg bg-muted",
          isLead ? "aspect-[16/10]" : "aspect-[16/10]",
        )}
        tabIndex={-1}
        aria-hidden
      >
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage)
              .width(isLead ? 1200 : 640)
              .height(isLead ? 675 : 400)
              .url()}
            alt={post.mainImage.alt ?? post.title ?? "Article cover"}
            fill
            sizes={
              isLead
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
            priority={isLead}
          />
        ) : (
          /* Typographic initial — keeps layout intact without a cover image */
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="select-none font-mono text-4xl font-semibold text-muted-foreground/30">
              {initial}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-2">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
          {primaryCategory && (
            <Link
              href={`/posts?category=${primaryCategory.slug}`}
              className="font-medium text-primary/80 transition-colors hover:text-primary"
            >
              {primaryCategory.title}
            </Link>
          )}
          {primaryCategory && post.publishedAt && (
            <span aria-hidden className="opacity-40">·</span>
          )}
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          )}
        </div>

        {/* Title */}
        <h2
          className={cn(
            "text-balance font-semibold leading-snug tracking-tight",
            isLead
              ? "text-lg sm:text-xl md:text-2xl"
              : "text-base sm:text-lg",
          )}
        >
          <Link
            href={href}
            className={cn(
              "transition-colors group-hover:text-primary",
              // full-card click area
              "before:absolute before:inset-0 before:content-['']",
              "focus-visible:outline-none focus-visible:ring-0",
            )}
          >
            {post.title}
          </Link>
        </h2>

        {/* Excerpt — lead gets more lines */}
        {post.excerpt && (
          <p
            className={cn(
              "text-sm leading-relaxed text-muted-foreground",
              isLead ? "line-clamp-3" : "line-clamp-2",
            )}
          >
            {post.excerpt}
          </p>
        )}

        {/* Author byline */}
        {post.author?.name && (
          <div className="mt-1 flex items-center gap-1.5">
            {post.author.image ? (
              <span className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full border">
                <Image
                  src={urlFor(post.author.image).width(40).height(40).url()}
                  alt={post.author.name}
                  fill
                  sizes="20px"
                  className="object-cover"
                />
              </span>
            ) : (
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-[9px] font-semibold text-muted-foreground">
                {post.author.name.charAt(0).toUpperCase()}
              </span>
            )}
            <span className="text-xs font-medium text-foreground/60">
              {post.author.name}
            </span>
          </div>
        )}
      </div>
    </article>
  )
}
