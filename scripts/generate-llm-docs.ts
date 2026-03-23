/**
 * generate-llm-docs.ts
 *
 * Generates AI-friendly documentation for @lukso/web-components.
 * Outputs:
 *   - llms/tailwind-classes.md   — colors, typography, shadows, animations, icons
 *   - llms/<component>.md     — per-component API docs
 *   - llms.md                 — index with links to all individual files
 *
 * Run: pnpm docs:llms
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// ─── helpers ──────────────────────────────────────────────────────────────────

function read(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8')
}

function write(filePath: string, content: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content, 'utf-8')
}

/** Extract JSDoc block immediately before a class/type declaration */
function extractJsDoc(source: string, markerPattern: RegExp): string {
  const match = source.search(markerPattern)
  if (match === -1) return ''

  const before = source.slice(0, match)
  const docMatch = before.match(/\/\*\*((?:(?!\*\/)[\s\S])*)\*\/\s*$/)
  if (!docMatch) return ''

  return docMatch[1]
    .split('\n')
    .map(line => line.replace(/^\s*\*\s?/, ''))
    .join('\n')
    .trim()
}

/** Parse @fires tags from a JSDoc string */
function parseFiresTags(
  jsdoc: string
): { event: string; detail: string; bubbles: string; description: string }[] {
  const results = []
  const firesRegex = /@fires\s+\{([^}]+)\}\s+(\S+)\s*-\s*(.*)/g
  let m: RegExpExecArray | null
  while ((m = firesRegex.exec(jsdoc)) !== null) {
    const detail = m[1]
    const event = m[2]
    const rest = m[3]
    const bubblesMatch = rest.match(/Bubbles:\s*(yes|no)/i)
    const bubbles = bubblesMatch ? bubblesMatch[1] : '—'
    const description = rest.replace(/\.\s*Bubbles:\s*(yes|no)\./i, '').trim()
    results.push({ event, detail, bubbles, description })
  }
  return results
}

/** Parse @slot tags from a JSDoc string */
function parseSlotTags(jsdoc: string): { name: string; description: string }[] {
  const results = []
  const slotRegex = /@slot\s*([^\s-]*)\s*-?\s*(.*)/g
  let m: RegExpExecArray | null
  while ((m = slotRegex.exec(jsdoc)) !== null) {
    const name = m[1].trim() || '(default)'
    const description = m[2].trim()
    results.push({ name, description })
  }
  return results
}

