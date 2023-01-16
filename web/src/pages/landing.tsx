import { MainButton } from 'components/MainButton'
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
        text="text"
        callback={test}
        className="text-red"
        submitter={false}
      >
        <HiArrowNarrowRight />
      </MainButton>
    </div>
  )
}

export default Landing
