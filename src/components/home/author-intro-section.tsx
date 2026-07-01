import Image from "next/image"
import Link from "next/link"
import type { ComponentType, SVGProps } from "react"
import { GlobeIcon, MailIcon } from "lucide-react"
import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/icons/brand-icons"
import { cn } from "@/lib/utils"
import { urlFor } from "@/sanity/lib/image"
import type { HomepageDataQueryResult } from "@/sanity/sanity.types"

type Author = NonNullable<HomepageDataQueryResult["author"]>
type Social = NonNullable<Author["socials"]>[number]

const PLATFORM_ICON: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: XIcon,
  youtube: YoutubeIcon,
  website: GlobeIcon,
  email: MailIcon,
}

const PLATFORM_LABEL: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  twitter: "X (Twitter)",
  youtube: "YouTube",
  website: "Website",
  email: "Email",
}

function SocialLink({ social }: { social: Social }) {
  const platform = social.platform ?? "website"
  const Icon = PLATFORM_ICON[platform] ?? GlobeIcon
  const label = PLATFORM_LABEL[platform] ?? "Link"
  const href = platform === "email" && social.url && !social.url.startsWith("mailto:")
    ? `mailto:${social.url}`
    : (social.url ?? "#")

  return (
    <Link
      href={href}
      target={platform === "email" ? undefined : "_blank"}
      rel={platform === "email" ? undefined : "noopener noreferrer"}
      aria-label={label}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border px-3 py-1.5",
        "text-xs font-medium text-muted-foreground",
        "transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {/* Show label on md+ screens */}
      <span className="hidden sm:inline">{PLATFORM_LABEL[platform] ?? label}</span>
    </Link>
  )
}

export function AuthorIntroSection({ author }: { author: Author | null }) {
  if (!author?.name) return null

  const socials = (author.socials ?? []).filter((s) => s.url)
  const initial = author.name.charAt(0).toUpperCase()

  return (
    <section
      aria-labelledby="author-heading"
      className="relative w-full overflow-hidden rounded-2xl border bg-accent/30 p-7 md:p-10"
    >
      {/* Quiet brand glow — not glassmorphism, just a breath of color */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative flex flex-col gap-7 md:flex-row md:items-start md:gap-10">
        {/* Avatar */}
        {author.image ? (
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border md:h-24 md:w-24">
            <Image
              src={urlFor(author.image).width(192).height(192).url()}
              alt={author.name}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border bg-muted text-2xl font-bold text-muted-foreground md:h-24 md:w-24">
            {initial}
          </div>
        )}

        {/* Bio content */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
              <h2
                id="author-heading"
                className="text-xl font-bold tracking-tight md:text-2xl"
              >
                {author.name}
              </h2>
              {/* Post count — credibility signal for recruiter audience */}
              {typeof author.postCount === "number" && author.postCount > 0 && (
                <span className="text-xs font-medium text-muted-foreground">
                  {author.postCount} {author.postCount === 1 ? "post" : "posts"}
                </span>
              )}
            </div>
            {author.headline && (
              <p className="text-sm font-medium text-muted-foreground">
                {author.headline}
              </p>
            )}
          </div>

          {author.bio && (
            <p className="max-w-xl text-sm leading-relaxed text-foreground/75 md:text-base">
              {author.bio}
            </p>
          )}

          {socials.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {socials.map((social, i) => (
                <SocialLink key={`${social.platform}-${i}`} social={social} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
