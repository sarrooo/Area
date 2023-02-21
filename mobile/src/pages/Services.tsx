import {Button} from 'native-base';
import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

export const Services = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Services</Text>
      <Button
        onPress={() => {
          navigation.navigate('Service');
        }}>
        Go to service
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
});
