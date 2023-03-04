import React, {useEffect} from 'react'
import {View, Text} from 'react-native'
import {InAppBrowser} from 'react-native-inappbrowser-reborn'
import {login} from '../redux/features/userSlice'
import {store} from '../redux/store'

type Props = {
  onSuccess: () => void
  onError: () => void
}

export const Callback = () => {
  useEffect(() => {
    const handleRedirect = async (event: any) => {
      if (event.url.startsWith('https://google.com')) {
        try {
          const result = await InAppBrowser.close()
          console.log('result: ', result)
          const data = result[0]
          const token = data.split('=')[1]
          // handleAuth(token);
          // onSuccess();
          store.dispatch(login({token}))
          console.log('Successfully connected')
        } catch (error) {
          // onError();
          console.log('Failed to connect')
          console.error(error)
        }
      }
    }

    InAppBrowser.events().subscribe(handleRedirect)

    return () => {
      InAppBrowser.events().unsubscribe(handleRedirect)
    }
  }, [])

  return (
    <View>
      <Text>Waiting for authentication...</Text>
    </View>
  )
}
