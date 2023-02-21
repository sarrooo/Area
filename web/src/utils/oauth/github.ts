export const getOauthGithubUrl = () => {
  const rootUrl = `https://github.com/login/oauth/authorize`

  const options = {
    redirect_uri: import.meta.env.VITE_GITHUB_OAUTH_REDIRECT_URL,
    client_id: import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID,
    scope: 'user, repo, notifications, gist',
    state: window.location.href,
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}
