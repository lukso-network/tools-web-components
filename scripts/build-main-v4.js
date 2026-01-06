#!/usr/bin/env node
/**
 * Build script for main-v4.css
 *
 * This script:
 * 1. Compiles SCSS partials individually
 * 2. Concatenates them
 * 3. Processes through Tailwind to expand @apply directives
 * 4. Adds the Tailwind v4 import for end users
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as sass from 'sass'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Compile individual SCSS files
const compileScss = (content, file = 'inline') => {
  try {
    const result = sass.compileString(content, {
      loadPaths: [`${dirname(__dirname)}/src/shared/styles`],
      style: 'expanded',
      sourceMap: false,
    })
    return result.css
  } catch (err) {
    console.error(`Error compiling ${file}:`, err.message)
    throw err
  }
}

// Read the SCSS partials
console.log('Compiling SCSS partials...')
const colorsScss = readFileSync(
  `${dirname(__dirname)}/src/shared/styles/colors.scss`,
  'utf-8'
)
const fontsV4Scss = readFileSync(
  `${dirname(__dirname)}/src/shared/styles/fonts-v4.scss`,
  'utf-8'
)
const variablesV4Scss = readFileSync(
  `${dirname(__dirname)}/src/shared/styles/variables-v4.scss`,
  'utf-8'
)

// Compile each partial
const colorsCss = compileScss(colorsScss, 'colors.scss')
const fontsV4Css = compileScss(fontsV4Scss, 'fonts-v4.scss')
const variablesV4Css = compileScss(variablesV4Scss, 'variables-v4.scss')

// Assemble the final CSS (only theme config and fonts - no typography classes)
const mainV4Css = `/**
 * @file Main styles (Tailwind CSS v4)
 *
 * This file contains theme configuration for Tailwind v4 applications.
 * Import this to get the same typography scale and design tokens.
 *
 * For Web Components: This does NOT include component-specific styles.
 * The components have their own encapsulated styles via Shadow DOM.
 */

${variablesV4Css}
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
