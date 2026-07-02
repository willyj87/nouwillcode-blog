import Image from "next/image"
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { GithubIcon } from "@/components/icons/brand-icons"
import { cn } from "@/lib/utils"
import { urlFor } from "@/sanity/lib/image"
import type { HomepageDataQueryResult } from "@/sanity/sanity.types"

type RecentProjects = HomepageDataQueryResult["recentProjects"]
type ProjectPreview = RecentProjects[number]

function excerptFromDescription(description: ProjectPreview["description"]) {
  if (!Array.isArray(description)) return null

  const text = description
    .flatMap((block) => {
      if (block._type !== "block" || !Array.isArray(block.children)) {
        return []
      }
      return block.children
        .map((span) => ("text" in span && typeof span.text === "string" ? span.text : ""))
        .filter(Boolean)
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()

  if (!text) return null
  return text.slice(0, 120)
}

export function ProjectPreviewCard({ project }: { project: ProjectPreview }) {
  const href = `/projects/${project.slug}`
  const initial = (project.title ?? "?").charAt(0).toUpperCase()
  const excerpt = excerptFromDescription(project.description)

  return (
    <article className="group relative flex items-stretch gap-4 rounded-xl bg-transparent py-1 transition-colors sm:gap-6">
      <Link
        href={href}
        className="relative h-[4.5rem] w-[7.25rem] shrink-0 self-start overflow-hidden rounded-lg border bg-muted ring-1 ring-foreground/10 sm:h-24 sm:w-40"
        aria-hidden
        tabIndex={-1}
      >
        {project.coverImage ? (
          <Image
            src={urlFor(project.coverImage).width(640).height(400).url()}
            alt={project.coverImage.alt || project.title || "Project cover"}
            fill
            sizes="(max-width: 640px) 116px, 160px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="font-mono text-2xl font-semibold text-muted-foreground/45 select-none">
              {initial}
            </span>
          </div>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:gap-2">
        {project.year && (
          <span className="font-mono text-[11px] text-muted-foreground sm:text-xs">
            {project.year}
          </span>
        )}

        <h3 className="text-sm font-semibold leading-snug sm:text-base md:text-[1.05rem]">
          <Link
            href={href}
            className={cn(
              "line-clamp-2 transition-colors",
              "before:absolute before:inset-0 before:content-['']",
              "group-hover:text-primary",
              "focus-visible:outline-none",
            )}
          >
            {project.title}
          </Link>
        </h3>

        {excerpt && (
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {excerpt}
          </p>
        )}

        {(project.liveUrl || project.sourceUrl) && (
          <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-[11px] font-medium sm:text-xs">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-sm text-foreground transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                Live
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </a>
            )}

            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-sm text-muted-foreground transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                Source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
