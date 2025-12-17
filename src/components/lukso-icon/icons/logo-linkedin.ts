import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const logoLinkedin = (options: IconOptions) => {
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
    <rect width="24" height="24" rx="12" fill="#0078B5" />
    <path
      d="M5.83397 9.75642H8.45389V18.1879H5.83397V9.75642ZM7.14491 5.56534C7.98273 5.56534 8.66285 6.24545 8.66285 7.08525C8.66285 7.92504 7.98273 8.60515 7.14491 8.60515C6.30512 8.60515 5.625 7.92504 5.625 7.08525C5.62303 6.24742 6.30315 5.56534 7.14491 5.56534Z"
      fill="white"
    />
    <path
      d="M10.098 9.7564H12.6115V10.9077H12.6469C12.9959 10.2453 13.8495 9.54547 15.1269 9.54547C17.7803 9.54547 18.2712 11.2921 18.2712 13.5611V18.1879H15.6513V14.0894C15.6513 13.1097 15.6335 11.8539 14.2891 11.8539C12.9249 11.8539 12.7159 12.9184 12.7159 14.0185V18.1898H10.098V9.7564Z"
      fill="white"
    />
  </svg> `
}
