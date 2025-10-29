import { html, type PropertyValues, type TemplateResult } from 'lit'
import { safeCustomElement } from '@/shared/safe-custom-element'
import { customElement, property, state } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.scss?inline'

import '@/components/lukso-icon'
import '@/components/lukso-button'

import type { ButtonVariant } from '@/components/lukso-button'
import type { InputSize } from '@/shared/types'

export type PaginationVariant = ButtonVariant

type Pagination = {
  current: number
  prev: number | null
  next: number | null
  items: (string | number)[]
}

@safeCustomElement('lukso-pagination')
export class LuksoPagination extends TailwindStyledElement(style) {
  @property({ type: String })
  variant: ButtonVariant = 'primary'

  @property({ type: String })
  size: InputSize = 'small'

  @property({ type: Number, attribute: 'current-page' })
  currentPage = 1

  @property({ type: Number, attribute: 'total-pages' })
  totalPages = 0

  @property({ type: Boolean, attribute: 'is-mobile' })
  isMobile = false

  @state()
  private pagination: Pagination

  private styles = tv({
    slots: {
      wrapper: 'flex gap-2',
      ellipsis: 'items-center flex justify-center',
      numbers: '',
    },
    variants: {
      size: {
        small: {
          ellipsis: 'min-w-6',
          numbers: 'min-w-6',
        },
        medium: {
          wrapper: 'paragraph-inter-16-semi-bold',
          ellipsis: 'min-w-8',
          numbers: 'min-w-8',
        },
        large: {
          wrapper: 'paragraph-inter-16-semi-bold',
          ellipsis: 'min-w-8',
          numbers: 'min-w-8',
        },
        'x-large': {},
      },
    },
  })

  willUpdate(changedProperties: PropertyValues<this>) {
    if (
      changedProperties.has('currentPage') ||
      changedProperties.has('totalPages')
    ) {
      this.pagination = this.paginate({
        current: this.currentPage,
        max: this.totalPages,
      })
    }
  }

  private paginate({ current, max }) {
    if (!current || !max) return null

    const prev = current === 1 ? null : current - 1
    const next = current === max ? null : current + 1
    const items: (string | number)[] = [1]

    if (current === 1 && max === 1) {
      return { current, prev, next, items }
    }

    // in mobile version we only show the current page
    if (this.isMobile) {
      return { current, prev, next, items: [current] }
    }

    if (current > 4) {
      items.push('...')
    }

    const r = 2
    const r1 = current - r
    const r2 = current + r

    for (let i = Math.max(r1, 2); i <= Math.min(max, r2); i++) {
      items.push(i)
    }

    if (r2 + 1 < max) {
      items.push('...')
    }

    if (r2 < max) {
      items.push(max)
    }

    return { current, prev, next, items }
  }

  private async pageChangeEvent() {
    await this.updateComplete
    const pageChangeEvent = new CustomEvent('on-page-change', {
      detail: {
        value: this.pagination.current,
        event,
      },
      bubbles: false,
      composed: true,
    })
    this.dispatchEvent(pageChangeEvent)
  }

  private async handleNextPage() {
    this.currentPage = this.pagination.next
    await this.pageChangeEvent()
  }

  private async handlePrevPage() {
    this.currentPage = this.pagination.prev
    await this.pageChangeEvent()
  }

  private async handlePageChange(page: number) {
    this.currentPage = page
    await this.pageChangeEvent()
  }

  private iconColor() {
    const whiteVariants = ['primary', 'landing']
    return whiteVariants.includes(this.variant) ? 'neutral-100' : 'neutral-20'
  }

  private iconSize() {
    return this.size === 'small' ? 'medium' : 'large'
  }

  prevPageTemplate() {
    return html`<lukso-button
      size=${this.size}
      variant=${this.variant}
      is-icon
      ?disabled=${this.pagination.prev === null}
      @click=${this.handlePrevPage}
    >
      <lukso-icon
        name="arrow-left-sm"
        size=${this.iconSize()}
        color=${this.iconColor()}
      ></lukso-icon>
    </lukso-button>`
  }

  nextPageTemplate() {
    return html`<lukso-button
      size=${this.size}
      variant=${this.variant}
      is-icon
      ?disabled=${this.pagination.next === null}
      @click=${this.handleNextPage}
    >
      <lukso-icon
        name="arrow-right-sm"
        size=${this.iconSize()}
        color=${this.iconColor()}
      ></lukso-icon>
    </lukso-button>`
  }

  numbersTemplate(ellipsisStyles: string, numbersStyles: string) {
    const numberTemplates: TemplateResult<1>[] = []

    for (const item of this.pagination.items) {
      if (item === '...') {
        numberTemplates.push(html` <div class=${ellipsisStyles}>...</div> `)
        continue
      }

      if (typeof item === 'number') {
        numberTemplates.push(
          html`<lukso-button
            size=${this.size}
            variant=${this.variant}
            ?disabled=${this.currentPage === item}
            is-full-width
            is-icon
            @click=${() => this.handlePageChange(item)}
          >
            <div class=${numbersStyles}>${item}</div>
          </lukso-button>`
        )
      }
    }

    return numberTemplates
  }

  render() {
    const { wrapper, ellipsis, numbers } = this.styles({
      size: this.size,
    })

    return html`
      <div class=${wrapper()}>
        ${this.prevPageTemplate()}
        ${this.numbersTemplate(ellipsis(), numbers())}
        ${this.nextPageTemplate()}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-pagination': LuksoPagination
  }
}
