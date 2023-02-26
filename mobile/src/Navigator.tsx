import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {AppNavigator} from './AppNavigator'
import {AuthNavigator} from './AuthNavigator'
import {useSelector} from 'react-redux'
import {selectIsLogged} from './redux/features/userSlice'

export const Navigator = () => {
  const isLoggedIn = useSelector(selectIsLogged)
  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}
