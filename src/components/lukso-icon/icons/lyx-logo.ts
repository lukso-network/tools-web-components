import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'
import { IconOptions } from '@/components/lukso-icon/index.js'

export const lyxLogo = (options: IconOptions) => {
  return html`<svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style=${styleMap({
      width: `${options.width}px`,
      height: `${options.height}px`,
    })}
  >
    <path
      d="M14.3403 11.6628L8.00011 15.3197L1.65991 11.6628V4.34986L8.00011 0.692931L14.3403 4.34986V11.6628Z"
      stroke="#ACC2D2"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.00562 8.00621L9.93645 11.4421L11.8938 7.99763L9.93645 4.57031L8.00562 8.00621Z"
      fill="#BDCEDB"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.10498 8.01136L6.07355 11.4423H9.93735L8.00652 8.00635L4.10498 8.01136Z"
      fill="#ACC2D2"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.10498 8.01123C4.29293 8.01123 8.00652 8.00621 8.00652 8.00621L9.93735 4.57031L6.07355 4.57532L4.10498 8.01123Z"
      fill="#DEE7ED"
    />
  </svg> `
}
