/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string
  readonly VITE_ADSENSE_CLIENT_ID?: string
  readonly VITE_ADSENSE_AD_SLOT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

