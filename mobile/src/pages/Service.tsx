import {useNavigation} from '@react-navigation/native'
import {Button, ChevronLeftIcon} from 'native-base'
import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import ActionDescriptionCard from '../components/ActionDescriptionCard'
import {FollowButton} from '../components/FollowButton'
import {Section} from '../components/Section'
import {
  useGetServiceQuery,
  useSubscribeMutation,
} from '../redux/services/service'
import {mappingOauth, MappingOauth} from '../utils/oauth'

type ServiceProps = {
  route: any
  navigation: any
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
})

export function Service({route, navigation}: ServiceProps) {
  const navigationRouter = useNavigation()
  const {id} = route.params
  const {data: service, isLoading} = useGetServiceQuery(id)

  const [subscribe] = useSubscribeMutation()
  const [oauthNeeded, setOauthNeeded] = useState<MappingOauth>()

  useEffect(() => {
    if (!service || service.subscribed) return
    const oauthMappingSelected = mappingOauth.find(
      oauth => oauth.name === service.name
    )
    if (oauthMappingSelected) {
      setOauthNeeded(oauthMappingSelected)
    }
  }, [service])

  if (!id) navigationRouter.navigate('Services' as never)

  if (isLoading) {
    return <View style={styles.container} />
  }

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
      <Section title={service?.name || ''}>{service?.description}</Section>
      {oauthNeeded ? (
        // TODO : Add a button to connect to the service
        <Button>Replace this</Button>
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
          isFollowing={service?.subscribed}
          onPress={() => {
            try {
              subscribe({serviceId: id, subscribed: !service?.subscribed})
            } catch (error) {
              // toast.error('Something went wrong')
            }
          }}
        />
      )}
      <ScrollView style={{marginTop: 10, height: '70%'}}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <Icon name="eye" size={30} />
          <Text style={{fontSize: 30}}>Triggers</Text>
        </View>
        {service?.triggers?.map(trigger => {
          return (
            <ActionDescriptionCard
              key={trigger.id}
              name={trigger.name}
              description={trigger.description || 'No description'}
              inputs={trigger.inputs?.map(input => input.name)}
              outputs={trigger.outputs?.map(output => output.name)}
            />
          )
        })}
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <Icon name="arrowright" size={30} />
          <Text style={{fontSize: 30}}>Reactions</Text>
        </View>
        {service?.reactions?.map(reaction => {
          return (
            <ActionDescriptionCard
              key={reaction.id}
              name={reaction.name}
              description={reaction.description || 'No description'}
              inputs={reaction.inputs?.map(input => input.name)}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}
