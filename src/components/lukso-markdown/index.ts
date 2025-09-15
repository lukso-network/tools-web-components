import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { marked } from 'marked'

import { TailwindElement } from '@/shared/tailwind-element'
import '@/components/lukso-sanitize'

@customElement('lukso-markdown')
export class LuksoMarkdown extends TailwindElement {
  @property({ type: String })
  value = ''

  @property({ type: Boolean, attribute: 'is-pre', reflect: true })
  isPre = false

  @property({ type: String, attribute: 'prose-classes', reflect: true })
  proseClasses = 'prose prose-base prose-gray'

  /**
   * Convert markdown to HTML using marked library
   */
  private convertMarkdownToHtml(): string {
    if (!this.value) {
      return ''
    }

    try {
      return marked(this.value) as string
    } catch (error) {
      console.error('Error parsing markdown:', error)
      return ''
    }
  }

  render() {
    const htmlContent = this.convertMarkdownToHtml()

    return html`
      <lukso-sanitize
        html-content="<div class='${this.proseClasses}'>${htmlContent}</div>"
        ?is-pre="${this.isPre}"
      ></lukso-sanitize>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-markdown': LuksoMarkdown
  }
}
