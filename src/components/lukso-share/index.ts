import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.scss?inline'

export type Provider =
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
  [key in Provider]: Url
}

@customElement('lukso-share')
export class LuksoShare extends TailwindStyledElement(style) {
  @property({ type: String, attribute: 'custom-style' })
  customStyle = ''

  @property({ type: Array })
  providers: Provider[] = [
    'twitter',
    'instagram',
    'linkedin',
    'telegram',
    'discord',
    'reddit',
    'medium',
    'github',
  ]

  private urls: ProviderLinks = {
    twitter: 'https://twitter.com/lukso_io',
    instagram: 'https://www.instagram.com/lukso',
    linkedin: 'https://linkedin.com/company/lukso',
    telegram: 'https://t.me/LUKSO_News',
    discord: 'https://discord.gg/lukso',
    reddit: 'https://www.reddit.com/r/lukso',
    medium: 'https://medium.com/lukso',
    github: 'https://github.com/lukso-network',
  }

  linkTemplate(name: Provider, url: Url) {
    return html`<a
      href=${url}
      target="_blank"
      class="transition-all duration-300 rounded-full opacity-50 hover:opacity-80 hover:shadow-button-hover-primary h-7 w-7"
      ><img src="/assets/images/social-${name}.svg" alt=""
    /></a>`
  }

  render() {
    const linkTemplates = []

    for (const provider of Object.keys(this.urls) as Provider[]) {
      if (this.providers.includes(provider)) {
        linkTemplates.push(this.linkTemplate(provider, this.urls[provider]))
      }
    }

    return html`<div
      class="grid gap-2 grid-cols-[repeat(8,max-content)] sm:gap-4"
      style=${this.customStyle}
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
