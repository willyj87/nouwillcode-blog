import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"
import { Image } from "next-sanity/image"

import { GithubIcon } from "@/components/icons/brand-icons"
import { cn } from "@/lib/utils"
import { urlFor } from "@/sanity/lib/image"
import type { AllProjectsQueryResult } from "@/sanity/sanity.types"

export type ProjectRowData = AllProjectsQueryResult[number]

/**
 * Large editorial row for the projects index. Cover image and details sit
 * side by side and alternate left/right on desktop, stack on mobile. The
 * title is a stretched link to the detail page; Live / Source actions sit
 * above it so they stay independently clickable.
 */
export function ProjectRow({
  project,
  reversed = false,
}: {
  project: ProjectRowData
  reversed?: boolean
}) {
  const href = `/projects/${project.slug}`
  const initial = (project.title ?? "?").charAt(0).toUpperCase()

  return (
    <article
      className={cn(
        "group relative grid items-center gap-6 md:grid-cols-2 md:gap-12",
        reversed && "md:[&>*:first-child]:order-2",
      )}
    >
      {/* Cover */}
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className="relative block aspect-[16/10] overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10"
      >
        {project.coverImage ? (
          <Image
            src={urlFor(project.coverImage).width(1120).height(700).url()}
            alt={project.coverImage.alt || project.title || "Project cover"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-6xl font-semibold text-muted-foreground/40 select-none">
              {initial}
            </span>
          </div>
        )}
      </Link>

      {/* Details */}
      <div className="flex min-w-0 flex-col gap-4">
        {project.year && (
          <span className="font-mono text-xs text-muted-foreground">
            {project.year}
          </span>
        )}

        <h2 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">
          <Link
            href={href}
            className={cn(
              "transition-colors group-hover:text-primary focus-visible:outline-none",
              "before:absolute before:inset-0 before:content-['']",
            )}
          >
            {project.title}
          </Link>
        </h2>

        {Array.isArray(project.description) && project.description.length > 0 && (
          <p className="max-w-prose leading-relaxed text-muted-foreground line-clamp-3">
            {(project.description as { _type: string; children?: { text?: string }[] }[])
              .filter((b) => b._type === "block")
              .flatMap((b) => (b.children ?? []).map((s) => s.text ?? ""))
              .join(" ")}
          </p>
        )}

        {project.techStack && project.techStack.length > 0 && (
          <p className="font-mono text-xs leading-relaxed text-muted-foreground/80">
            {project.techStack.join(" · ")}
          </p>
        )}

        {(project.liveUrl || project.sourceUrl) && (
          <div className="relative z-10 mt-1 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-sm text-foreground transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                Live demo
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </a>
            )}
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-sm text-muted-foreground transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
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
