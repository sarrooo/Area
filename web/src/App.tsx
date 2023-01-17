import './App.css'
import { Routes, Route } from 'react-router-dom'

import Landing from '@/pages/Landing'
import NotFound from '@/pages/NotFound'
import Login from '@/pages/Login'
import SignUp from '@/pages/SignUp'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
