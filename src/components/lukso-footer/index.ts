import { html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { TailwindElement } from '@/shared/tailwind-element'
import '@/components/lukso-share'

@customElement('lukso-footer')
export class LuksoFooter extends TailwindElement {
  render() {
    return html`
      <footer class="bg-neutral-100">
        <div
          class="p-10 grid gap-8 items-center lg:grid-cols-[auto,max-content]"
        >
          <slot name="links"></slot>
          <div class="flex sm:justify-between gap-4 flex-col sm:flex-row">
            <lukso-share></lukso-share>
            <div class="flex sm:ml-8 sm:justify-end">
              <a
                href="https://lukso.network/"
                target="_blank"
                class="flex flex-col opacity-50 text-neutral-30 transition-opacity hover:opacity-80 sm:text-right"
              >
                <span class="paragraph-inter-10-semi-bold">Powered by</span>
                <img
                  src="/assets/images/lukso-logo.svg"
                  alt="LUKSO"
                  class="h-4"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-footer': LuksoFooter
  }
}
