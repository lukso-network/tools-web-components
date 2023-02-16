import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import { IconOptions } from '@/components/lukso-icon/index.js'

export const pulseDot = (options: IconOptions) => {
  return html`<div
    style=${styleMap({
      width: `${options.width}px`,
      height: `${options.height}px`,
    })}
    class="flex items-center justify-center text-16"
  >
    <div
      class="w-[83.3%] h-[83.3%] rounded-full flex items-center justify-center bg-neutral-90"
    >
      <div
        class="w-[60%] h-[60%] rounded-full animate-pulse-resize bg-green-54"
      ></div>
    </div>
  </div>`
}
