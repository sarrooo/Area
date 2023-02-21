import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';

import {Landing} from './src/pages/Landing';
import {Dashboard} from './src/pages/Dashboard';
import {Services} from './src/pages/Services';
import {Service} from './src/pages/Service';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{headerShown: false}}
          />
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
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
