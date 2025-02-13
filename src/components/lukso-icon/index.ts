import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.scss?inline'
import { addPhoto } from './icons/add-photo'
import { arrowDownLg } from './icons/arrow-down-lg'
import { arrowDownSm } from './icons/arrow-down-sm'
import { arrowLeftLg } from './icons/arrow-left-lg'
import { arrowLeftSm } from './icons/arrow-left-sm'
import { arrowRightLg } from './icons/arrow-right-lg'
import { arrowRightSm } from './icons/arrow-right-sm'
import { arrowUpLg } from './icons/arrow-up-lg'
import { arrowUpSm } from './icons/arrow-up-sm'
import { barbellOutline } from './icons/barbell-outline'
import { bulbOutline } from './icons/bulb-outline'
import { camera } from './icons/camera'
import { clipboard } from './icons/clipboard'
import { clock } from './icons/clock'
import { closeLg } from './icons/close-lg'
import { closeSm } from './icons/close-sm'
import { cloud } from './icons/cloud'
import { compassOutline } from './icons/compass-outline'
import { completeFilled } from './icons/complete-filled'
import { completeOutline } from './icons/complete-outline'
import { contractLock } from './icons/contract-lock'
import { contractSigned } from './icons/contract-signed'
import { connect } from './icons/connect'
import { connections } from './icons/connections'
import { controller } from './icons/controller'
import { copy } from './icons/copy'
import { crossOutline } from './icons/cross-outline'
import { dots } from './icons/dots'
import { edit } from './icons/edit'
import { error } from './icons/error'
import { expand } from './icons/expand'
import { extension } from './icons/extension'
import { eyeHide } from './icons/eye-hide'
import { eyeShow } from './icons/eye-show'
import { filter } from './icons/filter'
import { fishOutline } from './icons/fish-outline'
import { flip } from './icons/flip'
import { globe } from './icons/globe'
import { hamburger } from './icons/hamburger'
import { infinite } from './icons/infinite'
import { information } from './icons/information'
import { keyOutline } from './icons/key-outline'
import { link } from './icons/link'
import { link1 } from './icons/link1'
import { link2 } from './icons/link2'
import { link3 } from './icons/link3'
import { link4 } from './icons/link4'
import { loading } from './icons/loading'
import { location } from './icons/location'
import { locked } from './icons/locked'
import { login } from './icons/login'
import { login2 } from './icons/login-2'
import { login3 } from './icons/login-3'
import { logoChrome } from './icons/logo-chrome'
import { logoBrave } from './icons/logo-brave'
import { logoEdge } from './icons/logo-edge'
import { logoFirefox } from './icons/logo-firefox'
import { logoOpera } from './icons/logo-opera'
import { logoSafari } from './icons/logo-safari'
import { mail } from './icons/mail'
import { menu1 } from './icons/menu-1'
import { menu2 } from './icons/menu-2'
import { migrate } from './icons/migrate'
import { minimize } from './icons/minimize'
import { network } from './icons/network'
import { notifications } from './icons/notifications'
import { phonePortraitOutline } from './icons/phone-portrait-outline'
import { pin } from './icons/pin'
import { playFilled } from './icons/play-filled'
import { playOutline } from './icons/play-outline'
import { plus } from './icons/plus'
import { profileAdd } from './icons/profile-add'
import { profileExport } from './icons/profile-export'
import { profileImport } from './icons/profile-import'
import { profileRecovery } from './icons/profile-recovery'
import { profileRecovery2 } from './icons/profile-recovery-2'
import { profileRestore } from './icons/profile-restore'
import { profile } from './icons/profile'
import { qrCodeScan } from './icons/qr-code-scan'
import { qrCode } from './icons/qr-code'
import { relayer } from './icons/relayer'
import { reload } from './icons/reload'
import { returnDown } from './icons/return-down'
import { returnLeft } from './icons/return-left'
import { returnRight } from './icons/return-right'
import { returnUp } from './icons/return-up'
import { search } from './icons/search'
import { settings } from './icons/settings'
import { smartContractDoc } from './icons/smart-contract-doc'
import { smartContract } from './icons/smart-contract'
import { spinner } from './icons/spinner'
import { starFilled } from './icons/star-filled'
import { starOutline } from './icons/star-outline'
import { stepDot } from './icons/step-dot'
import { stepProgress } from './icons/step-progress'
import { steps } from './icons/steps'
import { tick } from './icons/tick'
import { timerOutline } from './icons/timer-outline'
import { transactionReceive } from './icons/transaction-receive'
import { transactionSend } from './icons/transaction-send'
import { transfer } from './icons/transfer'
import { trash } from './icons/trash'
import { turnDown } from './icons/turn-down'
import { turnLeft } from './icons/turn-left'
import { turnRight } from './icons/turn-right'
import { turnUp } from './icons/turn-up'
import { unlocked } from './icons/unlocked'
import { walletOutline } from './icons/wallet-outline'
import { warningRound } from './icons/warning-round'
import { warningTriangle } from './icons/warning-triangle'
import { googleColor } from './icons/google-color'
import { ethLogo } from './icons/eth-logo'
import { lyxLogo } from './icons/lyx-logo'
import { progressIndicator } from './icons/progress-indicator'
import { pulseDot } from './icons/pulse-dot'
import { progressComplete } from './icons/progress-complete'
import { completeFilledFadeIn } from './icons/complete-filled-fade-in'
import { desktopSharp } from './icons/desktop-sharp'
import { switched } from './icons/switched'
import { progressIndicatorAlt } from './icons/progress-indicator-alt'
import { crossFilled } from './icons/cross-filled'
import { transferSend } from './icons/transfer-send'
import { flagOutline } from './icons/flag-outline'
import { tokenId } from './icons/token-id'
import { editDoc } from './icons/edit-doc'
import { codeOutline } from './icons/code-outline'
import { saveOutline } from './icons/save-outline'
import { scan } from './icons/scan'
import { faceId } from './icons/face-id'
import { profileFile } from './icons/profile-file'
import { handRightOutline } from './icons/hand-right-outline'
import { extensionOutline } from './icons/extension-outline'
import { luksoLogo } from './icons/lukso-logo'
import { metamaskLogo } from './icons/metamask-logo'
import { documentOutline } from './icons/document-outline'
import { headsetOutline } from './icons/headset-outline'
import { cubeOutline } from './icons/cube-outline'
import { filmOutline } from './icons/film-outline'
import { crossFilledFadeIn } from './icons/cross-filled-fade-in'
import { videoOutline } from './icons/video-outline'
import { walletRestore } from './icons/wallet-restore'
import { logoX } from './icons/logo-x'
import { logoFacebook } from './icons/logo-facebook'
import { glasses } from './icons/glasses'
import { unlink } from './icons/unlink'
import { logoPolygon } from './icons/logo-polygon'
import { logoFantom } from './icons/logo-fantom'
import { logoXMono } from './icons/logo-x-mono'
import { logoInstagramMono } from './icons/logo-instagram-mono'
import { logoMediumMono } from './icons/logo-medium-mono'
import { logoDiscordMono } from './icons/logo-discord-mono'
import { logoSnapchatMono } from './icons/logo-snapchat-mono'
import { logoWhatsappMono } from './icons/logo-whatsapp-mono'
import { logoTelegramMono } from './icons/logo-telegram-mono'
import { logoLinkedinMono } from './icons/logo-linkedin-mono'
import { logoGithubMono } from './icons/logo-github-mono'
import { logoUniversalPageMono } from './icons/logo-universal-page-mono'
import { database } from './icons/database'
import { emptyOutline } from './icons/empty-outline'
import { profileRemove } from './icons/profile-remove'
import { logoYoutubeMono } from './icons/logo-youtube-mono'
import { addGrid } from './icons/add-grid'
import { gallery } from './icons/gallery'
import { logoElfsightMono } from './icons/logo-elfsight-mono'
import { maximizeVertical } from './icons/maximize-vertical'
import { minimizeVertical } from './icons/minimize-vertical'
import { chart } from './icons/chart'
import { people } from './icons/people'
import { documentCode } from './icons/document-code'
import { logoWarpcastMono } from './icons/logo-warpcast-mono'
import { parachute } from './icons/parachute'
import { bitcoinConvert } from './icons/bitcoin-convert'
import { nft } from './icons/nft'
import { fingerprint } from './icons/fingerprint'
import { hammer } from './icons/hammer'
import { handHeart } from './icons/hand-heart'
import { earth } from './icons/earth'
import { logoSoundcloudMono } from './icons/logo-soundcloud-mono'
import { logoSpotifyMono } from './icons/logo-spotify-mono'
import { logoGoogleCalendarMono } from './icons/logo-google-calendar-mono'
import { logoSubstackMono } from './icons/logo-substack-mono'
import { logoXround } from './icons/logo-x-round'
import { logoFarcaster } from './icons/logo-farcaster'
import { logoLinkedin } from './icons/logo-linkedin'
import { profileRestoreNoSetup } from './icons/profile-restore-no-setup'
import { share } from './icons/share'
import { logoFacebookRound } from './icons/logo-facebook-round'
import { logoFarcasterRound } from './icons/logo-farcaster-round'
import { logoLinkedinRound } from './icons/logo-linkedin-round'
import { arrowLongDown } from './icons/arrow-long-down'
import { gas } from './icons/gas'

