import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NativeBaseProvider} from 'native-base'

import {Provider} from 'react-redux'
import {store} from './src/redux/store'
import {Navigator} from './src/Navigator'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Navigator />
      </NativeBaseProvider>
    </Provider>
  )
}

export default App
