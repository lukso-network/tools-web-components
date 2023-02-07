import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'
import { IconOptions } from '@/components/lukso-icon/index.js'

export const link = (options: IconOptions) => {
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
    <g
      stroke="var(--${options.color})"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="${options.strokeWidth}"
    >
      <path
        d="m9.75 16.5h-3c-1.19347 0-2.33807-.4741-3.18198-1.318s-1.31802-1.9885-1.31802-3.182.47411-2.33807 1.31802-3.18198 1.98851-1.31802 3.18198-1.31802h3"
      />
      <path
        d="m14.25 7.5h3c1.1935 0 2.3381.47411 3.182 1.31802s1.318 1.98848 1.318 3.18198-.4741 2.3381-1.318 3.182-1.9885 1.318-3.182 1.318h-3"
      />
      <path d="m7.6543 12h8.7853" />
    </g>
  </svg> `
}
