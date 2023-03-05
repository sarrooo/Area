import React, {useEffect, useState} from 'react'
import {useNavigation} from '@react-navigation/native'
import {InfoIcon, PlayIcon, Pressable} from 'native-base'
import {View, Text, StyleSheet, Button, Alert} from 'react-native'
import {Reaction} from '../types/Reaction'
import {Trigger} from '../types/Trigger'

import {FollowButton} from './FollowButton'
import {useSubscribeMutation} from '../redux/services/service'
import {MappingOauth, mappingOauth} from '../utils/oauth'

export type ServiceCardProps = {
  name: string
  id: number
  isFollowing: boolean
  triggers: Trigger[]
  reactions: Reaction[]
}

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
})

export function ServiceCard({
  id,
  name,
  isFollowing,
  triggers,
  reactions,
}: ServiceCardProps) {
  const navigation = useNavigation()
  const [subscribe] = useSubscribeMutation()

  const [oauthNeeded, setOauthNeeded] = useState<MappingOauth>()

  useEffect(() => {
    const oauthMappingSelected = mappingOauth.find(oauth => oauth.name === name)
    if (oauthMappingSelected) {
      setOauthNeeded(oauthMappingSelected)
    }
  })

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('Service' as never, {id} as never)}>
      <View style={styles.header}>
        <Text>{name}</Text>
        {oauthNeeded ? (
          // TODO : Add a button to connect to the service
          <Button title="Replace this" />
        ) : (
          // <LoginWithButton
          //   text="Connect"
          //   key={oauthNeeded.name}
          //   url={oauthNeeded.url}
          // >
          //   {oauthNeeded.icon}
          // </LoginWithButton>
          <FollowButton
            fontSize={20}
            isFollowing={isFollowing}
            onPress={() => {
              try {
                subscribe({serviceId: id, subscribed: !isFollowing})
              } catch (error) {
                Alert.alert('Error', 'Something went wrong')
              }
            }}
          />
        )}
      </View>
      <View style={styles.content}>
        <View>
          {triggers.map(trigger => {
            return (
              <View key={trigger.id} style={styles.trigger}>
                <InfoIcon style={styles.icon} />
                <Text key={trigger.id}>{trigger.name}</Text>
              </View>
            )
          })}
        </View>
        <View>
          {reactions.map(reaction => {
            return (
              <View key={reaction.id} style={styles.trigger}>
                <PlayIcon style={styles.icon} />
                <Text key={reaction.id}>{reaction.name}</Text>
              </View>
            )
          })}
        </View>
      </View>
    </Pressable>
  )
}
