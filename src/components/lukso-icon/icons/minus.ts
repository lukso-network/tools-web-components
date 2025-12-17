import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const minus = (options: IconOptions) => {
  return html`<svg width="24" height="24" viewBox="0 0 24 24" style=${styleMap({
    width: `${options.width}px`,
    height: `${options.height}px`,
  })} fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.417 12.75h-12c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h12c.41 0 .75.34.75.75s-.34.75-.75.75" fill="var(--${
    options.color
  })"></svg>`
}
