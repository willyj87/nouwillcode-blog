import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/format"
import { urlFor } from "@/sanity/lib/image"
import type { HomepageDataQueryResult } from "@/sanity/sanity.types"

type Homepage = NonNullable<HomepageDataQueryResult["homepage"]>
type HeroPost = NonNullable<Homepage["featuredPost"]>

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

  // Empty state: no posts at all. Show the slogan and a CTA into the blog.
  if (!post) {
    return (
      <section className="w-full py-16 md:py-24">
        <div className="flex max-w-3xl flex-col gap-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {emptyTitle}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {emptyTagline}
          </p>
          <div>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/blog">{cta}</Link>
            </Button>
          </div>
        </div>
      </section>
    )
  }

  const href = `/posts/${post.slug}`

  return (
    <section className="w-full pt-8 md:pt-12">
      <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">
        Featured
      </p>

      <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <Link
          href={href}
          className="group relative block aspect-[16/10] overflow-hidden rounded-3xl border bg-muted"
        >
          {post.mainImage ? (
            <Image
              src={urlFor(post.mainImage).width(1200).height(750).url()}
              alt={post.mainImage.alt || post.title || "Featured post"}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
        </Link>

        <div className="flex flex-col gap-5">
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <Badge key={category._id} variant="secondary">
                  {category.title}
                </Badge>
              ))}
            </div>
          )}

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            <Link href={href} className="hover:text-primary transition-colors">
              {post.title}
            </Link>
          </h1>

          {post.excerpt && (
            <p className="text-lg text-muted-foreground leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {post.author?.image && (
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={urlFor(post.author.image).width(100).height(100).url()}
                  alt={post.author.name || "Author"}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-col">
              {post.author?.name && (
                <span className="font-medium text-foreground">
                  {post.author.name}
                </span>
              )}
              {post.publishedAt && (
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              )}
            </div>
          </div>

          <div className="pt-2">
            <Button asChild size="lg" className="rounded-full">
              <Link href={href}>Read article</Link>
            </Button>
          </div>
        </div>
      </article>
    </section>
  )
}
