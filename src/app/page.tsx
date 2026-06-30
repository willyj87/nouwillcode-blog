import { sanityFetch } from "@/sanity/lib/live"
import { homepageDataQuery } from "@/sanity/lib/queries/article"
import { HeroSection } from "@/components/home/hero-section"
import { RecentPostsSection } from "@/components/home/recent-posts-section"
import { NewsletterSection } from "@/components/home/newsletter-section"

export default async function HomePage() {
  // Fetch homepage config and recent posts in a single request.
  const { data } = await sanityFetch({ query: homepageDataQuery })

  const homepage = data?.homepage
  const recentPosts = data?.recentPosts ?? []

  // Featured-led homepage: the hero is the editor-chosen featured post, or the
  // most recent post as a fallback. The slogan only shows when there are no
  // posts at all. The hero post is removed from the grid so it never repeats.
  const heroPost = homepage?.featuredPost ?? recentPosts[0] ?? null
  const gridPosts = recentPosts
    .filter((post) => post._id !== heroPost?._id)
    .slice(0, 6)

  return (
    <div className="flex flex-col gap-8 md:gap-16 pb-16">
      <HeroSection
        post={heroPost}
        emptyTitle={homepage?.heroTitle || "nouwillcode"}
        emptyTagline={
          homepage?.heroTagline ||
          "Tech articles, lessons learned, and software engineering notes."
        }
        ctaText={homepage?.ctaText}
      />

      <RecentPostsSection posts={gridPosts} ctaText={homepage?.ctaText} />

      <NewsletterSection
        title={homepage?.newsletterTitle}
        description={homepage?.newsletterDescription}
      />
    </div>
  )
}
