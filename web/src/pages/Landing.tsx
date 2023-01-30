import React from 'react'

import { useNavigate } from 'react-router-dom'
import { MainButton } from '@/components/MainButton'

const Landing = () => {
  const navigate = useNavigate()
  const register = () => {
    navigate('/register')
  }

  return (
    <div className="flex justify-between">
      <div className="space-y-16 p-24">
        <h1 className="text-6xl font-bold">Create your own universe</h1>
        <MainButton text="Get started" callback={register} />
        <p className="text-lg w-2/3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          odio justo, eleifend vestibulum iaculis eget, ultrices ut dui. Etiam
          in ante ac magna lobortis placerat ac at eros. Nulla iaculis imperdiet
          augue nec auctor. Praesent posuere, orci in viverra eleifend, odio
          ante vehicula dui, et cursus nibh nulla nec erat. In commodo
          scelerisque mauris nec ultricies.
        </p>
      </div>
      <img src="assets/circleWithLogos.png" alt="circle background" />
    </div>
  )
}

export default Landing
