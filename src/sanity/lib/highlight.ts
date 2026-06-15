import 'server-only'
import {createHighlighter, type Highlighter} from 'shiki'

const THEME = 'github-dark'

const LANGS = [
  'typescript',
  'tsx',
  'javascript',
  'jsx',
  'json',
  'bash',
  'html',
  'css',
  'python',
  'go',
  'rust',
  'sql',
  'yaml',
  'docker',
  'markdown',
]

let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [THEME],
      langs: LANGS,
    })
  }
  return highlighterPromise
}

const ALIASES: Record<string, string> = {
  ts: 'typescript',
  js: 'javascript',
  sh: 'bash',
  shell: 'bash',
  yml: 'yaml',
  dockerfile: 'docker',
  text: 'plaintext',
  plaintext: 'plaintext',
}

export async function highlightCode(code: string, language?: string) {
  const lang = ALIASES[language ?? ''] ?? language ?? 'plaintext'
  const highlighter = await getHighlighter()
  const supported = highlighter.getLoadedLanguages()
  const finalLang =
    lang === 'plaintext' || supported.includes(lang) ? lang : 'plaintext'

  return highlighter.codeToHtml(code, {
    lang: finalLang,
    theme: THEME,
  })
}
