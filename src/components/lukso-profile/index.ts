import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import makeBlockie from 'ethereum-blockies-base64'

import { TailwindElement } from '@/shared/tailwind-element'
import { customClassMap } from '@/shared/directives'

export type ProfileSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large'
type SizeDef = {
  identiconSize: number
  profileImageSize: number
  squareRounding: number
}

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

  sizes: Record<ProfileSize, SizeDef> = {
    'x-small': {
      identiconSize: 12,
      profileImageSize: 24,
      squareRounding: 2,
    },
    small: {
      identiconSize: 16,
      profileImageSize: 40,
      squareRounding: 4,
    },
    medium: {
      identiconSize: 20,
      profileImageSize: 56,
      squareRounding: 8,
    },
    large: {
      identiconSize: 24,
      profileImageSize: 80,
      squareRounding: 10,
    },
    'x-large': {
      identiconSize: 28,
      profileImageSize: 96,
      squareRounding: 12,
    },
  }

  private profileImageSize() {
    return this.sizes[this.size].profileImageSize
  }

  private identiconSize() {
    return this.sizes[this.size].identiconSize
  }

  private squareRoundingSize() {
    return this.sizes[this.size].squareRounding
  }

  private defaultProfileUrl = '/assets/images/profile-default.svg'

  private identicon() {
    return this.hasIdenticon && this.profileAddress && this.identiconSize()
      ? makeBlockie(this.profileAddress)
      : ''
  }

  render() {
    return html`
      <div
        data-testid="profile"
        style=${styleMap({
          backgroundImage: `url(${this.defaultProfileUrl})`,
          width: `${this.profileImageSize()}px`,
          height: `${this.profileImageSize()}px`,
          borderRadius: `${
            this.isSquare ? this.squareRoundingSize() + 'px' : '50%'
          }`,
        })}
        class="bg-[50%] bg-no-repeat bg-cover bg-neutral-90
          outline outline-2 outline-neutral-100"
      >
        <div
          style=${styleMap({
            backgroundImage: `url(${this.profileUrl})`,
            width: `${this.profileImageSize()}px`,
            height: `${this.profileImageSize()}px`,
            borderRadius: `${
              this.isSquare ? this.squareRoundingSize() + 'px' : '50%'
            }`,
          })}
          class="bg-[50%] bg-no-repeat bg-cover relative
          "
        >
          ${this.identicon()
            ? html`<img
                src=${this.identicon()}
                class="absolute shadow-shadow-1xl rounded-full
                  outline outline-neutral-100 right-0 bottom-0 ${customClassMap(
                  {
                    'outline-2': this.identiconSize() >= 16,
                    'outline-1': this.identiconSize() < 16,
                  }
                )}"
                style=${styleMap({
                  width: `${this.identiconSize()}px`,
                  height: `${this.identiconSize()}px`,
                })}
              />`
            : ''}
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-profile': LuksoProfile
  }
}
