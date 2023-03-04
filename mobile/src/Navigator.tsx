import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {useSelector} from 'react-redux'
import {AppNavigator} from './AppNavigator'
import {AuthNavigator} from './AuthNavigator'
import {selectIsLogged} from './redux/features/userSlice'

export function Navigator() {
  const isLoggedIn = useSelector(selectIsLogged)
  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}
