/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_OAUTH_REDIRECT_URL: string
  readonly VITE_GOOGLE_OAUTH_CLIENT_ID: string

  readonly VITE_GITHUB_OAUTH_REDIRECT_URL: string
  readonly VITE_GITHUB_OAUTH_CLIENT_ID: string

  readonly VITE_TWITTER_OAUTH_REDIRECT_URL: string
  readonly VITE_TWITTER_OAUTH_CLIENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
