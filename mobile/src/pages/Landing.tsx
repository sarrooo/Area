import React, {useState} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {Input} from 'native-base'
import {useLoginMutation, useRegisterMutation} from '../redux/services/user'
import {emailRegex, passwordRegex} from '../utils/regex'
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Text,
} from 'react-native'
import {Section} from '../components/Section'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import {Button, FormControl, Modal} from 'native-base'
export interface LoginRequest {
  email: string
  password: string
}
export interface RegisterRequest {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
}

export const Landing = () => {
  const isDarkMode = useColorScheme() === 'dark'
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const {
    register,
    handleSubmit,
    formState: {errors},
    control,
  } = useForm<LoginRequest>({reValidateMode: 'onSubmit'})
  const {
    register: registerRegister,
    handleSubmit: registerHandleSubmit,
    formState: {errors: registerErrors},
    control: registerControl,
    watch,
  } = useForm<RegisterRequest>({reValidateMode: 'onSubmit'})
  const [loginMutation] = useLoginMutation()
  const [registerMutation] = useRegisterMutation()

  const submitLogin = async (data: LoginRequest) => {
    try {
      await loginMutation(data).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  const submitRegister = async (data: RegisterRequest) => {
    try {
      await registerMutation(data).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  const openOtherModal = () => {
    setShowLoginModal(!showLoginModal)
    setShowRegisterModal(!showRegisterModal)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.black : Colors.white}
      />
      <Section title="Trirea">
        Welcome to trirea, change your world, your universe
      </Section>
      <Button
        colorScheme={'cyan'}
        width={'1/2'}
        rounded={'lg'}
        onPress={() => setShowLoginModal(true)}>
        Login
      </Button>
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Login</Modal.Header>
          <Modal.Body>
            <FormControl isRequired isInvalid={'email' in errors}>
              <FormControl.Label>Email</FormControl.Label>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    placeholder="john.doe@email.com"
                  />
                )}
                name="email"
                rules={{
                  required: 'Required Field',
                  pattern: {
                    value: emailRegex,
                    message: 'Invalid format email',
                  },
                }}
                defaultValue=""
              />
              <FormControl.ErrorMessage>
                {errors.email?.message}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={'password' in errors}>
              <FormControl.Label>Password</FormControl.Label>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    type="password"
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    placeholder="*******"
                  />
                )}
                name="password"
                rules={{
                  required: 'Required Field',
                }}
                defaultValue=""
              />
              <FormControl.ErrorMessage>
                {errors.password?.message}
              </FormControl.ErrorMessage>
            </FormControl>
            <Button
              style={styles.submitButton}
              variant={'subtle'}
              onPress={handleSubmit(submitLogin)}>
              Login
            </Button>
            <Button variant={'ghost'} onPress={openOtherModal}>
              Register Instead
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Modal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Register</Modal.Header>
          <Modal.Body>
            <FormControl isRequired isInvalid={'first_name' in registerErrors}>
              <FormControl.Label>First name</FormControl.Label>
              <Controller
                control={registerControl}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    placeholder="John"
                  />
                )}
                name="first_name"
                rules={{required: 'Required Field', minLength: 3}}
                defaultValue=""
              />
              <FormControl.ErrorMessage>
                {registerErrors.first_name?.message}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={'last_name' in registerErrors}>
              <FormControl.Label>Last name</FormControl.Label>
              <Controller
                control={registerControl}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    placeholder="Doe"
                  />
                )}
                name="last_name"
                rules={{required: 'Required Field', minLength: 3}}
                defaultValue=""
              />
              <FormControl.ErrorMessage>
                {registerErrors.last_name?.message}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={'email' in registerErrors}>
              <FormControl.Label>Email</FormControl.Label>
              <Controller
                control={registerControl}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    placeholder="email@email.com"
                  />
                )}
                name="email"
                rules={{
                  required: 'Required Field',
                  pattern: {
                    value: emailRegex,
                    message: 'Invalid format email',
                  },
                }}
                defaultValue=""
              />
              <FormControl.ErrorMessage>
                {registerErrors.email?.message}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={'password' in registerErrors}>
              <FormControl.Label>password</FormControl.Label>
              <Controller
                control={registerControl}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    type="password"
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    placeholder="******"
                  />
                )}
                name="password"
                rules={{
                  required: 'Required Field',
                  pattern: {
                    value: passwordRegex,
                    message:
                      'Invalid format password (8 characters, 1 uppercase, 1 lowercase, 1 number)',
                  },
                }}
                defaultValue=""
              />
              <FormControl.ErrorMessage>
                {registerErrors.password?.message}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={'password_confirmation' in registerErrors}>
              <FormControl.Label>Confirm password</FormControl.Label>
              <Controller
                control={registerControl}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    type="password"
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    placeholder="******"
                  />
                )}
                name="password_confirmation"
                rules={{
                  required: 'Required Field',
                  pattern: {
                    value: passwordRegex,
                    message:
                      'Invalid format password (8 characters, 1 uppercase, 1 lowercase, 1 number)',
                  },
                }}
                defaultValue=""
              />
              <FormControl.ErrorMessage>
                {registerErrors.password_confirmation?.message}
              </FormControl.ErrorMessage>
            </FormControl>
            <Button
              style={styles.submitButton}
              variant={'subtle'}
              onPress={registerHandleSubmit(submitRegister)}>
              Register
            </Button>
            <Button variant={'ghost'} onPress={openOtherModal}>
              Login Instead
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Image style={styles.image} source={require('../assets/universe.png')} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  container: {
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    height: '100%',
  },
  submitButton: {
    marginTop: 12,
  },
})
