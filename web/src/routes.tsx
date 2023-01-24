import { Navigate, Outlet } from 'react-router-dom'
import { Dashboard } from '@/pages/Dashboard'
import Landing from '@/pages/Landing'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import { Service } from '@/pages/Service'
import Services from '@/pages/Services'

const routes = (isLoggedIn: boolean) => [
  {
    path: '/',
    children: [
      { path: '/', element: <Landing /> },
      {
        path: '/',
        element: isLoggedIn ? <Navigate to="/dashboard" /> : <Outlet />,
        children: [
          { path: '/login', element: <Login /> },
          { path: '/register', element: <Register /> },
        ],
      },
      {
        path: '/',
        element: isLoggedIn ? (
          <Outlet />
        ) : (
          <Navigate to='/login?error="Must be authenticated"' />
        ),
        children: [
          { path: '/dashboard', element: <Dashboard /> },
          { path: '/services', element: <Services /> },
          { path: '/service', element: <Service /> },
        ],
      },
    ],
  },
]

export default routes
