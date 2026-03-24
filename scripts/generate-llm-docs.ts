/**
 * generate-llm-docs.ts
 *
 * Generates AI-friendly documentation for @lukso/web-components.
 * Outputs:
 *   - llms/tailwind/colors.md, typography.md, shadows.md, animations.md, other.md
 *   - llms/icons/custom.md, vuesax.md
 *   - llms/components/<tag-name>.md  — per-component API docs
 *   - llms.md                        — index with links to all individual files
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
const OUT = path.join(ROOT, 'llms')

// ─── Component docs ───────────────────────────────────────────────────────────

function generateComponentDocs(): string[] {
  const modules = loadCem(ROOT)
  const declarations = getClassDeclarations(modules)
  const sharedTypesSrc = readSafe(path.join(ROOT, 'src/shared/types.ts'))
  const componentNames: string[] = []

  for (const { module: mod, decl } of declarations) {
    const src = readSafe(path.join(ROOT, mod.path))
    if (!src) continue

    const tagName = getTagName(src)
    if (!tagName) continue

    const jsdoc = extractJsDoc(src, /class\s+Lukso\w+/)
    const members = decl.members ?? []

    const doc = buildComponentDoc(
      tagName,
      jsdoc,
      members,
      src,
      sharedTypesSrc,
      ROOT
    )
    write(path.join(OUT, 'components', `${tagName}.md`), doc)
    componentNames.push(tagName)
  }

  return componentNames.sort()
}

// ─── Index ────────────────────────────────────────────────────────────────────

function generateIndex(componentNames: string[]): void {
  const lines: string[] = []
  lines.push('# @lukso/web-components — LLM Documentation')
  lines.push('')
  lines.push(
    'AI-friendly documentation for `@lukso/web-components`. Each section is a standalone Markdown file.'
  )
  lines.push('')

  lines.push('## Tailwind Utility Classes')
  lines.push('')
  for (const name of [
    'colors',
    'typography',
    'shadows',
    'animations',
    'other',
  ]) {
    lines.push(`- [${name}.md](llms/tailwind/${name}.md)`)
  }
  lines.push('')

  lines.push('## Icons')
  lines.push('')
  lines.push('- [custom.md](llms/icons/custom.md)')
  lines.push('- [vuesax.md](llms/icons/vuesax.md)')
  lines.push('')

  lines.push('## Components')
  lines.push('')
  for (const name of componentNames) {
    lines.push(`- [${name}](llms/components/${name}.md)`)
  }
  lines.push('')

  write(path.join(ROOT, 'llms.md'), lines.join('\n'))
}

// ─── Main ─────────────────────────────────────────────────────────────────────

generateTailwindDocs(path.join(OUT, 'tailwind'), ROOT)
generateIconDocs(path.join(OUT, 'icons'), ROOT)
const componentNames = generateComponentDocs()
generateIndex(componentNames)

console.log(
  `Generated docs: ${componentNames.length} components, tailwind classes, icons, index`
)
