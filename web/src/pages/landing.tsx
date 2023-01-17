import React from 'react'
import { MainButton } from '../components/mainButton'

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
        className="text-red"
        submitter={false}
        disabled={false}
      />
    </div>
  )
}

export default Landing
