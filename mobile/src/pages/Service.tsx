import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

export const Service = () => {
  return (
    <View style={styles.container}>
      <Text>Service</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
});
