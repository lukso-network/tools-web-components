import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import { IconOptions } from '@/components/lukso-icon/index.js'

export const filter = (options: IconOptions) => {
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
      d="M11.9998 7H19.9998"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M3.99976 17H11.9998"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7.94461 8.94461C9.01846 7.87076 9.01846 6.12924 7.94461 5.05539C6.87076 3.98154 5.12924 3.98154 4.05539 5.05539C2.98154 6.12924 2.98154 7.87076 4.05539 8.94461C5.12924 10.0185 6.87076 10.0185 7.94461 8.94461Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
    <path
      d="M19.9446 18.9446C21.0185 17.8708 21.0185 16.1292 19.9446 15.0554C18.8708 13.9815 17.1292 13.9815 16.0554 15.0554C14.9815 16.1292 14.9815 17.8708 16.0554 18.9446C17.1292 20.0185 18.8708 20.0185 19.9446 18.9446Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
  </svg> `
}
