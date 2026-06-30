import Link from "next/link"
import { Button } from "@/components/ui/button"
import { sanityFetch } from "@/sanity/lib/live"
import { navbarQuery } from "@/sanity/lib/queries/layout"
import { Image } from "next-sanity/image"
import { MobileNav } from "./mobile-nav"

export async function Navbar() {
  const { data: navbar } = await sanityFetch({ query: navbarQuery })

  const brandLogo = navbar?.brandLogo
  const brandName = navbar?.brandName || "nouwillcode"
  const brandAlt = brandLogo?.alt || brandName
  const links = navbar?.links || [{ label: "Blog", href: "/blog" }]
  const githubUrl = navbar?.githubUrl || "https://github.com"

  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-14 items-center px-4 md:px-8">
        {/* Mobile: burger menu */}
        <MobileNav
          links={links}
          githubUrl={githubUrl}
          brandLogoUrl={brandLogo?.asset?.url}
          brandName={brandName}
        />

        {/* Mobile: centered brand */}
        <Link
          href="/"
          className="flex flex-1 items-center justify-center md:hidden"
        >
          {brandLogo?.asset?.url ? (
            <Image src={brandLogo.asset.url} alt={brandAlt} width={150} height={36} />
          ) : (
            <span className="text-lg font-bold tracking-tight">{brandName}</span>
          )}
        </Link>

        {/* Desktop: brand + nav links */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {brandLogo?.asset?.url ? (
              <Image src={brandLogo.asset.url} alt={brandAlt} width={170} height={40} />
            ) : (
              <span className="text-lg font-bold tracking-tight">{brandName}</span>
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

        <div className="flex items-center justify-end space-x-2 md:flex-1">
          <nav className="flex items-center">
            {githubUrl && (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden md:inline-flex"
              >
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
