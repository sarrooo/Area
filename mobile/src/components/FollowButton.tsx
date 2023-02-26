import {AddIcon, CheckIcon} from 'native-base';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export type FollowButtonProps = {
  isFollowing?: boolean;
};

export const FollowButton = ({isFollowing}: FollowButtonProps) => {
  const text = isFollowing ? 'Following' : 'Follow';
  return (
    <View style={styles.container}>
      <Text style={{paddingRight: 4}}>{text}</Text>
      <Text>{isFollowing ? <CheckIcon /> : <AddIcon />}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
