import { html } from 'lit'
import { safeCustomElement } from '@/shared/safe-custom-element'
import { customElement, property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import DOMPurify from 'dompurify'

import { TailwindElement } from '@/shared/tailwind-element'

/**
 * Default DOMPurify options for lukso-sanitize component.
 */
export const DEFAULT_OPTIONS = {
  ADD_ATTR: ['target'], // allow target attribute on anchor tags
  CUSTOM_ELEMENT_HANDLING: {
    tagNameCheck: /^lukso-/,
    attributeNameCheck: /.*/,
  },
}

/**
 * Options to strip all HTML tags.
 */
export const NO_HTML_TAGS_OPTIONS = { ALLOWED_TAGS: [] }

@safeCustomElement('lukso-sanitize')
export class LuksoSanitize extends TailwindElement {
  @property({ type: String, attribute: 'html-content' })
  htmlContent = ''

  @property({ type: Boolean, attribute: 'is-pre' })
  isPre = false

  @property({ type: Boolean, attribute: 'strip-html-tags' })
  stripHtmlTags = false

  sanitize() {
    if (this.stripHtmlTags) {
      return DOMPurify.sanitize(this.htmlContent, NO_HTML_TAGS_OPTIONS)
    }

    return DOMPurify.sanitize(this.htmlContent, DEFAULT_OPTIONS)
  }

  // in order to show HTML we  need to use unsafeHTML directive.
  // This is safe since we already sanitized content
  render() {
    return this.isPre
      ? html`<!-- prettier-ignore -->
          <div
      class='whitespace-pre-wrap'>${unsafeHTML(this.sanitize())}</div>`
      : html`${unsafeHTML(this.sanitize())}`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-sanitize': LuksoSanitize
  }
}
