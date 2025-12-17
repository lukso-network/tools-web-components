import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const globe = (options: IconOptions) => {
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
    <g clip-path="url(#clip0_455_4588)">
      <path
        d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z"
        stroke="var(--${options.color})"
        stroke-width="${options.strokeWidth}"
      />
      <path
        d="M12 3L12 21"
        stroke="var(--${options.color})"
        stroke-width="${options.strokeWidth}"
      />
      <path
        d="M21 12L3 12"
        stroke="var(--${options.color})"
        stroke-width="${options.strokeWidth}"
      />
      <path
        d="M12 3V3C5.44859 7.21162 5.44859 16.7884 12 21V21"
        stroke="var(--${options.color})"
        stroke-width="${options.strokeWidth}"
      />
      <path
        d="M12 3V3C18.5514 7.21162 18.5514 16.7884 12 21V21"
        stroke="var(--${options.color})"
        stroke-width="${options.strokeWidth}"
      />
      <path
        d="M5 18.5V18.5C8.70577 14.2648 15.2942 14.2648 19 18.5V18.5"
        stroke="var(--${options.color})"
        stroke-width="${options.strokeWidth}"
      />
      <path
        d="M5 5.5V5.5C8.70577 9.73517 15.2942 9.73517 19 5.5V5.5"
        stroke="var(--${options.color})"
        stroke-width="${options.strokeWidth}"
      />
    </g>
    <defs>
      <clipPath id="clip0_455_4588">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg> `
}
