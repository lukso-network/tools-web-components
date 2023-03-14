import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import DOMPurify from 'dompurify'

import { TailwindElement } from '@/shared/tailwind-element'

@customElement('lukso-sanitize')
export class LuksoSanitize extends TailwindElement {
  @property({ type: String, attribute: 'html-content' })
  htmlContent = ''

  private options = {
    ADD_ATTR: ['target'], // allow target attribute on anchor tags
  }

  sanitize() {
    return DOMPurify.sanitize(this.htmlContent, this.options)
  }

  render() {
    // in order to show HTML we  need to use unsafeHTML directive.
    // This is safe since we already sanitized content
    return html`${unsafeHTML(this.sanitize())}`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-sanitize': LuksoSanitize
  }
}