/** Strip @fires/@slot tags and return prose description only */
function extractProse(jsdoc: string): string {
  return jsdoc
    .replace(/@fires\s+\{[^}]+\}\s+\S+\s*-[^\n]*/g, '')
    .replace(/@slot\s*[^\n]*/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

// ─── CEM reader ───────────────────────────────────────────────────────────────

interface CemMember {
  kind: string
  name: string
  type?: { text: string }
  default?: string
  attribute?: string
  description?: string
  privacy?: string
  static?: boolean
}

interface CemDeclaration {
  kind: string
  name: string
  tagName?: string
  description?: string
  members?: CemMember[]
  attributes?: {
    name: string
    type?: { text: string }
    default?: string
    description?: string
  }[]
  events?: { name: string; type?: { text: string }; description?: string }[]
  slots?: { name: string; description?: string }[]
}

interface CemModule {
  kind: string
  path: string
  declarations?: CemDeclaration[]
}

function loadCem(): CemModule[] {
  const cemPath = path.join(ROOT, 'package/custom-elements.json')
  const cem = JSON.parse(read(cemPath))
  return cem.modules as CemModule[]
}

function getClassDeclarations(
  modules: CemModule[]
): { module: CemModule; decl: CemDeclaration }[] {
  const results: { module: CemModule; decl: CemDeclaration }[] = []
  for (const mod of modules) {
    if (!mod.declarations) continue
    for (const decl of mod.declarations) {
      if (decl.kind === 'class' && decl.name?.startsWith('Lukso')) {
        results.push({ module: mod, decl })
      }
    }
  }
  return results
}

// ─── component tag name from source ──────────────────────────────────────────

function getTagName(source: string): string {
  const m = source.match(/@safeCustomElement\('([^']+)'\)/)
  return m ? m[1] : ''
}

// ─── type extraction ──────────────────────────────────────────────────────────

/**
 * Extract `export type TypeName = ...` definitions from a TypeScript source string.
 * Returns a map of TypeName → the full definition (single or union literal values).
 */
function extractTypeDefinitions(src: string): Record<string, string> {
  const types: Record<string, string> = {}

  // Match single-line: export type Foo = 'a' | 'b' | 'c'
  const singleLine = /^export\s+type\s+(\w+)\s*=\s*(.+)$/gm
  let m: RegExpExecArray | null
  while ((m = singleLine.exec(src)) !== null) {
    const name = m[1]
    const def = m[2].trim()
    // Only include union string/number literals (skip complex generics)
    if (/^['"`\d|'\s]+$/.test(def.replace(/\s+/g, ' ')) || def.includes("'")) {
      types[name] = def
    }
  }

  // Match multi-line union: export type Foo =\n  | 'a'\n  | 'b'
  const multiLine =
    /^export\s+type\s+(\w+)\s*=\s*\n((?:\s*\|\s*['"`][^'"`]+['"`]\s*\n?)+)/gm
  while ((m = multiLine.exec(src)) !== null) {
    const name = m[1]
    const values = m[2]
      .split('\n')
      .map(l => l.replace(/^\s*\|\s*/, '').trim())
      .filter(Boolean)
      .join(' | ')
    types[name] = values
  }

  return types
}

/**
 * Collect type names referenced by the attributes table.
 */
function collectReferencedTypeNames(members: CemMember[]): Set<string> {
  const names = new Set<string>()
  for (const m of members) {
    if (
      m.kind !== 'field' ||
      !m.attribute ||
      m.privacy === 'private' ||
      m.static
    )
      continue
    const text = m.type?.text ?? ''
    // Extract bare identifiers (UpperCamelCase type names)
    const typeRefs = text.match(/\b[A-Z]\w+/g) ?? []
    for (const t of typeRefs) names.add(t)
  }
  return names
}

/**
 * Build a Types section for the component doc, showing only types referenced in attributes.
 */
function buildTypesSection(members: CemMember[], componentSrc: string): string {
  const referenced = collectReferencedTypeNames(members)
  if (referenced.size === 0) return ''

  // Load shared types source too
  const sharedTypesSrc = fs.existsSync(path.join(ROOT, 'src/shared/types.ts'))
    ? read(path.join(ROOT, 'src/shared/types.ts'))
    : ''

  const componentTypes = extractTypeDefinitions(componentSrc)
  const sharedTypes = extractTypeDefinitions(sharedTypesSrc)
  const allTypes = { ...sharedTypes, ...componentTypes }

  const lines: string[] = []
  for (const typeName of [...referenced].sort()) {
    const def = allTypes[typeName]
    if (!def) continue
    lines.push(`\`${typeName}\` = \`${def}\``)
  }

  if (lines.length === 0) return ''
  return '## Types\n\n' + lines.join('\n\n') + '\n'
}

// ─── attribute table ──────────────────────────────────────────────────────────

function buildAttributesTable(members: CemMember[]): string {
  const attrs = members.filter(
    m =>
      m.kind === 'field' && m.attribute && m.privacy !== 'private' && !m.static
  )
  if (attrs.length === 0) return '_None_\n'

  const fmtUnion = (text: string) =>
    text
      .split(/\s*\|\s*/)
      .map(t => `\`${t}\``)
      .join(' ｜ ')

  const rows = attrs.map(a => {
    const type = fmtUnion(a.type?.text ?? '—')
    const def = fmtUnion(a.default ?? '—')
    const attr = a.attribute ?? a.name
    return `| \`${attr}\` | ${type} | ${def} |`
  })

  return (
    [
      '| Attribute | Type | Default |',
      '|-----------|------|---------|',
      ...rows,
    ].join('\n') + '\n'
  )
}

// ─── per-component doc ────────────────────────────────────────────────────────

function buildComponentDoc(
  tagName: string,
  jsdoc: string,
  members: CemMember[],
  componentSrc: string
): string {
  const prose = extractProse(jsdoc)
  const fires = parseFiresTags(jsdoc)
  const slots = parseSlotTags(jsdoc)

  const lines: string[] = []
  lines.push(`# ${tagName}`)
  lines.push('')

  if (prose) {
    lines.push(prose)
    lines.push('')
  }

  lines.push('## Tag')
  lines.push('')
  lines.push(`\`<${tagName}>\``)
  lines.push('')

  lines.push('## Attributes')
  lines.push('')
  lines.push(buildAttributesTable(members))

  const typesSection = buildTypesSection(members, componentSrc)
  if (typesSection) {
    lines.push(typesSection)
  }

  if (fires.length > 0) {
    lines.push('## Events')
    lines.push('')
    lines.push('| Event | Detail type | Bubbles | Description |')
    lines.push('|-------|-------------|---------|-------------|')
    for (const f of fires) {
      lines.push(
        `| \`${f.event}\` | \`${f.detail}\` | ${f.bubbles} | ${f.description} |`
      )
    }
    lines.push('')
  }

  if (slots.length > 0) {
    lines.push('## Slots')
    lines.push('')
    lines.push('| Slot | Description |')
    lines.push('|------|-------------|')
    for (const s of slots) {
      lines.push(`| \`${s.name}\` | ${s.description} |`)
    }
    lines.push('')
  }

  lines.push('## Usage Example')
  lines.push('')
  lines.push(buildUsageExample(tagName, members, slots))
  lines.push('')

  return lines.join('\n')
}

// ─── stories-based usage examples ────────────────────────────────────────────

/**
 * Parse a JS/TS object literal `{ key: value, ... }` at the given source offset.
 * Returns a flat Record<string, unknown> for primitive values (string, number, boolean).
 */
function parseArgsObject(
  src: string,
  openBrace: number
): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  let depth = 0
  let i = openBrace
  let objectSrc = ''

  for (; i < src.length; i++) {
    const ch = src[i]
    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) {
        objectSrc = src.slice(openBrace + 1, i)
        break
      }
    }
  }

  // Match key: value pairs for primitives (string, number, boolean, undefined)
  const kvRegex =
    /(\w+)\s*:\s*(?:'([^']*)'|"([^"]*)"|`([^`]*)`|(true|false|undefined|null)|(-?\d+(?:\.\d+)?))/g
  let m: RegExpExecArray | null
  while ((m = kvRegex.exec(objectSrc)) !== null) {
    const key = m[1]
    if (m[2] !== undefined)
      result[key] = m[2] // single-quoted string
    else if (m[3] !== undefined)
      result[key] = m[3] // double-quoted string
    else if (m[4] !== undefined)
      result[key] = m[4] // template string
    else if (m[5] !== undefined) {
      if (m[5] === 'true') result[key] = true
      else if (m[5] === 'false') result[key] = false
      else result[key] = undefined
    } else if (m[6] !== undefined) result[key] = Number(m[6])
  }

  return result
}

