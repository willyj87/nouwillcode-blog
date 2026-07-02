import type { Metadata } from "next"

import { sanityFetch } from "@/sanity/lib/live"
import { allProjectsQuery } from "@/sanity/lib/queries/project"
import { ProjectRow } from "@/components/projects/project-row"

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built — shipped code, not just writing.",
}

export default async function ProjectsPage() {
  const { data: projects } = await sanityFetch({ query: allProjectsQuery })
  const list = projects ?? []

  return (
    <div className="flex flex-col gap-14">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Projects
        </h1>
        <p className="max-w-prose text-base text-muted-foreground">
          Things I&apos;ve built — shipped code, not just writing.
        </p>
      </header>

      {list.length > 0 ? (
        <div className="flex flex-col gap-16 md:gap-24">
          {list.map((project, i) => (
            <ProjectRow key={project._id} project={project} reversed={i % 2 === 1} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-20 text-center">
          <p className="text-lg font-medium">Nothing shipped here yet</p>
          <p className="max-w-prose text-sm text-muted-foreground">
            Projects will show up here as they&apos;re built. Check back soon.
          </p>
        </div>
      )}
    </div>
  )
}
