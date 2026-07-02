import type {PortableTextBlock} from '@portabletext/react'
import type {Image} from 'sanity'

export interface SocialLink {
  platform:
    | 'linkedin'
    | 'github'
    | 'twitter'
    | 'website'
    | 'email'
    | 'youtube'
  url: string
}

export interface Author {
  name: string
  slug?: string
  headline?: string
  bio?: string
  image?: Image
  socials?: SocialLink[]
}

export interface Category {
  _id: string
  title: string
  slug: string
  count?: number
}

export type ArticleLayout = 'standard' | 'deepDive' | 'visual'

export interface PostCard {
  _id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt: string
  mainImage?: Image & {alt?: string}
  author: Author
  categories?: Category[]
}

export interface Post extends PostCard {
  layout?: ArticleLayout | null
  primaryCategory?: Category | null
  body?: PortableTextBlock[]
}

export interface Project {
  _id: string
  title: string
  slug: string
  description?: string
  coverImage?: Image & {alt?: string}
  techStack?: string[]
  liveUrl?: string
  sourceUrl?: string
  year?: number
  featured?: boolean
}
