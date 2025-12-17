import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const stepProgress = (options: IconOptions) => {
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
      d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z"
      fill="#243542"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
    <path
      d="M18.25 12C18.25 13.2361 17.8834 14.4445 17.1967 15.4723C16.5099 16.5001 15.5338 17.3012 14.3918 17.7742C13.2497 18.2473 11.9931 18.3711 10.7807 18.1299C9.5683 17.8888 8.45466 17.2935 7.58058 16.4194C6.7065 15.5453 6.11125 14.4317 5.87009 13.2193C5.62893 12.0069 5.75271 10.7503 6.22575 9.60823C6.6988 8.46619 7.49988 7.49007 8.52769 6.80331C9.55549 6.11656 10.7639 5.75 12 5.75"
      stroke="var(--${options.secondaryColor})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
  </svg> `
}
