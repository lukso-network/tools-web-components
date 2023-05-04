import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.scss?inline'
import { customClassMap } from '@/shared/directives'

@customElement('lukso-share')
export class LuksoShare extends TailwindStyledElement(style) {
  @property({ type: String, attribute: 'custom-class' })
  customClass = ''

  private urls = {
    twitter: 'https://twitter.com/lukso_io',
    instagram: 'https://www.instagram.com/lukso',
    linkedin: 'https://linkedin.com/company/lukso',
    telegram: 'https://t.me/lukso',
    discord: 'https://discord.gg/lukso',
    reddit: 'https://www.reddit.com/r/lukso',
    medium: 'https://medium.com/lukso',
    github: 'https://github.com/lukso-network',
  }

  linkTemplate(name: string, url: string) {
    return html`<a
      href=${url}
      target="_blank"
      class="transition-all duration-300 rounded-full hover:opacity-80 hover:shadow-button-hover-primary"
      ><img src="/assets/images/social-${name}.svg" alt=""
    /></a>`
  }

  render() {
    const linkTemplates = []
    for (const i of Object.keys(this.urls)) {
      linkTemplates.push(this.linkTemplate(i, this.urls[i]))
    }

    return html`<div
      class="grid gap-4 grid-cols-[repeat(4,max-content)] sm:grid-cols-[repeat(8,max-content)] ${customClassMap(
        {
          [this.customClass]: !!this.customClass,
        }
      )}"
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
