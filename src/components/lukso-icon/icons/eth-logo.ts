import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const ethLogo = (options: IconOptions) => {
  return html`<svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style=${styleMap({
      width: `${options.width}px`,
      height: `${options.height}px`,
    })}
  >
    <path
      d="M20.794 20.543a11.78 11.78 0 0 1-8.525 3.455 11.54 11.54 0 0 1-8.46-3.455 11.5 11.5 0 0 1-3.466-8.475q0-5.173 3.465-8.62a11.55 11.55 0 0 1 8.46-3.446 11.76 11.76 0 0 1 8.526 3.446q3.545 3.447 3.545 8.62a11.38 11.38 0 0 1-3.545 8.475"
      fill="#C8C8C8"
    />
    <path d="m12.341 3.771-4.8 8.18 4.8-2.241z" fill="#8B8B8B" />
    <path d="m12.341 9.71-4.8 2.241 4.8 2.912z" fill="#393939" />
    <path d="M12.34 3.771V9.71l4.796 2.241z" fill="#343434" />
    <path d="M12.34 9.71v5.153l4.796-2.912z" fill="#161616" />
    <path d="m7.541 12.885 4.8 6.947V15.8z" fill="#8B8B8B" />
    <path d="m17.14 12.885-4.8 2.914v4.033z" fill="#343434" />
  </svg> `
}
