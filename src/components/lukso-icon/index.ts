import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { TailwindElement } from '@/shared/tailwind-element/index.js'
import { addPhoto } from './icons/add-photo.js'
import { arrowDownLg } from './icons/arrow-down-lg.js'
import { arrowDownSm } from './icons/arrow-down-sm.js'
import { arrowLeftLg } from './icons/arrow-left-lg.js'
import { arrowLeftSm } from './icons/arrow-left-sm.js'
import { arrowRightLg } from './icons/arrow-right-lg.js'
import { arrowRightSm } from './icons/arrow-right-sm.js'
import { arrowUpLg } from './icons/arrow-up-lg.js'
import { arrowUpSm } from './icons/arrow-up-sm.js'
import { barbellOutline } from './icons/barbell-outline.js'
import { bulbOutline } from './icons/bulb-outline.js'
import { camera } from './icons/camera.js'
import { clipboard } from './icons/clipboard.js'
import { clock } from './icons/clock.js'
import { closeLg } from './icons/close-lg.js'
import { closeSm } from './icons/close-sm.js'
import { cloud } from './icons/cloud.js'
import { compassOutline } from './icons/compass-outline.js'
import { completeFilled } from './icons/complete-filled.js'
import { completeOutline } from './icons/complete-outline.js'
import { contractLock } from './icons/contract-lock.js'
import { connect } from './icons/connect.js'
import { connections } from './icons/connections.js'
import { controller } from './icons/controller.js'
import { copy } from './icons/copy.js'
import { crossOutline } from './icons/cross-outline.js'
import { dots } from './icons/dots.js'
import { edit } from './icons/edit.js'
import { error } from './icons/error.js'
import { expand } from './icons/expand.js'
import { extension } from './icons/extension.js'
import { eyeHide } from './icons/eye-hide.js'
import { eyeShow } from './icons/eye-show.js'
import { filter } from './icons/filter.js'
import { fishOutline } from './icons/fish-outline.js'
import { flip } from './icons/flip.js'
import { globe } from './icons/globe.js'
import { hamburger } from './icons/hamburger.js'
import { infinite } from './icons/infinite.js'
import { information } from './icons/information.js'
import { keyOutline } from './icons/key-outline.js'
import { link } from './icons/link.js'
import { link1 } from './icons/link1.js'
import { link2 } from './icons/link2.js'
import { link3 } from './icons/link3.js'
import { link4 } from './icons/link4.js'
import { loading } from './icons/loading.js'
import { location } from './icons/location.js'
import { locked } from './icons/locked.js'
import { login } from './icons/login.js'
import { login2 } from './icons/login-2.js'
import { login3 } from './icons/login-3.js'
import { logoChrome } from './icons/logo-chrome.js'
import { mail } from './icons/mail.js'
import { menu1 } from './icons/menu-1.js'
import { menu2 } from './icons/menu-2.js'
import { migrate } from './icons/migrate.js'
import { minimize } from './icons/minimize.js'
import { network } from './icons/network.js'
import { notifications } from './icons/notifications.js'
import { phonePortraitOutline } from './icons/phone-portrait-outline.js'
import { pin } from './icons/pin.js'
import { playFilled } from './icons/play-filled.js'
import { playOutline } from './icons/play-outline.js'
import { plus } from './icons/plus.js'
import { profileAdd } from './icons/profile-add.js'
import { profileExport } from './icons/profile-export.js'
import { profileImport } from './icons/profile-import.js'
import { profileRecovery } from './icons/profile-recovery.js'
import { profileRecovery2 } from './icons/profile-recovery-2.js'
import { profileRestore } from './icons/profile-restore.js'
import { profile } from './icons/profile.js'
import { qrCode } from './icons/qr-code.js'
import { relayer } from './icons/relayer.js'
import { reload } from './icons/reload.js'
import { returnDown } from './icons/return-down.js'
import { returnLeft } from './icons/return-left.js'
import { returnRight } from './icons/return-right.js'
import { returnUp } from './icons/return-up.js'
import { search } from './icons/search.js'
import { settings } from './icons/settings.js'
import { smartContractDoc } from './icons/smart-contract-doc.js'
import { smartContract } from './icons/smart-contract.js'
import { starFilled } from './icons/star-filled.js'
import { starOutline } from './icons/star-outline.js'
import { stepDot } from './icons/step-dot.js'
import { stepProgress } from './icons/step-progress.js'
import { steps } from './icons/steps.js'
import { tick } from './icons/tick.js'
import { timerOutline } from './icons/timer-outline.js'
import { transactionReceive } from './icons/transaction-receive.js'
import { transactionSend } from './icons/transaction-send.js'
import { transfer } from './icons/transfer.js'
import { trash } from './icons/trash.js'
import { turnDown } from './icons/turn-down.js'
import { turnLeft } from './icons/turn-left.js'
import { turnRight } from './icons/turn-right.js'
import { turnUp } from './icons/turn-up.js'
import { unlocked } from './icons/unlocked.js'
import { walletOutline } from './icons/wallet-outline.js'
import { warningRound } from './icons/warning-round.js'
import { warningTriangle } from './icons/warning-triangle.js'

