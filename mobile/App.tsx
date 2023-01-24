/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {Section} from './src/components/Section';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {MainButton} from './src/components/MainButton';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.black : Colors.white}
      />
      <Section title="Trirea">
        Welcome to trirea, change your world, your universe
      </Section>
      <MainButton title="Get started" />
      <Image
        style={styles.image}
        source={require('./assets/images/universe.png')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  container: {
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    height: '100%',
  },
});

export default App;