export type IconOptions = {
  width: number
  height: number
  color: string
  strokeWidth: number
  secondaryColor?: string
}

export type IconSize = 'small' | 'medium' | 'large' | 'x-large' | '2x-large'

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
  'contract-signed': contractSigned,
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
  glasses,
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
  'logo-brave': logoBrave,
  'logo-chrome': logoChrome,
  'logo-edge': logoEdge,
  'logo-facebook': logoFacebook,
  'logo-fantom': logoFantom,
  'logo-firefox': logoFirefox,
  'logo-opera': logoOpera,
  'logo-polygon': logoPolygon,
  'logo-safari': logoSafari,
  'logo-x': logoX,
  mail,
  'menu-1': menu1,
  'menu-2': menu2,
  'metamask-logo': metamaskLogo,
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
  spinner: spinner,
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
  unlink,
  unlocked,
  'wallet-outline': walletOutline,
  'wallet-restore': walletRestore,
  'warning-round': warningRound,
  'warning-triangle': warningTriangle,
  'google-color': googleColor,
  'eth-logo': ethLogo,
  'lyx-logo': lyxLogo,
  'progress-indicator': progressIndicator,
  'pulse-dot': pulseDot,
  'progress-complete': progressComplete,
  'complete-filled-fade-in': completeFilledFadeIn,
  'desktop-sharp': desktopSharp,
  switched,
  'progress-indicator-alt': progressIndicatorAlt,
  'cross-filled': crossFilled,
  'cross-filled-fade-in': crossFilledFadeIn,
  'transfer-send': transferSend,
  'flag-outline': flagOutline,
  'token-id': tokenId,
  'edit-doc': editDoc,
  'code-outline': codeOutline,
  'save-outline': saveOutline,
  scan,
  'qr-code-scan': qrCodeScan,
  'face-id': faceId,
  'profile-file': profileFile,
  'hand-right-outline': handRightOutline,
  'extension-outline': extensionOutline,
  'lukso-logo': luksoLogo,
  'document-outline': documentOutline,
  'headset-outline': headsetOutline,
  'cube-outline': cubeOutline,
  'film-outline': filmOutline,
  'video-outline': videoOutline,
  'logo-facebook-mono': logoFacebookRound,
  'logo-x-mono': logoXMono,
  'logo-instagram-mono': logoInstagramMono,
  'logo-medium-mono': logoMediumMono,
  'logo-discord-mono': logoDiscordMono,
  'logo-snapchat-mono': logoSnapchatMono,
  'logo-whatsapp-mono': logoWhatsappMono,
  'logo-telegram-mono': logoTelegramMono,
  'logo-linkedin-mono': logoLinkedinMono,
  'logo-github-mono': logoGithubMono,
  'logo-universal-page-mono': logoUniversalPageMono,
  database,
  'empty-outline': emptyOutline,
  'profile-remove': profileRemove,
  'logo-youtube-mono': logoYoutubeMono,
  'add-grid': addGrid,
  gallery,
  'logo-elfsight-mono': logoElfsightMono,
  'maximize-vertical': maximizeVertical,
  'minimize-vertical': minimizeVertical,
  chart,
  people,
  'document-code': documentCode,
  'logo-warpcast-mono': logoWarpcastMono,
  parachute,
  'bitcoin-convert': bitcoinConvert,
  nft,
  fingerprint,
  hammer,
  'hand-heart': handHeart,
  earth,
  'logo-soundcloud-mono': logoSoundcloudMono,
  'logo-spotify-mono': logoSpotifyMono,
  'logo-google-calendar-mono': logoGoogleCalendarMono,
  'logo-substack-mono': logoSubstackMono,
  'logo-x-round': logoXround,
  'logo-farcaster': logoFarcaster,
  'logo-linkedin': logoLinkedin,
  'profile-restore-no-setup': profileRestoreNoSetup,
  share,
  'logo-facebook-round': logoFacebookRound,
  'logo-farcaster-round': logoFarcasterRound,
  'logo-linkedin-round': logoLinkedinRound,
  'arrow-long-down': arrowLongDown,
  gas,
}

@customElement('lukso-icon')
export class LuksoIcon extends TailwindStyledElement(style) {
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
    '2x-large': {
      width: 64,
      height: 64,
      strokeWidth: 1.5,
    },
  }

  render() {
    const icon = iconMap[this.name]

    if (!icon) {
      console.warn(`Icon ${this.name} not found`)
      return html``
    }

    const size = this.sizes[this.size]

    if (!size) {
      console.warn(`Size ${this.size} not found`)
      return html``
    }

    return html`
      ${icon({
        width: size.width,
        height: size.height,
        color: this.color,
        strokeWidth: size.strokeWidth,
        secondaryColor: this.secondaryColor,
      })}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-icon': LuksoIcon
  }
}
