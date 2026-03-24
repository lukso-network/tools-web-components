import fs from 'fs'
import path from 'path'
import { read } from './utils.js'

// ─── Colors ───────────────────────────────────────────────────────────────────

/** Generate the Colors section: color families and their available lightness values. */
export function generateColorsDoc(root: string): string {
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

  const tcSource = read(path.join(root, 'src/shared/tools/tailwind-config.ts'))
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

// ─── Typography ───────────────────────────────────────────────────────────────

/** Generate the Typography section: heading, nav, and paragraph classes parsed from typography-v4.css. */
export function generateTypographyDoc(root: string): string {
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

  // Parse classes directly from CSS (source of truth)
  const typCss = read(path.join(root, 'src/shared/styles/typography-v4.css'))
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

// ─── Shadows ──────────────────────────────────────────────────────────────────

/** Generate the Shadows section: shadow classes grouped by prefix, parsed from DropShadows.stories.ts. */
export function generateShadowsDoc(root: string): string {
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

  const shadowSource = read(path.join(root, 'src/docs/DropShadows.stories.ts'))
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

// ─── Animations ───────────────────────────────────────────────────────────────

/** Generate the Animations section: animation classes and utility modifiers parsed from Animations.stories.ts. */
export function generateAnimationsDoc(root: string): string {
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

  const animSource = read(path.join(root, 'src/docs/Animations.stories.ts'))
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

// ─── Other utilities ──────────────────────────────────────────────────────────

/** Generate the Other Utilities section: border radius tokens and extra spacing values. */
export function generateOtherDoc(): string {
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

// ─── Icons ────────────────────────────────────────────────────────────────────

/** Generate the Custom Icons section: icon names discovered from the icons/ directory. */
export function generateCustomIconsDoc(root: string): string {
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

  const iconsDir = path.join(root, 'src/components/lukso-icon/icons')
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

/** Generate the Vuesax Icons section: availability grid (✅/❌) per icon and variant, scanned from the vuesax/ directory. */
export function generateVuesaxIconsDoc(root: string): string {
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

  const vuesaxBase = path.join(root, 'src/components/lukso-icon/vuesax')
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

// ─── Entry points ─────────────────────────────────────────────────────────────

/** Return all Tailwind utility class docs as a single concatenated string. */
export function generateTailwindDocs(root: string): string {
  return [
    generateColorsDoc(root),
    generateTypographyDoc(root),
    generateShadowsDoc(root),
    generateAnimationsDoc(root),
    generateOtherDoc(),
  ].join('\n')
}

/** Return custom and Vuesax icon docs as a single concatenated string. */
export function generateIconDocs(root: string): string {
  return generateCustomIconsDoc(root) + '\n' + generateVuesaxIconsDoc(root)
}
