'use client'

import {useEffect, useMemo, useState} from 'react'

import {cn} from '@/lib/utils'
import type {ArticleHeading} from '@/lib/article/content-signature'

interface TableOfContentsProps {
  headings: ArticleHeading[]
  className?: string
}

export function TableOfContents({headings, className}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null)

  const headingIds = useMemo(() => headings.map((heading) => heading.id), [headings])

  useEffect(() => {
    if (headingIds.length < 2) return

    const headingElements = headingIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node))

    if (headingElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries[0]?.target instanceof HTMLElement) {
          setActiveId(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: '-22% 0px -65% 0px',
        threshold: [0.2, 0.5, 0.8],
      },
    )

    headingElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [headingIds])

  if (headings.length < 2) return null

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        'sticky top-24 space-y-4 rounded-xl border border-border bg-card/60 p-4 backdrop-blur-sm',
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        In this article
      </p>
      <ol className="space-y-2">
        {headings.map((heading) => {
          const isActive = activeId === heading.id
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  'block text-sm leading-relaxed transition-colors motion-reduce:transition-none',
                  isActive ? 'font-medium text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {heading.text}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
