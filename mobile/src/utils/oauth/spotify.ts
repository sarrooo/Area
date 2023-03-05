import {SPOTIFY_OAUTH_CLIENT_ID, SPOTIFY_OAUTH_REDIRECT_URL} from '@env'

export const getOauthConnectSpotifyUrl = () => {
  const rootUrl = `https://accounts.spotify.com/authorize`

  const options = {
    redirect_uri: `${SPOTIFY_OAUTH_REDIRECT_URL as string}?platform=mobile`,
    client_id: SPOTIFY_OAUTH_CLIENT_ID,
    access_type: 'offline',
    prompt: 'consent',
    response_type: 'code',
    scope: [
      'user-read-private',
      'user-read-email',
      'user-modify-playback-state',
      'playlist-read-private',
      'playlist-read-collaborative',
      'playlist-modify-public',
      'playlist-modify-private',
      'user-read-playback-state',
      'user-read-currently-playing',
      'user-read-recently-played',
      'user-top-read',
      'user-read-playback-position',
      'user-library-read',
      'user-library-modify',
      'user-follow-read',
      'user-follow-modify',
    ].join(' '),
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}
