import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const tokenId = (options: IconOptions) => {
  return html`<svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style=${styleMap({
      width: `${options.width}px`,
      height: `${options.height}px`,
    })}
  >
    <path
      d="M21.25 17.1141L12 22.2531L2.75 17.1141V6.88576L12 1.74686L21.25 6.88576V17.1141Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
    <path
      d="M8.55542 7.5556L8.55542 16.4445"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
    <path
      d="M11.2222 16.4443V7.55542C11.2222 7.55542 12.5554 7.55563 13.6666 7.55553C14.7777 7.55542 16.5555 9.654 16.5555 11.9998C16.5555 14.3457 14.7777 16.4443 13.6666 16.4445C12.5554 16.4447 11.2222 16.4443 11.2222 16.4443Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linejoin="round"
    />
  </svg> `
}
