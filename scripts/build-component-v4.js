#!/usr/bin/env node
/**
 * Build script for component-v4.css
 *
 * This script compiles component-v4.scss (which uses @use for all partials)
 * and then appends @import 'tailwindcss' so Tailwind v4 can process it.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as sass from 'sass'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = dirname(__dirname)

console.log('Compiling component-v4.css...')

// Read the source SCSS file that uses @use for all partials
const componentV4Scss = readFileSync(
  `${rootDir}/src/shared/styles/component-v4.scss`,
  'utf-8'
)

// Compile SCSS to CSS (this handles all the @use directives)
const result = sass.compileString(componentV4Scss, {
  loadPaths: [`${rootDir}/src/shared/styles`],
  style: 'expanded',
  sourceMap: false,
})

// Append @source and @import 'tailwindcss' to the compiled CSS
// @source tells Tailwind v4 where to scan for utility classes
const componentV4Css = `${result.css}
@source '../**/*.{ts,tsx,js,jsx,html,mdx}';
@import 'tailwindcss';
`

// Write the final CSS file
const output = `${rootDir}/src/shared/styles/component-v4.css`
writeFileSync(output, componentV4Css)

console.log('✓ component-v4.css built successfully')
