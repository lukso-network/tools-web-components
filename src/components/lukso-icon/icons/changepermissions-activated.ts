import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const changepermissionsActivated = (options: IconOptions) => {
  return html`<svg
    width="24"
    height="24"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style=${styleMap({
      width: `${options.width}px`,
      height: `${options.height}px`,
    })}
  >
    <rect width="40" height="40" rx="12" fill="#F69E82" />
    <g id="Group 207" transform="translate(8, 8)">
      <g id="Rectangle 125" filter="url(#filter0_bi_771_327)">
        <rect width="24" height="24" rx="8" fill="white" fill-opacity="0.3" />
      </g>
      <g id="Group 205">
        <g id="Rectangle 124" filter="url(#filter1_b_771_327)">
          <rect x="4" y="6" width="14" height="2.5" rx="1.25" fill="#EB7F5D" />
        </g>
        <g id="Ellipse 31" filter="url(#filter2_b_771_327)">
          <circle
            cx="17.25"
            cy="7.25"
            r="3.25"
            fill="white"
            fill-opacity="0.7"
          />
          <circle
            cx="17.25"
            cy="7.25"
            r="3"
            stroke="white"
            stroke-opacity="0.7"
            stroke-width="0.5"
          />
        </g>
      </g>
      <g id="Group 206">
        <g id="Rectangle 124_2" filter="url(#filter3_b_771_327)">
          <rect x="6" y="15" width="14" height="2.5" rx="1.25" fill="#EB7F5D" />
        </g>
        <g id="Ellipse 31_2" filter="url(#filter4_b_771_327)">
          <circle
            cx="6.75"
            cy="16.25"
            r="3.25"
            fill="white"
            fill-opacity="0.7"
          />
          <circle
            cx="6.75"
            cy="16.25"
            r="3"
            stroke="white"
            stroke-opacity="0.7"
            stroke-width="0.5"
          />
        </g>
      </g>
    </g>
  </svg>`
}
