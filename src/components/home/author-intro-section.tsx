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
import { urlFor } from "@/sanity/lib/image"
import type { HomepageDataQueryResult } from "@/sanity/sanity.types"

type Author = NonNullable<HomepageDataQueryResult["author"]>
type Social = NonNullable<Author["socials"]>[number]

const PLATFORM_ICON: Record<
  string,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
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
  twitter: "X",
  youtube: "YouTube",
  website: "Website",
  email: "Email",
}

function SocialLink({ social }: { social: Social }) {
  const platform = social.platform ?? "website"
  const Icon = PLATFORM_ICON[platform] ?? GlobeIcon
  const label = PLATFORM_LABEL[platform] ?? "Link"

  return (
    <Link
      href={social.url ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
    >
      <Icon className="h-[18px] w-[18px]" />
    </Link>
  )
}

export function AuthorIntroSection({ author }: { author: Author | null }) {
  if (!author?.name) return null

  const socials = (author.socials ?? []).filter((s) => s.url)

  return (
    <section
      aria-labelledby="author-heading"
      className="relative w-full overflow-hidden rounded-3xl border bg-accent/40 p-8 md:p-12"
    >
      {/* Soft brand glow anchored to the corner — quiet, not glassmorphism. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl"
      />

      <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center">
        {author.image && (
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border md:h-28 md:w-28">
            <Image
              src={urlFor(author.image).width(224).height(224).url()}
              alt={author.name}
              fill
              sizes="112px"
              className="object-cover"
            />
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-primary">
              Written by
            </span>
            <h2
              id="author-heading"
              className="text-2xl font-bold tracking-tight md:text-3xl"
            >
              {author.name}
            </h2>
            {author.headline && (
              <p className="text-base font-medium text-muted-foreground">
                {author.headline}
              </p>
            )}
          </div>

          {author.bio && (
            <p className="max-w-2xl text-base leading-relaxed text-foreground/80">
              {author.bio}
            </p>
          )}

          {socials.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
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