export type IconOptions = {
  width: number
  height: number
  color: string
  strokeWidth: number
  secondaryColor?: string
}

export type IconSize = 'small' | 'medium' | 'large' | 'x-large'

type IconSizeDef = {
  width: number
  height: number
  strokeWidth: number
}

const iconMap = {
  'add-photo': addPhoto,
  'arrow-down-lg': arrowDownLg,
  'arrow-down-sm': arrowDownSm,
  'arrow-left-lg': arrowLeftLg,
  'arrow-left-sm': arrowLeftSm,
  'arrow-right-lg': arrowRightLg,
  'arrow-right-sm': arrowRightSm,
  'arrow-up-lg': arrowUpLg,
  'arrow-up-sm': arrowUpSm,
  'barbell-outline': barbellOutline,
  'bulb-outline': bulbOutline,
  camera,
  clipboard,
  clock,
  'close-lg': closeLg,
  'close-sm': closeSm,
  cloud,
  'compass-outline': compassOutline,
  'complete-filled': completeFilled,
  'complete-outline': completeOutline,
  connect,
  connections,
  'contract-lock': contractLock,
  controller,
  copy,
  'cross-outline': crossOutline,
  dots,
  edit,
  error,
  expand,
  extension,
  'eye-hide': eyeHide,
  'eye-show': eyeShow,
  filter,
  'fish-outline': fishOutline,
  flip,
  globe,
  hamburger,
  infinite,
  information,
  'key-outline': keyOutline,
  link,
  'link-1': link1,
  'link-2': link2,
  'link-3': link3,
  'link-4': link4,
  loading,
  location,
  locked,
  login,
  'login-2': login2,
  'login-3': login3,
  'logo-chrome': logoChrome,
  mail,
  'menu-1': menu1,
  'menu-2': menu2,
  migrate,
  minimize,
  network,
  notifications,
  'phone-portrait-outline': phonePortraitOutline,
  pin,
  'play-filled': playFilled,
  'play-outline': playOutline,
  plus,
  'profile-add': profileAdd,
  'profile-export': profileExport,
  'profile-import': profileImport,
  'profile-recovery': profileRecovery,
  'profile-recovery-2': profileRecovery2,
  'profile-restore': profileRestore,
  profile,
  'qr-code': qrCode,
  relayer,
  reload,
  'return-down': returnDown,
  'return-left': returnLeft,
  'return-right': returnRight,
  'return-up': returnUp,
  search,
  settings,
  'smart-contract-doc': smartContractDoc,
  'smart-contract': smartContract,
  'star-filled': starFilled,
  'star-outline': starOutline,
  'step-dot': stepDot,
  'step-progress': stepProgress,
  steps,
  tick,
  'timer-outline': timerOutline,
  'transaction-receive': transactionReceive,
  'transaction-send': transactionSend,
  transfer,
  trash,
  'turn-down': turnDown,
  'turn-left': turnLeft,
  'turn-right': turnRight,
  'turn-up': turnUp,
  unlocked,
  'wallet-outline': walletOutline,
  'warning-round': warningRound,
  'warning-triangle': warningTriangle,
}

@customElement('lukso-icon')
export class LuksoIcon extends TailwindElement {
  @property({ type: String })
  name = ''

  @property({ type: String })
  size = 'medium'

  @property({ type: String })
  color = 'neutral-20'

  @property({ type: String, attribute: 'secondary-color' })
  secondaryColor = ''

  private sizes: { [key in IconSize]: IconSizeDef } = {
    small: {
      width: 16,
      height: 16,
      strokeWidth: 2,
    },
    medium: {
      width: 24,
      height: 24,
      strokeWidth: 1.5,
    },
    large: {
      width: 32,
      height: 32,
      strokeWidth: 1.5,
    },
    'x-large': {
      width: 40,
      height: 40,
      strokeWidth: 1.5,
    },
  }

  render() {
    const icon = iconMap[this.name]

    if (!icon) {
      console.warn(`Icon ${this.name} not found`)
    }

    const size = this.sizes[this.size]

    if (!size) {
      console.warn(`Size ${this.size} not found`)
    }

    return html`${icon({
      width: size.width,
      height: size.height,
      color: this.color,
      strokeWidth: size.strokeWidth,
      secondaryColor: this.secondaryColor,
    })}`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-icon': LuksoIcon
  }
}
