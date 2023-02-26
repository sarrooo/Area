import {Button, ChevronLeftIcon, IconButton} from 'native-base';
import React from 'react';
import {ServiceCard} from '../components/ServiceCard';

import {Section} from '../components/Section';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const services = [
  {
    id: 1,
    name: 'The first one',
    isFollowing: true,
    triggers: [
      {
        id: 0,
        name: 'trigger',
        serviceId: 1,
      },
      {
        id: 0,
        name: 'trigger',
        serviceId: 1,
      },
      {
        id: 0,
        name: 'trigger',
        serviceId: 1,
      },
      {
        id: 0,
        name: 'trigger',
        serviceId: 1,
      },
    ],
    reactions: [
      {
        id: 0,
        name: 'trigger',
        serviceId: 1,
      },
    ],
  },
  {
    id: 2,
    name: 'The first one',
    isFollowing: false,
    triggers: [
      {
        id: 0,
        name: 'trigger',
        serviceId: 1,
      },
    ],
    reactions: [
      {
        id: 0,
        name: 'trigger',
        serviceId: 1,
      },
    ],
  },
];

export const Services = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Button
        colorScheme={'info'}
        rounded={'xl'}
        position={'absolute'}
        top={12}
        zIndex={1}
        right={8}
        onPress={() => {
          navigation.goBack();
        }}>
        <ChevronLeftIcon color="white" />
      </Button>

      <Section title="Services">All the services used in our app</Section>
      <ScrollView style={styles.scrollContainer}>
        {services.map(service => {
          return (
            <ServiceCard
              key={service.id}
              id={service.id}
              name={service.name}
              isFollowing={service.isFollowing}
              triggers={service.triggers}
              reactions={service.reactions}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

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
});
