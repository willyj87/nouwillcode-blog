import type { Metadata } from "next"

import { sanityFetch } from "@/sanity/lib/live"
import { allPostsQuery } from "@/sanity/lib/queries/article"
import { PostCard } from "@/components/home/post-card"

export const metadata: Metadata = {
  title: "Blog",
  description: "All tech articles, lessons learned, and software engineering notes.",
}

export default async function BlogPage() {
  const { data: posts } = await sanityFetch({ query: allPostsQuery })

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          All posts
        </h1>
        <p className="text-lg text-muted-foreground">
          Lessons learned and software engineering notes.
        </p>
      </header>

      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed py-20 text-center">
          <p className="text-lg font-medium">No posts yet</p>
          <p className="mt-2 text-muted-foreground">
            The first posts are coming soon. Check back shortly!
          </p>
        </div>
      )}
    </div>
  )
}
