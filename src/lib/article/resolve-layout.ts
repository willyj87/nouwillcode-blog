import {ARTICLE_LAYOUTS} from '@/lib/article/layouts'
import type {ArticleLayout, Post} from '@/sanity/types'

const DEFAULT_LAYOUT: ArticleLayout = 'standard'

function isArticleLayout(value: string): value is ArticleLayout {
  return value === 'standard' || value === 'deepDive' || value === 'visual'
}

export function resolveLayout(post: Pick<Post, 'layout'>) {
  const key = post.layout

  if (!key || !isArticleLayout(key)) {
    return DEFAULT_LAYOUT
  }

  if (!(key in ARTICLE_LAYOUTS)) {
    return DEFAULT_LAYOUT
  }

  return key
}
