// Dynamic import of axe-core to avoid bundling it in production
// axe-core is a CommonJS module designed for Node.js testing
let axe: typeof import('axe-core') | null = null

import type { Result as AxeResult, NodeResult } from 'axe-core'

// Keep existing API interface for backward compatibility
export type AccessibilityViolation = {
  id: string
  impact: 'minor' | 'moderate' | 'serious' | 'critical'
  description: string
  help: string
  helpUrl?: string
  nodes?: Array<{
    html?: string
    target?: string[]
    failureSummary?: string
  }>
}

export type AccessibilityCheckResult = {
  violations: AccessibilityViolation[]
  hasViolations: boolean
  violationCount: number
}

/**
 * Map axe-core result to our AccessibilityViolation format
 */
function mapAxeViolationToAccessibilityViolation(
  axeViolation: AxeResult
): AccessibilityViolation {
  return {
    id: axeViolation.id,
    impact: axeViolation.impact as
      | 'minor'
      | 'moderate'
      | 'serious'
      | 'critical',
    description: axeViolation.description,
    help: axeViolation.help,
    helpUrl: axeViolation.helpUrl,
    nodes:
      axeViolation.nodes?.map((node: NodeResult) => ({
        html: node.html,
        target: node.target as string[],
        failureSummary: node.failureSummary,
      })) || [],
  }
}

/**
 * Check accessibility violations directly on a rendered DOM element
 * Note: Only works in development mode where axe-core is available
 */
export async function checkAccessibility(
  element: HTMLElement
): Promise<AccessibilityCheckResult> {
  if (!element) {
    return {
      violations: [],
      hasViolations: false,
      violationCount: 0,
    }
  }

  try {
    // Lazy load axe-core only when needed (development mode)
    if (!axe) {
      try {
        axe = await import('axe-core')
      } catch (e) {
        // axe-core not available (production build or missing dependency)
        console.warn('axe-core not available, skipping accessibility check')
        return {
          violations: [],
          hasViolations: false,
          violationCount: 0,
        }
      }
    }

    // Run axe-core on the live preview content
    const results = await axe.run(element, {
      resultTypes: ['violations'],
      tags: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'],
      rules: {
        'color-contrast': { enabled: true },
        'color-contrast-enhanced': { enabled: true },
        'image-alt': { enabled: true },
        'button-name': { enabled: true },
        'link-name': { enabled: true },
        label: { enabled: true },
        'form-field-multiple-labels': { enabled: true },
      },
    } as any)

    // Map axe violations to our format
    const violations = (results as any).violations.map(
      mapAxeViolationToAccessibilityViolation
    )

    return {
      violations,
      hasViolations: violations.length > 0,
      violationCount: violations.length,
    }
  } catch (error) {
    console.warn('Accessibility checking failed:', error)
    return {
      violations: [],
      hasViolations: false,
      violationCount: 0,
    }
  }
}

/**
 * Get a summary of violations by impact level
 */
export const getViolationSummary = (
  violations: AccessibilityViolation[]
): {
  critical: number
  serious: number
  moderate: number
  minor: number
  total: number
} => {
  const summary = {
    critical: 0,
    serious: 0,
    moderate: 0,
    minor: 0,
    total: violations.length,
  }

  violations.forEach(violation => {
    if (violation.impact) {
      summary[violation.impact]++
    }
  })

  return summary
}

/**
 * Get impact level styling with Tailwind classes
 */
function getImpactStyling(impact: string): {
  colorClass: string
  borderClass: string
  label: string
} {
  switch (impact) {
    case 'critical':
      return {
        colorClass: 'text-red-600',
        borderClass: 'border-red-600',
        label: 'Critical',
      }
    case 'serious':
      return {
        colorClass: 'text-orange-600',
        borderClass: 'border-orange-600',
        label: 'Serious',
      }
    case 'moderate':
      return {
        colorClass: 'text-yellow-600',
        borderClass: 'border-yellow-600',
        label: 'Moderate',
      }
    case 'minor':
      return {
        colorClass: 'text-green-600',
        borderClass: 'border-green-600',
        label: 'Minor',
      }
    default:
      return {
        colorClass: 'text-gray-500',
        borderClass: 'border-gray-500',
        label: 'Info',
      }
  }
}

/**
 * Format violations for display in a tooltip with rich HTML
 */
export const formatViolationsForTooltip = (
  violations: AccessibilityViolation[]
): string => {
  if (violations.length === 0) {
    return `
      <div class="text-center text-green-600 font-semibold">
        No accessibility violations found!
      </div>
    `
  }

  const summary = getViolationSummary(violations)

  let tooltip = `
    <div class="max-w-sm leading-relaxed p-1">
      <div class="font-bold text-sm mb-1">
        Accessibility Issues Found
      </div>
  `

  // Add impact summary if there are multiple types

  tooltip += `
      <div class="mb-2">
        <div class="flex gap-3 flex-wrap">
    `

  if (summary.critical > 0) {
    tooltip += `<span class="text-red-600">🚨 ${summary.critical} Critical</span>`
  }
  if (summary.serious > 0) {
    tooltip += `<span class="text-orange-600">⚠️ ${summary.serious} Serious</span>`
  }
  if (summary.moderate > 0) {
    tooltip += `<span class="text-yellow-600">⚡ ${summary.moderate} Moderate</span>`
  }
  if (summary.minor > 0) {
    tooltip += `<span class="text-green-600">💡 ${summary.minor} Minor</span>`
  }

  tooltip += `
        </div>
      </div>
    `

  // Sort violations by importance (critical -> serious -> moderate -> minor)
  const sortedViolations = violations.sort((a, b) => {
    const impactOrder = { critical: 0, serious: 1, moderate: 2, minor: 3 }
    const aOrder = impactOrder[a.impact as keyof typeof impactOrder] ?? 4
    const bOrder = impactOrder[b.impact as keyof typeof impactOrder] ?? 4
    return aOrder - bOrder
  })

  tooltip += `<div class="space-y-3">`

  // Add individual violations (sorted by importance)
  sortedViolations.forEach(violation => {
    const impactStyling = getImpactStyling(violation.impact)

    tooltip += `
      <div class="p-2 bg-white border-l-4 ${impactStyling.borderClass} rounded">
        <div class="flex items-center gap-1.5 mb-1.5">
          <strong class="text-gray-800 text-xs leading-tight">${violation.help}</strong>
        </div>

        <div class="flex items-center gap-1.5 mb-1">
          <span class="text-xs ${impactStyling.colorClass} font-semibold">
            ${impactStyling.label}
          </span>
          <span class="text-xs text-gray-400">•</span>
          <span class="text-xs text-gray-500">
            ${violation.nodes?.length || 0} element${(violation.nodes?.length || 0) !== 1 ? 's' : ''} affected
          </span>
        </div>
      </div>
    `
  })

  // footer
  tooltip += `
    </div>
    <div class="text-10 text-gray-500 mt-2">Check out the <a target="_blank" class="underline" href="https://www.w3.org/TR/WCAG21/">WCAG</a> guidelines why this is important.</div>
    </div>
  `

  return tooltip.trim()
}
