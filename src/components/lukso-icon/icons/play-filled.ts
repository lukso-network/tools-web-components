import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const playFilled = (options: IconOptions) => {
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
      d="M7.11732 7.23208C7.11732 6.46228 7.95065 5.98115 8.61732 6.36605L16.1173 10.6962C16.784 11.0811 16.784 12.0433 16.1173 12.4282L8.61732 16.7584C7.95065 17.1433 7.11732 16.6621 7.11732 15.8923L7.11732 7.23208Z"
      fill="var(--${options.color})"
    />
  </svg> `
}
