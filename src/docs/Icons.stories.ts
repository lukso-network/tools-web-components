import { html } from 'lit'

import type { Meta, StoryObj } from '@storybook/web-components-vite'
import '../components/lukso-icon/index'

/**
 * Icons are used throughout the design system to provide visual cues and improve usability.
 * This showcase demonstrates the available icon set with consistent sizing and styling.
 *
 * ## Usage
 *
 * Icons can be used with the `lukso-icon` component:
 *
 * ```html
 * <lukso-icon name="icon-name" size="medium"></lukso-icon>
 * ```
 *
 * ## Available Sizes
 *
 * - `small` (16x16px)
 * - `medium` (24x24px)
 * - `large` (32x32px)
 * - `x-large` (40x40px)
 * - `2x-large` (64x64px)
 */
const meta: Meta = {
  title: 'Design System/Icons',
  parameters: {
    docs: {
      description: {
        component: `
Icons are used throughout the design system to provide visual cues and improve usability.
This showcase demonstrates the available icon set with consistent sizing and styling.

## Usage

Icons can be used with the \`lukso-icon\` component:

\`\`\`html
<lukso-icon name=\"icon-name\" size=\"medium\"></lukso-icon>
\`\`\`

## Available Sizes

- \`small\` (16x16px)
- \`medium\` (24x24px)
- \`large\` (32x32px)
- \`x-large\` (40x40px)
- \`2x-large\` (64x64px)
        `,
      },
    },
    controls: { hideNoControlsWarning: true },
  },
}

export default meta
type Story = StoryObj

// Helper function to create icon showcase items
const createIconSection = (
  iconData: (string | { name: string; secondaryColor?: string })[],
  title: string,
  description?: string
) => html`
  <div class="icon-section">
    <h3>${title}</h3>
    ${description
      ? html`<p
          style="margin-bottom: 2rem; color: #6b7280; font-size: 0.875rem;"
        >
          ${description}
        </p>`
      : ''}
    <div class="icon-grid">
      ${iconData.map(item => {
        const iconConfig = typeof item === 'string' ? { name: item } : item
        return html`
          <div class="icon-item">
            <lukso-icon
              name="${iconConfig.name}"
              size="medium"
              secondary-color="${iconConfig.secondaryColor || ''}"
            ></lukso-icon>
            <span class="icon-name">${iconConfig.name}</span>
            ${iconConfig.secondaryColor
              ? html`<span class="icon-secondary"
                  >secondary: ${iconConfig.secondaryColor}</span
                >`
              : ''}
          </div>
        `
      })}
    </div>
  </div>

  <style>
    .icon-section {
      margin-bottom: 2rem;
    }

    .icon-section h3 {
      margin-bottom: 1rem;
      font-weight: 600;
      font-size: 1.125rem;
      color: #374151;
    }

    .icon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      background: white;
      transition: all 0.2s ease;
    }

    .icon-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-color: #d1d5db;
    }

    .icon-name {
      margin-top: 0.5rem;
      font-size: 0.75rem;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      color: #6b7280;
      word-break: break-all;
    }

    .icon-secondary {
      margin-top: 0.25rem;
      font-size: 0.625rem;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      color: #9ca3af;
      font-style: italic;
    }
  </style>
`

