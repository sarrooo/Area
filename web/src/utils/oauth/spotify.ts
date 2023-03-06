export const getOauthConnectSpotifyUrl = () => {
  const rootUrl = `https://accounts.spotify.com/authorize`

  const options = {
    redirect_uri: import.meta.env.VITE_SPOTIFY_OAUTH_CONNECT_REDIRECT_URL,
    client_id: import.meta.env.VITE_SPOTIFY_OAUTH_CONNECT_CLIENT_ID,
    response_type: 'code',
    scope:
      'user-read-private user-read-email user-modify-playback-state playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-read-playback-state user-read-currently-playing user-read-recently-played user-top-read user-read-playback-position user-library-read user-library-modify user-follow-read user-follow-modify',
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}
