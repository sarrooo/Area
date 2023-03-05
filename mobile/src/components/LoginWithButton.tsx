import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {Button} from 'native-base'
import {InAppBrowser} from 'react-native-inappbrowser-reborn'
import {getDeepLink} from '../utils/oauth/deeplink'

type LoginWithButtonProps = {
  url: string
  title: string
  children?: JSX.Element
}

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    flexDirection: 'row',
  },
})

export function LoginWithButton({url, title, children}: LoginWithButtonProps) {
  const handleLogin = async () => {
    const result = await InAppBrowser.openAuth(url, getDeepLink('callback'))
    if (result.type === 'success') {
      const accessToken = result.params.code
    } else {
      console.log(result)
    }
  }

  return (
    <Button
      colorScheme="darkText"
      variant="outline"
      leftIcon={children}
      onPress={handleLogin}>
      <Text>{title}</Text>
    </Button>
  )
}
