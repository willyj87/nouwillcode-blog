"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

type NavLink = { label: string | null; href: string | null }

export function MobileNav({
  links,
  githubUrl,
  brandLogoUrl,
  brandName,
}: {
  links: NavLink[]
  githubUrl?: string | null
  brandLogoUrl?: string | null
  brandName: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader className="border-b">
          <SheetTitle asChild>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2"
            >
              {brandLogoUrl ? (
                <Image
                  src={brandLogoUrl}
                  alt={brandName}
                  width={150}
                  height={36}
                />
              ) : (
                <span className="text-lg font-bold tracking-tight">
                  {brandName}
                </span>
              )}
            </Link>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1 px-4">
          {links.map((link) => (
            <SheetClose asChild key={link.href}>
              <Link
                href={(link.href as string) || "/"}
                className="rounded-md px-2 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </nav>

        {githubUrl && (
          <div className="mt-auto border-t p-4">
            <Button variant="outline" asChild className="w-full rounded-full">
              <Link href={githubUrl} target="_blank" rel="noreferrer">
                GitHub
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
