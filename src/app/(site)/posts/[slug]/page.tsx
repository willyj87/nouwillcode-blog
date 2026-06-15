import {notFound} from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type {Metadata} from 'next'
import {ArrowLeft, CalendarDays, Clock} from 'lucide-react'

import {client} from '@/sanity/lib/client'
import {
  authorProfileQuery,
  postBySlugQuery,
  postSlugsQuery,
} from '@/sanity/lib/queries'
import {urlFor} from '@/sanity/lib/image'
import type {Author, Post} from '@/sanity/types'
import {formatDate, readingLabel} from '@/lib/format'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Badge} from '@/components/ui/badge'
import {Card} from '@/components/ui/card'
import {Separator} from '@/components/ui/separator'
import {ProfileSidebar} from '@/components/layout/profile-sidebar'
import {PortableTextRenderer} from '@/components/portable/portable-text'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await client.fetch<{slug: string}[]>(postSlugsQuery)
  return slugs.map(({slug}) => ({slug}))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>
}): Promise<Metadata> {
  const {slug} = await params
  const post = await client.fetch<Post | null>(postBySlugQuery, {slug})
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.mainImage
      ? {images: [urlFor(post.mainImage).width(1200).height(630).url()]}
      : undefined,
  }
}

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default async function PostPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  const [post, author] = await Promise.all([
    client.fetch<Post | null>(postBySlugQuery, {slug}),
    client.fetch<Author | null>(authorProfileQuery),
  ])

  if (!post) notFound()

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <article className="min-w-0">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Retour au feed
        </Link>

        <Card className="overflow-hidden">
          {post.mainImage ? (
            <div className="relative aspect-[16/9] w-full bg-muted">
              <Image
                src={urlFor(post.mainImage).width(1600).height(900).fit('crop').url()}
                alt={post.mainImage.alt || post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="p-6 sm:p-8">
            {post.categories?.length ? (
              <div className="mb-3 flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <Badge key={category._id}>{category.title}</Badge>
                ))}
              </div>
            ) : null}

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              {post.title}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <Avatar className="size-11">
                {post.author.image ? (
                  <AvatarImage
                    src={urlFor(post.author.image)
                      .width(88)
                      .height(88)
                      .fit('crop')
                      .url()}
                    alt={post.author.name}
                  />
                ) : (
                  <AvatarFallback>{initials(post.author.name)}</AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {post.author.name}
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="size-3.5" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" />
                    {readingLabel(post.body)}
                  </span>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="text-[15px]">
              {post.body?.length ? (
                <PortableTextRenderer value={post.body} />
              ) : (
                <p className="text-muted-foreground">Article sans contenu.</p>
              )}
            </div>
          </div>
        </Card>
      </article>

      <aside className="hidden flex-col gap-4 lg:flex">
        <ProfileSidebar author={author} />
      </aside>
    </div>
  )
}
