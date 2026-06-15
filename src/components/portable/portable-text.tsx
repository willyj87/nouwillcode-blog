import Image from 'next/image'
import Link from 'next/link'
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from '@portabletext/react'

import {urlFor} from '@/sanity/lib/image'
import {CodeBlock} from './code-block'

const components: PortableTextComponents = {
  block: {
    normal: ({children}) => (
      <p className="my-4 leading-7 text-gray-700">{children}</p>
    ),
    h2: ({children}) => (
      <h2 className="mt-10 mb-3 text-2xl font-semibold tracking-tight text-gray-900">
        {children}
      </h2>
    ),
    h3: ({children}) => (
      <h3 className="mt-8 mb-2 text-xl font-semibold tracking-tight text-gray-900">
        {children}
      </h3>
    ),
    h4: ({children}) => (
      <h4 className="mt-6 mb-2 text-lg font-semibold text-gray-900">
        {children}
      </h4>
    ),
    blockquote: ({children}) => (
      <blockquote className="my-6 border-l-4 border-primary pl-4 text-gray-600 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => (
      <ul className="my-4 ml-6 list-disc space-y-2 text-gray-700">{children}</ul>
    ),
    number: ({children}) => (
      <ol className="my-4 ml-6 list-decimal space-y-2 text-gray-700">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({children}) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({children}) => <em className="italic">{children}</em>,
    underline: ({children}) => <span className="underline">{children}</span>,
    code: ({children}) => (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.85em] text-pink-600">
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
          className="font-medium text-primary underline-offset-2 hover:underline"
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
            className="h-auto w-full rounded-md border border-gray-200"
          />
          {value.caption ? (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      )
    },
  },
}

export function PortableTextRenderer({value}: {value: PortableTextBlock[]}) {
  return <PortableText value={value} components={components} />
}
