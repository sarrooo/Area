import React from 'react'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { mainButton } from '../components/mainButton'

const Landing = () => {
  function test() {
    console.log('test')
  }
  return (
    <div>
      <h1>Landing</h1>
      <mainButton text="text" callback={test} className="text-red" submitter={false}>
        <HiArrowNarrowRight />
      </mainButton>
    </div>
  )
}

export default Landing
