import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const pin = (options: IconOptions) => {
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
      d="M7.99995 4.61538C7.99995 4.27552 8.27547 4 8.61533 4H8.99995H15H15.3846C15.7244 4 16 4.27552 16 4.61538C16 4.95525 15.7244 5.23076 15.3846 5.23076H15V12L17.1464 14.1464C17.4614 14.4614 17.2383 15 16.7928 15H12.6665V19.3333C12.6665 19.7015 12.3681 20 11.9999 20C11.6317 20 11.3332 19.7015 11.3332 19.3333V15H7.20706C6.7616 15 6.53852 14.4614 6.8535 14.1464L8.99995 12V5.23076H8.61533C8.27547 5.23076 7.99995 4.95525 7.99995 4.61538Z"
      fill="var(--${options.color})"
    />
  </svg> `
}
