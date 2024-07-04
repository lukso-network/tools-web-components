import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const completeFilledFadeIn = (options: IconOptions) => {
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
    class="animate-resize-in"
  >
    <path
      d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z"
      fill="var(--green-54)"
      stroke="var(--green-54)"
      stroke-width="${options.strokeWidth}"
    />
    <path
      d="M8 12.1429L10.8 15L16 10"
      stroke="var(--neutral-100)"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="opacity-0 animate-fade-in animation-delay-500 animation-fill-forwards"
    />
  </svg> `
}
