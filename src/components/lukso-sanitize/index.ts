import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import DOMPurify from 'dompurify'

import { TailwindElement } from '@/shared/tailwind-element'

@customElement('lukso-sanitize')
export class LuksoSanitize extends TailwindElement {
  @property({ type: String, attribute: 'html-content' })
  htmlContent = ''

  @property({ type: Boolean, attribute: 'is-pre' })
  isPre = false

  @property({ type: Boolean, attribute: 'strip-html-tags' })
  stripHtmlTags = false

  private defaultOptions = {
    ADD_ATTR: ['target'], // allow target attribute on anchor tags
    CUSTOM_ELEMENT_HANDLING: {
      tagNameCheck: /^lukso-/,
      attributeNameCheck: /.*/,
    },
  }

  private noHtmlTagsOptions = { ALLOWED_TAGS: [] }

  sanitize() {
    if (this.stripHtmlTags) {
      return DOMPurify.sanitize(this.htmlContent, this.noHtmlTagsOptions)
    }

    return DOMPurify.sanitize(this.htmlContent, this.defaultOptions)
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
