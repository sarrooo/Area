import React from 'react'
import {NavigationContainer, PathConfigMap} from '@react-navigation/native'
import {useSelector} from 'react-redux'
import {AppNavigator} from './AppNavigator'
import {AuthNavigator} from './AuthNavigator'
import {selectIsLogged} from './redux/features/userSlice'
import {getDeepLink} from './utils/oauth/deeplink'

type RootStackParamList = {
  Landing: undefined
  Callback: {path: string}
}

const linking = {
  prefixes: [getDeepLink()],
  config: {
    screens: {
      Landing: 'Landing',
      Callback: 'callback',
    },
  } as PathConfigMap<RootStackParamList>,
}

export function Navigator() {
  const isLoggedIn = useSelector(selectIsLogged)
  return (
    <NavigationContainer linking={linking}>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}
