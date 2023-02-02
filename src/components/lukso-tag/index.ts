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

  private defaultStyles = `rounded-lg inline-flex items-center justify-center border border-neutral-20 text-neutral-20`
  private smallStyles = `paragraph-12-medium h-[28px] px-2`
  private largeStyles = `paragraph-14-medium h-[34px] px-4`
  private roundedStyles = `rounded-[56px]`

  render() {
    return html`
      <div
        data-testid="tag"
        class=${customClassMap({
          [this.defaultStyles]: true,
          [this.smallStyles]: this.size === 'small',
          [this.largeStyles]: this.size === 'large',
          [this.roundedStyles]: this.isRounded,
        })}
        style=${styleMap({
          backgroundColor: this.backgroundColor,
          borderColor: this.backgroundColor,
          color: this.textColor,
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
