/**
 * stories.ts
 *
 * Extracts usage examples from Storybook story files (*.stories.ts).
 * Parses story args, renders Lit html`` templates into plain HTML snippets,
 * and extracts per-story JSDoc descriptions for inclusion in component docs.
 */

import path from 'path'
import { readSafe } from './utils.js'

// ─── Args object parser ───────────────────────────────────────────────────────

/**
 * Parse a JS/TS object literal `{ key: value, ... }` starting at openBrace.
 * Returns a flat Record for primitive values (string, number, boolean).
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

  const kvRegex =
    /(\w+)\s*:\s*(?:'([^']*)'|"([^"]*)"|`([^`]*)`|(true|false|undefined|null)|(-?\d+(?:\.\d+)?))/g
  let match: RegExpExecArray | null
  while ((match = kvRegex.exec(objectSrc)) !== null) {
    const key = match[1]
    if (match[2] !== undefined) result[key] = match[2]
    else if (match[3] !== undefined) result[key] = match[3]
    else if (match[4] !== undefined) result[key] = match[4]
    else if (match[5] !== undefined) {
      result[key] =
        match[5] === 'true' ? true : match[5] === 'false' ? false : undefined
    } else if (match[6] !== undefined) result[key] = Number(match[6])
  }

  return result
}

// ─── Arg → attribute name map ─────────────────────────────────────────────────

/**
 * Build a camelCase → kebab-case attribute name map from argTypes in a stories file.
 * Handles both `'kebab-attr': { name: 'camelKey' }` and `camelKey: { name: 'kebab-attr' }`.
 */
function buildArgToAttrMap(src: string): Record<string, string> {
  const map: Record<string, string> = {}

  const kebabToCamel = /['"]([a-z][\w-]+)['"]:\s*\{\s*name:\s*['"](\w+)['"]/g
  let match: RegExpExecArray | null
  while ((match = kebabToCamel.exec(src)) !== null) {
    const [, kebab, camel] = match
    if (kebab.includes('-')) map[camel] = kebab
  }

  const camelToKebab = /\b(\w+):\s*\{[^}]*name:\s*['"]([a-z][\w-]+)['"]/g
  while ((match = camelToKebab.exec(src)) !== null) {
    const [, camel, kebab] = match
    if (kebab.includes('-') && !camel.includes('-')) map[camel] = kebab
  }

  return map
}

// ─── Template renderer ────────────────────────────────────────────────────────

/**
 * Render a Lit html`` template string by substituting story args.
 *
 * - Removes @event and .property bindings (not valid HTML attributes)
 * - Replaces ?attr=${bool}, attr=${val}, ${text} with real values
 * - storyKeys: only emit attributes whose variable name is in this set
 *   (suppresses meta defaults that are not part of the specific story)
 */
function renderTemplate(
  templateSrc: string,
  args: Record<string, unknown>,
  storyKeys: Set<string>
): string {
  const shouldEmit = (varName: string) => storyKeys.has(varName)
  let html = templateSrc

  html = html.replace(/@[\w-]+=\$\{[^}]+\}\s*/g, '')
  html = html.replace(/\.\w+=\$\{[^}]+\}\s*/g, '')

  html = html.replace(
    /\?([a-z][\w-]*)=\$\{(\w+)(?:[^}]*)?\}/g,
    (_, attr, varName) => {
      if (!shouldEmit(varName)) return ''
      return args[varName] === true ? attr : ''
    }
  )

  html = html.replace(
    /([a-z][\w-]*)=\$\{(\w+)\s*\?\s*\2\s*:\s*nothing\}/g,
    (_, attr, varName) => {
      if (!shouldEmit(varName)) return ''
      const val = args[varName]
      return val === undefined ||
        val === null ||
        val === '' ||
        val === false ||
        val === 0
        ? ''
        : `${attr}="${val}"`
    }
  )

  html = html.replace(
    /([a-z][\w-]*)=\$\{(\w+)\s*\?[^}]+\}/g,
    (_, attr, varName) => {
      if (!shouldEmit(varName)) return ''
      const val = args[varName]
      return val === undefined || val === null || val === '' || val === false
        ? ''
        : `${attr}="${val}"`
    }
  )

  html = html.replace(/([a-z][\w-]*)=\$\{(\w+)\}/g, (_, attr, varName) => {
    if (!shouldEmit(varName)) return ''
    const val = args[varName]
    return val === undefined || val === null || val === ''
      ? ''
      : `${attr}="${val}"`
  })

  html = html.replace(/\$\{(\w+)\}/g, (_, varName) => {
    const val = args[varName]
    return val === undefined || val === null ? '' : String(val)
  })

  html = html.replace(/\s*style=\$\{[^}]+\}/g, '')
  html = html.replace(/\s*[\w-]+=\$\{[^}]+\}/g, '')
  html = html.replace(/\$\{[^}]+\}/g, '')

  // Remove style attributes with unit-only values (e.g. "margin-top: px" from story layout hacks)
  html = html.replace(/\s*style="([^"]*)"/g, (_full: string, value: string) => {
    const decls = value
      .split(';')
      .map((decl: string) => decl.trim())
      .filter((decl: string) => {
        if (!decl) return false
        const parts = decl.split(':')
        if (parts.length < 2) return false
        const val = parts.slice(1).join(':').trim()
        return val && !/^(px|em|rem|%|vh|vw)$/.test(val)
      })
    return decls.length === 0 ? '' : ` style="${decls.join('; ')}"`
  })

  html = html
    .split('\n')
    .map(line => line.replace(/\s{2,}/g, ' ').trim())
    .filter(line => line.length > 0)
    .join('\n')
    .replace(/ +>/g, '>')
    .replace(/ +\/>/g, '/>')

  return html.trim()
}

