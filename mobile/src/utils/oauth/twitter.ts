import {getDeepLink} from './deeplink'
import {TWITTER_OAUTH_CLIENT_ID, TWITTER_OAUTH_CONNECT_REDIRECT_URL} from '@env'

export const getOauthTwitterUrl = () => {
  const rootUrl = `https://twitter.com/i/oauth2/authorize`

  const options = {
    redirect_uri: 'https://www.twitter.com',
    client_id: TWITTER_OAUTH_CLIENT_ID,
    access_type: 'offline',
    prompt: 'consent',
    response_type: 'code',
    code_challenge: 'challenge',
    code_challenge_method: 'plain',
    scope: [
      'users.read',
      'tweet.read',
      'like.write',
      'follows.read',
      'follows.write',
      'offline.access',
    ].join(' '),
    state: getDeepLink('callback'),
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}

export const getOauthConnectTwitterUrl = () => {
  const rootUrl = `https://twitter.com/i/oauth2/authorize`

  const options = {
    redirect_uri: TWITTER_OAUTH_CONNECT_REDIRECT_URL,
    client_id: TWITTER_OAUTH_CLIENT_ID,
    state: getDeepLink('callback'),
    response_type: 'code',
    code_challenge: 'challenge',
    code_challenge_method: 'plain',
    scope: [
      'users.read',
      'tweet.read',
      'like.write',
      'follows.read',
      'follows.write',
      'offline.access',
    ].join(' '),
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}
