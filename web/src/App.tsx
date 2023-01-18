import '@/App.css'
import { Routes, Route } from 'react-router-dom'

import Landing from '@/pages/landing'
import Services from '@/pages/Services'
import NotFound from '@/pages/notFound'
import Login from '@/pages/Login'
import SignUp from '@/pages/signUp'
import { Navbar } from '@/components/Navbar'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/services" element={<Services />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
