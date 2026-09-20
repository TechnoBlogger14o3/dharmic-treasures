/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string
  readonly VITE_CHAT_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

