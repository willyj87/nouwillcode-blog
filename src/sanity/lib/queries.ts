import {groq} from 'next-sanity'

/** Champs communs d'un article tel qu'affiché dans le feed. */
const postCardFields = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage,
  "author": author->{
    name,
    "slug": slug.current,
    headline,
    image
  },
  "categories": categories[]->{
    _id,
    title,
    "slug": slug.current
  }
`

/** Liste des articles pour le feed, du plus récent au plus ancien. */
export const allPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    ${postCardFields}
  }
`

/** Un article complet par son slug. */
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${postCardFields},
    body
  }
`

/** Slugs de tous les articles (generateStaticParams). */
export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`

/** Profil de l'auteur affiché dans la sidebar. */
export const authorProfileQuery = groq`
  *[_type == "author"] | order(_createdAt asc)[0] {
    name,
    headline,
    bio,
    image,
    socials
  }
`

/** Tous les tags tech avec le nombre d'articles associés. */
export const allCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    "count": count(*[_type == "post" && references(^._id)])
  }
`
