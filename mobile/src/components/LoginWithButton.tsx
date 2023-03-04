import React from 'react'
import {Button} from 'native-base'
import {InAppBrowser} from 'react-native-inappbrowser-reborn'
import {getDeepLink} from '../utils/oauth/deeplink'

type LoginWithButtonProps = {
  url: string
  title: string
}

export function LoginWithButton({url, title}: LoginWithButtonProps) {
  const handleLogin = async () => {
    const result = await InAppBrowser.openAuth(url, getDeepLink('callback'))
    if (result.type === 'success') {
      const accessToken = result.params.code
    } else {
      console.log(result)
    }
  }

  return (
    <Button colorScheme="blue" variant="outline" onPress={handleLogin}>
      {title}
    </Button>
  )
}
