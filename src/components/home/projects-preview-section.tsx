import Link from "next/link"

import type { HomepageDataQueryResult } from "@/sanity/sanity.types"
import { ProjectPreviewCard } from "./project-preview-card"

type RecentProjects = HomepageDataQueryResult["recentProjects"]

export function ProjectsPreviewSection({
  projects,
}: {
  projects: RecentProjects
}) {
  const items = projects ?? []
  const hasProjects = items.length > 0

  if (!hasProjects) {
    return (
      <section aria-labelledby="projects-heading" className="w-full">
        <h2 id="projects-heading" className="sr-only">
          Recent projects
        </h2>
        <div className="flex flex-col items-start gap-3 border-l border-dashed py-2 pl-6">
          <p className="text-sm font-medium text-foreground">Nothing shipped here yet</p>
          <p className="text-sm text-muted-foreground">
            New projects will land here as they ship.
          </p>
          <Link
            href="/projects"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            View all projects
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section aria-labelledby="projects-heading" className="w-full">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h2 id="projects-heading" className="text-sm font-semibold text-muted-foreground">
          Recent projects
        </h2>
        <Link
          href="/projects"
          className="hidden text-xs font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
        >
          View all projects
        </Link>
      </div>

      <ol className="flex flex-col gap-8">
        {items.map((project) => (
          <li key={project._id}>
            <ProjectPreviewCard project={project} />
          </li>
        ))}
      </ol>

      <div className="mt-10 md:hidden">
        <Link
          href="/projects"
          className="inline-flex h-10 w-full items-center justify-center rounded-full border text-sm font-medium transition-colors hover:bg-muted sm:w-auto sm:px-8"
        >
          View all projects
        </Link>
      </div>
    </section>
  )
}
