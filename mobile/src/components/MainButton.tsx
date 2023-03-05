import React from 'react'

import {Text, TouchableOpacity, StyleSheet} from 'react-native'

type MainButtonProps = {
  title: string
  backgroundColor?: string
  textColor?: string
  onPress?: () => void
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    width: 200,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    alignContent: 'center',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#000',
    fontSize: 18,
  },
})

export function MainButton({
  title,
  backgroundColor = '#A6EAFF',
  textColor = '#000',
  onPress,
}: MainButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, {backgroundColor}]}>
      <Text style={[styles.buttonText, {color: textColor}]}>{title}</Text>
    </TouchableOpacity>
  )
}
