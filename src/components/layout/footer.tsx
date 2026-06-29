import { sanityFetch } from "@/sanity/lib/live"
import { footerQuery } from "@/sanity/lib/queries/layout"

export async function Footer() {
  const { data: footer } = await sanityFetch({ query: footerQuery })

  const text = footer?.text || "Built by nouwillcode. The source code is available on GitHub."
  const githubUrl = footer?.githubUrl || "https://github.com"

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:h-24 md:flex-row md:px-8">
        <p className="text-muted-foreground text-center text-sm leading-loose text-balance md:text-left">
          {text}{" "}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
          )}
        </p>
      </div>
    </footer>
  )
}
