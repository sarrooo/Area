import { Navigate, useLocation } from 'react-router-dom'
import { ReactElement } from 'react'
import { useAppSelector } from '@/redux/hooks'

type ProtectedRoutesProps = {
  children: ReactElement
}

const ProtectedRoute = ({ children }: ProtectedRoutesProps) => {
  const token = (getState() as RootState).user.isLogged
  console.log('token: ', token)

  const isLogged = useAppSelector((state) => state.user.isLogged)
  const location = useLocation()

  console.log('sksk: ', isLogged)
  if (!isLogged) {
    return Navigate({
      to: '/login?error="Must be authenticated"',
      state: { from: location },
    })
  }
  return children
}

export default ProtectedRoute
