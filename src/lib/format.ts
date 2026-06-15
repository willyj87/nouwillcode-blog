import readingTime from 'reading-time'
import {format} from 'date-fns'
import {fr} from 'date-fns/locale'
import type {PortableTextBlock} from '@portabletext/react'

/** Date lisible en français : « 12 juin 2026 ». */
export function formatDate(value?: string) {
  if (!value) return ''
  return format(new Date(value), 'd MMMM yyyy', {locale: fr})
}

/** Extrait le texte brut d'un corps Portable Text (pour le temps de lecture). */
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

/** Estimation du temps de lecture, ex : « 4 min de lecture ». */
export function readingLabel(blocks?: PortableTextBlock[]): string {
  const minutes = Math.max(1, Math.round(readingTime(toPlainText(blocks)).minutes))
  return `${minutes} min de lecture`
}
