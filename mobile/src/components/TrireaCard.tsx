import {Switch, Menu, Pressable, DeleteIcon} from 'native-base'
import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  useDeleteTrireaMutation,
  useUpdateTrireaMutation,
} from '../redux/services/trirea'
import {Trirea} from '../types/Trirea'

type TrireaCardProps = {
  id: number
  name: string
  triggerName: string
  reactionName: string
  trirea: Trirea
}

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
})

export function TrireaCard({
  id,
  name,
  triggerName,
  reactionName,
  trirea,
}: TrireaCardProps) {
  const [deleteTrireaMutation] = useDeleteTrireaMutation()
  const [updateTrireaMutation] = useUpdateTrireaMutation()

  const toggleActive = async () => {
    try {
      await updateTrireaMutation({...trirea, enabled: !trirea.enabled})
    } catch (error) {
      // toast.error('Something went wrong')
    }
  }

  const deleteTrirea = async () => {
    try {
      id = Number(id)
      await deleteTrireaMutation(id).unwrap()
      // toast.success('Trirea deleted')
    } catch (error) {
      // toast.error('Something went wrong')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
        <Menu
          trigger={triggerProps => {
            return (
              <Pressable
                key={triggerProps.key}
                accessibilityLabel="More options menu"
                {...triggerProps}>
                <Icon name="dots-horizontal" size={35} />
              </Pressable>
            )
          }}>
          <Menu.Item onPress={() => deleteTrirea()}>
            <DeleteIcon />
            <Text>Delete</Text>
          </Menu.Item>
        </Menu>
      </View>
      <Text style={styles.text}>Trigger: {triggerName}</Text>
      <Text style={styles.text}>Reaction: {reactionName}</Text>
      <Switch isChecked={trirea.enabled} onToggle={() => toggleActive()} />
    </View>
  )
}
