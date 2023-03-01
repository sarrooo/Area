import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {Landing} from './pages/Landing'

const Stack = createNativeStackNavigator()

export function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}
