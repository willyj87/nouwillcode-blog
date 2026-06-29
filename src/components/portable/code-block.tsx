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
    <figure className="my-6 overflow-hidden rounded-md border border-gray-800 bg-[#24292e]">
      {value.filename ? (
        <figcaption className="flex items-center gap-2 border-b border-gray-800 bg-[#1b1f23] px-4 py-2 font-mono text-xs text-gray-400">
          <span className="size-2 rounded-full bg-gray-600" aria-hidden />
          {value.filename}
        </figcaption>
      ) : null}
      <div
        className="text-sm [&_pre]:!m-0 [&_pre]:overflow-x-auto [&_pre]:!bg-transparent [&_pre]:p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  )
}
