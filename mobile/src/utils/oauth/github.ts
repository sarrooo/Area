import {GITHUB_OAUTH_CLIENT_ID, GITHUB_OAUTH_REDIRECT_URL} from '@env'

export const getOauthGithubUrl = () => {
  const rootUrl = `https://github.com/login/oauth/authorize`

  const options = {
    redirect_uri: `${GITHUB_OAUTH_REDIRECT_URL as string}?platform=mobile`,
    client_id: GITHUB_OAUTH_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: ['user', 'repo', 'notifications', 'gist'].join(' '),
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}
