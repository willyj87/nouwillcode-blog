import Link from "next/link"
import { Button } from "@/components/ui/button"
import { sanityFetch } from "@/sanity/lib/live"
import { navbarQuery } from "@/sanity/lib/queries/layout"
import { Image } from "next-sanity/image";

export async function Navbar() {
  const { data: navbar } = await sanityFetch({ query: navbarQuery })

  const brandLogo = navbar?.brandLogo
  const brandAlt = brandLogo?.alt || "nouwillcode"
  const links = navbar?.links || [{ label: "Blog", href: "/blog" }]
  const githubUrl = navbar?.githubUrl || "https://github.com"

  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-14 items-center px-4 md:px-8">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {brandLogo?.asset?.url ? (
              <Image src={brandLogo.asset.url} alt={brandAlt} width={170} height={40} />
            ) : (
              <span className="text-lg font-bold tracking-tight">nouwillcode</span>
            )}
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href as string}
                className="hover:text-foreground/80 text-foreground/60 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Command search could go here */}
          </div>
          <nav className="flex items-center">
            {githubUrl && (
              <Button variant="ghost" size="sm" asChild>
                <Link href={githubUrl} target="_blank" rel="noreferrer">
                  GitHub
                </Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
