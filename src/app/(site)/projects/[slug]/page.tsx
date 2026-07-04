import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon, ArrowUpRightIcon } from "lucide-react"
import { Image } from "next-sanity/image"

import { GithubIcon } from "@/components/icons/brand-icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PortableTextRenderer } from "@/components/portable/portable-text"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { sanityFetch } from "@/sanity/lib/live"
import { projectBySlugQuery, projectSlugsQuery } from "@/sanity/lib/queries/project"

export async function generateStaticParams() {
  const slugs = await client.fetch(projectSlugsQuery)
  return slugs
    .map((s) => s.slug)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { data: project } = await sanityFetch({
    query: projectBySlugQuery,
    params: { slug },
  })

  if (!project) return {}

  // Extract plain text from the first PortableText block for meta description
  const metaDescription = Array.isArray(project.description)
    ? project.description
      .flatMap((block) =>
        block._type === "block" && Array.isArray(block.children)
          ? (block.children as { text?: string }[]).map((s) => s.text ?? "")
          : []
      )
      .join(" ")
      .slice(0, 160) || undefined
    : undefined

  return {
    title: project.title ?? undefined,
    description: metaDescription,
    openGraph: project.coverImage
      ? { images: [urlFor(project.coverImage).width(1200).height(630).url()] }
      : undefined,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data: project } = await sanityFetch({
    query: projectBySlugQuery,
    params: { slug },
  })

  if (!project) notFound()

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Button variant="ghost" size="sm" asChild className="mb-8 -ml-2">
        <Link href="/projects">
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          All projects
        </Link>
      </Button>

      <article className="flex flex-col gap-8">
        <header className="flex flex-col gap-4">
          {project.year && (
            <span className="font-mono text-xs text-muted-foreground">
              {project.year}
            </span>
          )}
          <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            {project.title}
          </h1>
          {project.description && Array.isArray(project.description) && project.description.length > 0 && (
            <div className="max-w-prose text-lg leading-relaxed text-muted-foreground">
              <PortableTextRenderer value={project.description as Parameters<typeof PortableTextRenderer>[0]["value"]} />
            </div>
          )}

          {(project.liveUrl || project.sourceUrl) && (
            <div className="mt-2 flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <Button asChild size="lg">
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    Live demo
                    <ArrowUpRightIcon className="ml-1.5 h-4 w-4" />
                  </a>
                </Button>
              )}
              {project.sourceUrl && (
                <Button asChild size="lg" variant="outline">
                  <a href={project.sourceUrl} target="_blank" rel="noreferrer">
                    <GithubIcon className="mr-1.5 h-4 w-4" />
                    Source
                  </a>
                </Button>
              )}
            </div>
          )}
        </header>

        {project.coverImage && (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10">
            <Image
              src={urlFor(project.coverImage).width(1600).height(900).url()}
              alt={project.coverImage.alt || project.title || "Project cover"}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              priority
              className="object-cover"
            />
          </div>
        )}

        {project.techStack && project.techStack.length > 0 && (
          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold tracking-tight text-muted-foreground">
              Built with
            </h2>
            <ul className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <li key={tech}>
                  <Badge variant="outline" className="font-mono">
                    {tech}
                  </Badge>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </div>
  )
}
