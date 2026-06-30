import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import { formatDate } from "@/lib/format"
import type { HomepageDataQueryResult } from "@/sanity/sanity.types"

type PostData = HomepageDataQueryResult["recentPosts"][number]

/**
 * Horizontal article card used inside the post timeline. Image on the left,
 * content on the right, author byline pinned to the bottom. Reads as an
 * editorial entry rather than a boxed tile.
 */
export function TimelinePostCard({ post }: { post: PostData }) {
  const href = `/posts/${post.slug}`

  return (
    <article className="group relative flex items-stretch gap-3 rounded-2xl border bg-card p-2.5 transition-colors hover:border-primary/40 sm:gap-5 sm:p-4">
      <Link
        href={href}
        className="relative w-24 shrink-0 self-stretch overflow-hidden rounded-xl border bg-muted sm:w-40 md:w-48"
        aria-hidden
        tabIndex={-1}
      >
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(400).height(560).url()}
            alt={post.mainImage.alt || post.title || "Post image"}
            fill
            sizes="(max-width: 640px) 96px, 192px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            No image
          </div>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:gap-2">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground sm:text-xs">
          {post.categories?.[0] && (
            <span className="font-medium text-primary">
              {post.categories[0].title}
            </span>
          )}
          {post.categories?.[0] && post.publishedAt && <span aria-hidden>·</span>}
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          )}
        </div>

        <h3 className="text-sm font-semibold leading-snug sm:text-base md:text-lg">
          <Link
            href={href}
            className="line-clamp-2 transition-colors before:absolute before:inset-0 before:content-[''] group-hover:text-primary"
          >
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p className="line-clamp-1 text-xs leading-relaxed text-muted-foreground sm:line-clamp-2 sm:text-sm">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto flex items-center gap-2 pt-0.5 sm:pt-1">
          {post.author?.image ? (
            <span className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full border bg-muted sm:h-6 sm:w-6">
              <Image
                src={urlFor(post.author.image).width(48).height(48).url()}
                alt={post.author.name || "Author"}
                fill
                sizes="24px"
                className="object-cover"
              />
            </span>
          ) : null}
          {post.author?.name && (
            <span className="text-[11px] font-medium text-foreground/70 sm:text-xs">
              {post.author.name}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
