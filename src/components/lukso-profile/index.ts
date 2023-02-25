import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import makeBlockie from 'ethereum-blockies-base64'

import { TailwindElement } from '@/shared/tailwind-element'

export type ProfileSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large'
type SizeDef = { identiconSize?: number; profileImageSize: number }

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

  sizes: Record<ProfileSize, SizeDef> = {
    'x-small': {
      identiconSize: undefined,
      profileImageSize: 24,
    },
    small: {
      identiconSize: 16,
      profileImageSize: 40,
    },
    medium: {
      identiconSize: 20,
      profileImageSize: 56,
    },
    large: {
      identiconSize: 24,
      profileImageSize: 80,
    },
    'x-large': {
      identiconSize: 28,
      profileImageSize: 96,
    },
  }

  private profileImageSize() {
    return this.sizes[this.size].profileImageSize
  }

  private identiconSize() {
    return this.sizes[this.size].identiconSize
  }

  private defaultProfileUrl = '/assets/images/profile-default.png'

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
        })}
        class="rounded-full bg-[50%] bg-no-repeat bg-cover bg-neutral-90
          outline outline-2 outline-neutral-100"
      >
        <div
          style=${styleMap({
            backgroundImage: `url(${this.profileUrl})`,
            width: `${this.profileImageSize()}px`,
            height: `${this.profileImageSize()}px`,
          })}
          class="rounded-full bg-[50%] bg-no-repeat bg-cover relative
          "
        >
          ${this.identicon()
            ? html`<img
                src=${this.identicon()}
                class="absolute shadow-shadow-1xl rounded-full
                  outline outline-2 outline-neutral-100 right-0 bottom-0"
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
