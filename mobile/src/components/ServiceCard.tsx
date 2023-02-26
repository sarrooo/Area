import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Reaction} from '../types/Reaction';
import {Trigger} from '../types/Trigger';
import {InfoIcon, PlayIcon, Pressable} from 'native-base';

export type ServiceCardProps = {
  name: string;
  id: number;
  isFollowing: boolean;
  triggers: Trigger[];
  reactions: Reaction[];
};

import {View, Text, StyleSheet} from 'react-native';
import {FollowButton} from './FollowButton';

export const ServiceCard = ({
  id,
  name,
  isFollowing,
  triggers,
  reactions,
}: ServiceCardProps) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('Service')}>
      <View style={styles.header}>
        <Text>{name}</Text>
        <FollowButton isFollowing={isFollowing} />
      </View>
      <View style={styles.content}>
        <View>
          {triggers.map(trigger => {
            return (
              <View style={styles.trigger}>
                <InfoIcon style={styles.icon} />
                <Text key={trigger.id}>{trigger.name}</Text>
              </View>
            );
          })}
        </View>
        <View>
          {reactions.map(reaction => {
            return (
              <View style={styles.trigger}>
                <PlayIcon style={styles.icon} />
                <Text key={reaction.id}>{reaction.name}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 4,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    fontFamily: 'Poppins',
  },
  text: {
    paddingTop: 8,
    fontSize: 16,
    fontWeight: '400',
  },
});
