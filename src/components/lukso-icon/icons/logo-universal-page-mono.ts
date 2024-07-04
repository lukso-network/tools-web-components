import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const logoUniversalPageMono = (options: IconOptions) => {
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
    <rect width="24" height="24" fill="url(#pattern0_3223_11875)" />
    <defs>
      <pattern
        id="pattern0_3223_11875"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlink:href="#image0_3223_11875" transform="scale(0.015625)" />
      </pattern>
      <image
        id="image0_3223_11875"
        width="64"
        height="64"
        xlink:href="data:image/png;base64,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"
      />
    </defs>
  </svg> `
}
