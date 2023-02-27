import {
  AddIcon,
  Button,
  ScrollView,
  useDisclose,
  Actionsheet,
  Input,
} from 'native-base';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {View, StyleSheet} from 'react-native';
import {Section} from '../components/Section';
import {TrireaCard} from '../components/TrireaCard';
import { useLogoutMutation } from '../redux/services/user';

export const Dashboard = () => {
  const navigation = useNavigation();
  const {isOpen, onOpen, onClose} = useDisclose();
  const [logoutMutation] = useLogoutMutation();

  const logout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      console.log(error);
    }
  };

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
        right={8}
        onPress={logout}>
        Logout
      </Button>
      <Button
        rounded={'lg'}
        rightIcon={<AddIcon />}
        colorScheme={'success'}
        borderStyle={'dashed'}
        borderColor={'black'}
        onPress={onOpen}>
        Create a trirea
      </Button>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Input placeholder="Trirea name" />
          <Actionsheet.Item onPress={onClose}>Create a trirea</Actionsheet.Item>
          <Actionsheet.Item onPress={onClose}>
            Create a trirea from a template
          </Actionsheet.Item>
          <Actionsheet.Item onPress={onClose}>Submit</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>

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
