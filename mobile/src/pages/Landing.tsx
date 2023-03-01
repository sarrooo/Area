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
import { Linking, Alert } from 'react-native'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'

import {MainInput} from '../components/MainInput'

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
  
  const sleep = async (timeout: any) => {
      return new Promise(resolve => setTimeout(resolve, timeout))
    }
  const openLink =  async () => {
      try {
        const url = 'https://github.com/proyecto26'
        if (await InAppBrowser.isAvailable()) {
          const result = await InAppBrowser.open(url, {
            // iOS Properties
            dismissButtonStyle: 'cancel',
            preferredBarTintColor: '#453AA4',
            preferredControlTintColor: 'white',
            readerMode: false,
            animated: true,
            modalPresentationStyle: 'fullScreen',
            modalTransitionStyle: 'coverVertical',
            modalEnabled: true,
            enableBarCollapsing: false,
            // Android Properties
            showTitle: true,
            toolbarColor: '#6200EE',
            secondaryToolbarColor: 'black',
            navigationBarColor: 'black',
            navigationBarDividerColor: 'white',
            enableUrlBarHiding: true,
            enableDefaultShare: true,
            forceCloseOnRedirection: false,
            // Specify full animation resource identifier(package:anim/name)
            // or only resource name(in case of animation bundled with app).
            animations: {
              startEnter: 'slide_in_right',
              startExit: 'slide_out_left',
              endEnter: 'slide_in_left',
              endExit: 'slide_out_right'
            },
            headers: {
              'my-custom-header': 'my custom header value'
            }
          })
          await this.sleep(800);
          Alert.alert(JSON.stringify(result))
        }
        else Linking.openURL(url)
      } catch (error) {
        Alert.alert(error?.message)
      }
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
      <Button onPress={openLink}>Test demo</Button>
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Login</Modal.Header>
          <Modal.Body>
            <MainInput
              id="email"
              label="Email"
              fieldName="email"
              placeholder='john.doe@email.com'
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
            <MainInput
              id="first_name"
              label="First Name"
              fieldName="first_name"
              placeholder="John"
              isRequired={true}
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
              isRequired={true}
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
              placeholder='email@email.com'
              isRequired={true}
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
              isRequired={true}
              control={registerControl}
              inputType={'password'}
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
              isRequired={true}
              control={registerControl}
              inputType={'password'}
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
