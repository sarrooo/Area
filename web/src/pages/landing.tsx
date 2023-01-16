import React from 'react'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { MainButton } from 'components/mainButton'

const Landing = () => {
  function test() {
    console.log('test')
  }
  return (
    <div>
      <h1>Landing</h1>
      <MainButton text="text" callback={test} className="text-red" submitter={false}>
        <HiArrowNarrowRight />
      </MainButton>
    </div>
  )
}

export default Landing
