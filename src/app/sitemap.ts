import type { MetadataRoute } from "next"

import { SITE_URL } from "@/lib/site"
import { client } from "@/sanity/lib/client"
import { postSlugsQuery } from "@/sanity/lib/queries/article"
import { projectSlugsQuery } from "@/sanity/lib/queries/project"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [postSlugs, projectSlugs] = await Promise.all([
    client.fetch(postSlugsQuery),
    client.fetch(projectSlugsQuery),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/posts`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/projects`, changeFrequency: "weekly", priority: 0.6 },
  ]

  const postRoutes: MetadataRoute.Sitemap = postSlugs
    .map((post) => post.slug)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({
      url: `${SITE_URL}/posts/${slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    }))

  const projectRoutes: MetadataRoute.Sitemap = projectSlugs
    .map((project) => project.slug)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({
      url: `${SITE_URL}/projects/${slug}`,
      changeFrequency: "monthly",
      priority: 0.5,
    }))

  return [...staticRoutes, ...postRoutes, ...projectRoutes]
}
