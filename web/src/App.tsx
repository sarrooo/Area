import '@/App.css'

import { useRoutes } from 'react-router-dom'
import routes from './routes'
import { useAppSelector } from '@/redux/hooks'
import { Navbar } from '@/components/Navbar'

function App() {
  const isLogged = useAppSelector((state) => state.user.isLogged)

  const routing = useRoutes(routes(isLogged))

  return (
    <div className="App">
      <Navbar />
      {routing}
    </div>
  )
}

export default App
