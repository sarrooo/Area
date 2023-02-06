import React, { useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { BsGithub, BsTwitter } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Input } from '@/components/Input'
import { MainButton } from '@/components/MainButton'
import { LoginWithButton } from '@/components/LoginWithButton'
import { useLoginMutation } from '@/redux/services/user'
import { LoginRequest } from '@/types/Login'
import { emailRegex } from '@/utils/regex'
import { getOauthGoogleUrl } from '@/utils/oauth/google'
import { getOauthGithubUrl } from '@/utils/oauth/github'
import { getOauthTwitterUrl } from '@/utils/oauth/twitter'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({ reValidateMode: 'onSubmit' })
  const navigate = useNavigate()
  const [loginMutation] = useLoginMutation()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const error = searchParams.get('error')
    if (error) {
      toast.error(error.replace(/"|'/g, ''))
    }
  }, [])

  const submitLogin = async (data: LoginRequest) => {
    try {
      await loginMutation(data).unwrap()
      navigate('/dashboard')
    } catch (error) {
      toast.error('Invalid email or password')
    }
  }

  return (
    <div className="flex justify-between p-32">
      <div>
        <h1 className="text-6xl font-bold">Welcome back !</h1>
      </div>
      <div className="w-1/3 space-y-8 rounded-lg bg-white p-8 shadow-xl">
        <h1 className="text-center text-3xl font-bold">Login</h1>
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
          <div className="flex items-center justify-around">
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
        <div className="flex flex-col items-center justify-center space-y-4">
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
          <LoginWithButton
            text="Twitter"
            url={getOauthTwitterUrl()}
            className="w-3/4"
          >
            <BsTwitter />
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
