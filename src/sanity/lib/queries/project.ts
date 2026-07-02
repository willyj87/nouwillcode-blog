import { defineQuery } from "next-sanity"

/** Common fields for a project as displayed in the list and on the detail page. */
const projectCardFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  description,
  coverImage,
  techStack,
  liveUrl,
  sourceUrl,
  year,
  featured
`

/** List of projects, newest first (by year, then creation date). */
export const allProjectsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)]
    | order(coalesce(year, 0) desc, _createdAt desc) {
      ${projectCardFields}
  }
`)

/** Count projects for the `/projects` search. */
export const filteredProjectsCountQuery = defineQuery(`
  count(*[
    _type == "project" &&
    defined(slug.current) &&
    ($search == "" || title match $search || slug.current match $search)
  ])
`)

/** Paginated projects list for the `/projects` page search and pagination. */
export const filteredProjectsQuery = defineQuery(`
  *[
    _type == "project" &&
    defined(slug.current) &&
    ($search == "" || title match $search || slug.current match $search)
  ]
    | order(coalesce(year, 0) desc, _createdAt desc)[$start...$end] {
      ${projectCardFields}
  }
`)

/** A single project by its slug. */
export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    ${projectCardFields}
  }
`)

/** Slugs of all projects (generateStaticParams). */
export const projectSlugsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)]{ "slug": slug.current }
`)
