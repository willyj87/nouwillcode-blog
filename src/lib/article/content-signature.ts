import type {PortableTextBlock} from '@portabletext/react'

interface PortableChild {
  _type?: string
  text?: string
}

interface PortableHeadingBlock {
  _type: 'block'
  style?: string
  children?: PortableChild[]
}

export interface ArticleHeading {
  id: string
  text: string
}

export function createHeadingId(input: string): string {
  const normalized = input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
  return normalized || 'section'
}

export function extractH2Headings(body: PortableTextBlock[] | null): ArticleHeading[] {
  if (!body) return []

  const seenIds = new Map<string, number>()
  const headings: ArticleHeading[] = []

  for (const block of body) {
    const heading = block as PortableHeadingBlock
    if (heading._type !== 'block' || heading.style !== 'h2' || !heading.children) {
      continue
    }

    const text = heading.children
      .map((child) => child.text ?? '')
      .join('')
      .trim()

    if (!text) continue

    const baseId = createHeadingId(text)
    const count = (seenIds.get(baseId) ?? 0) + 1
    seenIds.set(baseId, count)

    headings.push({
      id: count === 1 ? baseId : `${baseId}-${count}`,
      text,
    })
  }

  return headings
}
