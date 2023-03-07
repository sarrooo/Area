export const getOauthTwitterUrl = () => {
  const rootUrl = `https://twitter.com/i/oauth2/authorize`

  const options = {
    redirect_uri: import.meta.env.VITE_TWITTER_OAUTH_REDIRECT_URL,
    client_id: import.meta.env.VITE_TWITTER_OAUTH_CLIENT_ID,
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
    state: 'state',
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}

export const getOauthConnectTwitterUrl = () => {
  const rootUrl = `https://twitter.com/i/oauth2/authorize`

  const options = {
    redirect_uri: import.meta.env.VITE_TWITTER_OAUTH_CONNECT_REDIRECT_URL,
    client_id: import.meta.env.VITE_TWITTER_OAUTH_CLIENT_ID,
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
    state: 'state',
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}
