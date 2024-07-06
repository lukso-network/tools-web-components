import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const logoFacebook = (options: IconOptions) => {
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
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M22.5 12.064c0-5.799-4.702-10.5-10.5-10.5S1.5 6.264 1.5 12.063c0 5.24 3.84 9.584 8.86 10.372V15.1H7.692v-3.036h2.666V9.75c0-2.63 1.568-4.085 3.967-4.085 1.148 0 2.35.205 2.35.205v2.584h-1.324c-1.304 0-1.712.81-1.712 1.64v1.97h2.912l-.465 3.036H13.64v7.337c5.02-.788 8.859-5.132 8.859-10.374"
      fill="#0866FF"
    />
  </svg> `
}
