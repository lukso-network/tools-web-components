import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const smartContractDoc = (options: IconOptions) => {
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
      d="M10 8H9.38462C8.83233 8 8.38462 8.44772 8.38462 9V10.4887C8.38462 10.8098 8.23042 11.1114 7.97011 11.2994L7.56124 11.5947C7.2849 11.7942 7.2849 12.2058 7.56124 12.4053L7.97011 12.7006C8.23042 12.8886 8.38462 13.1902 8.38462 13.5113V15C8.38462 15.5523 8.83233 16 9.38462 16H10"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
    <path
      d="M14 8H14.6154C15.1677 8 15.6154 8.44772 15.6154 9V10.4887C15.6154 10.8098 15.7696 11.1114 16.0299 11.2994L16.4388 11.5947C16.7151 11.7942 16.7151 12.2058 16.4388 12.4053L16.0299 12.7006C15.7696 12.8886 15.6154 13.1902 15.6154 13.5113V15C15.6154 15.5523 15.1677 16 14.6154 16H14"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
    <rect
      x="3.25"
      y="1.25"
      width="17.5"
      height="21.5"
      rx="2.75"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
  </svg> `
}
