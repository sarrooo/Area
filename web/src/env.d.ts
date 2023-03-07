/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string

  readonly VITE_GOOGLE_OAUTH_REDIRECT_URL: string
  readonly VITE_GOOGLE_OAUTH_CONNECT_REDIRECT_URL: string
  readonly VITE_GOOGLE_OAUTH_CLIENT_ID: string

  readonly VITE_GITHUB_OAUTH_REDIRECT_URL: string
  readonly VITE_GITHUB_OAUTH_CONNECT_REDIRECT_URL: string
  readonly VITE_GITHUB_OAUTH_CLIENT_ID: string

  readonly VITE_TWITTER_OAUTH_REDIRECT_URL: string
  readonly VITE_TWITTER_OAUTH_CONNECT_REDIRECT_URL: string
  readonly VITE_TWITTER_OAUTH_CLIENT_ID: string

  readonly VITE_SPOTIFY_OAUTH_CONNECT_REDIRECT_URL: string
  readonly VITE_SPOTIFY_OAUTH_CLIENT_ID: string

  readonly VITE_FACEBOOK_OAUTH_CONNECT_REDIRECT_URL: string
  readonly VITE_FACEBOOK_OAUTH_CLIENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
