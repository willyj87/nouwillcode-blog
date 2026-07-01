import type {PortableTextBlock} from '@portabletext/react'

import {PortableTextRenderer} from '@/components/portable/portable-text'
import {cn} from '@/lib/utils'

interface ArticleBodyProps {
  body: PortableTextBlock[] | null
  className?: string
}

export function ArticleBody({body, className}: ArticleBodyProps) {
  if (!body) return null

  return (
    <div
      className={cn(
        'max-w-[72ch] text-[1.125rem] leading-[1.7] dark:leading-[1.75]',
        className,
      )}
    >
      <PortableTextRenderer value={body} />
    </div>
  )
}
