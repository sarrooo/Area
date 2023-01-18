import '@/App.css'
import { Routes, Route } from 'react-router-dom'

import Landing from '@/pages/Landing'
import NotFound from '@/pages/NotFound'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Services from '@/pages/Services'
import { Navbar } from '@/components/Navbar'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
