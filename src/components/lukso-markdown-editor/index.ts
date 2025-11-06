import { html, nothing, type PropertyValues } from 'lit'
import { property, state, query } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { safeCustomElement } from '@/shared/safe-custom-element'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import { cn } from '@/shared/tools'
import {
  checkAccessibility,
  formatViolationsForTooltip,
  type AccessibilityViolation,
} from '@/shared/tools/accessibility-checker'
import style from './style.scss?inline'
import '@/components/lukso-textarea'
import '@/components/lukso-markdown'
import '@/components/lukso-switch'
import '@/components/lukso-button'
import '@/components/lukso-icon'
import '@/components/lukso-sanitize'
import '@/components/lukso-dropdown'
import '@/components/lukso-dropdown-option'
import '@/components/lukso-tooltip'
import '@/components/lukso-form-label'

import type { InputSize } from '@/shared/types'

type TextAlignment = 'left' | 'center' | 'right'

const DEFAULT_PREVIEW_BACKGROUND_COLOR = '#f9f9f9'
const DEFAULT_PREVIEW_TEXT_COLOR = '#243542' // neutral-20
const ACCESSIBILITY_CHECK_DELAY = 1000 // ms - debounce checking

@safeCustomElement('lukso-markdown-editor')
export class LuksoMarkdownEditor extends TailwindStyledElement(style) {
  @property({ type: String })
  value = ''

  @property({ type: String, reflect: true })
  name = ''

  @property({ type: String })
  label = ''

  @property({ type: String })
  description = ''

  @property({ type: String })
  error = ''

  @property({ type: Boolean, attribute: 'is-full-width' })
  isFullWidth = false

  @property({ type: Boolean, attribute: 'is-readonly' })
  isReadonly = false

  @property({ type: Boolean, attribute: 'is-disabled' })
  isDisabled = false

  @property({ type: Boolean, attribute: 'is-non-resizable' }) isNonResizable =
    false

  @property({ type: Boolean })
  autofocus = false

  @property({ type: String, reflect: true })
  size: InputSize = 'large'

  @property({ type: Boolean, attribute: 'is-preview', reflect: true })
  isPreview = false

  @property({ type: Number })
  rows = 6

  @property({ type: String })
  placeholder = ''

  @property({
    type: String,
    attribute: 'preview-background-color',
    reflect: true,
  })
  previewBackgroundColor = DEFAULT_PREVIEW_BACKGROUND_COLOR

  @property({ type: String, attribute: 'preview-text-color', reflect: true })
  previewTextColor = DEFAULT_PREVIEW_TEXT_COLOR

  @property({ type: Boolean, attribute: 'strip-html-tags' })
  stripHtmlTags = false

  @property({ type: String })
  tools = undefined

  // State for tools
  @state() private toolsState: string[] = []
  private defaultTools: string[] = [
    'heading',
    'bold',
    'italic',
    'list',
    'link',
    'alignment',
    'color',
  ]

  // State preservation for mode switching
  @state() private savedSelectionForPreview: {
    start: number
    end: number
  } | null = null

  // dropdown
  @state() private isHeadingDropdownOpen = false
  @state() private isColorDropdownOpen = false
  @state() private isListDropdownOpen = false
  @state() private isAlignmentDropdownOpen = false
  private readonly headingTriggerId = 'heading-dropdown-trigger'
  private readonly colorTriggerId = 'color-dropdown-trigger'
  private readonly listTriggerId = 'list-dropdown-trigger'
  private readonly alignmentTriggerId = 'alignment-dropdown-trigger'

  // selection
  @state() private currentSelection = { start: 0, end: 0 }
  @state() private savedSelection: { start: number; end: number } | null = null

  // formatting
  @state() private activeFormats = {
    bold: false,
    italic: false,
    link: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    color: false,
    activeColor: DEFAULT_PREVIEW_TEXT_COLOR,
    unorderedList: false,
    orderedList: false,
    alignment: 'left',
  }

  // Undo/Redo state
  private undoStack: Array<{
    value: string
    selection: { start: number; end: number }
  }> = []
  private redoStack: Array<{
    value: string
    selection: { start: number; end: number }
  }> = []
  private isUndoRedoAction = false
  private lastSavedValue = ''
  private undoTimeout: number | null = null
  private readonly MAX_UNDO_STACK_SIZE = 100
  private readonly UNDO_SAVE_DELAY = 500 // ms

  // Accessibility checking state
  @state() private accessibilityViolations: AccessibilityViolation[] = []
  @state() private hasAccessibilityViolations = false
  private accessibilityCheckTimeout: number | null = null

  @query('lukso-textarea') private textareaEl?: HTMLElement & {
    shadowRoot: ShadowRoot
  }

  private handleOutsideClick = (event: Event) => {
    const target = event.target as HTMLElement

    // Check if click is inside our component at all
    const isInsideThisComponent =
      this.contains(target) || this.shadowRoot?.contains(target)

    if (!isInsideThisComponent) {
      // Click is completely outside our component, close all dropdowns
      if (this.isHeadingDropdownOpen) {
        this.isHeadingDropdownOpen = false
      }
      if (this.isColorDropdownOpen) {
        this.isColorDropdownOpen = false
      }
      if (this.isListDropdownOpen) {
        this.isListDropdownOpen = false
      }
      if (this.isAlignmentDropdownOpen) {
        this.isAlignmentDropdownOpen = false
      }
      return
    }

    // Click is inside our component, check if it's inside dropdowns or triggers
    const isInsideHeadingDropdown = this.shadowRoot
      ?.getElementById('headingDropdown')
      ?.contains(target)
    const isInsideColorDropdown = this.shadowRoot
      ?.getElementById('colorDropdown')
      ?.contains(target)
    const isInsideListDropdown = this.shadowRoot
      ?.getElementById('listDropdown')
      ?.contains(target)
    const isInsideAlignmentDropdown = this.shadowRoot
      ?.getElementById('alignmentDropdown')
      ?.contains(target)
    const isHeadingTrigger = this.shadowRoot
      ?.getElementById(this.headingTriggerId)
      ?.contains(target)
    const isColorTrigger = this.shadowRoot
      ?.getElementById(this.colorTriggerId)
      ?.contains(target)
    const isListTrigger = this.shadowRoot
      ?.getElementById(this.listTriggerId)
      ?.contains(target)
    const isAlignmentTrigger = this.shadowRoot
      ?.getElementById(this.alignmentTriggerId)
      ?.contains(target)

    // Only close dropdowns if click is not inside them or their triggers
    if (
      !isInsideHeadingDropdown &&
      !isHeadingTrigger &&
      this.isHeadingDropdownOpen
    ) {
      this.isHeadingDropdownOpen = false
    }

    if (!isInsideColorDropdown && !isColorTrigger && this.isColorDropdownOpen) {
      this.isColorDropdownOpen = false
    }

    if (!isInsideListDropdown && !isListTrigger && this.isListDropdownOpen) {
      this.isListDropdownOpen = false
    }

    if (
      !isInsideAlignmentDropdown &&
      !isAlignmentTrigger &&
      this.isAlignmentDropdownOpen
    ) {
      this.isAlignmentDropdownOpen = false
    }
  }

  private styles = tv({
    slots: {
      wrapper: 'w-[inherit] grid gap-3',
      header:
        'flex items-center justify-between gap-2 border border-neutral-90 rounded-12 px-3 py-2 bg-neutral-100',
      toolbar: 'flex flex-wrap items-center gap-1',
      area: 'relative',
      editor: '',
      preview: 'p-3 border border-neutral-90 rounded-12 min-h-[158px]',
      colorMenu: 'relative',
      headingMenu: 'relative',
      listMenu: 'relative',
      alignmentMenu: 'relative',
      label: 'heading-inter-14-bold text-neutral-20',
      description: 'paragraph-inter-12-regular text-neutral-20',
      divider: 'w-[1px] h-4 bg-neutral-90',
    },
    variants: {
      isFullWidth: {
        true: { wrapper: 'w-full' },
        false: { wrapper: 'w-[350px]' },
      },
    },
    compoundVariants: [{ isFullWidth: false, class: { wrapper: 'w-[500px]' } }],
  })

  private toolbarButton = tv({
    base: 'hover:bg-neutral-95 transition border-0 !shadow-none',
    variants: {
      active: { true: 'bg-neutral-95' },
      disabled: { true: 'opacity-50 cursor-not-allowed' },
    },
  })

  /**
   * Hex color palette for the color picker.
   * A curated collection of colors organized by hue families,
   * ranging from light pastels to bold colors.
   */
  private colorSamples = [
    '#FFE5E5', // very light red
    '#FFB3B3',
    '#FF8080',
    '#FF6666',
    '#FF4D4D',
    '#E63946', // strong pastel red

    '#FFEBD5', // very light orange
    '#FFD1A3',
    '#FFB870',
    '#FFA54D',
    '#FF944D',
    '#FF7F11', // bold pastel orange

    '#FFFBD5', // very light yellow
    '#FFF3A3',
    '#FFE870',
    '#FFDD4D',
    '#FFD633',
    '#F4C430', // deep pastel yellow

    '#E6F9EC', // very light green
    '#B3E6C1',
    '#80D499',
    '#66CC80',
    '#4DB870',
    '#2D9C5B', // bold pastel green

    '#E6F3FF', // very light blue
    '#B3DAFF',
    '#80C2FF',
    '#66B2FF',
    '#4DA6FF',
    '#3A86FF', // bold pastel blue

    '#F3E6FF', // very light purple
    '#D9B3FF',
    '#BF80FF',
    '#A64DFF',
    '#9333FF',
    '#7B2CBF', // bold pastel purple

    '#FFE6F3', // very light pink
    '#FFB3D9',
    '#FF80BF',
    '#FF66B2',
    '#FF4DA6',
    '#E75480', // bold pastel pink

    '#F5E6DA', // very light brown
    '#E6CBB3',
    '#D9B38C',
    '#CC9966',
    '#B3773A',
    '#8B5E3C', // bold pastel brown

    '#FFFFFF', // white
    '#F5F5F5', // very light gray
    '#E0E0E0', // light gray
    '#BDBDBD', // medium gray
    '#757575', // dark gray
    '#000000', // black
    DEFAULT_PREVIEW_TEXT_COLOR,
  ]

  private dispatchChange(event?: Event) {
    this.updateComplete.then(() => {
      const changeEvent = new CustomEvent('on-markdown-change', {
        detail: { value: this.value, event },
        bubbles: false,
        composed: true,
      })
      this.dispatchEvent(changeEvent)
    })
  }

  /**
   * Check accessibility violations on the live preview content
   */
  private async performAccessibilityCheck(): Promise<void> {
    if (!this.value.trim()) {
      this.accessibilityViolations = []
      this.hasAccessibilityViolations = false
      return
    }

    try {
      // Only check accessibility in preview mode when content is actually rendered
      if (this.isPreview) {
        const markdownEl = this.shadowRoot?.querySelector('lukso-markdown')

        if (markdownEl) {
          // Wait a bit for the markdown to be fully rendered
          await new Promise(resolve => setTimeout(resolve, 200))

          // Get the rendered content element (the actual DOM we want to check)
          const sanitizeEl =
            markdownEl.shadowRoot?.querySelector('lukso-sanitize')
          const proseDiv = sanitizeEl?.shadowRoot?.querySelector(
            'div.prose'
          ) as HTMLElement

          if (proseDiv) {
            // Run accessibility check directly on the live, rendered content
            const result = await checkAccessibility(proseDiv)
            this.accessibilityViolations = result.violations
            this.hasAccessibilityViolations = result.hasViolations
          } else {
            // If we can't find the preview content, clear violations
            this.accessibilityViolations = []
            this.hasAccessibilityViolations = false
          }
        }
      } else {
        // In edit mode, clear any existing violations
        this.accessibilityViolations = []
        this.hasAccessibilityViolations = false
      }
    } catch (error) {
      console.warn('Accessibility checking failed:', error)
      this.accessibilityViolations = []
      this.hasAccessibilityViolations = false
    }

    // Force a re-render to ensure the indicator updates
    this.requestUpdate()
  }

  /**
   * Schedule accessibility check with debouncing
   */
  private scheduleAccessibilityCheck(): void {
    // Clear existing timeout
    if (this.accessibilityCheckTimeout) {
      clearTimeout(this.accessibilityCheckTimeout)
    }

    // Schedule check after delay (to avoid checking on every keystroke)
    this.accessibilityCheckTimeout = window.setTimeout(() => {
      this.performAccessibilityCheck()
      this.accessibilityCheckTimeout = null
    }, ACCESSIBILITY_CHECK_DELAY)
  }

  /**
   * Clean up empty color spans from the value.
   * This removes spans like <span style="color: #xxx"></span> with no content.
   */
  private cleanupEmptyColorSpans() {
    // Match color spans without content (no semicolon in our format)
    const emptyColorSpanRegex = /<span style="color: [^"]+"><\/span>/g
    const cleanedValue = this.value.replace(emptyColorSpanRegex, '')

