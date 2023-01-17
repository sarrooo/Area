import React from 'react'
import { FcGoogle } from 'react-icons/fc'

import { MainButton } from '@/components/MainButton'
import { LoginWithButton } from '@/components/LoginWithButton'
import { Input } from '@/components/Input'

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