/**
 * Build camelCase → kebab-case attribute name map from argTypes.
 * argTypes may define `{ isFullWidth: { name: 'is-full-width' } }` or the reverse.
 */
function buildArgToAttrMap(src: string): Record<string, string> {
  const map: Record<string, string> = {}

  // Pattern: 'kebab-attr': { name: 'camelKey' }  → map camelKey → kebab-attr
  const kebabToCamel = /['"]([a-z][\w-]+)['"]:\s*\{\s*name:\s*['"](\w+)['"]/g
  let m: RegExpExecArray | null
  while ((m = kebabToCamel.exec(src)) !== null) {
    const kebab = m[1]
    const camel = m[2]
    if (kebab.includes('-')) {
      map[camel] = kebab
    }
  }

  // Pattern: camelKey: { name: 'kebab-attr' }  → map camelKey → kebab-attr
  const camelToKebab = /\b(\w+):\s*\{[^}]*name:\s*['"]([a-z][\w-]+)['"]/g
  while ((m = camelToKebab.exec(src)) !== null) {
    const camel = m[1]
    const kebab = m[2]
    if (kebab.includes('-') && !camel.includes('-')) {
      map[camel] = kebab
    }
  }

  return map
}

/**
 * Render a template HTML string by substituting merged args.
 * Handles: attr=${val}, ?bool=${val}, @event=${handler} (removed), .prop=${val} (removed),
 * ${varName} inside text content, ${varName ? varName : nothing} patterns.
 */
function renderTemplate(
  templateSrc: string,
  args: Record<string, unknown>,
  storyKeys?: Set<string>
): string {
  // If storyKeys provided, suppress attrs whose variable is not in storyKeys
  const shouldEmit = (varName: string) => !storyKeys || storyKeys.has(varName)
  let html = templateSrc

  // Remove event handlers: @event=${...}
  html = html.replace(/@[\w-]+=\$\{[^}]+\}\s*/g, '')

  // Remove .property bindings: .theme=${...} etc
  html = html.replace(/\.\w+=\$\{[^}]+\}\s*/g, '')

  // Replace ?attr-name=${varName} or ?attr-name=${varName ? varName : undefined}
  html = html.replace(
    /\?([a-z][\w-]*)=\$\{(\w+)(?:[^}]*)?\}/g,
    (_, attr, varName) => {
      if (!shouldEmit(varName)) return ''
      const val = args[varName]
      if (val === true) return attr
      return ''
    }
  )

  // Replace attr=${varName ? varName : nothing} — conditional string attributes
  html = html.replace(
    /([a-z][\w-]*)=\$\{(\w+)\s*\?\s*\2\s*:\s*nothing\}/g,
    (_, attr, varName) => {
      if (!shouldEmit(varName)) return ''
      const val = args[varName]
      if (
        val === undefined ||
        val === null ||
        val === '' ||
        val === false ||
        val === 0
      )
        return ''
      return `${attr}="${val}"`
    }
  )

  // Replace attr=${varName ? varName : 'fallback'} patterns
  html = html.replace(
    /([a-z][\w-]*)=\$\{(\w+)\s*\?[^}]+\}/g,
    (_, attr, varName) => {
      if (!shouldEmit(varName)) return ''
      const val = args[varName]
      if (val === undefined || val === null || val === '' || val === false)
        return ''
      return `${attr}="${val}"`
    }
  )

  // Replace attr=${varName} — simple attribute binding
  html = html.replace(/([a-z][\w-]*)=\$\{(\w+)\}/g, (_, attr, varName) => {
    if (!shouldEmit(varName)) return ''
    const val = args[varName]
    if (val === undefined || val === null || val === '') return ''
    return `${attr}="${val}"`
  })

  // Replace ${varName} in text content
  html = html.replace(/\$\{(\w+)\}/g, (_, varName) => {
    const val = args[varName]
    if (val === undefined || val === null) return ''
    return String(val)
  })

  // Remove style=${...} bindings (CSS vars, complex expressions)
  html = html.replace(/\s*style=\$\{[^}]+\}/g, '')

  // Remove any remaining unresolved ${...} expressions
  html = html.replace(/\s*[\w-]+=\$\{[^}]+\}/g, '')
  html = html.replace(/\$\{[^}]+\}/g, '')

  // Remove style attributes that contain incomplete values like "margin-top: px" or "float: "
  html = html.replace(/\s*style="([^"]*)"/g, (_full: string, value: string) => {
    const decls = value
      .split(';')
      .map((d: string) => d.trim())
      .filter((d: string) => {
        if (!d) return false
        const parts = d.split(':')
        if (parts.length < 2) return false
        const val = parts.slice(1).join(':').trim()
        return val && !/^(px|em|rem|%|vh|vw)$/.test(val)
      })
    if (decls.length === 0) return ''
    return ` style="${decls.join('; ')}"`
  })

  // Clean up multiple spaces on same line (preserve newlines)
  html = html
    .split('\n')
    .map(line => line.replace(/\s{2,}/g, ' ').trim())
    .filter(line => line.length > 0)
    .join('\n')

  // Fix spacing before closing > or />
  html = html.replace(/ +>/g, '>').replace(/ +\/>/g, '/>')

  return html.trim()
}

