import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {PathConfigMap} from '@react-navigation/native'
import {Landing} from './pages/Landing'
import {CallbackComponent} from './components/CallbackComponent'
type RootStackParamList = {
  Landing: undefined
  Callback: {path: string}
}

const Stack = createStackNavigator<RootStackParamList>()

export function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Landing">
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
