import {
  AddIcon,
  Button,
  useDisclose,
  Actionsheet,
  Input,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Center,
} from 'native-base'
import React from 'react'
import {useNavigation} from '@react-navigation/native'
import {View, StyleSheet} from 'react-native'
import {Section} from '../components/Section'
import {TrireaCard} from '../components/TrireaCard'
import {useLogoutMutation} from '../redux/services/user'
import {useGetTrireasQuery} from '../redux/services/trirea'
import {TrireaForms} from '../components/TrireaForms'
import {Trirea} from '../types/Trirea'
import { LoginWithButton } from '../components/LoginWithButton'

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
})

export function Dashboard() {
  const navigation = useNavigation()
  const {isOpen, onClose} = useDisclose()
  const [logoutMutation] = useLogoutMutation()
  const {data: trireas} = useGetTrireasQuery()

  const [showTrireaModal, setShowTrireaModal] = React.useState(false)

  const logout = async () => {
    try {
      await logoutMutation().unwrap()
    } catch (error) {
      /* ... */
    }
  }

  return (
    <View style={styles.container}>
      <LoginWithButton />
      <Section title="Dashboard">Create and find all your trireas here</Section>
      <Button
        colorScheme="primary"
        rounded="lg"
        position="absolute"
        bottom={12}
        zIndex={1}
        shadow={2}
        right={8}
        onPress={() => navigation.navigate('Services' as never)}>
        Go to services
      </Button>
      <Button
        colorScheme="danger"
        rounded="lg"
        width="24"
        position="absolute"
        top={12}
        right={8}
        onPress={logout}>
        Logout
      </Button>
      <Button
        rounded="lg"
        rightIcon={<AddIcon />}
        colorScheme="success"
        borderStyle="dashed"
        borderColor="black"
        onPress={() => setShowTrireaModal(true)}>
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
        {trireas &&
          trireas.map((trirea: Trirea) => {
            return (
              <TrireaCard
                key={trirea.id}
                id={trirea.id ? trirea.id : -1}
                name={trirea.name}
                triggerName={trirea.triggerId.toString()}
                reactionName={trirea.reactionId.toString()}
                trirea={trirea}
              />
            )
          })}
      </ScrollView>
      <Modal isOpen={showTrireaModal}>
        <KeyboardAvoidingView style={{width: '100%'}} behavior="position">
          <Center>
            <Modal.Content>
              <Modal.CloseButton onPress={() => setShowTrireaModal(false)} />
              <Modal.Header>Login</Modal.Header>
              <Modal.Body>
                <TrireaForms
                  toggleModal={() => setShowTrireaModal(!showTrireaModal)}
                />
              </Modal.Body>
            </Modal.Content>
          </Center>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  )
}
