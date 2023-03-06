import React from 'react'
import {Text} from 'react-native'
import {Button} from 'native-base'
import {InAppBrowser} from 'react-native-inappbrowser-reborn'
import {getDeepLink} from '../utils/oauth/deeplink'

type LoginWithButtonProps = {
  url: string
  title: string
  children?: JSX.Element
}

export function LoginWithButton({url, title, children}: LoginWithButtonProps) {
  const handleLogin = async () => {
    const result = await InAppBrowser.openAuth(url, getDeepLink('callback'))
    if (result.type === 'success') {
      const accessToken = result.params.code
      console.log('SUCCESS', result)
    } else {
      console.log('FAILURE', result)
    }
  }

  return (
    <Button
      marginTop={1}
      colorScheme="darkText"
      variant="outline"
      leftIcon={children}
      onPress={handleLogin}>
      <Text>{title}</Text>
    </Button>
  )
}