    if (cleanedValue !== this.value) {
      this.value = cleanedValue
      const textarea = this.textareaEl?.shadowRoot?.querySelector('textarea')
      if (textarea) {
        const currentPos = textarea.selectionStart ?? 0
        textarea.value = cleanedValue

        // Adjust cursor position if needed
        const newPos = Math.min(currentPos, cleanedValue.length)
        textarea.setSelectionRange(newPos, newPos)
      }
    }
  }

  /**
   * Unified helper that ensures both active format state and change events are properly
   * emitted after any value mutation. This replaces the scattered updateActiveFormats()
   * and dispatchChange() calls throughout the codebase.
   *
   * @param event - Optional event that triggered the change
   */
  private emitChangeAndRefresh(event?: Event) {
    this.cleanupEmptyColorSpans()
    this.updateActiveFormats()
    this.dispatchChange(event)
    this.scheduleAccessibilityCheck()
  }

  /**
   * Utility to perform an operation with the current textarea selection.
   *
   * @param callback -
   */
  private withSelection(
    callback: (
      input: HTMLTextAreaElement,
      start: number,
      end: number,
      value: string
    ) => void
  ) {
    const textarea = this.textareaEl?.shadowRoot?.querySelector(
      'textarea'
    ) as HTMLTextAreaElement | null
    if (!textarea) return
    const start = textarea.selectionStart ?? 0
    const end = textarea.selectionEnd ?? 0
    const value = this.value
    callback(textarea, start, end, value)
    // re-focus and keep selection close to end
    textarea.focus()
  }

  /**
   * Expand empty selection to current word boundaries
   *
   * @param start - selection start
   * @param end - selection end
   * @param value - full textarea value
   */
  private expandSelectionToWord(start: number, end: number, value: string) {
    if (start !== end) return { start, end }

    // Special case: if cursor is inside empty parentheses () or empty brackets [],
    // don't expand at all to avoid selecting the closing bracket/paren
    const charBefore = start > 0 ? value[start - 1] : ''
    const charAfter = start < value.length ? value[start] : ''
    if (
      (charBefore === '(' && charAfter === ')') ||
      (charBefore === '[' && charAfter === ']')
    ) {
      return { start, end }
    }

    let _start = start
    let _end = end
    const isWord = (ch: string) => /[\p{L}\p{N}_-]/u.test(ch)
    while (_start > 0 && isWord(value[_start - 1])) _start--
    while (_end < value.length && isWord(value[_end])) _end++
    return { start: _start, end: _end }
  }

  /**
   * Apply or toggle heading formatting for the current line(s).
   *
   * @param level - 0 to remove heading, 1-4 for heading levels
   */
  private applyHeading(level: 0 | 1 | 2 | 3 | 4) {
    if (this.isReadonly || this.isDisabled) return

    // Save undo state before making changes
    this.saveUndoStateBeforeChange()

    const desiredPrefix = level > 0 ? `${'#'.repeat(level)} ` : ''
    this.withSelection((textarea, start, end, value) => {
      // Expand to full lines covered by selection
      const lineStart = value.lastIndexOf('\n', start - 1) + 1
      let lineEnd = value.indexOf('\n', end)
      if (lineEnd === -1) lineEnd = value.length
      const before = value.slice(0, lineStart)
      const selected = value.slice(lineStart, lineEnd)
      const after = value.slice(lineEnd)

      const lines = selected.split('\n')
      const headingRegex = /^(#{1,6})\s+/
      const allAlreadyLevel = lines.every(l => l.startsWith(desiredPrefix))

      let transformed: string
      if (level === 0) {
        // Remove any heading formatting
        transformed = lines.map(l => l.replace(headingRegex, '')).join('\n')
      } else {
        transformed = lines
          .map(l => {
            const withoutAny = l.replace(headingRegex, '')
            if (allAlreadyLevel) {
              // Toggle off if already exact level: remove heading prefix
              return withoutAny
            }
            // Otherwise set to exact desired level
            return desiredPrefix + withoutAny
          })
          .join('\n')
      }

      this.value = before + transformed + after

      // Also update the textarea element's value directly to ensure sync
      textarea.value = before + transformed + after

      // Position cursor appropriately based on content
      let cursorPosition = before.length
      if (level > 0 && !allAlreadyLevel) {
        // If we added a heading prefix, check if there's text content
        const firstLine = lines[0] || ''
        const contentAfterHeading = firstLine.replace(headingRegex, '')

        if (contentAfterHeading.trim()) {
          // There's text content, position cursor at the end of the first line
          const firstLineEnd = transformed.indexOf('\n')
          cursorPosition =
            before.length +
            (firstLineEnd === -1 ? transformed.length : firstLineEnd)
        } else {
          // No text content, position cursor after "# " or "## " etc.
          cursorPosition = before.length + desiredPrefix.length
        }
      } else if (level === 0 || allAlreadyLevel) {
        // If we removed heading formatting or toggled off, position at end of first line
        const firstLineEnd = transformed.indexOf('\n')
        cursorPosition =
          before.length +
          (firstLineEnd === -1 ? transformed.length : firstLineEnd)
      }

      requestAnimationFrame(() => {
        textarea.setSelectionRange(cursorPosition, cursorPosition)
        this.emitChangeAndRefresh()
      })
    })
  }

  /**
   * Apply or toggle list formatting for the current line(s).
   *
   * @param listType - 'none' to remove list, 'unordered' for bullet list, 'ordered' for numbered list
   */
  private applyList(listType: 'none' | 'unordered' | 'ordered') {
    if (this.isReadonly || this.isDisabled) return

    // Save undo state before making changes
    this.saveUndoStateBeforeChange()

    this.withSelection((textarea, start, end, value) => {
      // Expand to full lines covered by selection
      const lineStart = value.lastIndexOf('\n', start - 1) + 1
      let lineEnd = value.indexOf('\n', end)
      if (lineEnd === -1) lineEnd = value.length
      const before = value.slice(0, lineStart)
      const selected = value.slice(lineStart, lineEnd)
      const after = value.slice(lineEnd)

      const lines = selected.split('\n')
      const unorderedRegex = /^(\s*)[-*+]\s+/
      const orderedRegex = /^(\s*)\d+\.\s+/

      let transformed: string
      if (listType === 'none') {
        // Remove any list formatting
        transformed = lines
          .map(l => {
            // Check for unordered list first
            if (unorderedRegex.test(l)) {
              return l.replace(unorderedRegex, '$1')
            }
            // Check for ordered list
            if (orderedRegex.test(l)) {
              return l.replace(orderedRegex, '$1')
            }
            // No list formatting found, return as is
            return l
          })
          .join('\n')
      } else if (listType === 'unordered') {
        // Check if all lines are already unordered lists
        const allAlreadyUnordered = lines.every(
          l => l.trim() === '' || unorderedRegex.test(l)
        )

        if (allAlreadyUnordered && lines.some(l => unorderedRegex.test(l))) {
          // Toggle off: remove unordered list formatting
          transformed = lines
            .map(l => {
              if (unorderedRegex.test(l)) {
                return l.replace(unorderedRegex, '$1')
              }
              return l
            })
            .join('\n')
        } else {
          // Apply unordered list formatting
          transformed = lines
            .map(l => {
              if (l.trim() === '') return l
              // Remove any existing list formatting first
              let cleaned = l
              if (unorderedRegex.test(l)) {
                cleaned = l.replace(unorderedRegex, '$1')
              } else if (orderedRegex.test(l)) {
                cleaned = l.replace(orderedRegex, '$1')
              }
              const indentMatch = cleaned.match(/^(\s*)/)
              const indent = indentMatch ? indentMatch[1] : ''
              const content = cleaned.replace(/^\s*/, '')
              return `${indent}- ${content}`
            })
            .join('\n')
        }
      } else if (listType === 'ordered') {
        // Check if all lines are already ordered lists
        const allAlreadyOrdered = lines.every(
          l => l.trim() === '' || orderedRegex.test(l)
        )

        if (allAlreadyOrdered && lines.some(l => orderedRegex.test(l))) {
          // Toggle off: remove ordered list formatting
          transformed = lines
            .map(l => {
              if (orderedRegex.test(l)) {
                return l.replace(orderedRegex, '$1')
              }
              return l
            })
            .join('\n')
        } else {
          // Apply ordered list formatting
          // Find the starting counter by looking backwards from the selection
          let counter = 1

          // Look backwards from the selection to find any existing ordered list items
          const beforeLines = before.split('\n')
          for (let i = beforeLines.length - 1; i >= 0; i--) {
            const line = beforeLines[i]
            const orderedMatch = line.match(/^(\s*)(\d+)\.\s+(.*)$/)
            if (orderedMatch) {
              // Found an ordered list item, continue from its number
              counter = parseInt(orderedMatch[2], 10) + 1
              break
            } else if (line.trim() !== '' && !line.match(/^\s*[-*+]\s+/)) {
              // Hit non-list content, stop looking
              break
            }
          }

          transformed = lines
            .map(l => {
              if (l.trim() === '') return l
              // Remove any existing list formatting first
              let cleaned = l
              if (unorderedRegex.test(l)) {
                cleaned = l.replace(unorderedRegex, '$1')
              } else if (orderedRegex.test(l)) {
                cleaned = l.replace(orderedRegex, '$1')
              }
              const indentMatch = cleaned.match(/^(\s*)/)
              const indent = indentMatch ? indentMatch[1] : ''
              const content = cleaned.replace(/^\s*/, '')
              return `${indent}${counter++}. ${content}`
            })
            .join('\n')
        }
      }

      let finalValue = before + transformed + after

      // If we applied ordered list formatting (and it wasn't already all ordered), renumber any subsequent ordered list items
      if (listType === 'ordered') {
        const allAlreadyOrdered = lines.every(
          l => l.trim() === '' || orderedRegex.test(l)
        )

        if (!allAlreadyOrdered || !lines.some(l => orderedRegex.test(l))) {
          // Find the indentation level of the last line we just transformed
          const transformedLines = transformed.split('\n')
          const lastTransformedLine =
            transformedLines[transformedLines.length - 1]
          const indentMatch = lastTransformedLine.match(/^(\s*)/)
          const indent = indentMatch ? indentMatch[1] : ''

          // Renumber items that come after our transformation
          const endPosition = before.length + transformed.length
          finalValue = this.renumberOrderedListItems(
            finalValue,
            endPosition,
            indent
          )
        }
      }

      // Handle renumbering for list removal
      if (listType === 'none') {
        // Check if we removed any ordered list items, and renumber subsequent items if needed
        const removedOrderedItems = lines.some(l => orderedRegex.test(l))
        if (removedOrderedItems) {
          // Find any subsequent ordered lists and renumber them starting from 1
          finalValue = this.renumberSubsequentOrderedLists(
            finalValue,
            before.length + transformed.length
          )
        }
      }

      this.value = finalValue

      // Also update the textarea element's value directly to ensure sync
      textarea.value = finalValue

      // Position cursor at the end of the first line
      const firstLineEnd = transformed.indexOf('\n')
      const cursorPosition =
        before.length +
        (firstLineEnd === -1 ? transformed.length : firstLineEnd)

      requestAnimationFrame(() => {
        textarea.setSelectionRange(cursorPosition, cursorPosition)
        this.emitChangeAndRefresh()
      })
    })
  }

  /**
   * Get the current active list type based on activeFormats.
   */
  private getActiveListType(): 'none' | 'unordered' | 'ordered' {
    if (this.activeFormats.unorderedList) return 'unordered'
    if (this.activeFormats.orderedList) return 'ordered'
    return 'none'
  }

  /**
   * Get the current alignment icon name based on activeFormats.
   */
  private getAlignmentIcon(): string {
    switch (this.activeFormats.alignment) {
      case 'center':
        return 'textalign-center'
      case 'right':
        return 'textalign-right'
      default:
        return 'textalign-left'
    }
  }

  /**
   * Apply or toggle text alignment for the current line(s).
   *
   * @param alignment - 'left', 'center', or 'right'
   */
  private applyAlignment(alignment: TextAlignment) {
    if (this.isReadonly || this.isDisabled) return

    // Save undo state before making changes
    this.saveUndoStateBeforeChange()

    this.withSelection((textarea, start, end, value) => {
      // Expand to full lines covered by selection
      const lineStart = value.lastIndexOf('\n', start - 1) + 1
      let lineEnd = value.indexOf('\n', end)
      if (lineEnd === -1) lineEnd = value.length
      const before = value.slice(0, lineStart)
      const selected = value.slice(lineStart, lineEnd)
      const after = value.slice(lineEnd)

      let transformed: string
      const currentAlignmentRegex =
        /<div style="text-align: (left|center|right);">(.*?)<\/div>/s
      const existingMatch = selected.match(currentAlignmentRegex)

      if (existingMatch || this.hasNestedAlignment(selected)) {
        // Handle existing alignment (either simple or nested)
        if (existingMatch) {
          // Simple case: alignment div is at the top level
          const existingAlignment = existingMatch[1]
          const innerContent = existingMatch[2]

          if (existingAlignment === alignment) {
            // Same alignment: remove alignment formatting
            transformed = innerContent
          } else {
            // Different alignment: change to new alignment
            transformed = `<div style="text-align: ${alignment};">${innerContent}</div>`
          }
        } else {
          // Nested case: alignment div is inside formatting markers
          if (this.getNestedAlignment(selected) === alignment) {
            // Same alignment: remove alignment formatting
            transformed = this.removeNestedAlignment(selected)
          } else {
            // Different alignment: change to new alignment
            transformed = this.replaceNestedAlignment(selected, alignment)
          }
        }
      } else {
        // No existing alignment: apply new alignment
        if (alignment === 'left') {
          // Left alignment is default, so just use the content without wrapper
          transformed = selected
        } else {
          // Apply alignment by wrapping the content inside formatting markers
          transformed = this.wrapContentWithAlignment(selected, alignment)
        }
      }

      this.value = before + transformed + after

      // Also update the textarea element's value directly to ensure sync
      textarea.value = before + transformed + after

      // Select the text content (similar to color formatting)
      // Calculate the position of the actual content inside the alignment div
      let selStart: number
      let selEnd: number

      if (
        alignment === 'left' ||
        (existingMatch && existingMatch[1] === alignment) ||
        this.getNestedAlignment(selected) === alignment
      ) {
        // When removing alignment or it's left-aligned, select the unwrapped content
        selStart = before.length
        selEnd = before.length + transformed.length
      } else {
        // When applying center/right alignment, select the inner content
        const openTagMatch = transformed.match(
          /<div style="text-align: (center|right);">([^<]*)<\/div>/
        )
        if (openTagMatch) {
          const innerContent = openTagMatch[2]
          const tagStart = transformed.indexOf('>') + 1
          selStart = before.length + tagStart
          selEnd = selStart + innerContent.length
        } else {
          // Fallback for nested case - select the whole transformed content
          selStart = before.length
          selEnd = before.length + transformed.length
        }
      }

      requestAnimationFrame(() => {
        textarea.setSelectionRange(selStart, selEnd)
        this.emitChangeAndRefresh()
      })
    })
  }

  /**
   * Check if content has nested alignment divs inside formatting markers.
   */
  private hasNestedAlignment(content: string): boolean {
    const alignmentRegex = /<div style="text-align: (left|center|right);">/
    return alignmentRegex.test(content)
  }

  /**
   * Get the alignment from nested alignment divs.
   */
  private getNestedAlignment(content: string): TextAlignment | null {
    const alignmentMatch = content.match(
      /<div style="text-align: (left|center|right);">/
    )
    return alignmentMatch ? (alignmentMatch[1] as TextAlignment) : null
  }

  /**
   * Remove nested alignment divs from content.
   */
  private removeNestedAlignment(content: string): string {
    return content.replace(
      /<div style="text-align: (left|center|right);">([^<]*?)<\/div>/g,
      '$2'
    )
  }

  /**
   * Replace nested alignment with a new alignment.
   */
  private replaceNestedAlignment(
    content: string,
    newAlignment: TextAlignment
  ): string {
    return content.replace(
      /<div style="text-align: (left|center|right);">([^<]*?)<\/div>/g,
      `<div style="text-align: ${newAlignment};">$2</div>`
    )
  }

  /**
   * Wrap content with alignment div, ensuring proper nesting inside formatting markers.
   * Examples:
   * - **text** becomes **<div style="text-align: center;">text</div>**
   * - *text* becomes *<div style="text-align: center;">text</div>*
   * - # text becomes # <div style="text-align: center;">text</div>
   *
   * @param content - the content to wrap
   * @param alignment - 'left', 'center' or 'right'
   */
  private wrapContentWithAlignment(
    content: string,
    alignment: TextAlignment
  ): string {
    const alignmentDiv = (innerContent: string) =>
      `<div style="text-align: ${alignment};">${innerContent}</div>`

    // Handle headings (must come first to avoid conflicts with other patterns)
    const headingMatch = content.match(/^(#{1,6}\s+)(.*)$/)
    if (headingMatch) {
      const headingPrefix = headingMatch[1]
      const headingText = headingMatch[2]
      return headingPrefix + alignmentDiv(headingText)
    }

    // Handle bold text (**text**)
    const boldMatch = content.match(/^(\*\*)(.+?)(\*\*)$/s)
    if (boldMatch) {
      const innerText = boldMatch[2]
      return `**${alignmentDiv(innerText)}**`
    }

    // Handle italic text (*text*) - must come after bold to avoid conflict
    const italicMatch = content.match(/^(\*)(.+?)(\*)$/s)
    if (italicMatch) {
      const innerText = italicMatch[2]
      return `*${alignmentDiv(innerText)}*`
    }

    // Handle links [text](url)
    const linkMatch = content.match(/^(\[)(.+?)(\]\([^)]+\))$/s)
    if (linkMatch) {
      const linkStart = linkMatch[1]
      const linkText = linkMatch[2]
      const linkEnd = linkMatch[3]
      return linkStart + alignmentDiv(linkText) + linkEnd
    }

    // Handle colored text <span style="color: ...">text</span>
    const colorMatch = content.match(
      /^(<span style="color: [^"]+;">)(.+?)(<\/span>)$/s
    )
    if (colorMatch) {
      const colorStart = colorMatch[1]
      const colorText = colorMatch[2]
      const colorEnd = colorMatch[3]
      return colorStart + alignmentDiv(colorText) + colorEnd
    }

    // Handle list items (unordered: - * +, ordered: 1. 2. etc.)
    const listMatch = content.match(/^(\s*(?:[-*+]|\d+\.)\s+)(.*)$/)
    if (listMatch) {
      const listPrefix = listMatch[1]
      const listText = listMatch[2]
      return listPrefix + alignmentDiv(listText)
    }

    // Default: wrap the entire content
    return alignmentDiv(content)
  }

  /**
   * Toggle inline formatting by wrapping/unwrapping selection or current word.
   *
   * @param wrapper - the markdown wrapper to toggle, e.g. '**' for bold, '*' for italic
   */
  private toggleWrap(wrapper: '**' | '*') {
    if (this.isReadonly || this.isDisabled) return

    // Save undo state before making changes
    this.saveUndoStateBeforeChange()

    this.withSelection((textarea, start, end, value) => {
      // Block formatting if selection is within the URL part of a link
      if (this.isSelectionInLinkUrl(start, end, value)) {
        return // Do nothing - formatting not allowed in link URLs
      }

      const { start: s, end: e } = this.expandSelectionToWord(start, end, value)
      let before = value.slice(0, s)
      let selected = value.slice(s, e)
      let after = value.slice(e)

      // Check if selection is already wrapped by wrapper outside boundaries
      const hasOuterWrap = before.endsWith(wrapper) && after.startsWith(wrapper)

      if (hasOuterWrap) {
        // unwrap
        before = before.slice(0, before.length - wrapper.length)
        after = after.slice(wrapper.length)
        this.value = before + selected + after

        // Also update the textarea element's value directly to ensure sync
        textarea.value = before + selected + after

        const selStart = before.length
        const selEnd = selStart + selected.length
        requestAnimationFrame(() => {
          textarea.setSelectionRange(selStart, selEnd)
          this.emitChangeAndRefresh()
        })
        return
      }

      // If selection text itself starts/ends with wrapper, unwrap inner
      const innerWrapped =
        selected.startsWith(wrapper) && selected.endsWith(wrapper)
      if (innerWrapped) {
        selected = selected.slice(
          wrapper.length,
          selected.length - wrapper.length
        )
        this.value = before + selected + after

        // Also update the textarea element's value directly to ensure sync
        textarea.value = before + selected + after

        const selStart = before.length
        const selEnd = selStart + selected.length
        requestAnimationFrame(() => {
          textarea.setSelectionRange(selStart, selEnd)
          this.emitChangeAndRefresh()
        })
        return
      }

      // Otherwise, wrap
      const wrapped = `${wrapper}${selected || ''}${wrapper}`
      this.value = before + wrapped + after

      // Also update the textarea element's value directly to ensure sync
      textarea.value = before + wrapped + after

      const selStart = before.length + wrapper.length
      const selEnd = selStart + (selected ? selected.length : 0)
      requestAnimationFrame(() => {
        textarea.setSelectionRange(selStart, selEnd)
        this.emitChangeAndRefresh()
      })
    })
  }

  /**
   * Toggle preview mode on or off.
   */
  private togglePreview() {
    if (this.isPreview) {
      this.exitPreview()
    } else {
      this.enterPreview()
    }
    this.isPreview = !this.isPreview

    // Trigger accessibility check when entering preview mode
    if (this.isPreview) {
      // Schedule check after render
      requestAnimationFrame(() => {
        this.scheduleAccessibilityCheck()
      })
    }
  }

  /**
   * Enter preview mode - save current state and remove keyboard listeners from textarea
   */
  private enterPreview() {
    const textarea = this.textareaEl?.shadowRoot?.querySelector('textarea')
    if (textarea) {
      // Save current selection for restoration when exiting preview
      this.savedSelectionForPreview = {
        start: textarea.selectionStart ?? 0,
        end: textarea.selectionEnd ?? 0,
      }

      // Remove keyboard listeners to prevent conflicts
      this.removeKeyboardListeners()
    }
  }

  /**
   * Exit preview mode - restore state and reattach keyboard listeners
   */
  private exitPreview() {
    // Schedule restoration after the DOM updates
    requestAnimationFrame(() => {
      const textarea = this.textareaEl?.shadowRoot?.querySelector('textarea')
      if (textarea && this.savedSelectionForPreview) {
        // Restore focus and selection
        textarea.focus()
        textarea.setSelectionRange(
          this.savedSelectionForPreview.start,
          this.savedSelectionForPreview.end
        )
        this.currentSelection = this.savedSelectionForPreview
        this.savedSelectionForPreview = null

        // Update active formats based on restored selection
        this.updateActiveFormats()
      }

      // Re-add keyboard listeners
      this.addKeyboardListeners()
    })
  }

  /**
   * Insert or edit a markdown link [text](url).
   */
  private insertLink() {
    if (this.isReadonly || this.isDisabled) return

    // Save undo state before making changes
    this.saveUndoStateBeforeChange()

    const placeholderText = 'link text'
    const placeholderUrl = ''

    this.withSelection((textarea, start, end, value) => {
      // If cursor/selection is within any part of a link, remove the link
      if (
        this.isSelectionInLinkUrl(start, end, value) ||
        this.isSelectionInLinkText(start, end, value)
      ) {
        // Find the link that contains the cursor and remove it
        const leftBracket = value.lastIndexOf('[', start)
        const rightParen = value.indexOf(')', Math.max(start, end))
        const rightBracket = value.indexOf(']', leftBracket)
        const openParen = value.indexOf('(', rightBracket)

        if (
          leftBracket !== -1 &&
          rightBracket !== -1 &&
          openParen !== -1 &&
          rightParen !== -1
        ) {
          const candidate = value.slice(leftBracket, rightParen + 1)
          const linkRegex = /^\[([^\]]+)\]\(([^)]*)\)$/
          const match = candidate.match(linkRegex)

          if (match) {
            const textOnly = match[1]
            this.value =
              value.slice(0, leftBracket) +
              textOnly +
              value.slice(rightParen + 1)

            // Also update the textarea element's value directly to ensure sync
            textarea.value =
              value.slice(0, leftBracket) +
              textOnly +
              value.slice(rightParen + 1)

            const newCursor = leftBracket + textOnly.length
            requestAnimationFrame(() => {
              textarea.setSelectionRange(newCursor, newCursor)
              this.emitChangeAndRefresh()
            })
            return
          }
        }
        return // Fallback: do nothing if we can't parse the link
      }

      const { start: s, end: e } = this.expandSelectionToWord(start, end, value)
      const before = value.slice(0, s)
      const selected = value.slice(s, e)
      const after = value.slice(e)

      // If selection is already a markdown link, unwrap to plain text
      const linkRegex = /^\[([^\]]+)\]\(([^)]+)\)$/
      if (linkRegex.test(selected)) {
        const match = selected.match(linkRegex)
        const textOnly = match?.[1] ?? selected
        this.value = before + textOnly + after

        // Also update the textarea element's value directly to ensure sync
        textarea.value = before + textOnly + after

        const newStart = before.length
        const newEnd = newStart + textOnly.length
        requestAnimationFrame(() => {
          textarea.setSelectionRange(newStart, newEnd)
          this.emitChangeAndRefresh()
        })
        return
      }

      // If selection is within an existing link [text](url), try to expand around
      // Find nearest '[' before and ')' after
      const leftBracket = value.lastIndexOf('[', s)
      const rightParen = value.indexOf(')', e)
      const rightBracket = value.indexOf(']', e)
      const openParen = value.indexOf('(', e)
      if (
        leftBracket !== -1 &&
        rightBracket !== -1 &&
        openParen !== -1 &&
        rightParen !== -1 &&
        leftBracket < rightBracket &&
        rightBracket < openParen &&
        openParen < rightParen
      ) {
        const candidate = value.slice(leftBracket, rightParen + 1)
        if (linkRegex.test(candidate)) {
          // unwrap whole link to text
          const match = candidate.match(linkRegex)
          const textOnly = match?.[1] ?? candidate
          this.value =
            value.slice(0, leftBracket) + textOnly + value.slice(rightParen + 1)

          // Also update the textarea element's value directly to ensure sync
          textarea.value =
            value.slice(0, leftBracket) + textOnly + value.slice(rightParen + 1)

          const newCursor = leftBracket + textOnly.length
          requestAnimationFrame(() => {
            textarea.setSelectionRange(newCursor, newCursor)
            this.emitChangeAndRefresh()
          })
          return
        }
      }

      // Otherwise insert a link template
      const text = selected || placeholderText
      const md = `[${text}](${placeholderUrl})`
      this.value = before + md + after

      // Also update the textarea element's value directly to ensure sync
      textarea.value = before + md + after

      // Position cursor inside parentheses for immediate URL entry
      // Calculation: before + '[' + text + '](' = cursor position inside ()
      const cursorPosition = before.length + 1 + text.length + 2 // [text](|
      requestAnimationFrame(() => {
        textarea.focus()
        textarea.setSelectionRange(cursorPosition, cursorPosition)
        this.emitChangeAndRefresh()
      })
    })
  }

  /**
   * Handle input event from the internal textarea component.
   * @param event
   */
  private handleTextareaInput = (event: CustomEvent) => {
    const newValue = event.detail?.value || ''

    // Don't save to undo stack if this is an undo/redo operation
    if (!this.isUndoRedoAction) {
      this.scheduleUndoStateSave()
    }

    this.value = newValue
    this.emitChangeAndRefresh(event)
  }

  /**
   * Update active formatting states based on current selection or cursor position.
   */
  private updateActiveFormats() {
    const textarea = this.textareaEl?.shadowRoot?.querySelector('textarea')
    if (!textarea || !this.value) return

    const start = textarea.selectionStart ?? 0
    const end = textarea.selectionEnd ?? 0
    this.currentSelection = { start, end }

    // Analyze current selection/cursor position for active formats
    const { start: s, end: e } = this.expandSelectionToWord(
      start,
      end,
      this.value
    )
    const selectedText = this.value.slice(s, e)
    const beforeSelection = this.value.slice(0, s)
    const afterSelection = this.value.slice(e)

    // Check for inline formatting
    const hasBoldWrap =
      (beforeSelection.endsWith('**') && afterSelection.startsWith('**')) ||
      (selectedText.startsWith('**') && selectedText.endsWith('**'))

    const hasItalicWrap =
      (beforeSelection.endsWith('*') &&
        afterSelection.startsWith('*') &&
        !beforeSelection.endsWith('**')) ||
      (selectedText.startsWith('*') &&
        selectedText.endsWith('*') &&
        !selectedText.startsWith('**'))

    // Check for link
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/
    const hasLink =
      linkRegex.test(selectedText) || this.isWithinLink(start, this.value)

    // Check for headings (look at line start)
    const lineStart = this.value.lastIndexOf('\n', start - 1) + 1
    const lineEnd = this.value.indexOf('\n', start)
    const currentLine = this.value.slice(
      lineStart,
      lineEnd === -1 ? this.value.length : lineEnd
    )

    const headingMatch = currentLine.match(/^(#{1,6})\s/)
    const headingLevel = headingMatch ? headingMatch[1].length : 0

    // Check for lists (look at line start)
    // Note: The \s+ ensures there's at least one space after the list marker,
    // which prevents false matches with formatting like **bold** or *italic*
    const unorderedListMatch = currentLine.match(/^\s*[-*+]\s+/)
    const orderedListMatch = currentLine.match(/^\s*\d+\.\s+/)
    const hasUnorderedList = !!unorderedListMatch
    const hasOrderedList = !!orderedListMatch

    // Check for color formatting
    const colorRegex = /<span style="color: ([^"]+)">/
    const hasColorWrap = !!(
      (beforeSelection.match(colorRegex) &&
        afterSelection.includes('</span>')) ||
      selectedText.match(/^<span style="color: ([^"]+)">(.*)<\/span>$/s)
    )

    let activeColor = DEFAULT_PREVIEW_TEXT_COLOR
    if (hasColorWrap) {
      // Try to extract the active color
      const beforeColorMatch = beforeSelection.match(
        /<span style="color: ([^"]+)">([^<]*)$/
      )
      const selectedColorMatch = selectedText.match(
        /^<span style="color: ([^"]+)">/
      )
      activeColor = beforeColorMatch?.[1] || selectedColorMatch?.[1] || ''
    }

    // Check for text alignment (both simple and nested cases)
    const alignmentRegex = /<div style="text-align: (left|center|right);">/
    let alignment: TextAlignment = 'left' // default alignment

    // Check if current line contains an alignment div anywhere (including nested)
    const alignmentMatch = currentLine.match(alignmentRegex)
    if (alignmentMatch) {
      alignment = alignmentMatch[1] as TextAlignment
    } else {
      // Check if we're inside an alignment block that spans multiple lines
      const beforeCurrentLine = this.value.slice(0, lineStart)
      const alignmentStartMatch = beforeCurrentLine.match(
        /.*<div style="text-align: (left|center|right);">[^<]*$/s
      )
      if (alignmentStartMatch) {
        const afterCurrentLine = this.value.slice(lineEnd)
        // Check if there's a closing div tag after the current line
        if (afterCurrentLine.includes('</div>')) {
          alignment = alignmentStartMatch[1] as TextAlignment
        }
      }
    }

    this.activeFormats = {
      bold: hasBoldWrap,
      italic: hasItalicWrap,
      link: hasLink,
      h1: headingLevel === 1,
      h2: headingLevel === 2,
      h3: headingLevel === 3,
      h4: headingLevel === 4,
      color: hasColorWrap,
      activeColor,
      unorderedList: hasUnorderedList,
      orderedList: hasOrderedList,
      alignment,
    }
  }

  /**
   * Check if a given position is within a markdown link [text](url).
   * @param position - cursor position
   * @param value  - full textarea value
   */
  private isWithinLink(position: number, value: string): boolean {
    const leftBracket = value.lastIndexOf('[', position)
    const rightParen = value.indexOf(')', position)
    if (leftBracket === -1 || rightParen === -1) return false

    const candidate = value.slice(leftBracket, rightParen + 1)
    return /^\[([^\]]+)\]\(([^)]+)\)$/.test(candidate)
  }

  /**
   * Check if selection is within the text part [] of a markdown link
   * @param start - selection start position
   * @param end - selection end position
   * @param value - full textarea value
   */
  private isSelectionInLinkText(
    start: number,
    end: number,
    value: string
  ): boolean {
    // Find the nearest link that could contain this selection
    const leftBracket = value.lastIndexOf('[', start)
    const rightParen = value.indexOf(')', Math.max(start, end))

    if (leftBracket === -1 || rightParen === -1) return false

    // Find the corresponding ] and (
    const rightBracket = value.indexOf(']', leftBracket)
    const openParen = value.indexOf('(', rightBracket)

    if (rightBracket === -1 || openParen === -1) return false
    if (
      !(
        leftBracket < rightBracket &&
        rightBracket < openParen &&
        openParen < rightParen
      )
    )
      return false

    // Check if this forms a valid link
    const candidate = value.slice(leftBracket, rightParen + 1)
    if (!/^\[([^\]]+)\]\(([^)]*)\)$/.test(candidate)) return false

    // Check if the selection is within the text part (between square brackets)
    return start >= leftBracket + 1 && end <= rightBracket
  }

  /**
   * Check if selection is within the URL part () of a markdown link
   * @param start - selection start position
   * @param end - selection end position
   * @param value - full textarea value
   */
  private isSelectionInLinkUrl(
    start: number,
    end: number,
    value: string
  ): boolean {
    // Find the nearest link that could contain this selection
    const leftBracket = value.lastIndexOf('[', start)
    const rightParen = value.indexOf(')', Math.max(start, end))

    if (leftBracket === -1 || rightParen === -1) return false

    // Find the corresponding ] and (
    const rightBracket = value.indexOf(']', leftBracket)
    const openParen = value.indexOf('(', rightBracket)

    if (rightBracket === -1 || openParen === -1) return false
    if (
      !(
        leftBracket < rightBracket &&
        rightBracket < openParen &&
        openParen < rightParen
      )
    )
      return false

    // Check if this forms a valid link (allow empty URL part)
    const candidate = value.slice(leftBracket, rightParen + 1)
    if (!/^\[([^\]]+)\]\(([^)]*)\)$/.test(candidate)) return false

    // Check if the selection is within the URL part (between parentheses)
    return start >= openParen + 1 && end <= rightParen
  }

  /**
   * Textarea keyup handler.
   * Update active formats when user navigates with keyboard.
   */
  private handleTextareaKeyUp = () => {
    requestAnimationFrame(() => this.updateActiveFormats())
  }

  /**
   * Textarea click handler.
   * Update active formats when user clicks to move cursor.
   */
  private handleTextareaClick = () => {
    requestAnimationFrame(() => this.updateActiveFormats())
  }

  /**
   * Add keyboard event listeners to the textarea for undo/redo functionality.
   */
  private addKeyboardListeners() {
    // Try multiple times to ensure textarea is ready
    const tryAddListener = (attempts = 0) => {
      const textarea = this.textareaEl?.shadowRoot?.querySelector('textarea')
      if (textarea) {
        // Avoid duplicate listeners by removing first
        textarea.removeEventListener('keydown', this.handleKeyDown)
        textarea.addEventListener('keydown', this.handleKeyDown)
      } else if (attempts < 15) {
        // Retry after a short delay - give more attempts for mode switching
        requestAnimationFrame(() => tryAddListener(attempts + 1))
      }
    }
    tryAddListener()
  }

  /**
   * Remove keyboard event listeners from the textarea to prevent memory leaks.
   */
  private removeKeyboardListeners() {
    const textarea = this.textareaEl?.shadowRoot?.querySelector('textarea')
    if (textarea) {
      textarea.removeEventListener('keydown', this.handleKeyDown)
    }
  }

  /**
   * Toggle color formatting by wrapping/unwrapping selection or current word.
   *
   * @param color - the hex color code to apply, e.g. '#FF0000' for red
   */
  private toggleColorWrap(color: string) {
    if (this.isReadonly || this.isDisabled) return

    // Save undo state before making changes
    this.saveUndoStateBeforeChange()

    this.withSelection((textarea, start, end, value) => {
      // Block formatting if selection is within the URL part of a link
      if (this.isSelectionInLinkUrl(start, end, value)) {
        return // Do nothing - formatting not allowed in link URLs
      }

      const { start: s, end: e } = this.expandSelectionToWord(start, end, value)
      let before = value.slice(0, s)
      let selected = value.slice(s, e)
      let after = value.slice(e)

      const colorTagClose = '</span>'

      // Check if selection is wrapped by any color span (not necessarily the same color)
      const anyColorSpanRegex = /<span style="color: ([^"]+)">$/
      const beforeColorMatch = before.match(anyColorSpanRegex)
      const hasOuterWrap = beforeColorMatch && after.startsWith(colorTagClose)

      if (hasOuterWrap) {
        const existingColor = beforeColorMatch[1]
        let selStart: number
        let selEnd: number

        if (existingColor === color) {
          // Same color: unwrap (remove color formatting)
          before = before.slice(0, before.length - beforeColorMatch[0].length)
          after = after.slice(colorTagClose.length)
          this.value = before + selected + after

          // Also update the textarea element's value directly to ensure sync
          textarea.value = before + selected + after

          selStart = before.length
          selEnd = selStart + selected.length
        } else {
          // Different color: update the existing span's color
          const newColorTagOpen = `<span style="color: ${color}">`
          before =
            before.slice(0, before.length - beforeColorMatch[0].length) +
            newColorTagOpen
          this.value = before + selected + after

          // Also update the textarea element's value directly to ensure sync
          textarea.value = before + selected + after

          selStart = before.length
          selEnd = selStart + selected.length
        }

        requestAnimationFrame(() => {
          textarea.setSelectionRange(selStart, selEnd)
          this.emitChangeAndRefresh()
        })
        return
      }

      // Check if selection itself is wrapped with any color tags
      const colorRegex = /^<span style="color: ([^"]+)">(.*)<\/span>$/s
      const innerMatch = selected.match(colorRegex)
      if (innerMatch) {
        const existingColor = innerMatch[1]
        const innerText = innerMatch[2]

        if (existingColor === color) {
          // Same color: unwrap (remove color formatting)
          selected = innerText
        } else {
          // Different color: update the existing span's color
          selected = `<span style="color: ${color}">${innerText}</span>`
        }

        this.value = before + selected + after

        // Also update the textarea element's value directly to ensure sync
        textarea.value = before + selected + after

        const selStart = before.length
        const selEnd =
          selStart +
          (existingColor === color ? innerText.length : innerText.length)
        requestAnimationFrame(() => {
          textarea.setSelectionRange(selStart, selEnd)
          this.emitChangeAndRefresh()
        })
        return
      }

      // Otherwise, wrap with new color
      const newColorTagOpen = `<span style="color: ${color}">`
      const wrapped = `${newColorTagOpen}${selected || ''}${colorTagClose}`
      this.value = before + wrapped + after

      // Also update the textarea element's value directly to ensure sync
      textarea.value = before + wrapped + after

      const selStart = before.length + newColorTagOpen.length
      const selEnd = selStart + (selected ? selected.length : 0)
      requestAnimationFrame(() => {
        textarea.setSelectionRange(selStart, selEnd)
        this.emitChangeAndRefresh()
      })
    })
  }

  /**
   * Handle color selection from the dropdown.
   *
   * @param color - the selected hex color code
   */
  private selectColor(color: string) {
    // If we have a saved selection, restore it and apply color formatting
    if (this.savedSelection) {
      const textarea = this.textareaEl?.shadowRoot?.querySelector('textarea')
      if (textarea) {
        textarea.focus()
        textarea.setSelectionRange(
          this.savedSelection.start,
          this.savedSelection.end
        )
        this.currentSelection = this.savedSelection
        this.savedSelection = null

        // Apply color formatting to the restored selection
        this.toggleColorWrap(color)
      }
    } else {
      // Fallback: just apply to current selection if any
      this.toggleColorWrap(color)
    }
  }

  /**
   * Clear color formatting from the current selection or word.
   */
  private clearColor() {
    if (this.isReadonly || this.isDisabled) return

    // Save undo state before making changes
    this.saveUndoStateBeforeChange()

    // If we have a saved selection, restore it
    if (this.savedSelection) {
      const textarea = this.textareaEl?.shadowRoot?.querySelector('textarea')
      if (textarea) {
        textarea.focus()
        textarea.setSelectionRange(
          this.savedSelection.start,
          this.savedSelection.end
        )
        this.currentSelection = this.savedSelection
        this.savedSelection = null
      }
    }

    this.withSelection((textarea, start, end, value) => {
      // Block formatting if selection is within the URL part of a link
      if (this.isSelectionInLinkUrl(start, end, value)) {
        return // Do nothing - formatting not allowed in link URLs
      }

      const { start: s, end: e } = this.expandSelectionToWord(start, end, value)

      // Look for color spans that contain our selection
      const colorRegex = /<span style="color: ([^"]+)">(.*?)<\/span>/g
      let match: RegExpExecArray | null
      let newValue = value
      let foundSpan = false

      // Reset regex index
      colorRegex.lastIndex = 0

      match = colorRegex.exec(value)
      while (match !== null) {
        const fullMatchStart = match.index
        const fullMatchEnd = match.index + match[0].length
        const spanOpenTag = `<span style="color: ${match[1]}">`
        const contentStart = fullMatchStart + spanOpenTag.length
        const contentEnd = fullMatchEnd - 7 // '</span>'.length
        const innerContent = match[2]
        match = colorRegex.exec(value)

        // Check if our selection overlaps with this color span's content
        const selectionOverlaps =
          (s >= contentStart && s < contentEnd) ||
          (e > contentStart && e <= contentEnd) ||
          (s <= contentStart && e >= contentEnd)

        if (selectionOverlaps) {
          // Selection overlaps with this color span - remove the entire span
          newValue =
            value.slice(0, fullMatchStart) +
            innerContent +
            value.slice(fullMatchEnd)
          foundSpan = true

          // Update the value
          this.value = newValue
          textarea.value = newValue

          // Calculate new selection position after removing the span tags
          let newStart = s
          let newEnd = e

          // Adjust selection positions based on where the span was removed
          if (s >= fullMatchStart) {
            const spanOpenTagLength = spanOpenTag.length
            if (s >= contentStart) {
              // Selection started within the content - adjust by removing open tag
              newStart = s - spanOpenTagLength
            } else if (s >= fullMatchStart) {
              // Selection started within the open tag - move to content start
              newStart = fullMatchStart
            }
          }

          if (e >= fullMatchStart) {
            const spanOpenTagLength = spanOpenTag.length
            if (e <= contentEnd) {
              // Selection ended within the content - adjust by removing open tag
              newEnd = e - spanOpenTagLength
            } else {
              // Selection ended after the content - adjust by removing both tags
              newEnd = e - spanOpenTagLength - 7 // 7 = '</span>'.length
            }
          }

          requestAnimationFrame(() => {
            textarea.setSelectionRange(
              Math.max(0, newStart),
              Math.max(0, newEnd)
            )
            this.emitChangeAndRefresh()
          })
          return
        }
      }

      // If no span was found or removed, do nothing
      if (!foundSpan) {
        requestAnimationFrame(() => {
          this.updateActiveFormats()
        })
      }
    })
  }

  /**
   * Determine the current active heading level (1-3) based on activeFormats.
   */
  private getActiveHeadingLevel(): number {
    if (this.activeFormats.h1) return 1
    if (this.activeFormats.h2) return 2
    if (this.activeFormats.h3) return 3
    if (this.activeFormats.h4) return 4
    return 0
  }

  /**
   * Save the initial state to the undo stack.
   */
  private saveInitialUndoState() {
    const textarea = this.textareaEl?.shadowRoot?.querySelector('textarea')
    const initialSelection = textarea
      ? { start: textarea.selectionStart ?? 0, end: textarea.selectionEnd ?? 0 }
      : { start: 0, end: 0 }
    this.undoStack = [{ value: this.value, selection: initialSelection }]
    this.redoStack = []
    this.lastSavedValue = this.value
  }

  /**
   * Save the current state to the undo stack before making a change.
   *
   */
  private saveUndoStateBeforeChange() {
    if (this.isUndoRedoAction) return

    const textarea = this.textareaEl?.shadowRoot?.querySelector('textarea')
    const selection = textarea
      ? { start: textarea.selectionStart ?? 0, end: textarea.selectionEnd ?? 0 }
      : { start: 0, end: 0 }

    // Save current state before change
    this.undoStack.push({
      value: this.value,
      selection,
    })

    // Limit stack size
    if (this.undoStack.length > this.MAX_UNDO_STACK_SIZE) {
      this.undoStack.shift()
    }

    // Clear redo stack when new change is made
    this.redoStack = []
  }

  /**
   * Save the current state to the undo stack if the value has changed.
   */
  private saveUndoState() {
    if (this.isUndoRedoAction) return

    // Only save if the value has actually changed significantly
    if (this.value !== this.lastSavedValue) {
      // Add current state to undo stack
      this.undoStack.push({
        value: this.lastSavedValue,
        selection: this.currentSelection,
      })

      // Limit stack size
      if (this.undoStack.length > this.MAX_UNDO_STACK_SIZE) {
        this.undoStack.shift()
      }

      // Clear redo stack when new change is made
      this.redoStack = []
      this.lastSavedValue = this.value
    }
  }

  /**
   * Schedule an undo state save after a short delay.
   */
  private scheduleUndoStateSave() {
    // Clear existing timeout
    if (this.undoTimeout) {
      clearTimeout(this.undoTimeout)
    }

    // Schedule save after delay (to group rapid typing)
    this.undoTimeout = window.setTimeout(() => {
      this.saveUndoState()
      this.undoTimeout = null
    }, this.UNDO_SAVE_DELAY)
  }

  /**
   * Handle keydown events for undo/redo shortcuts and list continuation.
   */
  private handleKeyDown = (event: KeyboardEvent) => {
    // Handle Cmd+Z (Mac) or Ctrl+Z (Windows/Linux)
    const isUndo =
      (event.metaKey || event.ctrlKey) && event.key === 'z' && !event.shiftKey
    const isRedo =
      (event.metaKey || event.ctrlKey) &&
      (event.key === 'y' || (event.key === 'z' && event.shiftKey))

    if (isUndo) {
      event.preventDefault()
      this.undo()
    } else if (isRedo) {
      event.preventDefault()
      this.redo()
    } else if (
      event.key === 'Enter' &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey
    ) {
      // Handle Enter key for list continuation
      if (this.handleListContinuation()) {
        event.preventDefault()
      }
    } else if (
      event.key === 'Backspace' &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey
    ) {
      // Handle Backspace to remove empty list items
      if (this.handleListBackspace()) {
        event.preventDefault()
      }
    } else if (event.key === 'Tab' && !event.metaKey && !event.ctrlKey) {
      // Handle Tab for list indentation/outdentation
      if (event.shiftKey) {
        // Shift+Tab: outdent list item
        if (this.handleListOutdent()) {
          event.preventDefault()
        }
      } else {
        // Tab: indent list item
        if (this.handleListIndent()) {
          event.preventDefault()
        }
      }
    }
  }

  /**
   * Handle list continuation when Enter is pressed within a list item.
   * Works against the textarea value/selection.
   * Returns true if handled.
   */
  private handleListContinuation(): boolean {
    const textarea = this.textareaEl?.shadowRoot?.querySelector(
      'textarea'
    ) as HTMLTextAreaElement | null
    if (!textarea) {
      return false
    }

    const start = textarea.selectionStart ?? 0
    const end = textarea.selectionEnd ?? 0
    // Only handle when selection is collapsed (caret)
    if (start !== end) {
      return false
    }

    const value = this.value
    const lineStart = value.lastIndexOf('\n', start - 1) + 1
    let lineEnd = value.indexOf('\n', start)
    if (lineEnd === -1) lineEnd = value.length

    const currentLine = value.slice(lineStart, lineEnd)

    // Detect list types with indentation
    // Note: The \s+ ensures there's at least one space after the list marker,
    // which prevents false matches with formatting like **bold** or *italic*
    const unorderedMatch = currentLine.match(/^(\s*)([-*+])\s+(.*)$/)
    const orderedMatch = currentLine.match(/^(\s*)(\d+)\.\s+(.*)$/)

    if (!unorderedMatch && !orderedMatch) {
      return false
    }

    // Save undo state before making changes
    this.saveUndoStateBeforeChange()

    // Handle unordered list continuation or exit
    if (unorderedMatch) {
      const indent = unorderedMatch[1] ?? ''
      const marker = unorderedMatch[2] ?? '-'
      const content = unorderedMatch[3] ?? ''

      // Exit list if item is empty (no content after marker)
      if (content.trim() === '') {
        const before = value.slice(0, lineStart)
        const after = value.slice(lineEnd)
        // Replace the empty list item with a blank line
        const newValue = before + (lineEnd === value.length ? '' : '') + after
        this.value = newValue

        // Also update the textarea element's value directly
        textarea.value = newValue

        const newCursor = before.length
        requestAnimationFrame(() => {
          textarea.setSelectionRange(newCursor, newCursor)
          this.emitChangeAndRefresh()
        })
        return true
      }

      // Continue list: insert a new line with the same indentation and marker
      const before = value.slice(0, start)
      const after = value.slice(start)
      const prefix = `\n${indent}${marker} `
      const newValue = before + prefix + after

      // Update both component value and textarea synchronously
      this.value = newValue
      textarea.value = newValue

      const newCursor = start + prefix.length
      textarea.setSelectionRange(newCursor, newCursor)

      // Update active formats and dispatch change synchronously
      this.emitChangeAndRefresh()
      return true
    }

    // Handle ordered list continuation or exit
    if (orderedMatch) {
      const indent = orderedMatch[1] ?? ''
      const numberStr = orderedMatch[2] ?? '1'
      const content = orderedMatch[3] ?? ''

      // Exit list if item is empty (no content after number.)
      if (content.trim() === '') {
        const before = value.slice(0, lineStart)
        const after = value.slice(lineEnd)
        const newValue = before + (lineEnd === value.length ? '' : '') + after
        this.value = newValue

        // Also update the textarea element's value directly
        textarea.value = newValue

        const newCursor = before.length
        requestAnimationFrame(() => {
          textarea.setSelectionRange(newCursor, newCursor)
          this.emitChangeAndRefresh()
        })
        return true
      }

      // For ordered lists, we need to determine the next number based on the current item's number
      const currentNumber = parseInt(numberStr, 10)
      const nextNumber = currentNumber + 1

      const before = value.slice(0, start)
      const after = value.slice(start)
      const prefix = `\n${indent}${nextNumber}. `
      let newValue = before + prefix + after

      // Renumber all subsequent ordered list items with the same indentation
      // First, we need to renumber everything after the insertion point
      const lines = newValue.split('\n')
      const insertLineIndex = before.split('\n').length // This is where we inserted
      const renumberStartIndex = insertLineIndex + 1 // Start renumbering from after the inserted line
      let currentNum = nextNumber + 1 // The line after our insertion should be +1

      const orderedRegex = /^(\s*)(\d+)\.\s+(.*)$/

      for (let i = renumberStartIndex; i < lines.length; i++) {
        const line = lines[i]
        const match = line.match(orderedRegex)

        if (match && match[1] === indent) {
          // This is an ordered list item with the same indentation - renumber it
          const content = match[3]
          lines[i] = `${indent}${currentNum}. ${content}`
          currentNum++
        } else if (match && match[1].length < indent.length) {
          // We've hit a list item with less indentation, stop renumbering
          break
        }
        // For items with more indentation or non-list lines, continue without renumbering
      }

      newValue = lines.join('\n')

      // Update both component value and textarea synchronously
      this.value = newValue
      textarea.value = newValue

      // Calculate cursor position after renumbering and set synchronously
      const newCursor = start + prefix.length
      textarea.setSelectionRange(newCursor, newCursor)

      // Update active formats and dispatch change synchronously
      this.emitChangeAndRefresh()
      return true
    }

    return false
  }

  /**
   * Handle Tab key to indent a list item (increase nesting level).
   * Returns true if handled.
   */
  private handleListIndent(): boolean {
    const textarea = this.textareaEl?.shadowRoot?.querySelector(
      'textarea'
    ) as HTMLTextAreaElement | null
    if (!textarea) {
      return false
    }

    const start = textarea.selectionStart ?? 0
    const end = textarea.selectionEnd ?? 0
    // Only handle when selection is collapsed (caret)
    if (start !== end) {
      return false
    }

    const value = this.value
    const lineStart = value.lastIndexOf('\n', start - 1) + 1
    let lineEnd = value.indexOf('\n', start)
    if (lineEnd === -1) lineEnd = value.length

    const currentLine = value.slice(lineStart, lineEnd)

    // Detect list types with indentation
    // Note: The \s+ ensures there's at least one space after the list marker,
    // which prevents false matches with formatting like **bold** or *italic*
    const unorderedMatch = currentLine.match(/^(\s*)([-*+])\s+(.*)$/)
    const orderedMatch = currentLine.match(/^(\s*)(\d+)\.\s+(.*)$/)

    if (!unorderedMatch && !orderedMatch) {
      return false
    }

    // Save undo state before making changes
    this.saveUndoStateBeforeChange()

    const before = value.slice(0, lineStart)
    const after = value.slice(lineEnd)
    const indent = '    ' // 4 spaces for indentation (CommonMark standard)

    let newLine: string
    let newCursorOffset = 0

    if (unorderedMatch) {
      const currentIndent = unorderedMatch[1] ?? ''
      const marker = unorderedMatch[2] ?? '-'
      const content = unorderedMatch[3] ?? ''
      newLine = `${currentIndent}${indent}${marker} ${content}`
      newCursorOffset = indent.length
    } else if (orderedMatch) {
      const currentIndent = orderedMatch[1] ?? ''
      const content = orderedMatch[3] ?? ''

      // Special case: For empty ordered list items, insert a nested item instead of indenting the current line
      if (content.trim() === '') {
        // Keep the current line as-is, but insert a nested item after it
        newLine = currentLine // Keep current line unchanged
        const nestedLine = `${currentIndent}${indent}1. `
        let newValue = before + newLine + '\n' + nestedLine + after

        // Need to renumber the parent level items after the nested insertion
        const parentIndent = currentIndent

        // Find the next expected number for parent level by looking at the current line
        const lines = newValue.split('\n')
        const currentLineIndex =
          Math.floor(lineStart / (newValue.indexOf('\n') + 1)) ||
          newValue.slice(0, lineStart).split('\n').length - 1
        const currentLineMatch = lines[currentLineIndex]?.match(
          /^(\s*)(\d+)\.\s*(.*)$/
        )
        // After inserting a nested item under an empty parent, the next parent-level item
        // should continue from the current parent's number (not increment it)
        // because the empty parent becomes a "container" for nested items
        const nextExpectedNumber = currentLineMatch
          ? parseInt(currentLineMatch[2], 10)
          : 1

        // Renumber all lines after the nested insertion at the parent level
        const orderedRegex = /^(\s*)(\d+)\.\s*(.*)$/
        let currentNumber = nextExpectedNumber

        // Start from the line after the nested line we just inserted
        for (let i = currentLineIndex + 2; i < lines.length; i++) {
          // +2 to skip current and nested lines
          const line = lines[i]
          const orderedMatch = line.match(orderedRegex)

          if (orderedMatch && orderedMatch[1] === parentIndent) {
            // This is a parent-level ordered list item - renumber it
            const content = orderedMatch[3]
            lines[i] = `${parentIndent}${currentNumber}. ${content}`
            currentNumber++
          } else if (
            orderedMatch &&
            orderedMatch[1].length < parentIndent.length
          ) {
            // We've hit a list item with less indentation, stop renumbering
            break
          }
        }

        newValue = lines.join('\n')

        // Set cursor at the end of the new nested line
        const newCursor = lineStart + newLine.length + 1 + nestedLine.length // +1 for newline

        // Update the component's value and textarea
        this.value = newValue
        textarea.value = newValue

        requestAnimationFrame(() => {
          textarea.setSelectionRange(newCursor, newCursor)
          this.emitChangeAndRefresh()
        })
        return true
      } else {
        // Regular indentation for non-empty items
        const newIndent = currentIndent + indent

        // Find the appropriate number for the new indentation level
        let newNumber = 1
        const beforeText = value.slice(0, lineStart)

        // Look backwards through the text to find the last ordered list item at the new indentation level
        const lines = beforeText.split('\n')
        for (let i = lines.length - 1; i >= 0; i--) {
          const line = lines[i]
          const match = line.match(/^(\s*)(\d+)\.\s*(.*)$/)

          if (match && match[1] === newIndent) {
            // Found an item at the same indentation level, continue the sequence
            newNumber = parseInt(match[2], 10) + 1
            break
          } else if (match && match[1].length < newIndent.length) {
            // Found an item with less indentation, this is a parent level, stop looking
            break
          }
        }

        newLine = `${newIndent}${newNumber}. ${content}`
        newCursorOffset = indent.length
      }
    } else {
      return false
    }

    // Update the value with the new indented line
    let newValue = before + newLine + after

    // For ordered lists, we need to renumber subsequent items after the current line
    if (orderedMatch) {
      // Renumber at the new indentation level
      const newIndent = (orderedMatch[1] ?? '') + indent
      newValue = this.renumberOrderedListItems(
        newValue,
        lineStart + newLine.length, // Start renumbering after the current line
        newIndent // Use the new indentation level
      )

      // Also renumber the parent level if we just created a nested list
      const parentIndent = orderedMatch[1] ?? ''
      // Always renumber parent level (parentIndent can be empty string for root level)
      newValue = this.renumberOrderedListItems(
        newValue,
        lineStart, // Start from this line for parent level
        parentIndent // Use the parent level indentation
      )
    }

    // Update the component's value and textarea
    this.value = newValue
    textarea.value = newValue

    // Position cursor at the same relative position within the line
    const cursorInLine = start - lineStart
    const newCursor = lineStart + cursorInLine + newCursorOffset

    // Set selection synchronously to ensure tests can immediately see the change
    textarea.setSelectionRange(newCursor, newCursor)

    // Update active formats and dispatch change synchronously
    this.emitChangeAndRefresh()
    return true
  }

  /**
   * Handle Shift+Tab key to outdent a list item (decrease nesting level).
   * Returns true if handled.
   */
  private handleListOutdent(): boolean {
    const textarea = this.textareaEl?.shadowRoot?.querySelector(
      'textarea'
    ) as HTMLTextAreaElement | null
    if (!textarea) return false

    const start = textarea.selectionStart ?? 0
    const end = textarea.selectionEnd ?? 0
    // Only handle when selection is collapsed (caret)
    if (start !== end) return false

    const value = this.value
    const lineStart = value.lastIndexOf('\n', start - 1) + 1
    let lineEnd = value.indexOf('\n', start)
    if (lineEnd === -1) lineEnd = value.length

    const currentLine = value.slice(lineStart, lineEnd)

    // Detect list types with indentation
    // Note: The \s+ ensures there's at least one space after the list marker,
    // which prevents false matches with formatting like **bold** or *italic*
    const unorderedMatch = currentLine.match(/^(\s*)([-*+])\s+(.*)$/)
    const orderedMatch = currentLine.match(/^(\s*)(\d+)\.\s+(.*)$/)

    if (!unorderedMatch && !orderedMatch) {
      return false
    }

    // Check if there's indentation to remove
    const currentIndent = (unorderedMatch || orderedMatch)?.[1] ?? ''
    if (currentIndent.length < 4) {
      return false // No indentation to remove
    }

    // Save undo state before making changes
    this.saveUndoStateBeforeChange()

    const before = value.slice(0, lineStart)
    const after = value.slice(lineEnd)
    const outdent = '    ' // Remove 4 spaces

    let newLine: string
    let newCursorOffset = 0

    if (unorderedMatch) {
      const marker = unorderedMatch[2] ?? '-'
      const content = unorderedMatch[3] ?? ''
      const newIndent = currentIndent.slice(outdent.length)
      newLine = `${newIndent}${marker} ${content}`
      newCursorOffset = -outdent.length
    } else if (orderedMatch) {
      const content = orderedMatch[3] ?? ''
      const newIndent = currentIndent.slice(outdent.length)

      // When outdenting, we need to find the appropriate number for this level
      let newNumber = 1

      // Look backwards to find the last ordered list item at the new indentation level
      const beforeLines = before.split('\n')
      for (let i = beforeLines.length - 1; i >= 0; i--) {
        const line = beforeLines[i]
        const match = line.match(/^(\s*)(\d+)\.\s+(.*)$/)
        if (match && match[1] === newIndent) {
          newNumber = parseInt(match[2], 10) + 1
          break
        } else if (
          line.trim() !== '' &&
          !line.match(/^\s*[-*+]\s+/) &&
          !match
        ) {
          // Hit non-list content, stop looking
          break
        }
      }

      newLine = `${newIndent}${newNumber}. ${content}`
      newCursorOffset = -outdent.length
    } else {
      return false
    }

    let newValue = before + newLine + after

    // If this was an ordered list item, renumber subsequent items at the same level
    if (orderedMatch) {
      const newIndent = currentIndent.slice(outdent.length)
      newValue = this.renumberOrderedListItems(
        newValue,
        lineStart + newLine.length,
        newIndent
      )
    }

    this.value = newValue
    textarea.value = newValue

    // Position cursor at the same relative position within the line
    const cursorInLine = start - lineStart
    const newCursor = Math.max(
      lineStart,
      lineStart + cursorInLine + newCursorOffset
    )

    requestAnimationFrame(() => {
      textarea.setSelectionRange(newCursor, newCursor)
      this.emitChangeAndRefresh()
    })
    return true
  }

  /**
   * Renumber ordered list items that come after the given position with the same indentation level.
   *
   * @param value - The text content to process
   * @param fromPosition - Start looking for list items from this position
   * @param targetIndent - Only renumber items with this exact indentation
   * @returns The text with renumbered list items
   */
  private renumberOrderedListItems(
    value: string,
    fromPosition: number,
    targetIndent: string
  ): string {
    const lines = value.split('\n')
    const fromLineIndex = Math.max(
      0,
      value.slice(0, fromPosition).split('\n').length - 1
    )

    // Find the current line and determine the starting number for subsequent items
    let nextExpectedNumber = 1
    const currentLine = lines[fromLineIndex]
    const currentMatch = currentLine?.match(/^(\s*)(\d+)\.\s+(.*)$/)

    if (currentMatch && currentMatch[1] === targetIndent) {
      // If the current line is an ordered list item with matching indentation,
      // the next item should be one number higher
      nextExpectedNumber = parseInt(currentMatch[2], 10) + 1
    } else {
      // Look backwards to find the most recent ordered list item with same indentation
      for (let i = fromLineIndex - 1; i >= 0; i--) {
        const line = lines[i]
        const orderedMatch = line.match(/^(\s*)(\d+)\.\s+(.*)$/)
        if (orderedMatch && orderedMatch[1] === targetIndent) {
          nextExpectedNumber = parseInt(orderedMatch[2], 10) + 1
          break
        }
      }
    }

    // Now renumber all subsequent lines with the same indentation
    let currentNumber = nextExpectedNumber
    const orderedRegex = /^(\s*)(\d+)\.\s+(.*)$/

    // Start renumbering from the line after fromLineIndex
    for (let i = fromLineIndex + 1; i < lines.length; i++) {
      const line = lines[i]
      const orderedMatch = line.match(orderedRegex)

      if (orderedMatch && orderedMatch[1] === targetIndent) {
        // This is an ordered list item with the same indentation - renumber it
        const indent = orderedMatch[1]
        const content = orderedMatch[3]
        lines[i] = `${indent}${currentNumber}. ${content}`
        currentNumber++
      } else if (orderedMatch && orderedMatch[1].length < targetIndent.length) {
        // We've hit a list item with less indentation, stop renumbering
        break
      } else if (
        line.trim() !== '' &&
        !orderedMatch &&
        !line.match(/^\s*[-*+]\s+/)
      ) {
        // We've hit non-empty non-list content at root level, stop renumbering
        if (targetIndent === '') {
          break
        }
      }
      // For lines with more indentation, unordered lists, or empty lines, continue without renumbering
    }

    return lines.join('\n')
  }

  /**
   * Renumber any ordered lists that come after the given position, starting each new sequence from 1.
   * This is used when removing list formatting breaks the continuity of a list.
   *
   * @param value - The text content to process
   * @param fromPosition - Start looking for list items from this position
   * @returns The text with renumbered list sequences
   */
  private renumberSubsequentOrderedLists(
    value: string,
    fromPosition: number
  ): string {
    const lines = value.split('\n')
    const fromLineIndex = Math.max(
      0,
      value.slice(0, fromPosition).split('\n').length - 1
    )

    const orderedRegex = /^(\s*)(\d+)\.\s+(.*)$/
    let currentSequenceNumber = 1
    let inSequence = false
    let currentIndent = ''

    // Start checking from the line after fromLineIndex
    for (let i = fromLineIndex + 1; i < lines.length; i++) {
      const line = lines[i]
      const orderedMatch = line.match(orderedRegex)

      if (orderedMatch) {
        const indent = orderedMatch[1]
        const content = orderedMatch[3]

        // Check if we're starting a new sequence
        if (!inSequence || indent !== currentIndent) {
          // Starting a new sequence
          currentSequenceNumber = 1
          inSequence = true
          currentIndent = indent
        }

        lines[i] = `${indent}${currentSequenceNumber}. ${content}`
        currentSequenceNumber++
      } else if (line.trim() !== '' && !line.match(/^\s*[-*+]\s+/)) {
        // Hit non-list content, break the sequence
        inSequence = false
        // Don't reset currentSequenceNumber here - let it reset when we start a new sequence
      }
      // Empty lines and unordered lists don't break sequences
    }

    return lines.join('\n')
  }

  /**
   * Handle backspace to remove empty list items.
   * Returns true if handled.
   */
  private handleListBackspace(): boolean {
    const textarea = this.textareaEl?.shadowRoot?.querySelector(
      'textarea'
    ) as HTMLTextAreaElement | null
    if (!textarea) return false

    const start = textarea.selectionStart ?? 0
    const end = textarea.selectionEnd ?? 0
    // Only handle when selection is collapsed (caret)
    if (start !== end) return false

    const value = this.value
    const lineStart = value.lastIndexOf('\n', start - 1) + 1
    let lineEnd = value.indexOf('\n', start)
    if (lineEnd === -1) lineEnd = value.length

    const currentLine = value.slice(lineStart, lineEnd)
    const cursorPositionInLine = start - lineStart

    // Detect list types with indentation
    // Note: The \s+ ensures there's at least one space after the list marker,
    // which prevents false matches with formatting like **bold** or *italic*
    const unorderedMatch = currentLine.match(/^(\s*)([-*+])\s+(.*)$/)
    const orderedMatch = currentLine.match(/^(\s*)(\d+)\.\s+(.*)$/)

    if (!unorderedMatch && !orderedMatch) {
      return false
    }

    let markerEndPosition = 0
    let hasContent = false

    if (unorderedMatch) {
      const indent = unorderedMatch[1] ?? ''
      const marker = unorderedMatch[2] ?? '-'
      const content = unorderedMatch[3] ?? ''
      markerEndPosition = indent.length + marker.length + 1 // +1 for space
      hasContent = content.trim().length > 0
    } else if (orderedMatch) {
      const indent = orderedMatch[1] ?? ''
      const numberStr = orderedMatch[2] ?? '1'
      const content = orderedMatch[3] ?? ''
      markerEndPosition = indent.length + numberStr.length + 2 // +2 for ". "
      hasContent = content.trim().length > 0
    }

    // Handle if cursor is at the end of the marker and the list item has no content,
    // or if cursor is anywhere after the marker on an empty list item
    const isAtOrAfterMarker = cursorPositionInLine >= markerEndPosition
    if (isAtOrAfterMarker && !hasContent) {
      // Save undo state before making changes
      this.saveUndoStateBeforeChange()

      // Remove the empty list item completely
      const before = value.slice(0, lineStart)
      const after = value.slice(lineEnd)

      // If we're removing the last line and it has a newline, remove the newline too
      let newValue: string
      if (lineEnd === value.length) {
        // This is the last line - remove it completely including any preceding newline
        newValue = before.endsWith('\n') ? before.slice(0, -1) : before
      } else {
        // This is not the last line - remove this line and its newline
        newValue = before + after.slice(1) // Skip the newline after this line
      }

      // If we're removing an ordered list item, renumber the subsequent items
      if (orderedMatch) {
        const indent = orderedMatch[1] ?? ''
        // After removing the line, we need to renumber all items at this indentation level
        // starting from where the removed line was
        const lines = newValue.split('\n')
        const startLineIndex = Math.max(0, before.split('\n').length - 1)

        // Find the correct starting number by looking backwards
        let nextNumber = 1
        for (let i = startLineIndex - 1; i >= 0; i--) {
          const line = lines[i]
          const match = line.match(/^(\s*)(\d+)\.\s*(.*)$/)
          if (match && match[1] === indent) {
            nextNumber = parseInt(match[2], 10) + 1
            break
          }
        }

        // Renumber all subsequent items with the same indentation
        for (let i = startLineIndex; i < lines.length; i++) {
          const line = lines[i]
          const match = line.match(/^(\s*)(\d+)\.\s*(.*)$/)
          if (match && match[1] === indent) {
            lines[i] = `${indent}${nextNumber}. ${match[3]}`
            nextNumber++
          } else if (match && match[1].length < indent.length) {
            // Hit item with less indentation, stop renumbering
            break
          }
        }

        newValue = lines.join('\n')
      }

      this.value = newValue

      // Also update the textarea element's value directly
      textarea.value = newValue

      // Position cursor at the end of the previous line
      let newCursor = before.length
      // If we're not at the beginning and the previous character is a newline, move before it
      if (newCursor > 0 && before.endsWith('\n')) {
        newCursor = before.length - 1
      }
      requestAnimationFrame(() => {
        textarea.setSelectionRange(newCursor, newCursor)
        this.emitChangeAndRefresh()
      })
      return true
    }

    return false
  }

  /**
  /**
   * Perform an undo operation, reverting to the previous state.
   */
  private undo() {
    if (this.isReadonly || this.isDisabled || this.undoStack.length <= 1) {
      return
    }

    // Save current state to redo stack before undoing
    const textarea = this.textareaEl?.shadowRoot?.querySelector('textarea')
    const currentSelection = textarea
      ? { start: textarea.selectionStart ?? 0, end: textarea.selectionEnd ?? 0 }
      : { start: 0, end: 0 }
    this.redoStack.push({ value: this.value, selection: currentSelection })

    // Get previous state from undo stack
    const previousState = this.undoStack.pop()

    if (!previousState) {
      return
    }

    // Apply previous state
    this.isUndoRedoAction = true
    this.value = previousState.value
    this.lastSavedValue = previousState.value

    // Also update the textarea element's value directly
    if (textarea) {
      textarea.value = previousState.value
    }

    // Restore selection after value update
    requestAnimationFrame(() => {
      if (textarea) {
        textarea.setSelectionRange(
          previousState.selection.start,
          previousState.selection.end
        )
      }
      this.emitChangeAndRefresh()
      this.isUndoRedoAction = false
    })
  }

  /**
   * Perform a redo operation, reapplying a previously undone state.
   */
  private redo() {
    if (this.isReadonly || this.isDisabled || this.redoStack.length === 0) {
      return
    }

    // Save current state to undo stack before redoing
    const textarea = this.textareaEl?.shadowRoot?.querySelector('textarea')
    const currentSelection = textarea
      ? { start: textarea.selectionStart ?? 0, end: textarea.selectionEnd ?? 0 }
      : { start: 0, end: 0 }
    this.undoStack.push({ value: this.value, selection: currentSelection })

    // Get next state from redo stack
    const nextState = this.redoStack.pop()

    if (!nextState) {
      return
    }

    // Apply next state
    this.isUndoRedoAction = true
    this.value = nextState.value
    this.lastSavedValue = nextState.value

    // Also update the textarea element's value directly
    if (textarea) {
      textarea.value = nextState.value
    }

    // Restore selection after value update
    requestAnimationFrame(() => {
      if (textarea) {
        textarea.setSelectionRange(
          nextState.selection.start,
          nextState.selection.end
        )
      }
      this.emitChangeAndRefresh()
      this.isUndoRedoAction = false
    })
  }

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener('click', this.handleOutsideClick)
  }

  firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties)
    // Initialize undo state and keyboard listeners after first render
    requestAnimationFrame(() => {
      this.saveInitialUndoState()
      this.updateActiveFormats() // Initial setup - no need to emit change event
      this.addKeyboardListeners()

      // If component is initially in preview mode, schedule accessibility check
      if (this.isPreview && this.value.trim()) {
        this.scheduleAccessibilityCheck()
      }
    })
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties)

    // If preview background or text color changed and we're in preview mode, re-run accessibility check
    if (
      (changedProperties.has('previewBackgroundColor') ||
        changedProperties.has('previewTextColor')) &&
      this.isPreview &&
      this.value.trim()
    ) {
      this.scheduleAccessibilityCheck()
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener('click', this.handleOutsideClick)
    // Clean up
    if (this.undoTimeout) {
      clearTimeout(this.undoTimeout)
    }
    if (this.accessibilityCheckTimeout) {
      clearTimeout(this.accessibilityCheckTimeout)
    }
    this.removeKeyboardListeners()
    // Clean up preview mode state
    this.savedSelectionForPreview = null
  }

  private descriptionTemplate() {
    return this.description
      ? html`<div class="paragraph-inter-12-regular text-neutral-20">
          <lukso-sanitize html-content=${this.description}></lukso-sanitize>
        </div>`
      : nothing
  }

  /**
   * Restore focus and selection to the textarea after toolbar interactions.
   */
  private restoreFocusAndSelection() {
    const ta = this.textareaEl?.shadowRoot?.querySelector(
      'textarea'
    ) as HTMLTextAreaElement | null
    if (ta) {
      ta.focus()
      const sel = this.currentSelection
      // Guard against NaN/undefined
      const start =
        typeof sel.start === 'number' ? sel.start : (ta.selectionStart ?? 0)
      const end = typeof sel.end === 'number' ? sel.end : (ta.selectionEnd ?? 0)
      ta.setSelectionRange(start, end)
    }
  }

  private buttonTemplate(
    icon: string,
    handler: () => void,
    name: string,
    isActive = false
  ) {
    return html`
      <lukso-tooltip text=${name} placement="top">
        <lukso-button
          @click=${() => {
            this.restoreFocusAndSelection()
            handler()
          }}
          aria-label=${name}
          aria-pressed=${isActive ? 'true' : 'false'}
          type="button"
          variant="secondary"
          size="small"
          custom-class=${this.toolbarButton({ active: isActive })}
          is-icon
        >
          <lukso-icon
            name=${icon}
            size="small"
            pack="vuesax"
            variant="linear"
          ></lukso-icon></lukso-button
      ></lukso-tooltip>
    `
  }

  private toolbarTemplate() {
    return html`
      <div class="flex items-center gap-1">
        <!-- Heading -->
        ${this.toolsState.includes('heading')
          ? html`<div class=${cn(this.styles().headingMenu())}>
              <lukso-tooltip text="Heading options" placement="top">
                <lukso-button
                  id=${this.headingTriggerId}
                  @click=${(e: Event) => {
                    e.stopPropagation()
                    // Close other dropdowns if open
                    this.isColorDropdownOpen = false
                    this.isListDropdownOpen = false
                    this.isAlignmentDropdownOpen = false
                    this.isHeadingDropdownOpen = !this.isHeadingDropdownOpen
                  }}
                  aria-expanded=${this.isHeadingDropdownOpen ? 'true' : 'false'}
                  aria-label="Heading options"
                  variant="secondary"
                  size="small"
                  custom-class=${this.toolbarButton({
                    active: this.getActiveHeadingLevel() > 0,
                  })}
                  is-icon
                >
                  <lukso-icon
                    name="smallcaps"
                    size="small"
                    pack="vuesax"
                    variant="linear"
                  ></lukso-icon>
                </lukso-button>
              </lukso-tooltip>
              <lukso-dropdown
                id="headingDropdown"
                trigger-id=""
                size="medium"
                ?is-open=${this.isHeadingDropdownOpen}
              >
                <lukso-dropdown-option
                  ?is-selected=${this.getActiveHeadingLevel() === 0}
                  @click=${(e: Event) => {
                    e.stopPropagation()
                    this.restoreFocusAndSelection()
                    this.applyHeading(0)
                    this.isHeadingDropdownOpen = false
                  }}
                  size="medium"
                >
                  Normal text
                </lukso-dropdown-option>
                <lukso-dropdown-option
                  ?is-selected=${this.getActiveHeadingLevel() === 1}
                  @click=${(e: Event) => {
                    e.stopPropagation()
                    this.restoreFocusAndSelection()
                    this.applyHeading(1)
                    this.isHeadingDropdownOpen = false
                  }}
                  size="medium"
                >
                  Heading 1
                </lukso-dropdown-option>
                <lukso-dropdown-option
                  ?is-selected=${this.getActiveHeadingLevel() === 2}
                  @click=${(e: Event) => {
                    e.stopPropagation()
                    this.restoreFocusAndSelection()
                    this.applyHeading(2)
                    this.isHeadingDropdownOpen = false
                  }}
                  size="medium"
                >
                  Heading 2
                </lukso-dropdown-option>
                <lukso-dropdown-option
                  ?is-selected=${this.getActiveHeadingLevel() === 3}
                  @click=${(e: Event) => {
                    e.stopPropagation()
                    this.restoreFocusAndSelection()
                    this.applyHeading(3)
                    this.isHeadingDropdownOpen = false
                  }}
                  size="medium"
                >
                  Heading 3
                </lukso-dropdown-option>
                <lukso-dropdown-option
                  ?is-selected=${this.getActiveHeadingLevel() === 4}
                  @click=${(e: Event) => {
                    e.stopPropagation()
                    this.restoreFocusAndSelection()
                    this.applyHeading(4)
                    this.isHeadingDropdownOpen = false
                  }}
                  size="medium"
                >
                  Heading 4
                </lukso-dropdown-option>
              </lukso-dropdown>
            </div>`
          : nothing}

        <!-- Bold -->
        ${this.toolsState.includes('bold')
          ? this.buttonTemplate(
              'text-bold',
              () => this.toggleWrap('**'),
              'Bold',
              this.activeFormats.bold
            )
          : nothing}

        <!-- Italic -->
        ${this.toolsState.includes('italic')
          ? this.buttonTemplate(
              'text-italic',
              () => this.toggleWrap('*'),
              'Italic',
              this.activeFormats.italic
            )
          : nothing}

        <!-- List -->
        ${this.toolsState.includes('list')
          ? html`
              <div class=${this.styles().listMenu()}>
                <lukso-tooltip text="List options" placement="top">
                  <lukso-button
                    id=${this.listTriggerId}
                    @click=${(e: Event) => {
                      e.stopPropagation()
                      this.restoreFocusAndSelection()
                      // Close other dropdowns if open
                      this.isHeadingDropdownOpen = false
                      this.isColorDropdownOpen = false
                      this.isAlignmentDropdownOpen = false
                      this.isListDropdownOpen = !this.isListDropdownOpen
                    }}
                    aria-expanded=${this.isListDropdownOpen ? 'true' : 'false'}
                    aria-label="List options"
                    variant="secondary"
                    size="small"
                    custom-class=${this.toolbarButton({
                      active:
                        this.activeFormats.unorderedList ||
                        this.activeFormats.orderedList,
                    })}
                    is-icon
                  >
                    <lukso-icon
                      name="task"
                      size="small"
                      pack="vuesax"
                      variant="linear"
                    ></lukso-icon>
                  </lukso-button>
                </lukso-tooltip>
                <lukso-dropdown
                  id="listDropdown"
                  trigger-id=""
                  size="medium"
                  ?is-open=${this.isListDropdownOpen}
                >
                  <lukso-dropdown-option
                    ?is-selected=${this.getActiveListType() === 'none'}
                    @click=${(e: Event) => {
                      e.stopPropagation()
                      this.restoreFocusAndSelection()
                      this.applyList('none')
                      this.isListDropdownOpen = false
                    }}
                    size="medium"
                  >
                    No list
                  </lukso-dropdown-option>
                  <lukso-dropdown-option
                    ?is-selected=${this.getActiveListType() === 'unordered'}
                    @click=${(e: Event) => {
                      e.stopPropagation()
                      this.restoreFocusAndSelection()
                      this.applyList('unordered')
                      this.isListDropdownOpen = false
                    }}
                    size="medium"
                  >
                    Unordered
                  </lukso-dropdown-option>
                  <lukso-dropdown-option
                    ?is-selected=${this.getActiveListType() === 'ordered'}
                    @click=${(e: Event) => {
                      e.stopPropagation()
                      this.restoreFocusAndSelection()
                      this.applyList('ordered')
                      this.isListDropdownOpen = false
                    }}
                    size="medium"
                  >
                    Ordered
                  </lukso-dropdown-option>
                </lukso-dropdown>
              </div>
            `
          : nothing}

        <!-- Link -->
        ${this.toolsState.includes('link')
          ? this.buttonTemplate(
              'link',
              () => this.insertLink(),
              'Link',
              this.activeFormats.link
            )
          : nothing}

        <!-- Text Alignment -->
        ${this.toolsState.includes('alignment')
          ? html`
              <div class=${this.styles().alignmentMenu()}>
                <lukso-tooltip text="Text alignment" placement="top">
                  <lukso-button
                    id=${this.alignmentTriggerId}
                    @click=${(e: Event) => {
                      e.stopPropagation()
                      this.restoreFocusAndSelection()
                      // Close other dropdowns if open
                      this.isHeadingDropdownOpen = false
                      this.isColorDropdownOpen = false
                      this.isListDropdownOpen = false
                      this.isAlignmentDropdownOpen =
                        !this.isAlignmentDropdownOpen
                    }}
                    aria-expanded=${this.isAlignmentDropdownOpen
                      ? 'true'
                      : 'false'}
                    aria-label="Text alignment"
                    variant="secondary"
                    size="small"
                    custom-class=${this.toolbarButton({
                      active: this.activeFormats.alignment !== 'left',
                    })}
                    is-icon
                  >
                    <lukso-icon
                      name=${this.getAlignmentIcon()}
                      size="small"
                      pack="vuesax"
                      variant="linear"
                    ></lukso-icon>
                  </lukso-button>
                </lukso-tooltip>
                <lukso-dropdown
                  id="alignmentDropdown"
                  trigger-id=""
                  size="medium"
                  ?is-open=${this.isAlignmentDropdownOpen}
                >
                  <lukso-dropdown-option
                    ?is-selected=${this.activeFormats.alignment === 'left'}
                    @click=${(e: Event) => {
                      e.stopPropagation()
                      this.restoreFocusAndSelection()
                      this.applyAlignment('left')
                      this.isAlignmentDropdownOpen = false
                    }}
                    size="medium"
                    aria-label="Align left"
                  >
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <lukso-icon
                        name="textalign-left"
                        size="small"
                        pack="vuesax"
                        variant="linear"
                      ></lukso-icon>
                      Left
                    </div>
                  </lukso-dropdown-option>
                  <lukso-dropdown-option
                    ?is-selected=${this.activeFormats.alignment === 'center'}
                    @click=${(e: Event) => {
                      e.stopPropagation()
                      this.restoreFocusAndSelection()
                      this.applyAlignment('center')
                      this.isAlignmentDropdownOpen = false
                    }}
                    size="medium"
                    aria-label="Align center"
                  >
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <lukso-icon
                        name="textalign-center"
                        size="small"
                        pack="vuesax"
                        variant="linear"
                      ></lukso-icon>
                      Center
                    </div>
                  </lukso-dropdown-option>
                  <lukso-dropdown-option
                    ?is-selected=${this.activeFormats.alignment === 'right'}
                    @click=${(e: Event) => {
                      e.stopPropagation()
                      this.restoreFocusAndSelection()
                      this.applyAlignment('right')
                      this.isAlignmentDropdownOpen = false
                    }}
                    size="medium"
                    aria-label="Align right"
                  >
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <lukso-icon
                        name="textalign-right"
                        size="small"
                        pack="vuesax"
                        variant="linear"
                      ></lukso-icon>
                      Right
                    </div>
                  </lukso-dropdown-option>
                </lukso-dropdown>
              </div>
            `
          : nothing}

        <!-- Color -->
        ${this.toolsState.includes('color')
          ? html`
              <div class=${this.styles().colorMenu()}>
                <lukso-tooltip text="Text color" placement="top">
                  <lukso-button
                    id=${this.colorTriggerId}
                    @click=${(e: Event) => {
                      e.stopPropagation()
                      this.restoreFocusAndSelection()
                      // Close other dropdowns if open
                      this.isHeadingDropdownOpen = false
                      this.isListDropdownOpen = false
                      this.isAlignmentDropdownOpen = false
                      // Save current selection when opening color dropdown
                      if (!this.isColorDropdownOpen) {
                        const ta =
                          this.textareaEl?.shadowRoot?.querySelector('textarea')
                        if (ta) {
                          this.savedSelection = {
                            start: ta.selectionStart ?? 0,
                            end: ta.selectionEnd ?? 0,
                          }
                        }
                      }
                      this.isColorDropdownOpen = !this.isColorDropdownOpen
                    }}
                    aria-expanded=${this.isColorDropdownOpen ? 'true' : 'false'}
                    aria-pressed=${this.activeFormats.color ? 'true' : 'false'}
                    aria-label="Text color"
                    variant="secondary"
                    size="small"
                    custom-class=${this.toolbarButton({
                      active: this.activeFormats.color,
                    })}
                    is-icon
                  >
                    <div
                      class="size-4 rounded-full"
                      style="background-color: ${this.activeFormats
                        .activeColor};"
                    ></div>
                  </lukso-button>
                </lukso-tooltip>
                <lukso-dropdown
                  id="colorDropdown"
                  trigger-id=""
                  size="medium"
                  max-height="300"
                  ?is-open=${this.isColorDropdownOpen}
                >
                  <div class="grid grid-cols-8 gap-2 p-2 w-[260px]">
                    <div
                      class="col-span-8 mb-2 flex items-center justify-between"
                    >
                      <span class="text-xs text-neutral-60">Text Color</span>
                      ${this.activeFormats.color
                        ? html`<button
                            class="text-xs text-neutral-60 hover:text-neutral-20 underline"
                            @click=${(e: Event) => {
                              e.stopPropagation()
                              this.clearColor()
                              this.isColorDropdownOpen = false
                            }}
                            type="button"
                            aria-label="Clear color"
                          >
                            Clear
                          </button>`
                        : nothing}
                    </div>
                    ${this.colorSamples.map(
                      color => html`
                        <button
                          class="w-6 h-6 rounded-4 border transition-all ${this
                            .activeFormats.activeColor === color
                            ? 'border-neutral-20 ring-2 ring-purple-51'
                            : 'border-neutral-90 hover:border-neutral-60'}"
                          style="background-color: ${color}"
                          title=${color}
                          aria-pressed=${this.activeFormats.activeColor ===
                          color
                            ? 'true'
                            : 'false'}
                          aria-label="Color ${color}"
                          @click=${(e: Event) => {
                            e.stopPropagation()
                            this.selectColor(color)
                            this.isColorDropdownOpen = false
                          }}
                        ></button>
                      `
                    )}
                  </div>
                </lukso-dropdown>
              </div>
            `
          : nothing}

        <!-- Divider -->
        ${this.toolsState.length > 0
          ? html`<div class=${this.styles().divider()}></div>`
          : nothing}
      </div>
    `
  }

  private accessibilityIndicatorTemplate() {
    // Only show indicator when there are actual violations
    if (
      !this.hasAccessibilityViolations ||
      this.accessibilityViolations.length === 0 ||
      !this.isPreview
    ) {
      return nothing
    }

    const tooltipText = formatViolationsForTooltip(this.accessibilityViolations)

    return html`
      <div
        class="accessibility-indicator has-violations absolute top-2 right-2 z-10"
        style="pointer-events: auto;"
      >
        <lukso-tooltip placement="left">
          <div slot="text">
            <div .innerHTML=${tooltipText}></div>
          </div>
          <div
            class="flex cursor-help"
            role="alert"
            aria-label="Accessibility violations found"
          >
            <lukso-icon
              name="warning-2"
              size="small"
              color="red-65"
              pack="vuesax"
              variant="linear"
            ></lukso-icon>
          </div>
        </lukso-tooltip>
      </div>
    `
  }

  render() {
    const { wrapper, header, toolbar, area, editor, preview } = this.styles({
      isFullWidth: this.isFullWidth,
    })

    // ensure a default preview background color is applied
    if (!this.previewBackgroundColor) {
      this.previewBackgroundColor = DEFAULT_PREVIEW_BACKGROUND_COLOR
    }

    // ensure a default preview text color is applied
    if (!this.previewTextColor) {
      this.previewTextColor = DEFAULT_PREVIEW_TEXT_COLOR
    }

    this.toolsState = this.defaultTools

    try {
      if (this.tools) {
        this.toolsState = JSON.parse(this.tools)
      }
    } catch (error) {
      console.warn(
        'Invalid JSON for tools property in lukso-markdown-editor. Using default tools.',
        error
      )
      // do nothing
    }

    return html`
      <div class=${wrapper()}>
        <div>
          <lukso-form-label
            for-name=${this.name}
            label=${this.label}
          ></lukso-form-label>
          ${this.descriptionTemplate()}
        </div>

        <div class="flex flex-col gap-2">
          <div class=${header()}>
            <div class=${toolbar()}>${this.toolbarTemplate()}</div>
            ${this.buttonTemplate(
              'eye',
              () => this.togglePreview(),
              'Toggle preview',
              this.isPreview
            )}
          </div>

          <div class=${area()}>
            ${!this.isPreview
              ? html`<div class=${editor()}>
                  <lukso-textarea
                    .value=${this.value}
                    name=${this.name ? this.name : nothing}
                    size=${this.size ? this.size : nothing}
                    rows=${this.rows ? this.rows : nothing}
                    placeholder=${this.placeholder ? this.placeholder : nothing}
                    error=${this.error ? this.error : nothing}
                    ?is-full-width=${true}
                    ?is-disabled=${this.isDisabled}
                    ?is-readonly=${this.isReadonly}
                    ?is-non-resizable=${this.isNonResizable}
                    @on-input=${this.handleTextareaInput}
                    @on-key-up=${this.handleTextareaKeyUp}
                    @on-input-click=${this.handleTextareaClick}
                  ></lukso-textarea>
                  ${this.accessibilityIndicatorTemplate()}
                </div>`
              : html`<div
                  class=${preview()}
                  style="background-color: ${this.previewBackgroundColor};"
                >
                  <lukso-markdown
                    value=${this.value}
                    ?strip-html-tags=${this.stripHtmlTags}
                    custom-style=${`color: ${this.previewTextColor};`}
                  ></lukso-markdown>
                  ${this.accessibilityIndicatorTemplate()}
                </div>`}
          </div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-markdown-editor': LuksoMarkdownEditor
  }
}
