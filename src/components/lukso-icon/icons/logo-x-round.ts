import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const logoXround = (options: IconOptions) => {
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
      d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z"
      fill="var(--${options.color})"
    />
    <path
      d="M16.2156 5.4375H18.4236L13.5996 10.9515L19.275 18.4533H14.8314L11.3514 13.9029L7.3686 18.4533H5.1594L10.3194 12.5553L4.875 5.4381H9.4314L12.5772 9.5973L16.2156 5.4375ZM15.441 17.1321H16.6644L8.7666 6.6897H7.4538L15.441 17.1321Z"
      fill="white"
    />
  </svg> `
}
