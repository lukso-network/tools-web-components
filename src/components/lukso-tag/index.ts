import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'

import { TailwindElement } from '@/shared/tailwind-element'
import { customClassMap } from '@/shared/directives'

export type TagSizes = 'small' | 'large'

@customElement('lukso-tag')
export class LuksoTag extends TailwindElement {
  @property({ type: String })
  size: TagSizes = 'small'

  @property({ type: Boolean, attribute: 'is-rounded' })
  isRounded = false

  @property({ type: String, attribute: 'background-color' })
  backgroundColor = ''

  @property({ type: String, attribute: 'text-color' })
  textColor = ''

  private defaultStyles = `inline-flex items-center justify-center border border-neutral-20 text-neutral-20`
  private smallStyles = `paragraph-12-medium h-[28px]`
  private largeStyles = `paragraph-14-medium h-[34px]`

  private padding() {
    if (this.size === 'small' && this.isRounded) {
      return 'px-3'
    }

    if (this.size === 'large') {
      return 'px-4'
    }

    return 'px-2'
  }

  render() {
    return html`
      <div
        data-testid="tag"
        class=${customClassMap({
          [this.defaultStyles]: true,
          [this.padding()]: true,
          ['rounded-[56px]']: this.isRounded,
          ['rounded-lg']: !this.isRounded,
          [this.smallStyles]: this.size === 'small',
          [this.largeStyles]: this.size === 'large',
        })}
        style=${styleMap({
          backgroundColor: `var(--${this.backgroundColor})`,
          borderColor: `var(--${this.backgroundColor})`,
          color: `var(--${this.textColor})`,
        })}
      >
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-tag': LuksoTag
  }
}
