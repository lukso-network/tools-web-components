import { html, nothing, PropertyValues } from 'lit'
import { customElement, property, state, query } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import { cn } from '@/shared/tools'
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

import type { InputSize } from '@/shared/types'

@customElement('lukso-text-editor')
export class LuksoTextEditor extends TailwindStyledElement(style) {
  @property({ type: String })
  value = ''

  @property({ type: String })
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
    true

  @property({ type: Boolean })
  autofocus = false

  @property({ type: String, reflect: true })
  size: InputSize = 'large'

  @property({ type: Boolean, attribute: 'is-preview', reflect: true })
  isPreview = false

  // dropdown
  @state() private isHeadingDropdownOpen = false
  @state() private isColorDropdownOpen = false
  private readonly headingTriggerId = 'heading-dropdown-trigger'
  private readonly colorTriggerId = 'color-dropdown-trigger'

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
    color: false,
    activeColor: '',
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

  @query('lukso-textarea') private textareaEl?: HTMLElement & {
    shadowRoot: ShadowRoot
  }

  private handleOutsideClick = (event: Event) => {
    const target = event.target as HTMLElement

    // Check if click is inside our component at all
    const isInsideThisComponent =
      this.contains(target) || this.shadowRoot?.contains(target)

    if (!isInsideThisComponent) {
      // Click is completely outside our component, close both dropdowns
      if (this.isHeadingDropdownOpen) {
        this.isHeadingDropdownOpen = false
      }
      if (this.isColorDropdownOpen) {
        this.isColorDropdownOpen = false
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
    const isHeadingTrigger = this.shadowRoot
      ?.getElementById(this.headingTriggerId)
      ?.contains(target)
    const isColorTrigger = this.shadowRoot
      ?.getElementById(this.colorTriggerId)
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
  }

  private styles = tv({
    slots: {
      wrapper: 'w-[inherit] grid gap-3',
      header:
        'flex items-center justify-between gap-2 border border-neutral-90 rounded-12 px-3 py-2',
      toolbar: 'flex flex-wrap items-center gap-1',
      area: 'border border-neutral-90 rounded-12 overflow-hidden',
      editor: 'p-3',
      preview: 'p-3',
      colorMenu: 'relative',
      headingMenu: 'relative',
      label: 'heading-inter-14-bold text-neutral-20',
      description: 'paragraph-inter-12-regular text-neutral-20',
      error: 'paragraph-inter-12-regular text-red-65',
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

  private defaultColor = '#374151' // prose gray

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
    this.defaultColor,
  ]

  private dispatchChange(event?: Event) {
    this.updateComplete.then(() => {
      const changeEvent = new CustomEvent('on-change', {
        detail: { value: this.value, event },
        bubbles: false,
        composed: true,
      })
      this.dispatchEvent(changeEvent)
    })
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
   * @param level - 0 to remove heading, 1-3 for heading levels
   */
  private applyHeading(level: 0 | 1 | 2 | 3) {
    if (this.isReadonly || this.isDisabled) return

    // Save undo state before making changes
    this.saveUndoStateBeforeChange()

    const desiredPrefix = level > 0 ? '#'.repeat(level) + ' ' : ''
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
        this.updateActiveFormats()
      })
      this.dispatchChange()
    })
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
        const selStart = before.length
        const selEnd = selStart + selected.length
        requestAnimationFrame(() => {
          textarea.setSelectionRange(selStart, selEnd)
          this.updateActiveFormats()
        })
        this.dispatchChange()
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
        const selStart = before.length
        const selEnd = selStart + selected.length
        requestAnimationFrame(() => {
          textarea.setSelectionRange(selStart, selEnd)
          this.updateActiveFormats()
        })
        this.dispatchChange()
        return
      }

      // Otherwise, wrap
      const wrapped = `${wrapper}${selected || ''}${wrapper}`
      this.value = before + wrapped + after
      const selStart = before.length + wrapper.length
      const selEnd = selStart + (selected ? selected.length : 0)
      requestAnimationFrame(() => {
        textarea.setSelectionRange(selStart, selEnd)
        this.updateActiveFormats()
      })
      this.dispatchChange()
    })
  }

  /**
   * Toggle preview mode on or off.
   */
  private togglePreview() {
    this.isPreview = !this.isPreview
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
      // Block nested links when selection is within the URL part of a link
      if (this.isSelectionInLinkUrl(start, end, value)) {
        return // Do nothing - nested links not allowed in link URLs
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
        const newStart = before.length
        const newEnd = newStart + textOnly.length
        requestAnimationFrame(() => {
          textarea.setSelectionRange(newStart, newEnd)
          this.updateActiveFormats()
        })
        this.dispatchChange()
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
          const newCursor = leftBracket + textOnly.length
          requestAnimationFrame(() => {
            textarea.setSelectionRange(newCursor, newCursor)
            this.updateActiveFormats()
          })
          this.dispatchChange()
          return
        }
      }

      // Otherwise insert a link template
      const text = selected || placeholderText
      const md = `[${text}](${placeholderUrl})`
      this.value = before + md + after
      // Position cursor inside parentheses for immediate URL entry
      // Calculation: before + '[' + text + '](' = cursor position inside ()
      const cursorPosition = before.length + 1 + text.length + 2 // [text](|
      requestAnimationFrame(() => {
        textarea.focus()
        textarea.setSelectionRange(cursorPosition, cursorPosition)
        this.updateActiveFormats()
      })
      this.dispatchChange()
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
    this.updateActiveFormats()
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

    // Check for color formatting
    const colorRegex = /<span style="color: ([^"]+)">/
    const hasColorWrap = !!(
      (beforeSelection.match(colorRegex) &&
        afterSelection.includes('</span>')) ||
      selectedText.match(/^<span style="color: ([^"]+)">(.*)<\/span>$/s)
    )

    let activeColor = this.defaultColor
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

    this.activeFormats = {
      bold: hasBoldWrap,
      italic: hasItalicWrap,
      link: hasLink,
      h1: headingLevel === 1,
      h2: headingLevel === 2,
      h3: headingLevel === 3,
      color: hasColorWrap,
      activeColor,
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
   * Save the initial state to the undo stack.
   */
  private addKeyboardListeners() {
    // Try multiple times to ensure textarea is ready
    const tryAddListener = (attempts = 0) => {
      const textarea = this.textareaEl?.shadowRoot?.querySelector('textarea')
      if (textarea) {
        console.log('✅ Keyboard listener added to textarea')
        textarea.addEventListener('keydown', this.handleKeyDown)
      } else if (attempts < 10) {
        console.log(
          `⏳ Textarea not ready, retrying... (attempt ${attempts + 1})`
        )
        // Retry after a short delay
        requestAnimationFrame(() => tryAddListener(attempts + 1))
      } else {
        console.error('❌ Failed to add keyboard listener - textarea not found')
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
          selStart = before.length
          selEnd = selStart + selected.length
        } else {
          // Different color: update the existing span's color
          const newColorTagOpen = `<span style="color: ${color}">`
          before =
            before.slice(0, before.length - beforeColorMatch[0].length) +
            newColorTagOpen
          this.value = before + selected + after
          selStart = before.length
          selEnd = selStart + selected.length
        }

        requestAnimationFrame(() => {
          textarea.setSelectionRange(selStart, selEnd)
          this.updateActiveFormats()
        })
        this.dispatchChange()
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
        const selStart = before.length
        const selEnd =
          selStart +
          (existingColor === color ? innerText.length : innerText.length)
        requestAnimationFrame(() => {
          textarea.setSelectionRange(selStart, selEnd)
          this.updateActiveFormats()
        })
        this.dispatchChange()
        return
      }

      // Otherwise, wrap with new color
      const newColorTagOpen = `<span style="color: ${color}">`
      const wrapped = `${newColorTagOpen}${selected || ''}${colorTagClose}`
      this.value = before + wrapped + after
      const selStart = before.length + newColorTagOpen.length
      const selEnd = selStart + (selected ? selected.length : 4)
      requestAnimationFrame(() => {
        textarea.setSelectionRange(selStart, selEnd)
        this.updateActiveFormats()
      })
      this.dispatchChange()
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

    this.withSelection((ta, start, end, value) => {
      // Block formatting if selection is within the URL part of a link
      if (this.isSelectionInLinkUrl(start, end, value)) {
        return // Do nothing - formatting not allowed in link URLs
      }

      const { start: s, end: e } = this.expandSelectionToWord(start, end, value)
      const before = value.slice(0, s)
      let selected = value.slice(s, e)
      const after = value.slice(e)

      // Remove any color formatting from the selection
      const colorRegex = /<span style="color: ([^"]+)">(.*?)<\/span>/gs
      selected = selected.replace(colorRegex, '$2')

      // Also check if we're inside a color block that extends outside selection
      const fullColorRegex = /<span style="color: ([^"]+)">(.*?)<\/span>/g
      let match: RegExpExecArray | null
      let foundMatch = false

      // Search for color blocks that might contain our selection
      const searchText = value.slice(
        Math.max(0, s - 100),
        Math.min(value.length, e + 100)
      )
      const searchOffset = Math.max(0, s - 100)

      match = fullColorRegex.exec(searchText)
      while (match !== null) {
        const matchStart = searchOffset + match.index
        const matchEnd = searchOffset + match.index + match[0].length
        const spanOpenTag = `<span style="color: ${match[1]}">`
        const contentStart = searchOffset + match.index + spanOpenTag.length
        const contentEnd = matchEnd - 7 // '</span>'.length

        // Check if our selection is within this color block
        if (contentStart <= s && e <= contentEnd) {
          // We're inside a color block - need to split it
          const beforeContent = value.slice(contentStart, s)
          const afterContent = value.slice(e, contentEnd)
          const newContent = beforeContent + selected + afterContent

          this.value =
            value.slice(0, matchStart) + newContent + value.slice(matchEnd)
          const selStart = matchStart + beforeContent.length
          const selEnd = selStart + selected.length
          requestAnimationFrame(() => {
            ta.setSelectionRange(selStart, selEnd)
            this.updateActiveFormats()
          })
          this.dispatchChange()
          foundMatch = true
          break
        }
        match = fullColorRegex.exec(searchText)
      }

      if (!foundMatch) {
        // Simple case - just replace the selected text
        this.value = before + selected + after
        const selStart = before.length
        const selEnd = selStart + selected.length
        requestAnimationFrame(() => {
          ta.setSelectionRange(selStart, selEnd)
          this.updateActiveFormats()
        })
        this.dispatchChange()
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

    console.log('💾 Saving undo state before change:', {
      currentValue: this.value,
      selection,
      stackLength: this.undoStack.length,
    })

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
   * Handle keydown events for undo/redo shortcuts.
   */
  private handleKeyDown = (event: KeyboardEvent) => {
    // Handle Cmd+Z (Mac) or Ctrl+Z (Windows/Linux)
    const isUndo =
      (event.metaKey || event.ctrlKey) && event.key === 'z' && !event.shiftKey
    const isRedo =
      (event.metaKey || event.ctrlKey) &&
      (event.key === 'y' || (event.key === 'z' && event.shiftKey))

    if (isUndo || isRedo) {
      console.log(
        `🎹 Keyboard shortcut detected: ${isUndo ? 'UNDO' : 'REDO'}`,
        {
          key: event.key,
          metaKey: event.metaKey,
          ctrlKey: event.ctrlKey,
          shiftKey: event.shiftKey,
          undoStackLength: this.undoStack.length,
          redoStackLength: this.redoStack.length,
        }
      )
    }

    if (isUndo) {
      event.preventDefault()
      this.undo()
    } else if (isRedo) {
      event.preventDefault()
      this.redo()
    }
  }

  /**
   * Perform an undo operation, reverting to the previous state.
   */
  private undo() {
    console.log('⏪ Undo called', {
      isReadonly: this.isReadonly,
      isDisabled: this.isDisabled,
      undoStackLength: this.undoStack.length,
      currentValue: this.value,
    })

    if (this.isReadonly || this.isDisabled || this.undoStack.length <= 1) {
      console.log('❌ Undo blocked - readonly/disabled or empty stack')
      return
    }

    // Save current state to redo stack before undoing
    const textarea = this.textareaEl?.shadowRoot?.querySelector('textarea')
    const currentSelection = textarea
      ? { start: textarea.selectionStart ?? 0, end: textarea.selectionEnd ?? 0 }
      : { start: 0, end: 0 }
    this.redoStack.push({ value: this.value, selection: currentSelection })

    // Get previous state from undo stack
    const previousState = this.undoStack.pop()!
    console.log('📝 Undoing to:', previousState)

    // Apply previous state
    this.isUndoRedoAction = true
    this.value = previousState.value
    this.lastSavedValue = previousState.value

    // Restore selection after value update
    requestAnimationFrame(() => {
      if (textarea) {
        textarea.setSelectionRange(
          previousState.selection.start,
          previousState.selection.end
        )
      }
      this.updateActiveFormats()
      this.isUndoRedoAction = false
    })

    this.dispatchChange()
  }

  /**
   * Perform a redo operation, reapplying a previously undone state.
   */
  private redo() {
    console.log('⏩ Redo called', {
      isReadonly: this.isReadonly,
      isDisabled: this.isDisabled,
      redoStackLength: this.redoStack.length,
      currentValue: this.value,
    })

    if (this.isReadonly || this.isDisabled || this.redoStack.length === 0) {
      console.log('❌ Redo blocked - readonly/disabled or empty stack')
      return
    }

    // Save current state to undo stack before redoing
    const textarea = this.textareaEl?.shadowRoot?.querySelector('textarea')
    const currentSelection = textarea
      ? { start: textarea.selectionStart ?? 0, end: textarea.selectionEnd ?? 0 }
      : { start: 0, end: 0 }
    this.undoStack.push({ value: this.value, selection: currentSelection })

    // Get next state from redo stack
    const nextState = this.redoStack.pop()!
    console.log('📝 Redoing to:', nextState)

    // Apply next state
    this.isUndoRedoAction = true
    this.value = nextState.value
    this.lastSavedValue = nextState.value

    // Restore selection after value update
    requestAnimationFrame(() => {
      if (textarea) {
        textarea.setSelectionRange(
          nextState.selection.start,
          nextState.selection.end
        )
      }
      this.updateActiveFormats()
      this.isUndoRedoAction = false
    })

    this.dispatchChange()
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
      this.updateActiveFormats()
      this.addKeyboardListeners()
    })
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener('click', this.handleOutsideClick)
    // Clean up
    if (this.undoTimeout) {
      clearTimeout(this.undoTimeout)
    }
    this.removeKeyboardListeners()
  }

  private labelTemplate() {
    return this.label
      ? html`<label class="heading-inter-14-bold text-neutral-20 block"
          >${this.label}</label
        >`
      : nothing
  }

  private descriptionTemplate() {
    return this.description
      ? html`<div class="paragraph-inter-12-regular text-neutral-20">
          <lukso-sanitize html-content=${this.description}></lukso-sanitize>
        </div>`
      : nothing
  }

  private errorTemplate() {
    return this.error
      ? html`<div class="paragraph-inter-12-regular text-red-65">
          ${this.error}
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
      <div class="flex items-center gap-2">
        <div class=${cn(this.styles().headingMenu())}>
          <lukso-tooltip text="Heading options" placement="top">
            <lukso-button
              id=${this.headingTriggerId}
              @click=${(e: Event) => {
                e.stopPropagation()
                // Close color dropdown if open
                this.isColorDropdownOpen = false
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
          </lukso-dropdown>
        </div>

        ${this.buttonTemplate(
          'text-bold',
          () => this.toggleWrap('**'),
          'Bold',
          this.activeFormats.bold
        )}
        ${this.buttonTemplate(
          'text-italic',
          () => this.toggleWrap('*'),
          'Italic',
          this.activeFormats.italic
        )}
        ${this.buttonTemplate(
          'link',
          () => this.insertLink(),
          'Link',
          this.activeFormats.link
        )}

        <div class=${this.styles().colorMenu()}>
          <lukso-tooltip text="Heading options" placement="top">
            <lukso-button
              id=${this.colorTriggerId}
              @click=${(e: Event) => {
                e.stopPropagation()
                this.restoreFocusAndSelection()
                // Close heading dropdown if open
                this.isHeadingDropdownOpen = false
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
                style="background-color: ${this.activeFormats.activeColor};"
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
              <div class="col-span-8 mb-2 flex items-center justify-between">
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
                    aria-pressed=${this.activeFormats.activeColor === color
                      ? 'true'
                      : 'false'}
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
      </div>
    `
  }

  render() {
    const { wrapper, header, toolbar, area, editor, preview } = this.styles({
      isFullWidth: this.isFullWidth,
    })

    return html`
      <div class=${wrapper()}>
        ${this.labelTemplate()} ${this.descriptionTemplate()}

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
                  ?is-full-width=${true}
                  ?is-disabled=${this.isDisabled}
                  ?is-readonly=${this.isReadonly}
                  ?is-non-resizable=${this.isNonResizable}
                  size=${this.size}
                  @on-input=${this.handleTextareaInput}
                  @on-key-up=${this.handleTextareaKeyUp}
                  @on-input-click=${this.handleTextareaClick}
                ></lukso-textarea>
              </div>`
            : html`<div class=${preview()}>
                <lukso-markdown
                  value=${this.value}
                  prose-classes="prose prose-base prose-gray"
                ></lukso-markdown>
              </div>`}
        </div>

        ${this.errorTemplate()}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-text-editor': LuksoTextEditor
  }
}
