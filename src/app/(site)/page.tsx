import { sanityFetch } from "@/sanity/lib/live"
import { homepageDataQuery } from "@/sanity/lib/queries/article"
import { HeroSection } from "@/components/home/hero-section"
import { TopicsSection } from "@/components/home/topics-section"
import { PostTimelineSection } from "@/components/home/post-timeline-section"
import { ProjectsPreviewSection } from "@/components/home/projects-preview-section"
import { AuthorIntroSection } from "@/components/home/author-intro-section"
import { NewsletterSection } from "@/components/home/newsletter-section"

export default async function HomePage() {
  // Fetch homepage config, recent posts, author and topics in a single request.
  const { data } = await sanityFetch({ query: homepageDataQuery })

  const homepage = data?.homepage
  const recentPosts = data?.recentPosts ?? []
  const recentProjects = data?.recentProjects ?? []
  const author = data?.author ?? null
  const featuredTopics = homepage?.featuredTopics ?? []

  // Featured-led homepage: the hero is the editor-chosen featured post, or the
  // most recent post as a fallback. The slogan only shows when there are no
  // posts at all. The hero post is removed from the grid so it never repeats.
  const heroPost = homepage?.featuredPost ?? recentPosts[0] ?? null
  // The number of latest posts is editor-controlled via the homepage schema.
  const recentPostsCount = homepage?.recentPostsCount ?? 4
  const gridPosts = recentPosts
    .filter((post) => post._id !== heroPost?._id)
    .slice(0, recentPostsCount)

  return (
    <div className="flex flex-col gap-16 pb-16 md:gap-24">
      <HeroSection
        post={heroPost}
        emptyTitle={homepage?.heroTitle || "nouwillcode"}
        emptyTagline={
          homepage?.heroTagline ||
          "Tech articles, lessons learned, and software engineering notes."
        }
        ctaText={homepage?.ctaText}
      />

      <TopicsSection topics={featuredTopics} />

      <PostTimelineSection posts={gridPosts} ctaText={homepage?.ctaText} />

      <ProjectsPreviewSection projects={recentProjects} />

      <AuthorIntroSection author={author} />

      <NewsletterSection
        title={homepage?.newsletterTitle}
        description={homepage?.newsletterDescription}
      />
    </div>
  )
}
