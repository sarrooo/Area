export const getOauthConnectFacebookUrl = () => {
  const rootUrl = `https://www.facebook.com/v16.0/dialog/oauth`

  const options = {
    redirect_uri: import.meta.env.VITE_FACEBOOK_OAUTH_CONNECT_REDIRECT_URL,
    client_id: import.meta.env.VITE_FACEBOOK_OAUTH_CONNECT_CLIENT_ID,
    state: window.location.href,
    response_type: 'code',
    scope: 'email public_profile',
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}