/**
 * Extract a named story description from its JSDoc comment.
 */
function extractStoryDoc(src: string, storyName: string): string {
  // Only match a JSDoc immediately before the export (no blank lines between)
  const pattern = new RegExp(
    `(\\/\\*\\*[^/]*?\\*\\/)[ \\t]*\\n(?:export\\s+const\\s+${storyName}\\s*=)`
  )
  const m = src.match(pattern)
  if (!m) return ''
  const doc = m[1]
    .replace(/^\/\*\*/, '')
    .replace(/\*\/$/, '')
    .split('\n')
    .map(l => l.replace(/^\s*\*\s?/, ''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
  return doc
}

/**
 * Extract usage examples from a component's Storybook stories file.
 * Returns a markdown ```html code block.
 */
function extractStoriesExamples(tagName: string): string {
  const componentDir = path.join(ROOT, 'src/components', tagName)
  const storiesPath = path.join(componentDir, `${tagName}.stories.ts`)

  if (!fs.existsSync(storiesPath)) {
    return `\`\`\`html\n<${tagName}></${tagName}>\n\`\`\``
  }

  const src = fs.readFileSync(storiesPath, 'utf-8')

  // ── Extract meta.args defaults ────────────────────────────────────────────
  const metaArgsMatch = src.match(/args:\s*\{/)
  const metaArgs: Record<string, unknown> = {}
  if (metaArgsMatch && metaArgsMatch.index !== undefined) {
    Object.assign(
      metaArgs,
      parseArgsObject(src, src.indexOf('{', metaArgsMatch.index + 5))
    )
  }

  // ── Build camelCase → attribute name map ─────────────────────────────────
  const argToAttr = buildArgToAttrMap(src)

  // ── Extract template HTML source ─────────────────────────────────────────
  // Find the primary Template or DefaultTemplate function's html`` string
  const templateMatch = src.match(
    /(?:const\s+(?:Default)?Template[^=]*=\s*(?:\([^)]*\)\s*=>|function[^{]*\{)[^`]*)`([\s\S]*?)`/
  )
  const templateSrc = templateMatch ? templateMatch[1] : ''

  // ── Extract named story exports ───────────────────────────────────────────
  type Story = {
    name: string
    args: Record<string, unknown>
    storyKeys: Set<string>
    doc: string
  }
  const stories: Story[] = []

  const storyExportRegex =
    /export\s+const\s+(\w+)\s*=\s*(?:Template|DefaultTemplate)\.bind\(\{\}\)/g
  let m: RegExpExecArray | null
  while ((m = storyExportRegex.exec(src)) !== null) {
    const storyName = m[1]
    if (storyName === 'default') continue

    // Get story-specific .args
    const argsPattern = new RegExp(`${storyName}\\.args\\s*=\\s*\\{`)
    const argsMatch = src.match(argsPattern)
    const storyArgs: Record<string, unknown> = {}
    if (argsMatch && argsMatch.index !== undefined) {
      Object.assign(
        storyArgs,
        parseArgsObject(src, src.indexOf('{', argsMatch.index))
      )
    }

    const doc = extractStoryDoc(src, storyName)
    // mergedArgs used for value lookup; storyArgKeys controls which attrs are emitted
    const mergedArgs = { ...metaArgs, ...storyArgs }
    stories.push({
      name: storyName,
      args: mergedArgs,
      storyKeys: new Set(Object.keys(storyArgs)),
      doc,
    })
  }

  if (stories.length === 0 || !templateSrc) {
    return `\`\`\`html\n<${tagName}></${tagName}>\n\`\`\``
  }

  // ── Render each story ─────────────────────────────────────────────────────
  const examples: string[] = []

  for (const story of stories) {
    // Normalize arg keys: camelCase → the attribute name used in the template
    const normalizedArgs: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(story.args)) {
      normalizedArgs[k] = v
      // Also expose under the attr name (for template substitution)
      if (argToAttr[k]) normalizedArgs[argToAttr[k].replace(/-/g, '')] = v
    }

    const rendered = renderTemplate(
      templateSrc,
      normalizedArgs,
      story.storyKeys
    )
    if (!rendered.trim()) continue

    // Clean rendered HTML lines for readability
    const cleaned = rendered
      .split('\n')
      .map(l => l.trimEnd())
      .filter(l => l.trim())
      .join('\n')

    if (story.doc) {
      examples.push(`<!-- ${story.doc} -->\n${cleaned}`)
    } else {
      examples.push(cleaned)
    }
  }

  if (examples.length === 0) {
    return `\`\`\`html\n<${tagName}></${tagName}>\n\`\`\``
  }

  return `\`\`\`html\n${examples.join('\n\n')}\n\`\`\``
}

// ─── usage examples (legacy fallback, kept for reference) ────────────────────

function buildUsageExample(
  tagName: string,
  _members: CemMember[],
  _slots: { name: string; description: string }[]
): string {
  return extractStoriesExamples(tagName)
}

// ─── tailwind section generators ──────────────────────────────────────────────

function generateColorsDoc(): string {
  const lines: string[] = []
  lines.push('# Colors')
  lines.push('')
  lines.push(
    'Colors use fixed hue and saturation; the number suffix is the lightness value.'
  )
  lines.push('Apply as `bg-{name}`, `text-{name}`, `border-{name}`, etc.')
  lines.push('')
  lines.push('```html')
  lines.push(
    '<span class="bg-neutral-20 text-neutral-100">Dark on light</span>'
  )
  lines.push(
    '<span class="bg-purple-51 text-neutral-100">Purple brand color</span>'
  )
  lines.push('```')
  lines.push('')

  const tcSource = read(path.join(ROOT, 'src/shared/tools/tailwind-config.ts'))
  const colorFamilies: Record<string, string> = {}
  const hslRegex =
    /['"]?([\w-]+)['"]?\s*:\s*hslColorMap\(\s*\d+\s*,\s*\d+\s*,\s*\[([\d,\s]+)\]\s*\)/g
  let m: RegExpExecArray | null
  while ((m = hslRegex.exec(tcSource)) !== null) {
    colorFamilies[m[1]] = m[2]
      .split(',')
      .map(v => v.trim())
      .filter(Boolean)
      .join(', ')
  }

  lines.push('| Family | Available lightness values |')
  lines.push('|--------|---------------------------|')
  for (const [family, values] of Object.entries(colorFamilies)) {
    lines.push(`| \`${family}\` | ${values} |`)
  }
  for (const g of ['gradient-1', 'gradient-2', 'gradient-3']) {
    lines.push(`| \`${g}\` | \`start\`, \`end\` (use as CSS gradient stops) |`)
  }
  lines.push('')

  return lines.join('\n')
}

function generateTypographyDoc(): string {
  const lines: string[] = []
  lines.push('# Typography')
  lines.push('')
  lines.push(
    'Use typography classes instead of raw `font-size`/`font-weight` utilities to maintain design consistency.'
  )
  lines.push('Combine with color classes for text colors.')
  lines.push('')
  lines.push('```html')
  lines.push(
    '<h1 class="heading-inter-48-bold text-neutral-20">Page title</h1>'
  )
  lines.push(
    '<p class="paragraph-inter-16-regular text-neutral-35">Body text</p>'
  )
  lines.push(
    '<span class="nav-inter-14-medium-uppercase text-purple-51">NAV LINK</span>'
  )
  lines.push('```')
  lines.push('')

  const typCss = read(path.join(ROOT, 'src/shared/styles/typography-v4.css'))
  const allTypClasses = [
    ...typCss.matchAll(
      /\.(heading-[a-z0-9-]+|nav-[a-z0-9-]+|paragraph-[a-z0-9-]+)\s*\{/g
    ),
  ].map(x => x[1])

  lines.push('### Heading')
  lines.push('')
  lines.push(
    allTypClasses
      .filter(c => c.startsWith('heading-'))
      .map(c => `- \`${c}\``)
      .join('\n')
  )
  lines.push('')

  lines.push('### Navigation')
  lines.push('')
  lines.push(
    allTypClasses
      .filter(c => c.startsWith('nav-'))
      .map(c => `- \`${c}\``)
      .join('\n')
  )
  lines.push('')

  lines.push('### Paragraph (Inter)')
  lines.push('')
  lines.push(
    allTypClasses
      .filter(c => c.startsWith('paragraph-inter-'))
      .map(c => `- \`${c}\``)
      .join('\n')
  )
  lines.push('')

  lines.push('### Paragraph (PT Mono — addresses/usernames)')
  lines.push('')
  lines.push(
    allTypClasses
      .filter(c => c.startsWith('paragraph-ptmono-'))
      .map(c => `- \`${c}\``)
      .join('\n')
  )
  lines.push('')

  return lines.join('\n')
}

function generateShadowsDoc(): string {
  const lines: string[] = []
  lines.push('# Shadows')
  lines.push('')
  lines.push('Apply as `shadow-{name}`.')
  lines.push('')
  lines.push('```html')
  lines.push(
    '<div class="shadow-neutral-above-shadow rounded-12 p-4">Card</div>'
  )
  lines.push('```')
  lines.push('')

  const shadowSource = read(path.join(ROOT, 'src/docs/DropShadows.stories.ts'))
  const allShadowNames: string[] = []
  for (const arr of [...shadowSource.matchAll(/const \w+ = \[([\s\S]*?)\]/g)]) {
    allShadowNames.push(
      ...[...arr[1].matchAll(/class:\s*'([^']+)'/g)].map(x => x[1])
    )
  }

  const groups: Record<string, string[]> = {}
  for (const name of allShadowNames) {
    const parts = name.replace(/^shadow-/, '').split('-')
    const key = parts.slice(0, parts.length > 3 ? 2 : 1).join('-')
    groups[key] = groups[key] || []
    groups[key].push(name)
  }
  for (const [group, names] of Object.entries(groups)) {
    lines.push(`**${group}**`)
    lines.push(names.map(n => `- \`${n}\``).join('\n'))
    lines.push('')
  }

  return lines.join('\n')
}

function generateAnimationsDoc(): string {
  const lines: string[] = []
  lines.push('# Animations')
  lines.push('')
  lines.push('Apply animation classes directly to elements.')
  lines.push('')
  lines.push('```html')
  lines.push(
    '<div class="w-3 h-3 bg-green-54 rounded-full animate-spin"></div>'
  )
  lines.push('<div class="animate-pulse bg-neutral-95 rounded-8 h-10"></div>')
  lines.push(
    '<div class="animate-fade-in opacity-0 animation-duration-500"></div>'
  )
  lines.push('```')
  lines.push('')

  const animSource = read(path.join(ROOT, 'src/docs/Animations.stories.ts'))
  const animMatch = animSource.match(/const animations\s*=\s*\[([\s\S]*?)\]/)
  if (animMatch) {
    const animEntries = [
      ...animMatch[1].matchAll(
        /name:\s*'([^']+)'[^}]*description:\s*'([^']+)'/g
      ),
    ]
    lines.push('| Class | Description |')
    lines.push('|-------|-------------|')
    for (const [, name, desc] of animEntries) {
      lines.push(`| \`${name}\` | ${desc} |`)
    }
    lines.push('')
  }

  lines.push('### Utility Classes')
  lines.push('')
  lines.push('| Utility | Example | Description |')
  lines.push('|---------|---------|-------------|')
  lines.push(
    '| `animation-delay-[n]` | `animation-delay-300` | Delay before animation starts (ms) |'
  )
  lines.push(
    '| `animation-duration-[n]` | `animation-duration-1000` | Animation duration (ms) |'
  )
  lines.push(
    '| `animation-iteration-[n]` | `animation-iteration-infinite` | Number of repetitions |'
  )
  lines.push(
    '| `animation-fill-[mode]` | `animation-fill-forwards` | CSS animation-fill-mode |'
  )
  lines.push('')

  return lines.join('\n')
}

function generateCustomIconsDoc(): string {
  const lines: string[] = []
  lines.push('# Custom Icons')
  lines.push('')
  lines.push(
    'Use with `<lukso-icon name="icon-name" size="medium"></lukso-icon>`.'
  )
  lines.push('')
  lines.push(
    'Sizes: `x-small` (12px), `small` (16px), `medium` (24px), `large` (32px), `x-large` (40px), `2x-large` (64px).'
  )
  lines.push('')
  lines.push('```html')
  lines.push('<lukso-icon name="profile" size="medium"></lukso-icon>')
  lines.push('```')
  lines.push('')

  const iconsDir = path.join(ROOT, 'src/components/lukso-icon/icons')
  const iconNames = fs
    .readdirSync(iconsDir)
    .filter((f: string) => f.endsWith('.ts'))
    .map((f: string) => f.replace(/\.ts$/, ''))
    .sort()

  lines.push('| Icon |')
  lines.push('|------|')
  for (const name of iconNames) {
    lines.push(`| \`${name}\` |`)
  }
  lines.push('')

  return lines.join('\n')
}

function generateVuesaxIconsDoc(): string {
  const lines: string[] = []
  lines.push('# Vuesax Icon Pack')
  lines.push('')
  lines.push(
    'Use `pack="vuesax"` to access the Vuesax icon library. Pass `variant` to select the style.'
  )
  lines.push('')
  lines.push('```html')
  lines.push(
    '<lukso-icon pack="vuesax" name="info-circle" variant="linear" size="medium"></lukso-icon>'
  )
  lines.push('```')
  lines.push('')

  const vuesaxBase = path.join(ROOT, 'src/components/lukso-icon/vuesax')
  if (fs.existsSync(vuesaxBase)) {
    const variants = fs
      .readdirSync(vuesaxBase)
      .filter((f: string) =>
        fs.statSync(path.join(vuesaxBase, f)).isDirectory()
      )
      .sort()

    const iconsByVariant: Record<string, Set<string>> = {}
    for (const variant of variants) {
      iconsByVariant[variant] = new Set(
        fs
          .readdirSync(path.join(vuesaxBase, variant))
          .filter((f: string) => f.endsWith('.svg'))
          .map((f: string) => f.replace(/\.svg$/, ''))
      )
    }

    const allIcons = [
      ...new Set(Object.values(iconsByVariant).flatMap(s => [...s])),
    ].sort()

    lines.push(`| Icon | ${variants.join(' | ')} |`)
    lines.push(`|------|${variants.map((_v: string) => '------').join('|')}|`)
    for (const icon of allIcons) {
      const cells = variants.map((v: string) =>
        iconsByVariant[v].has(icon) ? '✅' : '❌'
      )
      lines.push(`| \`${icon}\` | ${cells.join(' | ')} |`)
    }
    lines.push('')
  }

  return lines.join('\n')
}

function generateOtherDoc(): string {
  const lines: string[] = []
  lines.push('# Other Utilities')
  lines.push('')
  lines.push('## Border Radius')
  lines.push('')
  lines.push('Custom radius tokens available as `rounded-{n}`:')
  lines.push(
    '`rounded-0`, `rounded-2`, `rounded-4`, `rounded-6`, `rounded-8`, `rounded-10`, `rounded-12`, `rounded-14`, `rounded-16`, `rounded-24`'
  )
  lines.push('')
  lines.push('## Custom Spacing')
  lines.push('')
  lines.push(
    'Extra spacing tokens: `17` (68px/4.25rem), `18` (72px/4.5rem), `22` (88px/5.5rem), `30` (120px/7.5rem).'
  )
  lines.push('Use as `p-17`, `mt-18`, `w-22`, `h-30`, etc.')
  lines.push('')
  return lines.join('\n')
}

async function generateTailwindDocs(outDir: string): Promise<void> {
  const sections = [
    { file: 'colors.md', content: generateColorsDoc() },
    { file: 'typography.md', content: generateTypographyDoc() },
    { file: 'shadows.md', content: generateShadowsDoc() },
    { file: 'animations.md', content: generateAnimationsDoc() },
    { file: 'other.md', content: generateOtherDoc() },
  ]

  for (const s of sections) {
    write(path.join(outDir, s.file), s.content)
  }
}

function generateIconDocs(outDir: string): void {
  write(path.join(outDir, 'custom.md'), generateCustomIconsDoc())
  write(path.join(outDir, 'vuesax.md'), generateVuesaxIconsDoc())
}

// ─── main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Generating LLM documentation...')

  const outDir = path.join(ROOT, 'llms')
  fs.mkdirSync(outDir, { recursive: true })

  // ── Tailwind sections ──────────────────────────────────────────────────────
  console.log('  → tailwind classes')
  const tailwindOutDir = path.join(outDir, 'tailwind')
  fs.mkdirSync(tailwindOutDir, { recursive: true })
  await generateTailwindDocs(tailwindOutDir)

  // ── Icons ──────────────────────────────────────────────────────────────────
  console.log('  → icons')
  const iconsOutDir = path.join(outDir, 'icons')
  fs.mkdirSync(iconsOutDir, { recursive: true })
  generateIconDocs(iconsOutDir)

  // ── Components ─────────────────────────────────────────────────────────────
  const componentsOutDir = path.join(outDir, 'components')
  fs.mkdirSync(componentsOutDir, { recursive: true })

  const modules = loadCem()
  const classDecls = getClassDeclarations(modules)
  const tagNames: string[] = []

  for (const { module: mod, decl } of classDecls) {
    const sourcePath = path.join(ROOT, mod.path)
    if (!fs.existsSync(sourcePath)) {
      console.warn(`  ⚠ Source not found: ${mod.path}`)
      continue
    }

    const source = read(sourcePath)
    const tagName = getTagName(source)
    if (!tagName) {
      console.warn(`  ⚠ No tag name found in ${mod.path}`)
      continue
    }

    console.log(`  → ${tagName}`)

    const jsdoc = extractJsDoc(source, /@safeCustomElement\(/)
    const members = decl.members ?? []
    const doc = buildComponentDoc(tagName, jsdoc, members, source)

    write(path.join(componentsOutDir, `${tagName}.md`), doc)
    tagNames.push(tagName)
  }

  // ── Index llms.md ──────────────────────────────────────────────────────────
  const index = `# @lukso/web-components

Web Components library built with Lit + Tailwind CSS v4.

Install: \`npm install @lukso/web-components\`

Import once to register all components:

\`\`\`js
import '@lukso/web-components'
\`\`\`

Then use the HTML tags directly in any framework or vanilla HTML.

## Tailwind Utility Classes

- [Colors](llms/tailwind/colors.md)
- [Typography](llms/tailwind/typography.md)
- [Shadows](llms/tailwind/shadows.md)
- [Animations](llms/tailwind/animations.md)
- [Other Utilities](llms/tailwind/other.md)

## Icons

- [Custom Icons](llms/icons/custom.md)
- [Vuesax Icon Pack](llms/icons/vuesax.md)

## Components

${tagNames.map(t => `- [${t}](llms/components/${t}.md)`).join('\n')}
`

  write(path.join(ROOT, 'llms.md'), index)

  console.log(`\nDone! Generated:`)
  console.log(`  llms.md                   (index)`)
  console.log(`  llms/tailwind/*.md        (5 sections)`)
  console.log(`  llms/icons/custom.md`)
  console.log(`  llms/icons/vuesax.md`)
  console.log(`  llms/components/*.md      (${tagNames.length} components)`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
