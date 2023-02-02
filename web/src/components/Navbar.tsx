import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MainButton } from '@/components/MainButton'
import { useLogoutMutation, useMeQuery } from '@/redux/services/user'

export const Navbar = () => {
  const navigate = useNavigate()
  const [logoutMutation] = useLogoutMutation()
  const { data } = useMeQuery()

  const services = () => {
    navigate('/login')
  }

  const dashboard = () => {
    navigate('/login')
  }

  const createTrirea = () => {
    console.log('create trirea')
  }

  const login = () => {
    navigate('/login')
  }

  const logout = async () => {
    try {
      await logoutMutation().unwrap()
      navigate('/login')
    } catch (error) {
      /* empty */
    }
    navigate('/login')
  }

  const me = async () => {
    try {
      console.log(data)
    } catch (error) {
      /* empty */
    }
  }

  const loc = useLocation()
  const isLogged =
    loc.pathname.includes('/dashboard') || loc.pathname.includes('/services')
  const isConnecting =
    loc.pathname.includes('/login') || loc.pathname.includes('/register')

  return (
    <header className="body-font flex w-full items-center justify-between border-b-2 border-black px-8 py-4">
      <Link to="/" className="text-4xl font-bold">
        Trirea
      </Link>
      {isLogged && (
        <div className="flex w-1/3 justify-around">
          <MainButton callback={me} text="me" />
          <MainButton callback={services} text="Services" primary={false} />
          <MainButton callback={dashboard} text="Dashboard" primary={false} />
          <MainButton callback={createTrirea} text="Create trirea" />
          <MainButton callback={logout} text="Logout" />
        </div>
      )}
      {!isLogged && !isConnecting && (
        <div className="flex w-1/3 justify-around">
          <MainButton callback={login} text="Login" />
        </div>
      )}
    </header>
  )
}
