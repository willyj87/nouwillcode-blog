import {Hash} from 'lucide-react'

import {Badge} from '@/components/ui/badge'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import type {Category} from '@/sanity/types'

export function TagList({categories}: {categories: Category[]}) {
  if (!categories.length) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">
          <Hash className="size-4" />
          Tags tech
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge key={category._id} variant="default" className="gap-1">
            {category.title}
            {typeof category.count === 'number' ? (
              <span className="text-accent-foreground/60">
                {category.count}
              </span>
            ) : null}
          </Badge>
        ))}
      </CardContent>
    </Card>
  )
}
