import { BsGithub, BsTwitter } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { emailRegex, passwordRegex } from '@/utils/regex'
import { Input } from '@/components/Input'
import { LoginWithButton } from '@/components/LoginWithButton'
import { MainButton } from '@/components/MainButton'
import { RegisterRequest } from '@/types/Login'
import { useRegisterMutation } from '@/redux/services/user'
import { getOauthGoogleUrl } from '@/utils/oauth/google'
import { getOauthGithubUrl } from '@/utils/oauth/github'
import { getOauthTwitterUrl } from '@/utils/oauth/twitter'

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({ reValidateMode: 'onSubmit' })
  const navigate = useNavigate()
  const [registerMutation] = useRegisterMutation()

  const submitRegister = async (data: RegisterRequest) => {
    try {
      await registerMutation(data).unwrap()
      navigate('/dashboard')
    } catch (error) {
      toast.error('Invalid email or password')
    }
  }

  return (
    <div className="flex-rows flex w-full">
      <div className="flex h-full w-full flex-col items-center justify-between">
        <div className="mt-20 ml-12 h-full">
          <h1 className="text-6xl font-bold">
            Create an account to create your universe !
          </h1>
        </div>
        <img
          src="assets/circle.png"
          alt="circle background"
          className="absolute left-0 bottom-0"
        />
      </div>
      <div className="mt-3 flex h-full w-full items-center justify-center">
        <div className="h-min w-3/5 rounded-lg p-6 shadow-xl">
          <h1 className="text-center text-3xl font-bold">Register</h1>
          <form className="space-y-2" onSubmit={handleSubmit(submitRegister)}>
            <Input<RegisterRequest>
              id="first_name"
              label="First Name"
              placeholder="John"
              register={register}
              fieldName="first_name"
              rules={{ required: 'Required field' }}
              errors={errors}
            />
            <Input<RegisterRequest>
              id="last_name"
              label="Last Name"
              placeholder="Doe"
              register={register}
              fieldName="last_name"
              rules={{ required: 'Required field' }}
              errors={errors}
            />
            <Input<RegisterRequest>
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
            <Input<RegisterRequest>
              id="password"
              label="Password"
              inputType="password"
              placeholder="**********"
              register={register}
              fieldName="password"
              rules={{
                required: 'Required field',
                pattern: {
                  value: passwordRegex,
                  message:
                    'Invalid format password (8 characters, 1 uppercase, 1 lowercase, 1 number)',
                },
              }}
              errors={errors}
            />
            <Input<RegisterRequest>
              id="password_confirmation"
              label="Password Confirmation"
              inputType="password"
              placeholder="**********"
              register={register}
              fieldName="password_confirmation"
              rules={{
                required: 'Required field',
                pattern: {
                  value: passwordRegex,
                  message:
                    'Invalid format password (8 characters, 1 uppercase, 1 lowercase, 1 number)',
                },
              }}
              errors={errors}
            />
            <div className="flex-rows flex justify-around pt-3">
              <div className="">
                <p>Already have an account ?</p>
                <Link to="/login" className="underline hover:text-blue-500">
                  Login
                </Link>
              </div>
              <MainButton text="Register" submitter />
            </div>
          </form>
          <div className="my-8 h-[4px] w-full rounded-lg bg-gray-300" />
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
      </div>
    </div>
  )
}

export default Register
