import {GITHUB_OAUTH_CLIENT_ID} from '@env'
import {getDeepLink} from './deeplink'

export const getOauthGithubUrl = () => {
  const rootUrl = `https://github.com/login/oauth/authorize`

  const options = {
    redirect_uri: 'https://www.github.com',
    client_id: GITHUB_OAUTH_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: ['user', 'repo', 'notifications', 'gist'].join(' '),
    state: getDeepLink('callback'),
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}
