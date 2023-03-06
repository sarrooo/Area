import {
  GITHUB_OAUTH_CLIENT_ID,
  GITHUB_OAUTH_REDIRECT_URL,
  GITHUB_OAUTH_CONNECT_REDIRECT_URL,
} from '@env'

export const getOauthGithubUrl = () => {
  const rootUrl = `https://github.com/login/oauth/authorize`

  const options = {
    redirect_uri: `${GITHUB_OAUTH_REDIRECT_URL as string}?platform=mobile`,
    client_id: GITHUB_OAUTH_CLIENT_ID,
    scope: 'user, repo, notifications, gist',
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}

export const getOauthConnectGithubUrl = () => {
  const rootUrl = `https://github.com/login/oauth/authorize`

  const options = {
    redirect_uri: `${
      GITHUB_OAUTH_CONNECT_REDIRECT_URL as string
    }?platform=mobile`,
    client_id: GITHUB_OAUTH_CLIENT_ID,
    scope: 'user, repo, notifications, gist',
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}
