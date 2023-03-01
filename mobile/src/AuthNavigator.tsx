import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Platform} from 'react-native'
import {Landing} from './pages/Landing'
import {PathConfigMap} from '@react-navigation/native'
import {CallbackComponent} from './components/CallbackComponent'

export const getDeepLink = (path = '') => {
  const scheme = 'my-scheme'
  const prefix =
    Platform.OS == 'android' ? `${scheme}://my-host/` : `${scheme}://`
  return prefix + path
}

type RootStackParamList = {
  Landing: undefined
  Callback: {path: string}
}

const Stack = createStackNavigator<RootStackParamList>()

const linking = {
  prefixes: [getDeepLink()],
  config: {
    screens: {
      Landing: 'Landing',
      Callback: 'callback',
    },
  } as PathConfigMap<RootStackParamList>,
}

export const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Landing" linking={linking}>
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Callback"
        component={CallbackComponent}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}
