import React from 'react';

import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {Section} from '../components/Section';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {MainButton} from '../components/MainButton';

import {Button} from 'native-base';

export const Landing = ({navigation}) => {
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
      <MainButton
        title="Login"
        onPress={() => {
          navigation.navigate('Dashboard');
        }}
      />
      <Image style={styles.image} source={require('../assets/universe.png')} />
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
