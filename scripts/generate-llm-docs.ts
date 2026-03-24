/**
 * generate-llm-docs.ts
 *
 * Generates AI-friendly documentation for @lukso/web-components.
 * Outputs a single llms.md with all content concatenated.
 *
 * Run: pnpm docs:llms
 */

import path from 'path'
import { fileURLToPath } from 'url'
import { write, readSafe } from './llm/utils.js'
import { loadCem, getClassDeclarations, getTagName } from './llm/cem.js'
import { buildComponentDoc, extractJsDoc } from './llm/component-doc.js'
import { generateTailwindDocs, generateIconDocs } from './llm/tailwind.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// ─── Main ─────────────────────────────────────────────────────────────────────

const sections: string[] = []

sections.push('# @lukso/web-components — Documentation\n')
sections.push(
  'Complete reference for `@lukso/web-components`: Tailwind classes, icons, and all component APIs.\n'
)

sections.push('---\n\n# Tailwind Utility Classes\n')
sections.push(generateTailwindDocs(ROOT))

sections.push('---\n\n# Icons\n')
sections.push(generateIconDocs(ROOT))

sections.push('---\n\n# Components\n')
const modules = loadCem(ROOT)
const declarations = getClassDeclarations(modules)
const sharedTypesSrc = readSafe(path.join(ROOT, 'src/shared/types.ts'))
let componentCount = 0

for (const { module: mod, decl } of declarations) {
  const src = readSafe(path.join(ROOT, mod.path))
  if (!src) continue

  const tagName = getTagName(src)
  if (!tagName) continue

  const jsdoc = extractJsDoc(src, /class\s+Lukso\w+/)
  const members = decl.members ?? []

  sections.push(
    buildComponentDoc(tagName, jsdoc, members, src, sharedTypesSrc, ROOT)
  )
  sections.push('---\n')
  componentCount++
}

write(path.join(ROOT, 'llms.md'), sections.join('\n'))

console.log(
  `Generated llms.md: ${componentCount} components, tailwind classes, icons`
)
