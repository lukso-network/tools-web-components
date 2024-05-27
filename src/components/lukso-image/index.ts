import { type PropertyValues, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import { tv } from 'tailwind-variants'

import { TailwindElement } from '@/shared/tailwind-element'

@customElement('lukso-image')
export class LuksoImage extends TailwindElement {
  @property({ type: String })
  src = ''

  @property({ type: String })
  placeholder = ''

  @state()
  isLoading = true

  @state()
  resolvedPlaceholder = ''

  @state()
  hasError = false

  private handleLoad() {
    this.isLoading = false
    this.hasError = false
  }

  private handleError() {
    this.isLoading = false
    this.hasError = true
  }

  async willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('hasError')) {
      if (this.hasError) {
        this.resolvedPlaceholder = this.placeholder
      } else {
        this.resolvedPlaceholder = ''
      }

      await this.updateComplete
    }
  }

  private imageStyles = tv({
    slots: {
      wrapper: 'size-full bg-neutral-100',
      placeholder:
        'bg-[50%] bg-no-repeat bg-cover bg-neutral-90 relative size-full',
      image: 'object-cover opacity-0 size-full',
    },
    variants: {
      isLoading: {
        true: {},
      },
      hasError: {
        true: {},
      },
    },
    compoundVariants: [
      {
        isLoading: false,
        hasError: false,
        class: {
          image: 'animate-fade-in animation-fill-forwards',
        },
      },
      {
        isLoading: true,
        hasError: false,
        class: {
          placeholder: 'animate-pulse',
        },
      },
      {
        isLoading: false,
        hasError: true,
        class: {
          image: 'opacity-0',
        },
      },
    ],
  })

  render() {
    const { wrapper, placeholder, image } = this.imageStyles({
      isLoading: this.isLoading,
      hasError: this.hasError,
    })

    return html`
      <div class=${wrapper()}>
        <div
          class=${placeholder()}
          style=${styleMap({
            backgroundImage: `url('${this.resolvedPlaceholder}')`,
          })}
        >
          <img
            src=${this.src}
            class=${image()}
            loading="lazy"
            @load=${this.handleLoad}
            @error=${this.handleError}
          />
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-image': LuksoImage
  }
}
