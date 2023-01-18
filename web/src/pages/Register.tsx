import { BsGithub } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import { Input } from '@/components/Input'
import { LoginWithButton } from '@/components/LoginWithButton'
import { MainButton } from '@/components/MainButton'

const Register = () => {
  const signin = () => {
    console.log('Signin')
  }

  return (
    <div className="w-full flex flex-rows">
      <div className="flex flex-col items-center justify-between w-full h-full">
        <div className="h-full mt-20 ml-12">
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
      <div className="flex items-center justify-center mt-20 w-full h-full">
        <div className="h-min w-3/5 p-6 rounded-lg shadow-xl">
          <h1 className="text-3xl text-center font-bold">Register</h1>
          {/* <form className="space-y-2">
            <Input
              id="firstname"
              className=""
              label="First Name"
              placeholder="John"
            />
            <Input
              id="lastname"
              className=""
              label="Last Name"
              placeholder="Doe"
            />
            <Input
              id="email"
              className=""
              label="Email"
              placeholder="john@doe.com"
            />
            <Input
              id="password"
              className=""
              label="Password"
              typeInput="password"
              placeholder="********"
            />
            <div className="flex flex-rows justify-around pt-3">
              <div className="">
                <p>Already have an account ?</p>
                <Link to="/login" className="underline hover:text-blue-500">
                  Login
                </Link>
              </div>
              <MainButton callback={signin} text="Sign-in" />
            </div>
          </form> */}
          <div className="my-8 h-[4px] w-full rounded-lg bg-gray-300" />
          <div className="flex flex-col justify-center items-center space-y-4">
            <LoginWithButton text="Google" callback={signin} className="w-3/4">
              <FcGoogle />
            </LoginWithButton>
            <LoginWithButton text="Github" callback={signin} className="w-3/4">
              <BsGithub />
            </LoginWithButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