/** Essential utility icons for common actions and navigation */
export const UtilityIcons: Story = {
  render: () => html`
    <div class="sb-unstyled">
      ${createIconSection(
        [
          'add-photo',
          'add-grid',
          'arrow-down-lg',
          'arrow-up-lg',
          'arrow-left-lg',
          'arrow-right-lg',
          'arrow-down-sm',
          'arrow-up-sm',
          'arrow-left-sm',
          'arrow-right-sm',
          'arrow-long-down',
          'barbell-outline',
          'bitcoin-convert',
          'bulb-outline',
          'camera',
          'category',
          'chart',
          'clipboard',
          'clock',
          'close-lg',
          'close-sm',
          'cloud',
          'code-outline',
          'compass-outline',
          { name: 'complete-filled', secondaryColor: 'neutral-100' },
          'complete-outline',
          'connect',
          'connections',
          'contract-lock',
          { name: 'contract-signed', secondaryColor: 'neutral-20' },
          'controller',
          'copy',
          { name: 'cross-filled', secondaryColor: 'neutral-100' },
          'cross-outline',
          'cube-outline',
          'database',
          'desktop-sharp',
          'document-code',
          'document-outline',
          'document-text',
          'dots',
          'earth',
          'edit',
          'edit-linear',
          'edit-doc',
          'empty-outline',
          'error',
          'expand',
          'extension',
          'extension-outline',
          'eye-hide',
          'eye-show',
          { name: 'face-id', secondaryColor: 'neutral-100' },
          'film-outline',
          'filter',
          'fingerprint',
          'fish-outline',
          'flag-outline',
          'flash',
          'flip',
          'gallery',
          'gas',
          'glasses',
          'globe',
          'hamburger',
          'hammer',
          'hand-right-outline',
          'hand-heart',
          'headset-outline',
          'hexagon',
          'image-linear',
          'infinite',
          'information',
          'key-outline',
          'link',
          'link-1',
          { name: 'link-2', secondaryColor: 'neutral-100' },
          'link-3',
          { name: 'link-4', secondaryColor: 'neutral-100' },
          'loading',
          'location',
          'locked',
          'login',
          'login-2',
          'login-3',
          'mail',
          'maximize-vertical',
          'medal-star',
          'menu-1',
          'menu-2',
          'migrate',
          'minimize',
          'minimize-vertical',
          'minus',
          'minus-filled',
          'network',
          'nft',
          'notifications',
          'parachute',
          'people',
          'phone-portrait-outline',
          'pin',
          'play-filled',
          'play-linear',
          'play-outline',
          'plus',
          'profile-add',
          'profile-circle',
          'profile-export',
          'profile-file',
          'profile-import',
          'profile-recovery',
          { name: 'profile-recovery-2', secondaryColor: 'neutral-100' },
          'profile-remove',
          'profile-restore',
          'profile-restore-no-setup',
          'profile',
          { name: 'qr-code', secondaryColor: 'neutral-100' },
          { name: 'qr-code-scan', secondaryColor: 'neutral-100' },
          'relayer',
          'reload',
          'return-down',
          'return-left',
          'return-right',
          'return-up',
          'row-vertical',
          'save-outline',
          'scan',
          'search',
          'settings',
          'share',
          'smart-contract-doc',
          'smart-contract',
          'spinner',
          'star-filled',
          'star-outline',
          { name: 'step-dot', secondaryColor: 'neutral-100' },
          { name: 'step-progress', secondaryColor: 'neutral-100' },
          'steps',
          'stop-linear',
          'switched',
          'tick',
          'timer-outline',
          'token-id',
          'transaction-receive',
          'transaction-send',
          'transfer',
          'transfer-send',
          'trash',
          'turn-down',
          'turn-left',
          'turn-right',
          'turn-up',
          'unlink',
          'unlocked',
          'user-circle-add',
          'wallet-restore',
          'wallet-outline',
          'warning-round',
          'warning-triangle',
          'video-outline',
        ],
        'Utility Icons'
      )}
    </div>
  `,
}

/** Colored icons with brand colors and unique styling */
export const ColoredIcons: Story = {
  render: () => html`
    <div class="sb-unstyled">
      ${createIconSection(
        [
          'logo-facebook',
          'google-color',
          'logo-fantom',
          'logo-polygon',
          'logo-x',
          'lyx-logo',
          'eth-logo',
          'lukso-logo',
          'metamask-logo',
          'progress-complete',
          'logo-linkedin',
          'logo-farcaster',
        ],
        'Colored Icons'
      )}
    </div>
  `,
}

/** Profile and user-related icons */
export const ProfileIcons: Story = {
  render: () => html`
    <div class="sb-unstyled">
      ${createIconSection(
        [
          'profile',
          'profile-add',
          'profile-circle',
          'profile-recovery',
          'profile-export',
          'profile-import',
          'people',
          'user-circle-add',
        ],
        'Profile Icons'
      )}
    </div>
  `,
}

/** Monochromatic icons including browser logos and social media logos that support secondary color customization */
export const MonochromaticIcons: Story = {
  render: () => html`
    <div class="sb-unstyled">
      ${createIconSection(
        [
          'logo-chrome',
          { name: 'logo-brave', secondaryColor: 'neutral-100' },
          'logo-edge',
          'logo-firefox',
          'logo-opera',
          'logo-safari',
          'logo-facebook-mono',
          'logo-x-mono',
          'logo-instagram-mono',
          'logo-medium-mono',
          'logo-discord-mono',
          'logo-snapchat-mono',
          'logo-whatsapp-mono',
          'logo-telegram-mono',
          'logo-linkedin-mono',
          'logo-github-mono',
          'logo-universal-page-mono',
          'logo-youtube-mono',
          'logo-elfsight-mono',
          'logo-warpcast-mono',
          'logo-soundcloud-mono',
          'logo-spotify-mono',
          'logo-google-calendar-mono',
          'logo-substack-mono',
        ],
        'Monochromatic Icons',
        'Single-color icons that can be customized with the color attribute. Some icons support secondary-color for additional customization.'
      )}
    </div>
  `,
}

/** Round icons for showcasing circular design elements */
export const RoundIcons: Story = {
  render: () => html`
    <div class="sb-unstyled">
      ${createIconSection(
        [
          'logo-facebook-round',
          'logo-farcaster-round',
          'logo-linkedin-round',
          'logo-x-round',
          'profile-circle',
          'user-circle-add',
          'warning-round',
        ],
        'Round Icons'
      )}
    </div>
  `,
}

/** Animated icons with built-in animations */
export const AnimatedIcons: Story = {
  render: () => html`
    <div class="sb-unstyled">
      ${createIconSection(
        [
          'progress-indicator',
          'progress-indicator-alt',
          'pulse-dot',
          'complete-filled-fade-in',
          'cross-filled-fade-in',
        ],
        'Animated Icons'
      )}
    </div>
  `,
}
