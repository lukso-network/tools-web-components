import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const connections = (options: IconOptions) => {
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
    <clipPath id="a"><path d="m0 0h24v24h-24z" /></clipPath>
    <g
      clip-path="url(#a)"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    >
      <path
        d="m10.6667 3.33325 7.5 7.49995-3.8021 3.8021-.0522.0522c-2.071 2.071-5.42887 2.071-7.49993 0-2.07105-2.0711-2.07105-5.42892 0-7.49997l.05215-.05215z"
      />
      <path d="m16.3738 2.37378-3.3333 3.33331" stroke-linecap="round" />
      <path d="m19.126 5.12598-3.3333 3.33331" stroke-linecap="round" />
      <path
        d="m6.5 14.5c-3.15447 1.3519-2.64518 5.9728.72799 6.6052l4.77201.8948"
      />
    </g>
  </svg> `
}
