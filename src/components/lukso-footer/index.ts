import { html } from 'lit'
import { property } from 'lit/decorators.js'

import { safeCustomElement } from '@/shared/safe-custom-element'
import { TailwindElement } from '@/shared/tailwind-element'

import type { ProviderName, ProviderObject } from '@/components/lukso-share'

/**
 * A page footer with social share links and a "Powered by LUKSO" logo.
 *
 * @slot links - Navigation links area (left side of the footer).
 */
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
          class="p-10 grid gap-8 items-center lg:grid-cols-[auto_max-content]"
        >
          <slot name="links"></slot>
          <!-- Socials left and "Powered by" right on one row at every width.
          When they cannot fit (8 providers on a narrow phone) the row and
          the icons wrap instead of overflowing -->
          <div
            class="flex flex-wrap items-center justify-between gap-5 sm:flex-nowrap sm:items-stretch"
          >
            <lukso-share
              providers=${JSON.stringify(providers)}
              custom-style="display: flex; flex-wrap: wrap"
            ></lukso-share>
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
