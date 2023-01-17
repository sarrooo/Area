import React from 'react'
import { Link } from 'react-router-dom'

import { FcGoogle } from 'react-icons/fc'
import { BsGithub } from 'react-icons/bs'

import { Input } from '@/components/input'
import { MainButton } from '@/components/mainButton'
import { LoginWithButton } from '@/components/loginWithButton'

const Login = () => {
  const test = () => {
    console.log('test')
  }

  return (
    <div className="flex justify-between p-32">
      <div>
        <h1 className="text-6xl font-bold">Welcome back !</h1>
      </div>
      <div className="p-8 bg-white shadow-xl rounded-lg w-1/3 text-center space-y-8">
        <h1 className="text-3xl font-bold">Login</h1>
        <form className="space-y-4">
          <Input id="email" placeholder="John.doe@email.com" />
          <Input id="password" />
          <div className="flex justify-around items-center">
            <p>
              Don&apos;t have an account{' '}
              <Link to="/signup" className="underline hover:text-blue-500">
                create one
              </Link>
            </p>
            <MainButton callback={test} text="Login" submitter />
          </div>
        </form>
        <div className="h-[4px] w-full rounded-lg bg-gray-300" />
        <div className="flex flex-col justify-center items-center space-y-4">
          <LoginWithButton text="Google" callback={test} className="w-3/4">
            <FcGoogle />
          </LoginWithButton>
          <LoginWithButton text="Github" callback={test} className="w-3/4">
            <BsGithub />
          </LoginWithButton>
        </div>
      </div>
      <img
        src="assets/circle.png"
        alt="circle background"
        className="absolute left-0 bottom-0"
      />
    </div>
  )
}

export default Login
