import React from 'react'
import { MainButton } from '../components/mainButton'
import { LoginWithButton } from '../components/loginWithButton'
import { FcGoogle } from 'react-icons/fc'

export const Landing = () => {
  const test = () => {
    console.log('test')
  }

  return (
    <div>
      <h1>Landing</h1>
      <MainButton
        text="Sign in"
        callback={test}
        submitter={false}
        disabled={false}
      />
      <LoginWithButton logged text="Google" callback={test}>
        <FcGoogle />
      </LoginWithButton>
    </div>
  )
}

export default Landing
