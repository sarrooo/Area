import React from 'react'
import { FcGoogle } from 'react-icons/fc'

import { MainButton } from '@/components/mainButton'
import { LoginWithButton } from '@/components/loginWithButton'
import { Input } from '@/components/input'

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
      <LoginWithButton logged text="Github" callback={test}>
        <FcGoogle />
      </LoginWithButton>
      <Input id="oueoue" placeholder="test" />
    </div>
  )
}

export default Landing
