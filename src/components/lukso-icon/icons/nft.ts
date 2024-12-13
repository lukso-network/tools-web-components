import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const nft = (options: IconOptions) => {
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
      d="M21.0799 8.58003V15.42C21.0799 16.54 20.4799 17.58 19.5099 18.15L13.5699 21.58C12.5999 22.14 11.3999 22.14 10.4199 21.58L4.47991 18.15C3.50991 17.59 2.90991 16.55 2.90991 15.42V8.58003C2.90991 7.46003 3.50991 6.41999 4.47991 5.84999L10.4199 2.42C11.3899 1.86 12.5899 1.86 13.5699 2.42L19.5099 5.84999C20.4799 6.41999 21.0799 7.45003 21.0799 8.58003Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.71804 9.90909V15H8.67401L6.64808 12.0618H6.61577V15H5.3853V9.90909H6.44425L8.4478 12.8423H8.49006V9.90909H9.71804ZM10.4917 15V9.90909H13.9669V10.9084H11.7222V11.9524H13.7456V12.9542H11.7222V15H10.4917ZM14.4199 10.9084V9.90909H18.7228V10.9084H17.1792V15H15.9661V10.9084H14.4199Z"
      fill="var(--${options.color})"
    />
  </svg> `
}
