export const getOauthGoogleUrl = () => {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`

  const options = {
    redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URL,
    client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https//mail.google.com',
    ].join(' '),
    state: window.location.href,
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}

export const getOauthConnectGoogleUrl = () => {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`

  const options = {
    redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH_CONNECT_REDIRECT_URL,
    client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://mail.google.com',
    ].join(' '),
    state: window.location.href,
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}
