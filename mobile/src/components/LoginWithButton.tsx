import React from 'react'
import {Button} from 'native-base'
import {InAppBrowser} from 'react-native-inappbrowser-reborn'
import { getDeepLink } from '../AuthNavigator'

export const LoginWithButton = () => {
  const handleGoogleLogin = async () => {
    const authUrl =
      'https://accounts.google.com/o/oauth2/auth?' +
      'client_id=799612546691-fcsm5586fk0qq42ivp2ro6l6rjlk4705.apps.googleusercontent.com' +
      '&redirect_uri=+' + getDeepLink('callback') +
      '&scope=profile email openid' +
      '&response_type=code'

    const result = await InAppBrowser.openAuth(authUrl, getDeepLink('callback'), {
      // Set additional options for the in-app browser here, if needed
    })

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
