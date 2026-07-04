import Link from "next/link"
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react"
import { Image } from "next-sanity/image"

import {createHeadingId} from '@/lib/article/content-signature'
import { urlFor } from "@/sanity/lib/image"
import { CodeBlock } from "./code-block"

export function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  const headingCounts = new Map<string, number>()

  const createUniqueHeadingId = (input: string) => {
    const baseId = createHeadingId(input)
    const count = (headingCounts.get(baseId) ?? 0) + 1
    headingCounts.set(baseId, count)
    return count === 1 ? baseId : `${baseId}-${count}`
  }

  const components: PortableTextComponents = {
    block: {
      normal: ({children}) => (
        <p className="my-5 text-[1.125rem] leading-[1.7] text-foreground/90 dark:leading-[1.75]">
          {children}
        </p>
      ),
      h2: ({children, value: blockValue}) => {
        const text = Array.isArray(blockValue?.children)
          ? blockValue.children.map((child) => child.text ?? '').join('')
          : ''
        const id = createUniqueHeadingId(text)
        return (
          <h2
            id={id}
            className="article-h2 mt-12 mb-4 scroll-mt-28 text-balance text-3xl font-semibold tracking-tight text-foreground"
          >
            {children}
          </h2>
        )
      },
      h3: ({children}) => (
        <h3 className="mt-10 mb-3 text-balance text-2xl font-semibold tracking-tight text-foreground">
          {children}
        </h3>
      ),
      h4: ({children}) => (
        <h4 className="mt-8 mb-3 text-xl font-semibold text-foreground">{children}</h4>
      ),
      blockquote: ({children}) => (
        <blockquote className="my-8 rounded-lg border bg-muted/40 px-5 py-4 text-pretty text-foreground/80 italic">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({children}) => (
        <ul className="my-5 ml-6 list-disc space-y-2 text-foreground/90">{children}</ul>
      ),
      number: ({children}) => (
        <ol className="my-5 ml-6 list-decimal space-y-2 text-foreground/90">{children}</ol>
      ),
    },
    marks: {
      strong: ({children}) => <strong className="font-semibold text-foreground">{children}</strong>,
      em: ({children}) => <em className="italic">{children}</em>,
      underline: ({children}) => <span className="underline">{children}</span>,
      code: ({children}) => (
        <code className="rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
          {children}
        </code>
      ),
      link: ({children, value}) => {
        const href = value?.href ?? '#'
        const external = href.startsWith('http')
        return (
          <Link
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="font-medium text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
          >
            {children}
          </Link>
        )
      },
    },
    types: {
      code: ({value}) => <CodeBlock value={value} />,
      image: ({value}) => {
        if (!value?.asset?._ref) return null
        return (
          <figure className="my-6">
            <Image
              src={urlFor(value).width(1600).fit('max').auto('format').url()}
              alt={value.alt || ''}
              width={1600}
              height={900}
              className="h-auto w-full rounded-lg border border-border"
            />
            {value.caption ? (
              <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                {value.caption}
              </figcaption>
            ) : null}
          </figure>
        )
      },
    },
  }

  return <PortableText value={value} components={components} />
}
