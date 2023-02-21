import {
  Switch,
  Menu,
  Pressable,
  ThreeDotsIcon,
  DeleteIcon,
  InfoIcon,
} from 'native-base';
import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

type TrireaCardProps = {
  id: number;
  name: string;
  triggerName: string;
  reactionName: string;
  isActive: boolean;
};

export const TrireaCard = ({
  id,
  name,
  triggerName,
  reactionName,
  isActive,
}: TrireaCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
        <Menu
          trigger={triggerProps => {
            return (
              <Pressable
                accessibilityLabel="More options menu"
                {...triggerProps}>
                <ThreeDotsIcon />
              </Pressable>
            );
          }}>
          <Menu.Item>
            <InfoIcon /> Edit
          </Menu.Item>
          <Menu.Item>
            <DeleteIcon /> Delete
          </Menu.Item>
        </Menu>
      </View>
      <Text style={styles.text}>{triggerName}</Text>
      <Text style={styles.text}>{reactionName}</Text>
      <Switch isChecked={isActive} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  text: {
    fontSize: 18,
    fontFamily: 'Poppins',
  },
});
