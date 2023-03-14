import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import { customClassMap } from '@/shared/directives'
import style from './style.scss?inline'
import '@/components/lukso-profile'

export type CardVariants = 'basic' | 'with-header' | 'profile'

@customElement('lukso-card')
export class LuksoCard extends TailwindStyledElement(style) {
  @property({ type: String })
  variant: CardVariants = 'basic'

  @property({ type: String, attribute: 'background-url' })
  backgroundUrl = ''

  @property({ type: String, attribute: 'profile-url' })
  profileUrl = ''

  @property({ type: String, attribute: 'profile-address' })
  profileAddress = ''

  @property({ type: Boolean, attribute: 'is-fixed-width' })
  isFixedWidth = false

  @property({ type: Boolean, attribute: 'is-fixed-height' })
  isFixedHeight = false

  private defaultStyles = `rounded-24  shadow-pink-drop-shadow-2xl`

  basicTemplate() {
    return html`
      <div
        data-testid="card"
        class="bg-neutral-100 ${customClassMap({
          [this.defaultStyles]: true,
          ['w-[362px]']: this.isFixedWidth,
          ['min-h-[534px]']: this.isFixedHeight,
        })}"
      >
        <slot name="content"></slot>
      </div>
    `
  }

  withHeaderTemplate() {
    return html`
      <div
        data-testid="card"
        class="bg-neutral-98 grid grid-rows-[auto,1fr] ${customClassMap({
          [this.defaultStyles]: true,
          ['w-[362px]']: this.isFixedWidth,
          ['min-h-[534px]']: this.isFixedHeight,
        })}"
      >
        <div>
          <slot name="header"></slot>
        </div>
        <div class="bg-neutral-100 shadow-neutral-above-shadow-1xl rounded-24">
          <slot name="content"></slot>
        </div>
      </div>
    `
  }

  profileTemplate() {
    return html`
      <div
        data-testid="card"
        class="bg-neutral-98 grid grid-rows-[auto,1fr] ${customClassMap({
          [this.defaultStyles]: true,
          ['w-[362px]']: this.isFixedWidth,
          ['min-h-[534px]']: this.isFixedHeight,
        })}"
      >
        <div
          style=${styleMap({
            backgroundImage: `url(${this.backgroundUrl})`,
          })}
          class="min-h-[129px] -mb-6 bg-center bg-cover rounded-[24px_24px_0_0] relative"
        >
          <div
            class="min-h-full min-w-full rounded-[24px_24px_0_0] bg-neutral-10 absolute opacity-10"
          ></div>
        </div>
        <div
          class="bg-neutral-100 shadow-neutral-above-shadow-1xl rounded-24 relative"
        >
          <lukso-profile
            profile-url=${this.profileUrl}
            size="large"
            profile-address=${this.profileAddress}
            has-identicon
            class="absolute -top-[40px] left-[calc(50%_-_40px)] z-10"
          ></lukso-profile>
          <div
            class="overflow-hidden w-[153px] h-[70px] -top-[70px] relative mx-auto flex items-end justify-center"
          >
            <div
              class="bg-neutral-100 rounded-[103px_103px_0_0] w-[96px] h-[48px]
              shadow-neutral-above-shadow-1xl"
            ></div>
          </div>

          <slot name="content"></slot>
        </div>
      </div>
    `
  }

  render() {
    switch (this.variant) {
      case 'with-header':
        return this.withHeaderTemplate()
      case 'profile':
        return this.profileTemplate()

      default:
        return this.basicTemplate()
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-card': LuksoCard
  }
}
