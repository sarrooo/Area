export const getOauthConnectFacebookUrl = () => {
  const rootUrl = `https://www.facebook.com/v16.0/dialog/oauth`

  const options = {
    redirect_uri: import.meta.env.VITE_FACEBOOK_OAUTH_CONNECT_REDIRECT_URL,
    client_id: import.meta.env.VITE_FACEBOOK_OAUTH_CONNECT_CLIENT_ID,
    response_type: 'code',
    scope: 'email public_profile user_friends',
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}
