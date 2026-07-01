import type {ArticleLayout} from '@/sanity/types'

interface ArticleLayoutDefinition {
  label: string
  requiresImage?: boolean
}

export const ARTICLE_LAYOUTS: Record<ArticleLayout, ArticleLayoutDefinition> = {
  standard: {
    label: 'Standard (Notebook)',
  },
  deepDive: {
    label: 'Deep-dive',
  },
  visual: {
    label: 'Visual',
    requiresImage: true,
  },
}
