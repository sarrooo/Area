import {AddIcon, Button, ScrollView} from 'native-base';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Section} from '../components/Section';
import {TrireaCard} from '../components/TrireaCard';

export const Dashboard = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Section title="Dashboard">Create and find all your trireas here</Section>
      <Button
        colorScheme={'primary'}
        rounded={'lg'}
        position={'absolute'}
        bottom={12}
        right={8}
        onPress={() => {
          navigation.navigate('Services');
        }}>
        Go to services
      </Button>
      <Button
        colorScheme={'danger'}
        rounded={'lg'}
        width={'24'}
        position={'absolute'}
        top={12}
        right={8}>
        Logout
      </Button>
      <Button
        rounded={'lg'}
        rightIcon={<AddIcon />}
        colorScheme={'success'}
        borderStyle={'dashed'}
        borderColor={'black'}>
        Create a trirea
      </Button>
      <ScrollView style={styles.scrollContainer}>
        <TrireaCard
          title="Trirea 1"
          backgroundColor={'#A6EAFF'}
          textColor={'#000'}
          onPress={() => {
            navigation.navigate('Service');
          }}
        />
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
    marginTop: 12,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
