import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import { IconOptions } from '@/components/lukso-icon/index.js'

export const smartContract = (options: IconOptions) => {
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
      d="M9 3H7.69231C6.03545 3 4.69231 4.34315 4.69231 6V9.18833C4.69231 9.53715 4.51055 9.86076 4.21268 10.0423L1.70067 11.573C1.38092 11.7679 1.38092 12.2321 1.70067 12.427L4.21268 13.9577C4.51055 14.1392 4.69231 14.4628 4.69231 14.8117V18C4.69231 19.6569 6.03545 21 7.69231 21H9"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
    <path
      d="M15 3H16.3077C17.9645 3 19.3077 4.34315 19.3077 6V9.18833C19.3077 9.53715 19.4895 9.86076 19.7873 10.0423L22.2993 11.573C22.6191 11.7679 22.6191 12.2321 22.2993 12.427L19.7873 13.9577C19.4895 14.1392 19.3077 14.4628 19.3077 14.8117V18C19.3077 19.6569 17.9645 21 16.3077 21H15"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
  </svg> `
}
