import type { Metadata } from "next"

import { sanityFetch } from "@/sanity/lib/live"
import { allCategoriesQuery, allPostsQuery } from "@/sanity/lib/queries/article"
import { PostsArchive } from "@/components/posts/posts-archive"

export const metadata: Metadata = {
  title: "Posts",
  description: "All tech articles, lessons learned, and software engineering notes.",
}

type RouteSearchParams = Record<string, string | string[] | undefined>

function readParam(
  params: RouteSearchParams | undefined,
  key: string,
): string | undefined {
  const value = params?.[key]
  if (Array.isArray(value)) return value[0]
  return value
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams?: Promise<RouteSearchParams>
}) {
  const params = await searchParams
  const initialCategorySlug =
    readParam(params, "category") ?? readParam(params, "tag")
  const initialSearchQuery = readParam(params, "search") ?? readParam(params, "q")

  const [{ data: posts }, { data: categories }] = await Promise.all([
    sanityFetch({ query: allPostsQuery }),
    sanityFetch({ query: allCategoriesQuery }),
  ])

  return (
    <main className="flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          All posts
        </h1>
        <p className="max-w-prose text-base text-muted-foreground">
          Lessons learned and software engineering notes.
        </p>
      </header>

      <PostsArchive
        posts={posts ?? []}
        categories={categories ?? []}
        initialCategorySlug={initialCategorySlug}
        initialSearchQuery={initialSearchQuery}
      />
    </main>
  )
}
