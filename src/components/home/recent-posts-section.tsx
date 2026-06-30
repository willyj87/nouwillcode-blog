import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { HomepageDataQueryResult } from "@/sanity/sanity.types"
import { PostCard } from "./post-card"

type RecentPosts = HomepageDataQueryResult["recentPosts"]

export function RecentPostsSection({
  posts,
  ctaText,
}: {
  posts: RecentPosts
  ctaText?: string | null
}) {
  const cta = ctaText || "View all posts"
  const hasPosts = Boolean(posts && posts.length > 0)

  return (
    <section className="w-full py-16">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Latest posts</h2>
          <p className="text-muted-foreground mt-2">Explore the most recent publications.</p>
        </div>
        {hasPosts && (
          <Button variant="outline" asChild className="hidden md:inline-flex rounded-full">
            <Link href="/blog">{cta}</Link>
          </Button>
        )}
      </div>

      {hasPosts ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts!.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          <div className="mt-10 flex justify-center md:hidden">
            <Button variant="outline" asChild className="w-full sm:w-auto rounded-full">
              <Link href="/blog">{cta}</Link>
            </Button>
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-dashed py-20 text-center">
          <p className="text-lg font-medium">No posts yet</p>
          <p className="mt-2 text-muted-foreground">
            The first posts are coming soon. Check back shortly!
          </p>
        </div>
      )}
    </section>
  )
}
