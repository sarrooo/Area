import React from 'react'
import {Button} from 'native-base'
import {InAppBrowser} from 'react-native-inappbrowser-reborn'
import { getDeepLink } from '../AuthNavigator'

export const getOauthGoogleUrl = () => {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`

  const options = {
    redirect_uri: 'https://google.com',
    client_id: '799612546691-fcsm5586fk0qq42ivp2ro6l6rjlk4705.apps.googleusercontent.com',
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
    state: getDeepLink('callback'),
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}

export const LoginWithButton = () => {
  const handleGoogleLogin = async () => {
    const authUrl = getOauthGoogleUrl()

    console.log(getDeepLink('callback'))

    const result = await InAppBrowser.openAuth(authUrl, getDeepLink('callback'), {
      // Set additional options for the in-app browser here, if needed
    })

    console.log('result: ', result)
    if (result.type === 'success') {
      // The user has successfully authenticated with Google
      const accessToken = result.params.code
      // Use the access token to make requests to the Google API
    } else {
      // The user canceled the authentication process or an error occurred
      console.log(result.message)
    }
  }

  return (
    <Button colorScheme="blue" variant="outline" onPress={handleGoogleLogin}>
      Login with Google
    </Button>
  )
}
