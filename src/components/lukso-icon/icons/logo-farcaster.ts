import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const logoFarcaster = (options: IconOptions) => {
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
    <rect width="24" height="24" rx="12" fill="#855DCD" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.45884 19.4798H4.22042V18.9072C4.22042 18.6437 4.43408 18.43 4.69761 18.43H4.79304V17.8574C4.79304 17.5939 5.00667 17.3803 5.2702 17.3803V8.8866H4.74532L4.125 6.78704H6.89259V4.6875H17.2949V6.78704H20.0625L19.4422 8.8866H18.9173V17.3803C19.1808 17.3803 19.3945 17.5939 19.3945 17.8574V18.43H19.4899C19.7534 18.43 19.9671 18.6437 19.9671 18.9072V19.4798H14.7345V18.9072C14.7345 18.6437 14.9482 18.43 15.2117 18.43H15.3072V17.8574C15.3072 17.5994 15.512 17.3891 15.768 17.3805V12.704C15.5992 10.8313 14.0104 9.36376 12.0937 9.36376C10.1771 9.36376 8.58831 10.8313 8.41954 12.704V17.3804C8.67822 17.3859 8.88622 17.5974 8.88622 17.8574V18.1437V18.43H8.98165C9.24518 18.43 9.45884 18.6437 9.45884 18.9072V19.4798Z"
      fill="white"
    />
  </svg> `
}
