import React from 'react'
import {NativeBaseProvider} from 'native-base'

import {Provider} from 'react-redux'
import {store} from './src/redux/store'
import {Navigator} from './src/Navigator'

function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Navigator />
      </NativeBaseProvider>
    </Provider>
  )
}

export default App
