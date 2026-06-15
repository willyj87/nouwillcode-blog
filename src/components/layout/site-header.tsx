import Link from 'next/link'
import {PenLine, Search} from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-primary">
          <span className="grid size-8 place-items-center rounded bg-primary text-primary-foreground">
            n
          </span>
          <span className="text-gray-900">nouwillcode</span>
        </Link>

        <div className="ml-2 hidden flex-1 items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm text-muted-foreground sm:flex sm:max-w-xs">
          <Search className="size-4" />
          <span>Rechercher un article…</span>
        </div>

        <nav className="ml-auto flex items-center gap-1 text-sm font-medium text-gray-600">
          <Link
            href="/"
            className="rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-gray-900"
          >
            Feed
          </Link>
          <Link
            href="/studio"
            className="flex items-center gap-1.5 rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-gray-900"
          >
            <PenLine className="size-4" />
            Studio
          </Link>
        </nav>
      </div>
    </header>
  )
}
