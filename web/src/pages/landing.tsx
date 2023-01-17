import { MainButton } from '../components/mainButton'
import React from 'react'
import { HiArrowNarrowRight } from 'react-icons/hi'

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
      />
    </div>
  )
}

export default Landing
