import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'
import { IconOptions } from '@/components/lukso-icon/index.js'

export const edit = (options: IconOptions) => {
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
      d="M9.20522 17.4916L18.5695 8.12731C18.9601 7.73679 18.9601 7.10362 18.5695 6.7131L16.5635 4.70704C16.173 4.31652 15.5398 4.31652 15.1493 4.70704L5.78495 14.0714C5.64561 14.2107 5.55055 14.3881 5.51169 14.5813L5.00661 17.0924C4.86572 17.7929 5.48368 18.4109 6.18417 18.27L8.6953 17.7649C8.88848 17.726 9.06588 17.631 9.20522 17.4916Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
    <path
      d="M13.2913 6.28015L16.7115 9.70042"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
  </svg> `
}
