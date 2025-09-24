import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { marked } from 'marked'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import '@/components/lukso-sanitize'
import style from './style.scss?inline'

@customElement('lukso-markdown')
export class LuksoMarkdown extends TailwindStyledElement(style) {
  @property({ type: String })
  value = ''

  @property({ type: Boolean, attribute: 'is-pre', reflect: true })
  isPre = false

  @property({ type: String, attribute: 'prose-classes', reflect: true })
  proseClasses = 'prose prose-base prose-inherit'

  @property({ type: String, attribute: 'custom-style', reflect: true })
  customStyle = ''

  /**
   * Convert markdown to HTML using marked library
   */
  private convertMarkdownToHtml(): string {
    if (!this.value) {
      return ''
    }

    try {
      // Preprocess the markdown to handle nested lists properly
      const processedMarkdown = this.preprocessNestedLists(this.value)

      // Configure marked for better list handling
      marked.setOptions({
        gfm: true, // GitHub Flavored Markdown
        breaks: false, // Don't convert line breaks to <br>
      })

      return marked(processedMarkdown) as string
    } catch (error) {
      console.error('Error parsing markdown:', error)
      return ''
    }
  }

  /**
   * Preprocess markdown to handle nested lists with various indentation
   * by normalizing to CommonMark-compliant 4-space indentation
   */
  private preprocessNestedLists(markdown: string): string {
    const lines = markdown.split('\n')
    const result: string[] = []

    for (const line of lines) {
      // Match list items: optional whitespace + marker (number. or -, *, +) + space + content
      const listMatch = line.match(/^(\s*)((?:\d+\.)|[-*+])\s+(.*)$/)

      if (listMatch) {
        const originalIndent = listMatch[1]
        const marker = listMatch[2]
        const content = listMatch[3]

        // Calculate nesting level based on indentation
        // CommonMark requires 4 spaces per level
        // We'll accept 2-3 spaces as level 1, 4+ spaces as appropriate levels
        let nestingLevel = 0
        if (originalIndent.length >= 2) {
          nestingLevel = Math.max(1, Math.floor(originalIndent.length / 4))
          // Special case: if we have 2-3 spaces, treat as level 1
          if (originalIndent.length >= 2 && originalIndent.length < 4) {
            nestingLevel = 1
          }
        }
        const newIndent = '    '.repeat(nestingLevel) // 4 spaces per level

        result.push(`${newIndent}${marker} ${content}`)
      } else {
        // For non-list lines, preserve as-is
        result.push(line)
      }
    }

    return result.join('\n')
  }

  render() {
    const htmlContent = this.convertMarkdownToHtml()

    return html`
      <lukso-sanitize
        html-content="<div class='${this.proseClasses}' style='${this
          .customStyle}'>${htmlContent}</div>"
        ?is-pre="${this.isPre}"
        class="w-full"
      ></lukso-sanitize>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-markdown': LuksoMarkdown
  }
}
