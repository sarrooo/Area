import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'
import {useSelector} from 'react-redux'
import {selectIsLogged} from './redux/features/userSlice'
import {Landing} from './pages/Landing'
import {Dashboard} from './pages/Dashboard'
import {Services} from './pages/Services'
import {Service} from './pages/Service'
import {Callback} from './pages/Callback'

type RootStackParamList = {
  Landing: undefined
  Dashboard: undefined
  Services: undefined
  Service: {id: number}
  Callback: {token: string}
}

const linking = {
  prefixes: ['mobile://com.mobile/'],
  config: {
    screens: {
      Landing: 'Landing',
      Dashboard: 'Dashboard',
      Services: 'Services',
      Service: 'Service',
      Callback: 'Callback/:token',
    },
  },
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export function Navigator() {
  const isLoggedIn = useSelector(selectIsLogged)
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Services" component={Services} />
            <Stack.Screen name="Service" component={Service} />
          </>
        ) : (
          <>
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Callback" component={Callback} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
