/**
 * component-doc.ts
 *
 * Builds the markdown documentation for a single web component.
 * Parses JSDoc (description, @fires, @slot tags), renders the attributes table,
 * resolves referenced TypeScript types, and appends usage examples from stories.
 */

import type { CemMember } from './cem.js'
import { extractStoriesExamples } from './stories.js'

// ─── JSDoc parsing ────────────────────────────────────────────────────────────

/** Extract the JSDoc block immediately before a class declaration (identified by markerPattern) */
export function extractJsDoc(source: string, markerPattern: RegExp): string {
  const match = source.search(markerPattern)
  if (match === -1) return ''

  const before = source.slice(0, match)
  // Negative lookahead prevents spanning multiple /** ... */ blocks.
  // Allow decorators (e.g. @safeCustomElement) and `export` between the JSDoc and the class keyword.
  const docMatch = before.match(
    /\/\*\*((?:(?!\*\/)[\s\S])*)\*\/[\s\S]*?(?:@\w[^\n]*\n[\s\S]*?)*(?:export\s+)?$/
  )
  if (!docMatch) return ''

  return docMatch[1]
    .split('\n')
    .map(line => line.replace(/^\s*\*\s?/, ''))
    .join('\n')
    .trim()
}

/** Parse @fires tags from a JSDoc string */
export function parseFiresTags(
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
export function parseSlotTags(
  jsdoc: string
): { name: string; description: string }[] {
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

/** Strip @fires/@slot tags from a JSDoc string and return the prose description only. */
export function extractProse(jsdoc: string): string {
  return jsdoc
    .replace(/@fires\s+\{[^}]+\}\s+\S+\s*-[^\n]*/g, '')
    .replace(/@slot\s*[^\n]*/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

// ─── Type extraction ──────────────────────────────────────────────────────────

/**
 * Extract `export type TypeName = ...` definitions from a TypeScript source string.
 * Returns a map of TypeName → resolved union values (single-line or multi-line).
 */
function extractTypeDefinitions(src: string): Record<string, string> {
  const types: Record<string, string> = {}

  const singleLine = /^export\s+type\s+(\w+)\s*=\s*(.+)$/gm
  let m: RegExpExecArray | null
  while ((m = singleLine.exec(src)) !== null) {
    const name = m[1]
    const def = m[2].trim()
    if (/^['"`\d|'\s]+$/.test(def.replace(/\s+/g, ' ')) || def.includes("'")) {
      types[name] = def
    }
  }

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

/** Collect UpperCamelCase type names referenced in the public attribute fields. */
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
    const typeRefs = (m.type?.text ?? '').match(/\b[A-Z]\w+/g) ?? []
    for (const t of typeRefs) names.add(t)
  }
  return names
}

/**
 * Build a ## Types section listing types referenced in the attributes table.
 * Looks up definitions from the component source and shared types.ts.
 * Pass pre-loaded sharedTypesSrc to avoid re-reading the file per component.
 */
export function buildTypesSection(
  members: CemMember[],
  componentSrc: string,
  sharedTypesSrc: string
): string {
  const referenced = collectReferencedTypeNames(members)
  if (referenced.size === 0) return ''

  const allTypes = {
    ...extractTypeDefinitions(sharedTypesSrc),
    ...extractTypeDefinitions(componentSrc),
  }

  const lines: string[] = []
  for (const typeName of [...referenced].sort()) {
    const def = allTypes[typeName]
    if (!def) continue
    lines.push(`\`${typeName}\` = \`${def}\``)
  }

  if (lines.length === 0) return ''
  return '## Types\n\n' + lines.join('\n\n') + '\n'
}

// ─── Attribute table ──────────────────────────────────────────────────────────

/** Format a union type string so each member gets its own backticks: `A` ｜ `B` */
function fmtUnion(text: string): string {
  return text
    .split(/\s*\|\s*/)
    .map(t => `\`${t}\``)
    .join(' ｜ ')
}

/** Build the ## Attributes markdown table from CEM members */
export function buildAttributesTable(members: CemMember[]): string {
  const attrs = members.filter(
    m =>
      m.kind === 'field' && m.attribute && m.privacy !== 'private' && !m.static
  )
  if (attrs.length === 0) return '_None_\n'

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

// ─── Component doc builder ────────────────────────────────────────────────────

/** Build the full markdown doc for a single component */
export function buildComponentDoc(
  tagName: string,
  jsdoc: string,
  members: CemMember[],
  componentSrc: string,
  sharedTypesSrc: string,
  root: string
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

  const typesSection = buildTypesSection(members, componentSrc, sharedTypesSrc)
  if (typesSection) lines.push(typesSection)

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
  lines.push(extractStoriesExamples(tagName, root))
  lines.push('')

  return lines.join('\n')
}
