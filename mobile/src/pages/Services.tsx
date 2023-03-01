import {Button, ChevronLeftIcon} from 'native-base'
import React from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import {ServiceCard} from '../components/ServiceCard'
import {Section} from '../components/Section'
import {useGetServicesQuery} from '../redux/services/service'

type ServicesProps = {
  navigation: any
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContainer: {
    flex: 1,
    height: '100%',
    marginTop: 12,
  },
})

export function Services({navigation}: ServicesProps) {
  const services = useGetServicesQuery()

  return (
    <View style={styles.container}>
      <Button
        colorScheme="info"
        rounded="xl"
        position="absolute"
        top={12}
        zIndex={1}
        right={8}
        onPress={() => {
          navigation.goBack()
        }}>
        <ChevronLeftIcon color="white" />
      </Button>

      <Section title="Services">All the services used in our app</Section>
      <ScrollView style={styles.scrollContainer}>
        {services.data?.map(service => {
          return (
            <ServiceCard
              key={service.id}
              id={service.id || 0}
              name={service.name}
              isFollowing={service.subscribed || false}
              triggers={service.triggers || []}
              reactions={service.reactions || []}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}
