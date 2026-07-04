import { highlightCode } from "@/sanity/lib/highlight"

interface CodeValue {
  code?: string
  language?: string
  filename?: string
}

export async function CodeBlock({ value }: { value: CodeValue }) {
  if (!value?.code) return null

  const html = await highlightCode(value.code, value.language)

  return (
    <figure className="my-6 w-full rounded-md border border-gray-800 bg-[#24292e]">
      {value.filename ? (
        <figcaption className="flex items-center gap-2 border-b border-gray-800 bg-[#1b1f23] px-4 py-2 font-mono text-xs text-gray-400">
          <span className="size-2 shrink-0 rounded-full bg-gray-600" aria-hidden />
          <span className="truncate">{value.filename}</span>
        </figcaption>
      ) : null}
      {/* .code-scroll owns overflow-x + touch scroll + scroll-shadow affordance.
          The scroll lives here (not on .shiki) and no ancestor uses
          overflow-hidden, so long lines scroll instead of overflowing the page. */}
      <div
        className="code-scroll [&_.shiki]:m-0! [&_.shiki]:rounded-none [&_.shiki]:border-0! [&_.shiki]:bg-transparent!"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  )
}
