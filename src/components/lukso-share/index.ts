import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.scss?inline'

export type ProviderName =
  | 'twitter'
  | 'instagram'
  | 'linkedin'
  | 'telegram'
  | 'discord'
  | 'reddit'
  | 'medium'
  | 'github'

export type Url = `https://${string}`

export type ProviderLinks = {
  [key in ProviderName]: Url
}

export type ProviderObject = {
  name: ProviderName
  url: Url
}

@customElement('lukso-share')
export class LuksoShare extends TailwindStyledElement(style) {
  @property({ type: String, attribute: 'custom-style' })
  customStyle = ''

  @property({ type: Array })
  providers: ProviderName[] | ProviderObject[] = [
    'twitter',
    'instagram',
    'linkedin',
    'telegram',
    'discord',
    'reddit',
    'medium',
    'github',
  ]

  private defaultProviderLinks: ProviderLinks = {
    twitter: 'https://twitter.com/ERC725Account',
    instagram: 'https://www.instagram.com/lukso',
    linkedin: 'https://linkedin.com/company/lukso',
    telegram: 'https://t.me/LUKSO_News',
    discord: 'https://discord.gg/lukso',
    reddit: 'https://www.reddit.com/r/lukso',
    medium: 'https://medium.com/lukso',
    github: 'https://github.com/lukso-network',
  }

  linkTemplate(name: ProviderName, url: Url) {
    return html`<a
      href=${url}
      target="_blank"
      class="transition-all duration-300 rounded-full opacity-50 hover:opacity-80 hover:shadow-button-hover-primary h-7 w-7"
      ><img src="/assets/images/social-${name}.svg" alt=""
    /></a>`
  }

  render() {
    const linkTemplates = []

    for (const provider of this.providers) {
      if (typeof provider === 'string') {
        linkTemplates.push(
          this.linkTemplate(provider, this.defaultProviderLinks[provider])
        )
      } else {
        linkTemplates.push(this.linkTemplate(provider.name, provider.url))
      }
    }

    return html`<div
      class="grid gap-2 sm:gap-4"
      style="grid-template-columns: repeat(${this.providers
        .length}, max-content); ${this.customStyle}"
    >
      ${linkTemplates}
    </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-share': LuksoShare
  }
}
