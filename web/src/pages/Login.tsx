import React from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { BsGithub } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Input } from '@/components/Input'
import { MainButton } from '@/components/MainButton'
import { LoginWithButton } from '@/components/LoginWithButton'
import { useLoginMutation } from '@/services/user'
import { LoginRequest } from '@/types/Login'
import { emailRegex } from '@/utils/email'
import { getOauthGoogleUrl } from '@/utils/oauth/google'
import { getOauthGithubUrl } from '@/utils/oauth/github'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({ reValidateMode: 'onSubmit' })
  const [login] = useLoginMutation()

  const submitLogin = async (data: LoginRequest) => {
    try {
      await login(data).unwrap()
      // TODO: slice loginUser(payload)
    } catch (error) {
      toast.error('Invalid email or password')
    }
  }

  return (
    <div className="flex justify-between p-32">
      <div>
        <h1 className="text-6xl font-bold">Welcome back !</h1>
      </div>
      <div className="p-8 bg-white shadow-xl rounded-lg w-1/3 space-y-8">
        <h1 className="text-3xl text-center font-bold">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit(submitLogin)}>
          <Input<LoginRequest>
            id="email"
            label="Email"
            placeholder="john.doe@email.com"
            register={register}
            fieldName="email"
            rules={{
              required: 'Required field',
              pattern: {
                value: emailRegex,
                message: 'Invalid format email',
              },
            }}
            errors={errors}
          />
          <Input<LoginRequest>
            id="password"
            label="Password"
            inputType="password"
            placeholder="***********"
            register={register}
            fieldName="password"
            rules={{
              required: 'Required field',
            }}
            errors={errors}
          />
          <div className="flex justify-around items-center">
            <p>
              Don&apos;t have an account ?
              <Link
                to="/register"
                className="text-left underline hover:text-blue-500"
              >
                Create one
              </Link>
            </p>
            <MainButton text="Login" submitter />
          </div>
        </form>
        <div className="h-[4px] w-full rounded-lg bg-gray-300" />
        <div className="flex flex-col justify-center items-center space-y-4">
          <LoginWithButton
            text="Google"
            url={getOauthGoogleUrl()}
            className="w-3/4"
          >
            <FcGoogle />
          </LoginWithButton>
          <LoginWithButton
            text="Github"
            url={getOauthGithubUrl()}
            className="w-3/4"
          >
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
