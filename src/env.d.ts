/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly STORYBOOK?: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
