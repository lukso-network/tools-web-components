import makeBlockie from 'ethereum-blockies-base64'
import { html, nothing } from 'lit'
import { property, state, queryAssignedElements } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import { tv } from 'tailwind-variants'

import { safeCustomElement } from '@/shared/safe-custom-element'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.css?inline'
import '@/components/lukso-profile'
import { cn } from '@/shared/tools'
import { customStyleMap } from '@/shared/directives'
import '@/components/lukso-image'
import { backgroundGradient } from '@/shared/tools/background-gradient'

export type CardVariants =
  | 'basic'
  | 'with-header'
  | 'profile'
  | 'profile-2'
  | 'hero'
  | 'dapp'
  | 'profile-3'

export type CardBorderRadius = 'small' | 'medium' | 'none'

export type CardShadows = 'small' | 'medium' | 'large'

@safeCustomElement('lukso-card')
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
  width: number | undefined

  @property({ type: Number })
  height: number | undefined

  @property({ type: String, attribute: 'custom-class' })
  customClass = ''

  @property({ type: String, attribute: 'header-class' })
  headerClass = ''

  @property({ type: String, attribute: 'border-radius' })
  borderRadius: CardBorderRadius = 'medium'

  @property({ type: String })
  shadow: CardShadows = 'large'

  @property({ type: Boolean, attribute: 'is-hoverable' })
  isHoverable = false

  @property({ type: Boolean, attribute: 'has-overlay' })
  hasOverlay = false

  @property({ type: Boolean, attribute: 'is-eoa' })
  isEoa = false

  @queryAssignedElements({ slot: 'bottom', flatten: true })
  private bottomNodes: NodeListOf<HTMLElement>

  @state()
  private hasBottom = false

  private onBottomSlotChange() {
    this.hasBottom = this.bottomNodes.length > 0
  }

  private cardStyles = tv({
    base: 'bg-neutral-100',
    variants: {
      borderRadius: {
        none: 'rounded-0',
        small: 'rounded-12',
        medium: 'rounded-24',
      },
      shadow: {
        small: 'shadow-neutral-shadow-round',
        medium: 'shadow-neutral-shadow-round-1xl',
        large: 'shadow-neutral-shadow-round-2xl',
      },
      isHoverable: {
        true: 'cursor-pointer transition',
      },
      hasNoWidth: {
        true: 'w-full',
      },
    },
    compoundVariants: [
      {
        shadow: 'small',
        isHoverable: true,
        class: 'hover:shadow-neutral-shadow-round-1xl',
      },
      {
        shadow: 'medium',
        isHoverable: true,
        class: 'hover:shadow-neutral-shadow-round-2xl',
      },
      {
        shadow: 'large',
        isHoverable: true,
        class: 'hover:shadow-neutral-shadow-round-3xl',
      },
    ],
  })

  basicTemplate() {
    const cardStyles = this.cardStyles({
      borderRadius: this.borderRadius,
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
      borderRadius: this.borderRadius,
      shadow: this.shadow,
      isHoverable: this.isHoverable,
      hasNoWidth: !this.width,
      class: 'grid grid-rows-[auto,1fr] overflow-hidden',
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
        <div
          class="bg-neutral-100 shadow-neutral-above-shadow-1xl rounded-[inherit]"
        >
          <slot name="content"></slot>
        </div>
      </div>
    `
  }

  profileTemplate() {
    const cardStyles = this.cardStyles({
      borderRadius: this.borderRadius,
      shadow: this.shadow,
      isHoverable: this.isHoverable,
      hasNoWidth: !this.width,
      class: 'grid grid-rows-[1fr,auto]',
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
            backgroundImage: backgroundGradient(this.profileAddress),
          })}
          class=${cn(
            'min-h-[92px] -mb-6 w-full rounded-t-[inherit] rounded-b-0 relative',
            this.headerClass
          )}
        >
          ${this.backgroundUrl &&
          html`<div
            class="rounded-t-[inherit] overflow-hidden absolute inset-0"
          >
            <lukso-image src=${this.backgroundUrl}></lukso-image>
          </div>`}
          ${this.hasOverlay
            ? html`<div
                class="h-full full rounded-t-[inherit] rounded-b-0 bg-neutral-20/10 absolute"
              ></div>`
            : nothing}
          <div class="relative h-full">
            <slot name="header"></slot>
          </div>
        </div>

        <div
          style=${customStyleMap({
            [`width: ${this.width}px`]: !!this.width,
          })}
          class="bg-neutral-100 rounded-[inherit] relative break-normal"
        >
          <lukso-profile
            profile-url=${this.isEoa
              ? makeBlockie(this.profileAddress)
              : this.profileUrl}
            borderRadius="large"
            profile-address=${this.profileAddress}
            ?has-identicon=${!this.isEoa}
            class="absolute -top-[40px] left-[calc(50%_-_40px)] z-10"
          ></lukso-profile>
          <div
            class="overflow-hidden w-[153px] h-[70px] -top-[70px] relative mx-auto flex items-end justify-center -mb-3"
          >
            <div
              class="bg-neutral-100 rounded-[103px_103px_0_0] w-[96px] h-12"
            ></div>
          </div>
          <slot name="content"></slot>
        </div>
      </div>
    `
  }

  profile2Template() {
    const cardStyles = this.cardStyles({
      borderRadius: this.borderRadius,
      shadow: this.shadow,
      isHoverable: this.isHoverable,
      hasNoWidth: !this.width,
      class: 'grid grid-rows-[auto,1fr]',
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
            backgroundImage: backgroundGradient(this.profileAddress),
          })}
          class=${cn(
            'min-h-[129px] -mb-6 bg-center bg-cover rounded-t-[inherit] rounded-b-0 relative bg-neutral-100',
            this.headerClass
          )}
        >
          ${this.backgroundUrl &&
          html`<div
              class="rounded-t-[inherit] overflow-hidden absolute inset-0"
            >
              <lukso-image src=${this.backgroundUrl}></lukso-image>
            </div>
            <div
              class="min-h-full min-w-full rounded-t-[inherit] rounded-b-0 bg-neutral-10/10 absolute"
            ></div>`}
          <div>
            <slot name="header"></slot>
          </div>
        </div>
        <div class="grid grid-rows-[max-content,auto] rounded-b-[inherit]">
          <div
            class=${cn('bg-neutral-100 relative', {
              'rounded-b-[inherit]': !this.hasBottom,
            })}
          >
            <lukso-profile
              profile-url=${this.isEoa
                ? makeBlockie(this.profileAddress)
                : this.profileUrl}
              borderRadius="large"
              profile-address=${this.profileAddress}
              ?has-identicon=${!this.isEoa}
              class="absolute -top-[40px] left-[calc(50%_-_40px)] z-10"
            ></lukso-profile>
            <div
              class="overflow-hidden w-[153px] h-[70px] -top-[70px] relative mx-auto flex items-end justify-center -mb-2"
            >
              <div
                class="bg-neutral-100 rounded-[103px_103px_0_0] w-[96px] h-12"
              ></div>
            </div>
            <slot name="content"></slot>
          </div>
          <div
            class="bg-neutral-97 rounded-b-[inherit] shadow-neutral-inner-shadow-top"
          >
            <slot @slotchange=${this.onBottomSlotChange} name="bottom"></slot>
          </div>
        </div>
      </div>
    `
  }

  profile3Template() {
    const cardStyles = this.cardStyles({
      borderRadius: this.borderRadius,
      shadow: this.shadow,
      isHoverable: this.isHoverable,
      hasNoWidth: !this.width,
      class: 'grid grid-rows-[auto,1fr]',
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
            backgroundImage: backgroundGradient(this.profileAddress),
          })}
          class=${cn(
            'min-h-10 bg-center bg-cover rounded-t-[inherit] rounded-b-0 relative bg-neutral-100',
            this.headerClass
          )}
        >
          ${this.backgroundUrl &&
          html`<div
              class="rounded-t-[inherit] overflow-hidden absolute inset-0"
            >
              <lukso-image src=${this.backgroundUrl}></lukso-image>
            </div>
            <div
              class="min-h-full min-w-full rounded-t-[inherit] rounded-b-0 bg-neutral-10/10 absolute"
            ></div>`}
          <div>
            <slot name="header"></slot>
          </div>
        </div>
        <div class="grid grid-rows-[max-content] rounded-b-[inherit]">
          <div class="bg-neutral-100 relative pt-5 rounded-b-[inherit]">
            <lukso-profile
              profile-url=${this.isEoa
                ? makeBlockie(this.profileAddress)
                : this.profileUrl}
              borderRadius="large"
              profile-address=${this.profileAddress}
              ?has-identicon=${!this.isEoa}
              size="small"
              class="absolute -top-6 left-3 z-10 border-[3px] border-neutral-100 rounded-full"
            ></lukso-profile>

            <slot name="content"></slot>
          </div>
        </div>
      </div>
    `
  }

  heroTemplate() {
    const cardStyles = this.cardStyles({
      borderRadius: this.borderRadius,
      shadow: this.shadow,
      isHoverable: this.isHoverable,
      hasNoWidth: !this.width,
      class: 'flex',
    })

    return html`
      <div
        data-testid="card"
        style=${customStyleMap({
          [`min-height: ${this.height}px`]: !!this.height,
          'min-height: 240px': !this.height,
          [`width: ${this.width}px`]: !!this.width,
        })}
        class=${cn(cardStyles, this.customClass)}
      >
        <div
          class="h-full w-full -mb-6 bg-center bg-cover rounded-[inherit] relative"
        >
          ${this.backgroundUrl &&
          html`<div class="rounded-[inherit] overflow-hidden absolute inset-0">
            <lukso-image src=${this.backgroundUrl}></lukso-image>
          </div>`}
          ${this.hasOverlay && this.backgroundUrl
            ? html`<div
                class="h-full w-full rounded-[inherit] bg-neutral-20/10 absolute"
              ></div>`
            : nothing}
          <div
            class="h-full w-full flex flex-col items-center justify-center absolute"
          >
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    `
  }

  dappTemplate() {
    const cardStyles = this.cardStyles({
      borderRadius: this.borderRadius,
      shadow: this.shadow,
      isHoverable: this.isHoverable,
      hasNoWidth: !this.width,
      class: 'grid grid-rows-[auto,1fr]',
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
            backgroundImage: backgroundGradient(this.profileAddress),
          })}
          class=${cn(
            'min-h-[inherit] bg-center bg-cover rounded-t-[inherit] rounded-b-0 relative',
            this.headerClass
          )}
        >
          ${this.backgroundUrl &&
          html`
            <div class="rounded-t-[inherit] overflow-hidden absolute inset-0">
              <lukso-image src=${this.backgroundUrl}></lukso-image>
            </div>
          `}
          <div class="relative h-full">
            <slot name="header"></slot>
          </div>
        </div>
        <div class="bg-neutral-100 rounded-t-0 rounded-b-[inherit] relative">
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
      case 'profile-3':
        return this.profile3Template()
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
