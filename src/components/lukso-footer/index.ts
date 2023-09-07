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
          class="p-10 grid gap-12 items-center lg:grid-cols-[auto,max-content]"
        >
          <slot name="top"></slot>
          <div className="flex lg:justify-end">
            <lukso-share></lukso-share>
          </div>
        </div>
        <div
          class="grid sm:grid-cols-[max-content,auto] px-10 py-6 bg-neutral-95 gap-8"
        >
          <slot name="bottom"></slot>
          <div class="flex sm:justify-end">
            <a
              href="https://lukso.network/"
              target="_blank"
              class="sm:text-right opacity-50 text-neutral-30"
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
      </footer>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-footer': LuksoFooter
  }
}
