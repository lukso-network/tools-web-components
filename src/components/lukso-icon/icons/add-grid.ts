import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const addGrid = (options: IconOptions) => {
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
    <mask id="path-1-inside-1_5249_57947" fill="white">
      <rect x="2" y="2" width="8.57143" height="8.57143" rx="1.42857" />
    </mask>
    <rect
      x="2"
      y="2"
      width="8.57143"
      height="8.57143"
      rx="1.42857"
      stroke="var(--${options.color})"
      stroke-width="3"
      mask="url(#path-1-inside-1_5249_57947)"
    />
    <mask id="path-2-inside-2_5249_57947" fill="white">
      <rect x="2" y="13.4286" width="8.57143" height="8.57143" rx="1.42857" />
    </mask>
    <rect
      x="2"
      y="13.4286"
      width="8.57143"
      height="8.57143"
      rx="1.42857"
      stroke="var(--${options.color})"
      stroke-width="3"
      mask="url(#path-2-inside-2_5249_57947)"
    />
    <path
      d="M13.9051 6.88188H21.5242C21.8508 6.88188 22.1204 6.61228 22.1204 6.2857C22.1204 5.95912 21.8508 5.68952 21.5242 5.68952H13.9051C13.5786 5.68952 13.309 5.95912 13.309 6.2857C13.309 6.61228 13.5786 6.88188 13.9051 6.88188Z"
      fill="var(--${options.color})"
      stroke="var(--${options.color})"
      stroke-width="0.23997"
    />
    <path
      d="M17.1193 10.0952C17.1193 10.4218 17.3889 10.6914 17.7154 10.6914C18.042 10.6914 18.3116 10.4218 18.3116 10.0952V2.47619C18.3116 2.14961 18.042 1.88001 17.7154 1.88001C17.3889 1.88001 17.1193 2.14961 17.1193 2.47619V10.0952Z"
      fill="var(--${options.color})"
      stroke="var(--${options.color})"
      stroke-width="0.23997"
    />
    <mask id="path-5-inside-3_5249_57947" fill="white">
      <rect
        x="13.4282"
        y="13.4286"
        width="8.57143"
        height="8.57143"
        rx="1.42857"
      />
    </mask>
    <rect
      x="13.4282"
      y="13.4286"
      width="8.57143"
      height="8.57143"
      rx="1.42857"
      stroke="var(--${options.color})"
      stroke-width="3"
      mask="url(#path-5-inside-3_5249_57947)"
    />
  </svg> `
}
