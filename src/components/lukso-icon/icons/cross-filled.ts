import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import { IconOptions } from '@/components/lukso-icon/index.js'

export const crossFilled = (options: IconOptions) => {
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
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      fill="var(--${options.color})"
    />
    <path
      d="M8 16.0001L16.0002 7.99995"
      stroke="var(--${options.secondaryColor})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8 8L16.0002 16.0002"
      stroke="var(--${options.secondaryColor})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `
}
