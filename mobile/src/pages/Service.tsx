import {Button} from 'native-base';
import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

export const Service = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Service</Text>
      <Button
        onPress={() => {
          navigation.navigate('Dashboard');
        }}>
        Go to dashboard
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
});
