import type {PortableTextBlock} from '@portabletext/react'
import {Image} from 'next-sanity/image'

import {ArticleBody} from '@/components/article/layouts/shared/article-body'
import {ArticleMeta} from '@/components/article/layouts/shared/article-meta'
import {urlFor} from '@/sanity/lib/image'
import type {Post} from '@/sanity/types'

interface VisualLayoutProps {
  post: Post
  body: PortableTextBlock[] | null
}

export function VisualLayout({post, body}: VisualLayoutProps) {
  return (
    <article className="mx-auto w-full max-w-6xl">
      {post.mainImage ? (
        <figure className="relative overflow-hidden rounded-2xl border border-border bg-muted">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={urlFor(post.mainImage).width(1800).height(1012).url()}
              alt={post.mainImage.alt || post.title || 'Post image'}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1120px"
              className="object-cover motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 motion-safe:duration-500 motion-reduce:animate-none"
            />
          </div>
        </figure>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-muted/50 p-6 text-sm text-muted-foreground">
          The Visual layout expects a cover image. Add one in Sanity to complete this presentation.
        </div>
      )}

      <header className="mt-8 border-b border-border pb-10">
        <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
          <ArticleMeta post={post} body={body} className="order-2 lg:order-1 lg:pt-2" />

          <div className="order-1 flex flex-col gap-5 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-500 motion-reduce:animate-none lg:order-2">
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

      <div className="mt-10 grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
        <div className="hidden lg:block" />
        <ArticleBody body={body} className="[&_figcaption]:font-mono [&_figcaption]:text-xs [&_figure]:my-10 [&_img]:rounded-xl" />
      </div>
    </article>
  )
}
