import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import { IconOptions } from '@/components/lukso-icon/index.js'

export const warningTriangle = (options: IconOptions) => {
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
      d="M12.2165 2.875L21.7428 19.375C21.839 19.5417 21.7187 19.75 21.5263 19.75H2.47372C2.28127 19.75 2.16099 19.5417 2.25721 19.375L11.7835 2.875C11.8797 2.70833 12.1203 2.70833 12.2165 2.875Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
    <path
      d="M12 9L12 14"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle cx="12" cy="17" r="1" fill="var(--${options.color})" />
  </svg> `
}
