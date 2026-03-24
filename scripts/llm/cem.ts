/**
 * cem.ts
 *
 * Loads and queries the Custom Elements Manifest (package/custom-elements.json).
 * Provides typed interfaces for CEM declarations and helpers to extract
 * Lukso class declarations and tag names from component source files.
 */

import path from 'path'
import { read } from './utils.js'

export interface CemMember {
  kind: string
  name: string
  type?: { text: string }
  default?: string
  attribute?: string
  description?: string
  privacy?: string
  static?: boolean
}

export interface CemDeclaration {
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

export interface CemModule {
  kind: string
  path: string
  declarations?: CemDeclaration[]
}

/** Load the Custom Elements Manifest from package/custom-elements.json */
export function loadCem(root: string): CemModule[] {
  const cemPath = path.join(root, 'package/custom-elements.json')
  const cem = JSON.parse(read(cemPath))
  return cem.modules as CemModule[]
}

/** Return all Lukso class declarations with their parent module */
export function getClassDeclarations(
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

/** Extract the custom element tag name from a component source file */
export function getTagName(source: string): string {
  const match = source.match(/@safeCustomElement\('([^']+)'\)/)
  return match ? match[1] : ''
}
