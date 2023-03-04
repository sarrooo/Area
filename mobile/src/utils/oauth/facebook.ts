import { getDeepLink } from './deeplink'
import { FACEBOOK_OAUTH_CLIENT_ID } from '@env'

export const getOauthConnectFacebookUrl = () => {
  const rootUrl = `https://www.facebook.com/v16.0/dialog/oauth`

  const options = {
    redirect_uri: 'https://www.facebook.com',
    client_id: FACEBOOK_OAUTH_CLIENT_ID,
    access_type: 'offline',
    prompt: 'consent',
    response_type: 'code',
    scope: ['email', 'public_profile', 'user_friends'].join(' '),
    state: getDeepLink('callback'),
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}
