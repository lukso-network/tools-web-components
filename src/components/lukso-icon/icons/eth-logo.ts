import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'
import { IconOptions } from '@/components/lukso-icon/index.js'

export const ethLogo = (options: IconOptions) => {
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
    <g clip-path="url(#clip0_1595_18810)">
      <path
        d="M7.99846 0L7.89111 0.364619V10.9441L7.99846 11.0512L12.9092 8.14837L7.99846 0Z"
        fill="#CDDAE4"
      />
      <path
        d="M7.99854 0L3.08765 8.14837L7.99854 11.0512V5.91619V0Z"
        fill="#CDDAE4"
      />
      <path
        d="M7.99849 11.9809L7.93799 12.0547V15.8232L7.99849 15.9998L12.9123 9.07959L7.99849 11.9809Z"
        fill="#ACC2D2"
      />
      <path
        d="M7.99854 15.9998V11.9809L3.08765 9.07959L7.99854 15.9998Z"
        fill="#ACC2D2"
      />
      <path
        d="M7.99854 11.0512L12.9093 8.14844L7.99854 5.91626V11.0512Z"
        fill="#BDCEDB"
      />
      <path
        d="M3.08765 8.14844L7.99854 11.0512V5.91626L3.08765 8.14844Z"
        fill="#BDCEDB"
      />
    </g>
    <defs>
      <clipPath id="clip0_1595_18810">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg> `
}
