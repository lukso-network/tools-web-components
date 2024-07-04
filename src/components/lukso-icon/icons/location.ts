import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const location = (options: IconOptions) => {
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
      d="M12.0001 3C7.97775 3 4.71436 6.67519 4.71436 9.65073C4.71436 14.3338 10.2338 17.241 11.355 19.7446C11.429 19.8237 11.526 19.8881 11.6382 19.9325C11.7503 19.9769 11.8743 20 12.0001 20C12.1259 20 12.2499 19.9769 12.362 19.9325C12.4741 19.8881 12.5711 19.8237 12.6452 19.7446C13.7663 17.2417 19.2858 14.3365 19.2858 9.65073C19.2858 6.67519 16.0224 3 12.0001 3Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.0002 10.2857C12.8943 10.2857 13.6192 9.56083 13.6192 8.66666C13.6192 7.77248 12.8943 7.04761 12.0002 7.04761C11.106 7.04761 10.3811 7.77248 10.3811 8.66666C10.3811 9.56083 11.106 10.2857 12.0002 10.2857Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `
}
