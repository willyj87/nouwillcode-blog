import type {PortableTextBlock} from '@portabletext/react'

import {ArticleBody} from '@/components/article/layouts/shared/article-body'
import {ArticleMeta} from '@/components/article/layouts/shared/article-meta'
import {TableOfContents} from '@/components/article/layouts/shared/table-of-contents'
import {extractH2Headings} from '@/lib/article/content-signature'
import type {Post} from '@/sanity/types'

interface DeepDiveLayoutProps {
  post: Post
  body: PortableTextBlock[] | null
}

export function DeepDiveLayout({post, body}: DeepDiveLayoutProps) {
  const headings = extractH2Headings(body)
  const hasSections = headings.length > 1

  return (
    <article className="mx-auto w-full max-w-6xl">
      <header className="border-border border-b pb-10">
        <div className="flex max-w-[52rem] flex-col gap-6">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Deep dive
          </span>

          <h1 className="font-heading text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              {post.excerpt}
            </p>
          )}

          <ArticleMeta post={post} body={body} className="mt-2" />

          {hasSections && (
            <p className="mt-2 flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="tabular-nums text-foreground/70">
                {String(headings.length).padStart(2, '0')}
              </span>
              <span>sections — jump between them from the outline as you read</span>
            </p>
          )}
        </div>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
        <aside className="hidden lg:block">
          <TableOfContents headings={headings} />
        </aside>
        <ArticleBody body={body} />
      </div>
    </article>
  )
}
