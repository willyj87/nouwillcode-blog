import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/format"
import { urlFor } from "@/sanity/lib/image"
import type { HomepageDataQueryResult } from "@/sanity/sanity.types"

type Homepage = NonNullable<HomepageDataQueryResult["homepage"]>
type HeroPost = NonNullable<Homepage["featuredPost"]>

// ─── Empty-state hero ───────────────────────────────────────────────────────
// Rendered when there are zero posts. Uses schema fields: heroTitle,
// heroTagline, heroImage (optional), ctaText.

function EmptyHero({
  title,
  tagline,
  ctaText,
}: {
  title: string
  tagline: string
  ctaText: string
}) {
  return (
    <section className="w-full py-20 md:py-32">
      <div className="flex max-w-2xl flex-col gap-7">
        {/* Indigo signal dot — quiet brand mark */}
        <span
          aria-hidden
          className="inline-block h-2 w-2 rounded-full bg-primary"
        />
        <h1 className="text-balance text-5xl font-bold tracking-tight md:text-6xl">
          {title}
        </h1>
        <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          {tagline}
        </p>
        <div>
          <Link
            href="/posts"
            className={cn(
              "inline-flex h-11 items-center justify-center gap-2 rounded-full px-7",
              "bg-foreground text-background text-sm font-semibold",
              "transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Featured post hero ──────────────────────────────────────────────────────
// Rendered when a post exists. Every interactive element resolves to the same
// post URL. Two visual modes: image variant (mainImage present) and typographic
// variant (no image — no gray "No image" box).

export function HeroSection({
  post,
  emptyTitle,
  emptyTagline,
  ctaText,
}: {
  post?: HeroPost | null
  emptyTitle: string
  emptyTagline: string
  ctaText?: string | null
}) {
  const cta = ctaText || "View all posts"

  if (!post) {
    return (
      <EmptyHero title={emptyTitle} tagline={emptyTagline} ctaText={cta} />
    )
  }

  const href = `/posts/${post.slug}`
  const hasImage = !!post.mainImage

  return (
    <section className="w-full pt-8 md:pt-14" aria-label="Featured article">
      {/* "Featured" kicker — indigo signal, no uppercase tracking eyebrow */}
      <p className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
        <span
          className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
          aria-hidden
        />
        Featured
      </p>

      <article
        className={cn(
          "grid grid-cols-1 gap-8 lg:gap-16",
          hasImage && "lg:grid-cols-[1fr_1fr] lg:items-center",
        )}
      >
        {/* ── Image side (only when mainImage present) ── */}
        {hasImage && (
          <Link
            href={href}
            aria-hidden
            tabIndex={-1}
            className={cn(
              "group relative block overflow-hidden rounded-2xl border bg-muted",
              // Fixed aspect ratio prevents CLS during hydration
              "aspect-[16/10]",
            )}
          >
            <Image
              src={urlFor(post.mainImage!).width(1200).height(750).url()}
              alt={post.mainImage!.alt || post.title || "Featured article"}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
            />
          </Link>
        )}

        {/* ── Content side ── */}
        <div
          className={cn(
            "flex flex-col gap-5",
            !hasImage && "max-w-3xl",
          )}
        >
          {/* Tags */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.categories.map((cat) => (
                <span
                  key={cat._id}
                  className="inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  {cat.title}
                </span>
              ))}
            </div>
          )}

          {/* Title — whole link, keyboard reachable */}
          <h1
            className={cn(
              "font-bold tracking-tight text-balance",
              hasImage
                ? "text-3xl md:text-4xl lg:text-5xl"
                : "text-4xl md:text-5xl lg:text-6xl",
            )}
          >
            <Link
              href={href}
              className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            >
              {post.title}
            </Link>
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground line-clamp-3">
              {post.excerpt}
            </p>
          )}

          {/* Byline */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {post.author?.image ? (
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border">
                <Image
                  src={urlFor(post.author.image).width(64).height(64).url()}
                  alt={post.author.name ?? "Author"}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
            ) : post.author?.name ? (
              // Initials fallback
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-muted text-xs font-semibold text-foreground">
                {post.author.name.charAt(0).toUpperCase()}
              </div>
            ) : null}
            <div className="flex flex-col gap-0.5">
              {post.author?.name && (
                <span className="font-medium text-foreground">
                  {post.author.name}
                </span>
              )}
              {post.publishedAt && (
                <time dateTime={post.publishedAt} className="text-xs">
                  {formatDate(post.publishedAt)}
                </time>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-1">
            <Link
              href={href}
              className={cn(
                "inline-flex h-11 items-center justify-center gap-2 rounded-full px-7",
                "bg-foreground text-background text-sm font-semibold",
                "transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              )}
            >
              Read article
            </Link>
          </div>
        </div>
      </article>
    </section>
  )
}
