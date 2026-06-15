import Image from 'next/image'
import Link from 'next/link'
import {MessageSquare, ThumbsUp} from 'lucide-react'

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Badge} from '@/components/ui/badge'
import {Card} from '@/components/ui/card'
import {Separator} from '@/components/ui/separator'
import {formatDate} from '@/lib/format'
import {urlFor} from '@/sanity/lib/image'
import type {PostCard as PostCardType} from '@/sanity/types'

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function PostCard({post}: {post: PostCardType}) {
  const {author} = post

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <article>
        {/* En-tête type LinkedIn : auteur + méta */}
        <header className="flex items-center gap-3 p-4">
          <Avatar className="size-12">
            {author.image ? (
              <AvatarImage
                src={urlFor(author.image).width(96).height(96).fit('crop').url()}
                alt={author.name}
              />
            ) : (
              <AvatarFallback>{initials(author.name)}</AvatarFallback>
            )}
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">
              {author.name}
            </p>
            {author.headline ? (
              <p className="truncate text-xs text-gray-500">
                {author.headline}
              </p>
            ) : null}
            <p className="text-xs text-gray-400">{formatDate(post.publishedAt)}</p>
          </div>
        </header>

        <Link href={`/posts/${post.slug}`} className="block">
          <div className="px-4 pb-3">
            <h2 className="text-lg font-semibold leading-snug text-gray-900 hover:text-primary">
              {post.title}
            </h2>
            {post.excerpt ? (
              <p className="mt-1.5 line-clamp-3 text-sm leading-6 text-gray-600">
                {post.excerpt}
              </p>
            ) : null}
          </div>

          {post.mainImage ? (
            <div className="relative aspect-[16/9] w-full bg-muted">
              <Image
                src={urlFor(post.mainImage).width(1200).height(675).fit('crop').url()}
                alt={post.mainImage.alt || post.title}
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                className="object-cover"
              />
            </div>
          ) : null}
        </Link>

        {post.categories?.length ? (
          <div className="flex flex-wrap gap-2 px-4 pt-3">
            {post.categories.map((category) => (
              <Badge key={category._id} variant="secondary">
                {category.title}
              </Badge>
            ))}
          </div>
        ) : null}

        <Separator className="mt-3" />

        <footer className="flex items-center gap-6 px-4 py-2 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <ThumbsUp className="size-4" /> J&apos;aime
          </span>
          <span className="flex items-center gap-1.5">
            <MessageSquare className="size-4" /> Commenter
          </span>
        </footer>
      </article>
    </Card>
  )
}
