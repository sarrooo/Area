import { Navigate, Outlet } from 'react-router-dom'
import { Dashboard } from '@/pages/Dashboard'
import Landing from '@/pages/Landing'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Service from '@/pages/Service'
import Services from '@/pages/Services'
import OauthCallback from '@/pages/OauthCallback'
import NotFound from '@/pages/NotFound'

const routes = (isLoggedIn: boolean) => [
  {
    path: '/',
    children: [
      { path: '/', element: <Landing /> },
      { path: '/oauth_callback', element: <OauthCallback /> },
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
          { path: '/service/:id', element: <Service /> },
        ],
      },
      { path: '/*', element: <NotFound /> },
    ],
  },
]

export default routes
