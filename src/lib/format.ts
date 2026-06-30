import readingTime from 'reading-time'
import {format} from 'date-fns'
import {enUS} from 'date-fns/locale'
import type {PortableTextBlock} from '@portabletext/react'

/** Human-readable date: "June 12, 2026". */
export function formatDate(value?: string) {
  if (!value) return ''
  return format(new Date(value), 'MMMM d, yyyy', {locale: enUS})
}

/** Extracts plain text from a Portable Text body (for reading time). */
export function toPlainText(blocks: PortableTextBlock[] = []): string {
  return blocks
    .map((block) => {
      const node = block as {
        _type: string
        children?: {text?: string}[]
        code?: string
      }
      if (node._type === 'code' && typeof node.code === 'string') {
        return node.code
      }
      if (block._type !== 'block' || !Array.isArray(node.children)) {
        return ''
      }
      return node.children.map((child) => child.text ?? '').join('')
    })
    .join('\n\n')
}

/** Estimated reading time, e.g. "4 min read". */
export function readingLabel(blocks?: PortableTextBlock[]): string {
  const minutes = Math.max(1, Math.round(readingTime(toPlainText(blocks)).minutes))
  return `${minutes} min read`
}
