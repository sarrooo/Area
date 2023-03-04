import React, {PropsWithChildren} from 'react'
import {View, Text, useColorScheme, StyleSheet} from 'react-native'
import {Colors} from 'react-native/Libraries/NewAppScreen'

const styles = StyleSheet.create({
  sectionContainer: {
    paddingVertical: 32,
  },
  sectionTitle: {
    fontSize: 48,
    fontWeight: '900',
    fontFamily: 'Poppins',
  },
  sectionDescription: {
    paddingTop: 8,
    fontSize: 24,
    fontWeight: '400',
  },
})

type SectionProps = {
  title: string
  children: React.ReactNode
}

export function Section({children, title}: SectionProps): React.FC<
  PropsWithChildren<{
    title: string
  }>
> {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  )
}
