import {View, Text, Alert} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import React, {useEffect} from 'react'
import {login} from '../redux/features/userSlice'
import {store} from '../redux/store'
import {Section} from '../components/Section'
import {useIdentifyMutation} from '../redux/services/user'

export function CallbackSubscribe(props: any) {
  const token = props?.route?.params?.token?.toString()
  const navigation = useNavigation()
  const [identifyMutation] = useIdentifyMutation()

  useEffect(() => {
    try {
      console.log('token', token)
      store.dispatch(login({token}))
      console.log('Calling identify mutation')
      identifyMutation({token})
      console.log('Finished flow subscribe')
    } catch (e) {
      console.log(e)
      Alert.alert('Error', 'Something went wrong could not connect')
      navigation.navigate('Landing')
    }
  }, [])

  return (
    <View>
      <Section title="Authentication processing">Just a moment...</Section>
      <Text>User token: {token}</Text>
    </View>
  )
}
