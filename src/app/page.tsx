import { sanityFetch } from "@/sanity/lib/live"
import { homepageDataQuery } from "@/sanity/lib/queries/article"
import { HeroSection } from "@/components/home/hero-section"
import { RecentPostsSection } from "@/components/home/recent-posts-section"
import { NewsletterSection } from "@/components/home/newsletter-section"

export default async function HomePage() {
  // Fetch homepage data and recent posts in a single request
  const { data } = await sanityFetch({ query: homepageDataQuery })

  const homepage = data?.homepage
  const recentPosts = data?.recentPosts ?? []

  // The Hero always renders, falling back to defaults when the homepage
  // singleton has not been created yet in Sanity Studio.
  return (
    <div className="flex flex-col gap-8 md:gap-16 pb-16">
      <HeroSection
        title={homepage?.heroTitle || "nouwillcode"}
        tagline={
          homepage?.heroTagline ||
          "Tech articles, lessons learned, and software engineering notes."
        }
        heroImage={homepage?.heroImage}
        featuredPost={homepage?.featuredPost}
        ctaText={homepage?.ctaText}
      />

      <RecentPostsSection posts={recentPosts} ctaText={homepage?.ctaText} />

      <NewsletterSection
        title={homepage?.newsletterTitle}
        description={homepage?.newsletterDescription}
      />
    </div>
  )
}
