import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'native-base';

export const Login = () => {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button size="sm" colorScheme="default">
        Default Small
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
