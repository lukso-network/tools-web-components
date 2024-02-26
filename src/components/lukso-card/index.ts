import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import { tv } from 'tailwind-variants'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.scss?inline'
import '@/components/lukso-profile'
import { cn } from '@/shared/tools'
import { customStyleMap } from '@/shared/directives'

export type CardVariants =
  | 'basic'
  | 'with-header'
  | 'profile'
  | 'profile-2'
  | 'hero'
  | 'dapp'

export type CardSizes = 'small' | 'medium'

export type CardShadows = 'small' | 'medium' | 'large'

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

  @property({ type: Number })
  width: number | undefined = undefined

  @property({ type: Number })
  height: number | undefined = undefined

  @property({ type: String, attribute: 'custom-class' })
  customClass = ''

  @property({ type: String, attribute: 'header-class' })
  headerClass = ''

  @property({ type: String })
  size: CardSizes = 'medium'

  @property({ type: String })
  shadow: CardShadows = 'large'

  @property({ type: Boolean, attribute: 'is-hoverable' })
  isHoverable = false

  private mediumStyles = `rounded-24 shadow-neutral-drop-shadow-2xl`
  private smallStyles = `rounded-12 shadow-neutral-drop-shadow`
  private smallHoverStyles = `hover:shadow-neutral-drop-shadow-1xl cursor-pointer transition`

  private backgroundImageOrGradient() {
    if (this.backgroundUrl) {
      return `url(${this.backgroundUrl})`
    }

    let gradientStart = '#24354210' // bg-neutral-20/10
    let gradientEnd = '#24354220' // bg-neutral-20/20
    const opacity = '80' // 50% in hex format

    if (this.profileAddress) {
      gradientStart = `#${this.profileAddress.slice(2, 8)}${opacity}`
      gradientEnd = `#${this.profileAddress.slice(36, 42)}${opacity}`
    }

    return `linear-gradient(90deg, ${gradientStart}, ${gradientEnd})`
  }

  private cardStyles = tv({
    base: `bg-neutral-100`,
    variants: {
      size: {
        small: `rounded-12`,
        medium: `rounded-24`,
      },
      shadow: {
        small: `shadow-neutral-drop-shadow`,
        medium: `shadow-neutral-drop-shadow-1xl`,
        large: `shadow-neutral-drop-shadow-2xl`,
      },
      isHoverable: {
        true: `cursor-pointer transition`,
      },
      hasNoWidth: {
        true: `w-full`,
      },
    },
    compoundVariants: [
      {
        shadow: 'small',
        isHoverable: true,
        class: `hover:shadow-neutral-drop-shadow-1xl`,
      },
      {
        shadow: 'medium',
        isHoverable: true,
        class: `hover:shadow-neutral-drop-shadow-2xl`,
      },
      {
        shadow: 'large',
        isHoverable: true,
        class: `hover:shadow-neutral-drop-shadow-3xl`,
      },
    ],
  })

  basicTemplate() {
    const cardStyles = this.cardStyles({
      size: this.size,
      shadow: this.shadow,
      isHoverable: this.isHoverable,
      hasNoWidth: !this.width,
    })

    return html`
      <div
        data-testid="card"
        style=${customStyleMap({
          [`min-height: ${this.height}px`]: !!this.height,
          [`width: ${this.width}px`]: !!this.width,
        })}
        class=${cn(cardStyles, this.customClass)}
      >
        <slot name="content"></slot>
      </div>
    `
  }

  withHeaderTemplate() {
    const cardStyles = this.cardStyles({
      size: this.size,
      shadow: this.shadow,
      isHoverable: this.isHoverable,
      hasNoWidth: !this.width,
      class: `grid grid-rows-[auto,1fr] overflow-hidden`,
    })

    return html`
      <div
        data-testid="card"
        style=${styleMap({
          minHeight: `${this.height}px`,
          width: `${this.width}px`,
        })}
        class=${cn(cardStyles, this.customClass)}
      >
        <div class=${this.headerClass}>
          <slot name="header"></slot>
        </div>
        <div class="bg-neutral-100 shadow-neutral-above-shadow-1xl rounded-24">
          <slot name="content"></slot>
        </div>
      </div>
    `
  }

  profileTemplate() {
    const cardStyles = this.cardStyles({
      size: this.size,
      shadow: this.shadow,
      isHoverable: this.isHoverable,
      hasNoWidth: !this.width,
      class: `grid grid-rows-[1fr,auto]`,
    })

    return html`
      <div
        data-testid="card"
        style=${customStyleMap({
          [`min-height: ${this.height}px`]: !!this.height,
          [`width: ${this.width}px`]: !!this.width,
        })}
        class=${cn(cardStyles, this.customClass)}
      >
        <div
          style=${styleMap({
            backgroundImage: this.backgroundImageOrGradient(),
          })}
          class=${cn(
            'min-h-[92px] -mb-6 w-full bg-center bg-cover rounded-[24px_24px_0_0] relative',
            this.headerClass
          )}
        >
          ${this.backgroundUrl &&
          html` <div
            class="h-full full rounded-[24px_24px_0_0] bg-neutral-20/10 absolute"
          ></div>`}
          <div>
            <slot name="header"></slot>
          </div>
        </div>

        <div
          style=${customStyleMap({
            [`width: ${this.width}px`]: !!this.width,
          })}
          class="bg-neutral-100 rounded-24 relative break-normal"
        >
          <lukso-profile
            profile-url=${this.profileUrl}
            size="large"
            profile-address=${this.profileAddress}
            has-identicon
            class="absolute -top-[40px] left-[calc(50%_-_40px)] z-10"
          ></lukso-profile>
          <div
            class="overflow-hidden w-[153px] h-[70px] -top-[70px] relative mx-auto flex items-end justify-center -mb-3"
          >
            <div
              class="bg-neutral-100 rounded-[103px_103px_0_0] w-[96px] h-[48px]"
            ></div>
          </div>
          <slot name="content"></slot>
        </div>
      </div>
    `
  }

  profile2Template() {
    const cardStyles = this.cardStyles({
      size: this.size,
      shadow: this.shadow,
      isHoverable: this.isHoverable,
      hasNoWidth: !this.width,
      class: `grid grid-rows-[auto,1fr]`,
    })

    return html`
      <div
        data-testid="card"
        style=${customStyleMap({
          [`min-height: ${this.height}px`]: !!this.height,
          [`width: ${this.width}px`]: !!this.width,
        })}
        class=${cn(cardStyles, this.customClass)}
      >
        <div
          style=${styleMap({
            backgroundImage: this.backgroundImageOrGradient(),
          })}
          class=${cn(
            'min-h-[129px] -mb-6 bg-center bg-cover rounded-[24px_24px_0_0] relative bg-neutral-100',
            this.headerClass
          )}
        >
          ${this.backgroundUrl &&
          html`<div
            class="min-h-full min-w-full rounded-[24px_24px_0_0] bg-neutral-10/10 absolute"
          ></div>`}
          <div>
            <slot name="header"></slot>
          </div>
        </div>
        <div class="grid grid-rows-[max-content,auto]">
          <div class="bg-neutral-100 relative">
            <lukso-profile
              profile-url=${this.profileUrl}
              size="large"
              profile-address=${this.profileAddress}
              has-identicon
              class="absolute -top-[40px] left-[calc(50%_-_40px)] z-10"
            ></lukso-profile>
            <div
              class="overflow-hidden w-[153px] h-[70px] -top-[70px] relative mx-auto flex items-end justify-center -mb-2"
            >
              <div
                class="bg-neutral-100 rounded-[103px_103px_0_0] w-[96px] h-[48px]"
              ></div>
            </div>
            <slot name="content"></slot>
          </div>
          <div
            class="bg-neutral-97 rounded-b-24 shadow-neutral-inner-shadow-top"
          >
            <slot name="bottom"></slot>
          </div>
        </div>
      </div>
    `
  }

  heroTemplate() {
    const cardStyles = this.cardStyles({
      size: this.size,
      shadow: this.shadow,
      isHoverable: this.isHoverable,
      hasNoWidth: !this.width,
      class: `h-[240px] flex`,
    })

    return html`
      <div
        data-testid="card"
        style=${customStyleMap({
          [`min-height: ${this.height}px`]: !!this.height,
          [`width: ${this.width}px`]: !!this.width,
        })}
        class=${cn(cardStyles, this.customClass)}
      >
        <div
          style=${styleMap({
            backgroundImage: `url('${this.backgroundUrl}')`,
          })}
          class="h-full w-full -mb-6 bg-center bg-cover rounded-24 relative"
        >
          ${this.backgroundUrl &&
          html`<div
            class="h-full w-full rounded-24 bg-neutral-20/10 absolute"
          ></div>`}
          <div
            class="h-full w-full flex flex-col items-center justify-center  absolute"
          >
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    `
  }

  dappTemplate() {
    const cardStyles = this.cardStyles({
      size: this.size,
      shadow: this.shadow,
      isHoverable: this.isHoverable,
      hasNoWidth: !this.width,
      class: `grid grid-rows-[auto,1fr]`,
    })

    return html`
      <div
        data-testid="card"
        style=${customStyleMap({
          [`min-height: ${this.height}px`]: !!this.height,
          [`width: ${this.width}px`]: !!this.width,
        })}
        class=${cn(cardStyles, this.customClass)}
      >
        <div
          style=${styleMap({
            backgroundImage: this.backgroundImageOrGradient(),
          })}
          class=${cn(
            'min-h-[240px] bg-center bg-cover rounded-[24px_24px_0_0] relative',
            this.headerClass
          )}
        >
          <div>
            <slot name="header"></slot>
          </div>
        </div>
        <div
          class="bg-neutral-100 shadow-neutral-above-shadow-1xl rounded-[0_0_24px_24px] relative"
        >
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
      case 'profile-2':
        return this.profile2Template()
      case 'hero':
        return this.heroTemplate()
      case 'dapp':
        return this.dappTemplate()
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
