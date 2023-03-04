import {AddIcon, CheckIcon} from 'native-base'
import React from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'

export type FollowButtonProps = {
  isFollowing?: boolean
  fontSize?: number
  onPress: () => void
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

export function FollowButton({
  isFollowing,
  onPress,
  fontSize,
}: FollowButtonProps) {
  const text = isFollowing ? 'Following' : 'Follow'
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onPress()}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{paddingRight: 4, fontSize: fontSize || 15}}>{text}</Text>
        <Text>{isFollowing ? <CheckIcon /> : <AddIcon />}</Text>
      </Pressable>
    </View>
  )
}
