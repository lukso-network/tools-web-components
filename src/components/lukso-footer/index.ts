import { html } from 'lit'
import { safeCustomElement } from '@/shared/safe-custom-element'
import { customElement, property } from 'lit/decorators.js'

import { TailwindElement } from '@/shared/tailwind-element'

import type { ProviderName, ProviderObject } from '@/components/lukso-share'

@safeCustomElement('lukso-footer')
export class LuksoFooter extends TailwindElement {
  @property({ type: String })
  providers = ''

  private defaultProviders: ProviderName[] | ProviderObject[] = [
    'twitter',
    'instagram',
    'linkedin',
    'telegram',
    'discord',
    'reddit',
    'medium',
    'github',
  ]

  render() {
    let providers = this.defaultProviders

    try {
      providers = JSON.parse(this.providers)
    } catch (error) {
      console.warn('Invalid providers format, using default providers.', error)
      // do nothing
    }

    return html`
      <footer class="bg-neutral-100">
        <div
          class="p-10 grid gap-8 items-center lg:grid-cols-[auto,max-content]"
        >
          <slot name="links"></slot>
          <div class="flex gap-5 flex-col sm:flex-row sm:justify-between">
            <lukso-share providers=${JSON.stringify(providers)}></lukso-share>
            <div class="flex sm:ml-8 sm:justify-end">
              <a
                href="https://lukso.network/"
                target="_blank"
                class="flex flex-col opacity-50 text-neutral-30 transition-opacity hover:opacity-80"
              >
                <span
                  class="text-6 not-italic font-600 leading-[7.26px] font-inter"
                  >Powered by</span
                >
                <img
                  src="/assets/images/lukso-logo.svg"
                  alt="LUKSO"
                  class="h-4 mt-[1px]"
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
