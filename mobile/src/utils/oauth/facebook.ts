import { FACEBOOK_OAUTH_CONNECT_REDIRECT_URL, FACEBOOK_OAUTH_CONNECT_CLIENT_ID } from "@env"

export const getOauthConnectFacebookUrl = () => {
  const rootUrl = `https://www.facebook.com/v16.0/dialog/oauth`

  const options = {
    redirect_uri: FACEBOOK_OAUTH_CONNECT_REDIRECT_URL,
    client_id: FACEBOOK_OAUTH_CONNECT_CLIENT_ID,
    state: undefined,
    response_type: 'code',
    scope: 'email public_profile user_friends',
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}
