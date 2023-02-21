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
        zIndex={1}
        shadow={2}
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
          id={1}
          name={'The first one'}
          triggerName={'poeapsd'}
          reactionName={'lalala'}
          isActive={true}
        />
        <TrireaCard
          id={1}
          name={'The first one'}
          triggerName={'poeapsd'}
          reactionName={'lalala'}
          isActive={true}
        />
        <TrireaCard
          id={1}
          name={'The first one'}
          triggerName={'poeapsd'}
          reactionName={'lalala'}
          isActive={true}
        />
        <TrireaCard
          id={1}
          name={'The first one'}
          triggerName={'poeapsd'}
          reactionName={'lalala'}
          isActive={true}
        />
        <TrireaCard
          id={1}
          name={'The first one'}
          triggerName={'poeapsd'}
          reactionName={'lalala'}
          isActive={true}
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
    height: '100%',
    marginTop: 12,
  },
});
