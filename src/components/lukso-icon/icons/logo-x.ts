import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import { IconOptions } from '@/components/lukso-icon/index.js'

export const logoX = (options: IconOptions) => {
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
      d="m2.05 2.599 7.757 10.37-7.805 8.433h1.757l6.833-7.382 5.522 7.382h5.978l-8.193-10.955L21.164 2.6h-1.756l-6.294 6.799-5.085-6.8zm2.584 1.294h2.747l12.127 16.215h-2.746z"
      fill="#243542"
    />
  </svg> `
}