// ─── Story doc extractor ──────────────────────────────────────────────────────

/** Extract the JSDoc description from the comment immediately before `export const StoryName =` */
function extractStoryDoc(src: string, storyName: string): string {
  const pattern = new RegExp(
    `(\\/\\*\\*[\\s\\S]*?\\*\\/)[ \\t]*\\n(?:export\\s+const\\s+${storyName}\\s*=)`
  )
  const match = src.match(pattern)
  if (!match) return ''
  return match[1]
    .replace(/^\/\*\*/, '')
    .replace(/\*\/$/, '')
    .split('\n')
    .map(line => line.replace(/^\s*\*\s?/, ''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Extract usage examples from a component's `*.stories.ts` file.
 * Parses meta.args, argTypes, and named story exports statically (no DOM needed).
 * Returns a markdown ```html code block with one entry per story.
 */
export function extractStoriesExamples(tagName: string, root: string): string {
  const storiesPath = path.join(
    root,
    'src/components',
    tagName,
    `${tagName}.stories.ts`
  )

  const src = readSafe(storiesPath)
  if (!src) return `\`\`\`html\n<${tagName}></${tagName}>\n\`\`\``

  const metaArgsMatch = src.match(/args:\s*\{/)
  const metaArgs: Record<string, unknown> = {}
  if (metaArgsMatch?.index !== undefined) {
    Object.assign(
      metaArgs,
      parseArgsObject(src, src.indexOf('{', metaArgsMatch.index + 5))
    )
  }

  const argToAttr = buildArgToAttrMap(src)

  const templateMatch = src.match(
    /(?:const\s+(?:Default)?Template[^=]*=\s*(?:\([^)]*\)\s*=>|function[^{]*\{)[^`]*)`([\s\S]*?)`/
  )
  const templateSrc = templateMatch ? templateMatch[1] : ''

  type Story = {
    name: string
    args: Record<string, unknown>
    storyKeys: Set<string>
    doc: string
  }
  const stories: Story[] = []

  const storyExportRegex =
    /export\s+const\s+(\w+)\s*=\s*(?:Template|DefaultTemplate)\.bind\(\{\}\)/g
  let match: RegExpExecArray | null
  while ((match = storyExportRegex.exec(src)) !== null) {
    const storyName = match[1]
    if (storyName === 'default') continue

    const argsMatch = src.match(new RegExp(`${storyName}\\.args\\s*=\\s*\\{`))
    const storyArgs: Record<string, unknown> = {}
    if (argsMatch?.index !== undefined) {
      Object.assign(
        storyArgs,
        parseArgsObject(src, src.indexOf('{', argsMatch.index))
      )
    }

    stories.push({
      name: storyName,
      args: { ...metaArgs, ...storyArgs },
      storyKeys: new Set(Object.keys(storyArgs)),
      doc: extractStoryDoc(src, storyName),
    })
  }

  if (stories.length === 0 || !templateSrc) {
    return `\`\`\`html\n<${tagName}></${tagName}>\n\`\`\``
  }

  const examples: string[] = []

  for (const story of stories) {
    const normalizedArgs: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(story.args)) {
      normalizedArgs[k] = v
      if (argToAttr[k]) normalizedArgs[argToAttr[k].replace(/-/g, '')] = v
    }

    const rendered = renderTemplate(
      templateSrc,
      normalizedArgs,
      story.storyKeys
    )
    if (!rendered.trim()) continue

    const cleaned = rendered
      .split('\n')
      .map(l => l.trimEnd())
      .filter(l => l.trim())
      .join('\n')

    examples.push(story.doc ? `<!-- ${story.doc} -->\n${cleaned}` : cleaned)
  }

  if (examples.length === 0) {
    return `\`\`\`html\n<${tagName}></${tagName}>\n\`\`\``
  }

  return `\`\`\`html\n${examples.join('\n\n')}\n\`\`\``
}
