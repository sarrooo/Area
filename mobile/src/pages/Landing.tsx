/* eslint-disable global-require */
import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {Center, KeyboardAvoidingView, Button, Modal} from 'native-base'
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import {useLoginMutation, useRegisterMutation} from '../redux/services/user'
import {emailRegex, passwordRegex} from '../utils/regex'
import {Section} from '../components/Section'

import {MainInput} from '../components/MainInput'
import {LoginWithButton} from '../components/LoginWithButton'
import {getOauthGoogleUrl} from '../utils/oauth/google'

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

export function Landing() {
  const isDarkMode = useColorScheme() === 'dark'
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const {
    handleSubmit,
    formState: {errors},
    control,
  } = useForm<LoginRequest>({reValidateMode: 'onSubmit'})
  const {
    handleSubmit: registerHandleSubmit,
    formState: {errors: registerErrors},
    control: registerControl,
  } = useForm<RegisterRequest>({reValidateMode: 'onSubmit'})
  const [loginMutation] = useLoginMutation()
  const [registerMutation] = useRegisterMutation()

  const submitLogin = async (data: LoginRequest) => {
    try {
      await loginMutation(data).unwrap()
    } catch (error) {
      /* ... */
    }
  }

  const submitRegister = async (data: RegisterRequest) => {
    try {
      await registerMutation(data).unwrap()
    } catch (error) {
      /* ... */
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
        colorScheme="cyan"
        width="1/2"
        rounded="lg"
        onPress={() => setShowLoginModal(true)}>
        Login
      </Button>
      <Image style={styles.image} source={require('../assets/universe.png')} />
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Login</Modal.Header>
          <Modal.Body>
            <MainInput
              id="email"
              label="Email"
              fieldName="email"
              placeholder="john.doe@email.com"
              control={control}
              isRequired={true}
              rules={{
                required: 'Required Field',
                pattern: {
                  value: emailRegex,
                  message: 'Invalid format email',
                },
              }}
              errors={errors}
            />
            <MainInput
              id="password"
              label="Password"
              fieldName="password"
              placeholder="*******"
              control={control}
              isRequired={true}
              inputType={'password'}
              rules={{
                required: 'Required Field',
              }}
              errors={errors}
            />
            <Button
              style={styles.submitButton}
              variant={'subtle'}
              onPress={handleSubmit(submitLogin)}>
              Login
            </Button>
            <Button variant={'ghost'} onPress={openOtherModal}>
              Register Instead
            </Button>
            <LoginWithButton
              url={getOauthGoogleUrl()}
              title="Login with google"
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Modal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}>
        <KeyboardAvoidingView style={{width: '100%'}} behavior="position">
          <Center>
            <Modal.Content maxWidth="400px">
              <Modal.CloseButton />
              <Modal.Header>Register</Modal.Header>
              <Modal.Body>
                <MainInput
                  id="first_name"
                  label="First Name"
                  fieldName="first_name"
                  placeholder="John"
                  isRequired
                  control={registerControl}
                  rules={{
                    required: 'Required Field',
                    minLength: {
                      value: 3,
                      message: 'Minimum 3 characters',
                    },
                  }}
                  errors={registerErrors}
                />
                <MainInput
                  id="last_name"
                  label="Last Name"
                  fieldName="last_name"
                  placeholder="Doe"
                  isRequired
                  control={registerControl}
                  rules={{
                    required: 'Required Field',
                    minLength: {
                      value: 3,
                      message: 'Minimum 3 characters',
                    },
                  }}
                  errors={registerErrors}
                />
                <MainInput
                  id="email"
                  label="Email"
                  fieldName="email"
                  placeholder="email@email.com"
                  isRequired
                  control={registerControl}
                  rules={{
                    required: 'Required Field',
                    pattern: {
                      value: emailRegex,
                      message: 'Invalid format email',
                    },
                  }}
                  errors={registerErrors}
                />
                <MainInput
                  id="password"
                  label="Password"
                  fieldName="password"
                  placeholder="*******"
                  isRequired
                  control={registerControl}
                  inputType="password"
                  rules={{
                    required: 'Required Field',
                    pattern: {
                      value: passwordRegex,
                      message:
                        'Invalid format password (8 characters, 1 uppercase, 1 lowercase, 1 number)',
                    },
                  }}
                  errors={registerErrors}
                />
                <MainInput
                  id="password_confirmation"
                  label="Confirm Password"
                  fieldName="password_confirmation"
                  placeholder="*******"
                  isRequired
                  control={registerControl}
                  inputType="password"
                  rules={{
                    required: 'Required Field',
                    pattern: {
                      value: passwordRegex,
                      message:
                        'Invalid format password (8 characters, 1 uppercase, 1 lowercase, 1 number)',
                    },
                  }}
                  errors={registerErrors}
                />
                <Button
                  style={styles.submitButton}
                  variant="subtle"
                  onPress={registerHandleSubmit(submitRegister)}>
                  Register
                </Button>
                <Button variant="ghost" onPress={openOtherModal}>
                  Login Instead
                </Button>
              </Modal.Body>
            </Modal.Content>
          </Center>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  )
}
