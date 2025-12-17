import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const link3 = (options: IconOptions) => {
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
      d="M12 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7C5.34315 4 4 5.34315 4 7V17.5858C4 18.4767 5.07714 18.9229 5.70711 18.2929L13.5 10.5"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
    <path
      d="M13.9999 14C13.9999 12.1776 14 10 14 10H10"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `
}
