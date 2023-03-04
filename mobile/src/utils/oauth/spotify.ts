import {getDeepLink} from './deeplink'
import {SPOTIFY_OAUTH_CLIENT_ID} from '@env'

export const getOauthConnectSpotifyUrl = () => {
  const rootUrl = `https://accounts.spotify.com/authorize`

  const options = {
    redirect_uri: 'https://www.spotify.com',
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
    state: getDeepLink('callback'),
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}
