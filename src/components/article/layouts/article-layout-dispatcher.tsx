import type {PortableTextBlock} from '@portabletext/react'

import {resolveLayout} from '@/lib/article/resolve-layout'
import type {Post} from '@/sanity/types'

import {DeepDiveLayout} from './deep-dive-layout'
import {StandardLayout} from './standard-layout'
import {VisualLayout} from './visual-layout'

interface ArticleLayoutDispatcherProps {
  post: Post
  body: PortableTextBlock[] | null
}

export function ArticleLayoutDispatcher({post, body}: ArticleLayoutDispatcherProps) {
  const layout = resolveLayout(post)

  switch (layout) {
    case 'deepDive':
      return <DeepDiveLayout post={post} body={body} />
    case 'visual':
      return <VisualLayout post={post} body={body} />
    case 'standard':
    default:
      return <StandardLayout post={post} body={body} />
  }
}
