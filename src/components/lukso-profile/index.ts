import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import makeBlockie from 'ethereum-blockies-base64'
import { tv } from 'tailwind-variants'

import { TailwindElement } from '@/shared/tailwind-element'
import '@/components/lukso-image'

export type ProfileSize =
  | 'x-small'
  | 'small'
  | 'medium'
  | 'large'
  | 'x-large'
  | '2x-large'

@customElement('lukso-profile')
export class LuksoProfile extends TailwindElement {
  @property({ type: String, attribute: 'profile-url' })
  profileUrl = ''

  @property({ type: String, attribute: 'profile-address' })
  profileAddress = ''

  @property({ type: Boolean, attribute: 'has-identicon' })
  hasIdenticon = false

  @property({ type: String })
  size: ProfileSize = 'large'

  @property({ type: Boolean, attribute: 'is-square' })
  isSquare = false

  @property({ type: String })
  placeholder = '/assets/images/profile-default.svg'

  private identicon() {
    return this.hasIdenticon && this.profileAddress
      ? makeBlockie(this.profileAddress)
      : ''
  }

  private profileStyles = tv({
    slots: {
      wrapper: 'outline outline-2 outline-neutral-100 relative',
      profile: 'overflow-hidden',
      identicon:
        'absolute shadow-shadow-1xl rounded-full outline outline-neutral-100 right-0 bottom-0',
    },
    variants: {
      isSquare: {
        false: {
          wrapper: 'rounded-full',
          profile: 'rounded-full',
        },
      },
      size: {
        'x-small': {
          wrapper: 'w-6 h-6',
          profile: 'w-6 h-6',
          identicon: 'w-3 h-3 outline-1',
        },
        small: {
          wrapper: 'w-10 h-10',
          profile: 'w-10 h-10',
          identicon: 'w-4 h-4 outline-2',
        },
        medium: {
          wrapper: 'w-14 h-14',
          profile: 'w-14 h-14',
          identicon: 'w-5 h-5 outline-2',
        },
        large: {
          wrapper: 'w-20 h-20',
          profile: 'w-20 h-20',
          identicon: 'w-6 h-6 outline-2',
        },
        'x-large': {
          wrapper: 'w-24 h-24',
          profile: 'w-24 h-24',
          identicon: 'w-7 h-7 outline-2',
        },
        '2x-large': {
          wrapper: 'w-30 h-30',
          profile: 'w-30 h-30',
          identicon: 'w-9 h-9 outline-[2.5px]',
        },
      },
    },
    compoundVariants: [
      {
        isSquare: true,
        size: 'x-small',
        class: {
          wrapper: 'rounded-[2px]',
          profile: 'rounded-[2px]',
        },
      },
      {
        isSquare: true,
        size: 'small',
        class: {
          wrapper: 'rounded-4',
          profile: 'rounded-4',
        },
      },
      {
        isSquare: true,
        size: 'medium',
        class: {
          wrapper: 'rounded-8',
          profile: 'rounded-8',
        },
      },
      {
        isSquare: true,
        size: 'large',
        class: {
          wrapper: 'rounded-[10px]',
          profile: 'rounded-[10px]',
        },
      },
      {
        isSquare: true,
        size: 'x-large',
        class: {
          wrapper: 'rounded-12',
          profile: 'rounded-12',
        },
      },
    ],
  })

  render() {
    const { wrapper, profile, identicon } = this.profileStyles({
      size: this.size,
      isSquare: this.isSquare,
    })

    return html`
      <div data-testid="profile" class=${wrapper()}>
        <div class=${profile()}>
          <lukso-image
            src=${this.profileUrl}
            placeholder=${this.placeholder}
          ></lukso-image>
        </div>
        ${this.identicon()
          ? html`<img src=${this.identicon()} class=${identicon()} />`
          : ''}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-profile': LuksoProfile
  }
}
