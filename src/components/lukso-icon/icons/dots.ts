import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'
import { IconOptions } from '@/components/lukso-icon/index.js'

export const dots = (options: IconOptions) => {
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
    <circle cx="12" cy="6" r="2" fill="var(--${options.color})" />
    <circle cx="12" cy="12" r="2" fill="var(--${options.color})" />
    <circle cx="12" cy="18" r="2" fill="var(--${options.color})" />
  </svg> `
}
