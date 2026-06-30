import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"
import type { PortableTextBlock } from "@portabletext/react"

import { sanityFetch } from "@/sanity/lib/live"
import { postBySlugQuery, postSlugsQuery } from "@/sanity/lib/queries/article"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { formatDate, readingLabel } from "@/lib/format"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PortableTextRenderer } from "@/components/portable/portable-text"

export async function generateStaticParams() {
  const slugs = await client.fetch(postSlugsQuery)
  return slugs
    .map((s) => s.slug)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { data: post } = await sanityFetch({
    query: postBySlugQuery,
    params: { slug },
  })

  if (!post) return {}

  return {
    title: post.title ?? undefined,
    description: post.excerpt ?? undefined,
    openGraph: post.mainImage
      ? { images: [urlFor(post.mainImage).width(1200).height(630).url()] }
      : undefined,
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data: post } = await sanityFetch({
    query: postBySlugQuery,
    params: { slug },
  })

  if (!post) notFound()

  const body = post.body as PortableTextBlock[] | null

  return (
    <article className="mx-auto max-w-3xl">
      <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
        <Link href="/blog">
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          All posts
        </Link>
      </Button>

      <header className="mb-8 flex flex-col gap-4">
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <Badge key={category._id} variant="secondary">
                {category.title}
              </Badge>
            ))}
          </div>
        )}

        <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-muted-foreground">{post.excerpt}</p>
        )}

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {post.author?.image && (
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
              <Image
                src={urlFor(post.author.image).width(100).height(100).url()}
                alt={post.author.name ?? "Author"}
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
            <span className="flex items-center gap-2">
              {post.publishedAt && (
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              )}
              {body && (
                <>
                  <span aria-hidden>·</span>
                  <span>{readingLabel(body)}</span>
                </>
              )}
            </span>
          </div>
        </div>
      </header>

      {post.mainImage && (
        <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <Image
            src={urlFor(post.mainImage).width(1600).height(900).url()}
            alt={post.mainImage.alt || post.title || "Post image"}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      {body && <PortableTextRenderer value={body} />}
    </article>
  )
}
