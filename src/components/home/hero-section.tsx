import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { urlFor } from "@/sanity/lib/image"
import type { HomepageDataQueryResult } from "@/sanity/sanity.types"
import { PostCard } from "./post-card"

type Homepage = NonNullable<HomepageDataQueryResult["homepage"]>

export function HeroSection({
  title,
  tagline,
  heroImage,
  featuredPost,
  ctaText,
}: {
  title: string
  tagline: string
  heroImage?: Homepage["heroImage"]
  featuredPost?: Homepage["featuredPost"]
  ctaText?: string | null
}) {
  const cta = ctaText || "View all posts"
  return (
    <section className="relative w-full py-16 md:py-24 rounded-3xl overflow-hidden mb-16 flex flex-col items-center justify-center min-h-[70vh]">
      {/* Background Image with Overlay */}
      {heroImage && (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={urlFor(heroImage).url()}
              alt={heroImage.alt || ""}
              fill
              className="object-cover opacity-20 dark:opacity-10"
              priority
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </>
      )}

      <div className="relative z-10 container flex flex-col items-center text-center max-w-4xl mx-auto px-4 gap-8">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {tagline}
          </p>
        </div>
        
        {featuredPost ? (
          <div className="w-full max-w-3xl mt-8 text-left animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 fill-mode-both">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 text-center">
              Featured
            </h2>
            <PostCard post={featuredPost} />
          </div>
        ) : (
          <div className="mt-8">
            <Button asChild size="lg" className="rounded-full px-8 text-lg font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <Link href="/blog">{cta}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
