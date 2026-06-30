import { defineQuery, groq } from "next-sanity"

/** Common fields for a post as displayed in the feed. */
const postCardFields = /* groq */ `
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

/** List of posts for the feed, newest first. */
export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    ${postCardFields}
  }
`)

/** A full post by its slug. */
export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    ${postCardFields},
    body
  }
`)

/** Slugs of all posts (generateStaticParams). */
export const postSlugsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`)

/** Author profile displayed in the sidebar. */
export const authorProfileQuery = defineQuery(`
  *[_type == "author"] | order(_createdAt asc)[0] {
    name,
    headline,
    bio,
    image,
    socials
  }
`)

/** All tech tags with their associated post count. */
export const allCategoriesQuery = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    "count": count(*[_type == "post" && references(^._id)])
  }
`)

/** Full homepage data (singleton + recent posts). */
export const homepageDataQuery = defineQuery(`
  {
    "homepage": *[_type == "homepage" && _id == "homepage"][0] {
      heroTitle,
      heroTagline,
      heroImage,
      ctaText,
      newsletterTitle,
      newsletterDescription,
      "featuredPost": featuredPost->{
        ${postCardFields}
      }
    },
    "recentPosts": *[_type == "post" && defined(slug.current) && _id != *[_type == "homepage" && _id == "homepage"][0].featuredPost._ref] | order(publishedAt desc)[0...6] {
      ${postCardFields}
    }
  }
`)
