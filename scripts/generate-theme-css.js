#!/usr/bin/env node
/**
 * Generate Tailwind v4 @theme CSS from tailwind-config.ts
 *
 * This script converts the JavaScript theme configuration into CSS custom properties
 * for use with Tailwind CSS v4's CSS-first configuration.
 */

import {
  fontSizes,
  fontWeights,
  lineHeights,
  boxShadows,
  borderRadius,
  scales,
  heights,
  spacing,
} from '../src/shared/tools/tailwind-config.js'

// Generate @theme CSS
const generateThemeCSS = () => {
  const lines = ['@theme {']

  // Font families
  lines.push('  /* Font families */')
  lines.push('  --font-inter: "Inter", ui-sans-serif, system-ui, sans-serif;')
  lines.push('  --font-mono: "PT Mono", ui-monospace, monospace;')
  lines.push('')

  // Font sizes
  lines.push('  /* Font sizes */')
  for (const [key, value] of Object.entries(fontSizes)) {
    lines.push(`  --font-size-${key}: ${value};`)
  }
  lines.push('')

  // Font weights
  lines.push('  /* Font weights */')
  for (const [key, value] of Object.entries(fontWeights)) {
    lines.push(`  --font-weight-${key}: ${value};`)
  }
  lines.push('')

  // Line heights
  lines.push('  /* Line heights */')
  for (const [key, value] of Object.entries(lineHeights)) {
    lines.push(`  --line-height-${key}: ${value};`)
  }
  lines.push('')

  // Border radius
  lines.push('  /* Border radius */')
  for (const [key, value] of Object.entries(borderRadius)) {
    lines.push(`  --radius-${key}: ${value};`)
  }
  lines.push('')

  // Box shadows
  lines.push('  /* Box shadows */')
  for (const [key, value] of Object.entries(boxShadows)) {
    lines.push(`  --shadow-${key}: ${value};`)
  }
  lines.push('')

  // Scales
  lines.push('  /* Scales */')
  for (const [key, value] of Object.entries(scales)) {
    lines.push(`  --scale-${key}: ${value};`)
  }
  lines.push('')

  // Heights
  lines.push('  /* Heights */')
  for (const [key, value] of Object.entries(heights)) {
    lines.push(`  --height-${key}: ${value};`)
  }
  lines.push('')

  // Spacing
  lines.push('  /* Spacing */')
  for (const [key, value] of Object.entries(spacing)) {
    lines.push(`  --spacing-${key}: ${value};`)
  }

  lines.push('}')

  return lines.join('\n')
}

// Output the generated CSS
console.log(generateThemeCSS())
