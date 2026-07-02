import type { Metadata } from "next"
import Link from "next/link"

import { sanityFetch } from "@/sanity/lib/live"
import {
  filteredProjectsCountQuery,
  filteredProjectsQuery,
} from "@/sanity/lib/queries/project"
import { ProjectRow } from "@/components/projects/project-row"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built — shipped code, not just writing.",
}

const PAGE_SIZE = 3

function toPositiveInt(value?: string) {
  if (!value) return 1
  const parsed = Number.parseInt(value, 10)
  if (!Number.isFinite(parsed) || parsed < 1) return 1
  return parsed
}

function buildPaginationItems(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const items: Array<number | "ellipsis"> = [1]
  const start = Math.max(2, currentPage - 1)
  const end = Math.min(totalPages - 1, currentPage + 1)

  if (start > 2) items.push("ellipsis")
  for (let page = start; page <= end; page += 1) items.push(page)
  if (end < totalPages - 1) items.push("ellipsis")

  items.push(totalPages)
  return items
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const params = await searchParams
  const rawQuery = params.q?.trim() ?? ""
  const search = rawQuery ? `*${rawQuery}*` : ""

  const { data: totalCount } = await sanityFetch({
    query: filteredProjectsCountQuery,
    params: { search },
  })

  const total = totalCount ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const requestedPage = toPositiveInt(params.page)
  const currentPage = Math.min(requestedPage, totalPages)
  const start = (currentPage - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  const { data: projects } = await sanityFetch({
    query: filteredProjectsQuery,
    params: { search, start, end },
  })

  const list = projects ?? []
  const paginationItems = buildPaginationItems(currentPage, totalPages)

  const hrefForPage = (page: number) => {
    const nextParams = new URLSearchParams()
    if (rawQuery) nextParams.set("q", rawQuery)
    if (page > 1) nextParams.set("page", String(page))
    const queryString = nextParams.toString()
    return queryString ? `/projects?${queryString}` : "/projects"
  }

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

      <section className="flex flex-col gap-4 shadow-sm rounded-2xl bg-background/50 p-4 md:p-5 md:w-1/2 md:mx-auto">
        <form action="/projects" method="get" className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="projects-search" className="sr-only">
            Search projects by title
          </label>
          <Input
            id="projects-search"
            name="q"
            defaultValue={rawQuery}
            placeholder="Search projects by title"
            className="h-10"
          />
          <Button type="submit" variant="outline" className="h-10 sm:px-5">
            Search
          </Button>
          {rawQuery && (
            <Button asChild variant="ghost" className="h-10 sm:px-5">
              <Link href="/projects">Reset</Link>
            </Button>
          )}
        </form>

        <p className="text-sm text-muted-foreground">
          {total} {total === 1 ? "project" : "projects"}
          {rawQuery ? ` for “${rawQuery}”` : ""}
        </p>
      </section>

      {list.length > 0 ? (
        <>
          <div className="flex flex-col gap-16 md:gap-24">
            {list.map((project, i) => (
              <ProjectRow key={project._id} project={project} reversed={i % 2 === 1} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={hrefForPage(currentPage - 1)}
                    aria-disabled={currentPage <= 1}
                    className={currentPage <= 1 ? "pointer-events-none opacity-50" : undefined}
                  />
                </PaginationItem>

                {paginationItems.map((item, index) => (
                  <PaginationItem key={`${item}-${index}`}>
                    {item === "ellipsis" ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink href={hrefForPage(item)} isActive={item === currentPage}>
                        {item}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href={hrefForPage(currentPage + 1)}
                    aria-disabled={currentPage >= totalPages}
                    className={currentPage >= totalPages ? "pointer-events-none opacity-50" : undefined}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-20 text-center">
          <p className="text-lg font-medium">
            {rawQuery ? "No projects match your search" : "Nothing shipped here yet"}
          </p>
          <p className="max-w-prose text-sm text-muted-foreground">
            {rawQuery
              ? "Try another keyword or clear the search to browse all projects."
              : "Projects will show up here as they&apos;re built. Check back soon."}
          </p>
        </div>
      )}
    </div>
  )
}
