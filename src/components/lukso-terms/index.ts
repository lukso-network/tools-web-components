import { html } from 'lit'
import { property, state } from 'lit/decorators.js'

import { safeCustomElement } from '@/shared/safe-custom-element'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import { customClassMap } from '@/shared/directives'
import style from './style.scss?inline'
import '@/components/lukso-icon'
import '@/components/lukso-sanitize'

@safeCustomElement('lukso-terms')
export class LuksoTerms extends TailwindStyledElement(style) {
  @property({ type: String })
  text = ''

  @state()
  private hasScrollButton = true

  private defaultStyles = `h-[56px] w-full sticky bottom-0 -mt-[56px]
    bg-gradient-to-b from-transparent to-neutral-100/80
    flex justify-center transition-opacity opacity-0`

  private onScrollBottom() {
    const event = new CustomEvent('on-bottom-scroll', {
      bubbles: true,
      composed: true,
    })

    this.dispatchEvent(event)
  }

  private handleScroll() {
    const scrollContainer = this.shadowRoot.getElementById('scroll-container')
    const scrollHeight =
      scrollContainer.scrollHeight - scrollContainer.offsetHeight
    const scrollTop = scrollContainer.scrollTop

    if (scrollTop >= scrollHeight) {
      this.onScrollBottom()
      this.hasScrollButton = false
    } else {
      this.hasScrollButton = true
    }
  }

  private handleBottomScroll() {
    const scrollEnd = this.shadowRoot.getElementById('scroll-end')

    scrollEnd &&
      scrollEnd.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      })
  }

  render() {
    return html`<div
      id="scroll-container"
      class="border border-solid border-neutral-90 rounded-12 overflow-y-scroll relative scrollbar-none"
      @scroll=${this.handleScroll}
    >
      <div class="paragraph-inter-12-regular px-4 pt-3">
        <lukso-sanitize html-content=${this.text} is-pre></lukso-sanitize>
        <br />
        <br />
        <div id="scroll-end"></div>
      </div>
      <div
        class=${customClassMap({
          [this.defaultStyles]: true,
          '!opacity-100': this.hasScrollButton,
        })}
      >
        <div
          data-testid="scroll-to-bottom"
          class="w-10 h-10 bg-neutral-100 rounded-full shadow-1xl flex items-center justify-center animate-bounce2 cursor-pointer"
          @click=${this.handleBottomScroll}
        >
          <lukso-icon name="arrow-down-lg"></lukso-icon>
        </div>
      </div>
    </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-terms': LuksoTerms
  }
}
