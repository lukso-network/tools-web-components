#!/usr/bin/env node
/**
 * Build script for main-v4.css for package distribution
 *
 * This script:
 * 1. Reads generated CSS files (colors without --color- prefix for external usage)
 * 2. Concatenates them
 * 3. Adds the Tailwind v4 import for end users
 *
 * This output is for external consumers who want to use the design tokens
 * in their own Tailwind v4 applications.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Read the generated CSS files
console.log('Reading generated CSS files...')
const colorsCss = readFileSync(
  `${dirname(__dirname)}/src/shared/styles/generated/colors.css`,
  'utf-8'
)
const fontsV4Css = readFileSync(
  `${dirname(__dirname)}/src/shared/styles/generated/fonts-v4.css`,
  'utf-8'
)

// Assemble the final CSS (only theme config and fonts - no typography classes)
const mainV4Css = `/**
 * @file Main styles (Tailwind CSS v4)
 *
 * This file contains theme configuration for Tailwind v4 applications.
 * Import this to get the same typography scale and design tokens.
 *
 * IMPORTANT: This uses :root CSS variables (--neutral-20) for external usage.
 * For internal component usage with Tailwind v4 @theme, see generated/main-v4.css.
 */

${colorsCss}
${fontsV4Css}

/* Tailwind v4 import - enables all utilities with custom theme */
@import "tailwindcss";
`

// Write the output files
const outputDist = `${dirname(__dirname)}/package/dist/styles/main-v4.css`
const outputTools = `${dirname(__dirname)}/package/tools/styles/main-v4.css`

console.log('Writing output files...')
mkdirSync(dirname(outputDist), { recursive: true })
writeFileSync(outputDist, mainV4Css)
// console.log(`✓ Created ${outputDist}`)

mkdirSync(dirname(outputTools), { recursive: true })
writeFileSync(outputTools, mainV4Css)
// console.log(`✓ Created ${outputTools}`)

console.log('✓ main-v4.css built successfully')
