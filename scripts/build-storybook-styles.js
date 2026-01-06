#!/usr/bin/env node
/**
 * Build script for Storybook styles.css
 *
 * This script compiles Storybook's styles.scss (which uses @use for all partials)
 * and then appends @import 'tailwindcss' so Tailwind v4 can process it.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as sass from 'sass'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = dirname(__dirname)

console.log('Compiling Storybook styles.css...')

// Read the Storybook SCSS file
const storybookScss = readFileSync(`${rootDir}/.storybook/styles.scss`, 'utf-8')

// Compile SCSS to CSS (this handles all the @use directives)
const result = sass.compileString(storybookScss, {
  loadPaths: [`${rootDir}/src/shared/styles`],
  style: 'expanded',
  sourceMap: false,
})

// Append @import 'tailwindcss' AFTER Sass compilation
// This way Sass doesn't try to process it, but Vite's Tailwind plugin will
const storybookCss = `${result.css}
@import 'tailwindcss';
`

// Write the final CSS file
const output = `${rootDir}/.storybook/styles.css`
writeFileSync(output, storybookCss)

console.log('✓ Storybook styles.css built successfully')
