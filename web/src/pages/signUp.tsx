import { Input } from '@/components/Input'
import { MainButton } from '@/components/MainButton'

const SignUp = () => {
  const signin = () => {
    console.log('Signin')
  }

  return (
    <div className="w-full flex flex-rows">
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <h1 className="text-4xl font-bold">Sign Up</h1>
      </div>
      <div className="flex items-center justify-center w-full h-screen">
        <div className="space-y-2 h-3/4 w-3/5 p-4 rounded-lg shadow-xl bg-green-400">
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
              <p>Already have an account ? </p>
              <a className="underline" href="/login">
                Login
              </a>
            </div>
            <MainButton callback={signin} text="Sign-in" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
