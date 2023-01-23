import { Navigate, useLocation } from 'react-router-dom'
import { ReactElement } from 'react'
import { useAppSelector } from '@/app/hooks'

type ProtectedRoutesProps = {
  children: ReactElement
}

const ProtectedRoute = ({ children }: ProtectedRoutesProps) => {
  const isLogged = useAppSelector((state) => state.user.isLogged)
  const location = useLocation()

  if (!isLogged) {
    return Navigate({
      to: '/login?error="Must be authenticated"',
      state: { from: location },
    })
  }
  return children
}

export default ProtectedRoute
