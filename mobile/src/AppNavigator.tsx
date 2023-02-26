import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {Dashboard} from './pages/Dashboard'
import {Services} from './pages/Services'
import {Service} from './pages/Service'

const Stack = createNativeStackNavigator()

export const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Services"
        component={Services}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Service"
        component={Service}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}
