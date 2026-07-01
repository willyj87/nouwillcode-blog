import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import type {PortableTextBlock} from '@portabletext/react'
import {ArrowLeftIcon} from 'lucide-react'

import {ArticleLayoutDispatcher} from '@/components/article/layouts/article-layout-dispatcher'
import {Button} from '@/components/ui/button'
import {client} from '@/sanity/lib/client'
import {urlFor} from '@/sanity/lib/image'
import {sanityFetch} from '@/sanity/lib/live'
import {postBySlugQuery, postSlugsQuery} from '@/sanity/lib/queries/article'
import type {Post} from '@/sanity/types'

export async function generateStaticParams() {
  const slugs = await client.fetch(postSlugsQuery)
  return slugs
    .map((s) => s.slug)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({slug}))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>
}): Promise<Metadata> {
  const {slug} = await params
  const {data: post} = await sanityFetch({
    query: postBySlugQuery,
    params: {slug},
  })

  if (!post) return {}

  return {
    title: post.title ?? undefined,
    description: post.excerpt ?? undefined,
    openGraph: post.mainImage
      ? {images: [urlFor(post.mainImage).width(1200).height(630).url()]}
      : undefined,
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  const {data: postData} = await sanityFetch({
    query: postBySlugQuery,
    params: {slug},
  })

  if (!postData) notFound()

  const post = postData as Post
  const body = post.body as PortableTextBlock[] | null

  return (
    <div className="mx-auto w-full max-w-6xl">
      <Button variant="ghost" size="sm" asChild className="mb-8 -ml-2">
        <Link href="/posts">
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          All posts
        </Link>
      </Button>

      <ArticleLayoutDispatcher post={post} body={body} />
    </div>
  )
}
