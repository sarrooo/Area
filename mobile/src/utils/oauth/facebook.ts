import {FACEBOOK_OAUTH_CLIENT_ID, FACEBOOK_OAUTH_REDIRECT_URL} from '@env'

export const getOauthConnectFacebookUrl = () => {
  const rootUrl = `https://www.facebook.com/v16.0/dialog/oauth`

  const options = {
    redirect_uri: `${FACEBOOK_OAUTH_REDIRECT_URL as string}?platform=mobile`,
    client_id: FACEBOOK_OAUTH_CLIENT_ID,
    access_type: 'offline',
    prompt: 'consent',
    response_type: 'code',
    scope: ['email', 'public_profile', 'user_friends'].join(' '),
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}
