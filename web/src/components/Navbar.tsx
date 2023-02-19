import { Link, useNavigate } from 'react-router-dom'
import { MainButton } from '@/components/MainButton'
import { useLogoutMutation } from '@/redux/services/user'
import { useAppSelector } from '../redux/hooks'

export const Navbar = () => {
  const navigate = useNavigate()
  const [logoutMutation] = useLogoutMutation()

  const login = () => {
    navigate('/login')
  }
  const services = () => {
    navigate('/services')
  }
  const dashboard = () => {
    navigate('/dashboard')
  }
  const logout = async () => {
    try {
      await logoutMutation().unwrap()
    } catch (error) {
      /* empty */
    }
    navigate('/login')
  }

  const isLogged = useAppSelector((state) => state.user.isLogged)

  return (
    <header className="body-font flex w-full items-center justify-between border-b-2 border-black px-8 py-4">
      <Link to="/" className="text-4xl font-bold">
        Trirea
      </Link>
      {isLogged ? (
        <div className="flex w-1/3 justify-around">
          <MainButton callback={services} text="Services" primary={false} />
          <MainButton callback={dashboard} text="Dashboard" primary={false} />
          <MainButton callback={logout} text="Logout" />
        </div>
      ) : (
        <div className="flex w-1/3 justify-around">
          <MainButton callback={login} text="Login" />
        </div>
      )}
    </header>
  )
}
