import type {PortableTextBlock} from '@portabletext/react'
import Image from 'next/image'

import {Badge} from '@/components/ui/badge'
import {formatDate, readingLabel} from '@/lib/format'
import {cn} from '@/lib/utils'
import {urlFor} from '@/sanity/lib/image'
import type {Post} from '@/sanity/types'

interface ArticleMetaProps {
  post: Post
  body: PortableTextBlock[] | null
  className?: string
}

export function ArticleMeta({post, body, className}: ArticleMetaProps) {
  const authorInitial = post.author?.name?.charAt(0).toUpperCase()

  return (
    <aside className={cn('flex flex-col gap-6 text-sm text-muted-foreground', className)}>
      {post.categories && post.categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.categories.map((category) => (
            <Badge key={category._id} variant="secondary">
              {category.title}
            </Badge>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3">
        {post.author?.image ? (
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border/80">
            <Image
              src={urlFor(post.author.image).width(120).height(120).url()}
              alt={post.author.name ?? 'Author'}
              fill
              className="object-cover"
            />
          </div>
        ) : authorInitial ? (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-muted text-sm font-semibold text-foreground">
            {authorInitial}
          </div>
        ) : null}

        <div className="flex flex-col gap-0.5">
          {post.author?.name && (
            <span className="font-medium text-foreground">{post.author.name}</span>
          )}
          <span className="flex items-center gap-2">
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
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
    </aside>
  )
}
