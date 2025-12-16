#!/usr/bin/env node
/**
 * Build script for main-v4.css
 *
 * This script assembles main-v4.css by compiling individual SCSS partials
 * and adding the Tailwind v4 import at the beginning.
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
const colorsScss = readFileSync(
  `${dirname(__dirname)}/src/shared/styles/colors.scss`,
  'utf-8'
)
const fontsV4Scss = readFileSync(
  `${dirname(__dirname)}/src/shared/styles/fonts-v4.scss`,
  'utf-8'
)
const typographyScss = readFileSync(
  `${dirname(__dirname)}/src/shared/styles/typography.scss`,
  'utf-8'
)
const utilitiesScss = readFileSync(
  `${dirname(__dirname)}/src/shared/styles/utilities.scss`,
  'utf-8'
)
const variablesV4Scss = readFileSync(
  `${dirname(__dirname)}/src/shared/styles/variables-v4.scss`,
  'utf-8'
)
const tippyScss = readFileSync(
  `${dirname(__dirname)}/src/shared/styles/tippy.scss`,
  'utf-8'
)

// Compile each partial
console.log('Compiling SCSS partials...')
const colorsCss = compileScss(colorsScss, 'colors.scss')
const fontsV4Css = compileScss(fontsV4Scss, 'fonts-v4.scss')
const typographyCss = compileScss(typographyScss, 'typography.scss')
const utilitiesCss = compileScss(utilitiesScss, 'utilities.scss')
const variablesV4Css = compileScss(variablesV4Scss, 'variables-v4.scss')
const tippyCss = compileScss(tippyScss, 'tippy.scss')

// Assemble the final CSS
const mainV4Css = `/**
 * @file Main styles (Tailwind CSS v4)
 *
 * This file contain general styles that should be applied to host page.
 * This version uses Tailwind CSS v4 syntax.
 */

${colorsCss}
${fontsV4Css}
${typographyCss}
${utilitiesCss}
${variablesV4Css}
${tippyCss}

/* Tailwind v4 import for modern consumers */
@import "tailwindcss";

strong {
  font-weight: 600;
}
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
