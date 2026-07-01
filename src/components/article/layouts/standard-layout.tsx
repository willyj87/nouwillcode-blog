import Image from 'next/image'
import type {PortableTextBlock} from '@portabletext/react'

import {ArticleBody} from '@/components/article/layouts/shared/article-body'
import {ArticleMeta} from '@/components/article/layouts/shared/article-meta'
import {urlFor} from '@/sanity/lib/image'
import type {Post} from '@/sanity/types'

interface StandardLayoutProps {
  post: Post
  body: PortableTextBlock[] | null
}

export function StandardLayout({post, body}: StandardLayoutProps) {
  return (
    <article className="mx-auto w-full max-w-6xl">
      <header className="border-border border-b pb-10">
        <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
          <ArticleMeta post={post} body={body} className="order-2 lg:order-1 lg:pt-2" />

          <div className="order-1 flex flex-col gap-5 lg:order-2">
            <h1 className="font-heading text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="max-w-[68ch] text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                {post.excerpt}
              </p>
            )}
          </div>
        </div>
      </header>

      {post.mainImage && (
        <figure className="mt-8 grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
          <div className="hidden lg:block" />
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border bg-muted">
            <Image
              src={urlFor(post.mainImage).width(1600).height(900).url()}
              alt={post.mainImage.alt || post.title || 'Post image'}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
            />
          </div>
        </figure>
      )}

      {body && (
        <div className="mt-10 grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
          <aside className="hidden lg:flex lg:flex-col lg:gap-1 lg:pt-1 lg:text-xs lg:text-muted-foreground">
            <span className="font-medium text-foreground/80">Reading focus</span>
            <span>Distraction-free long-form</span>
          </aside>
          <ArticleBody body={body} />
        </div>
      )}
    </article>
  )
}
