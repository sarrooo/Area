import '@/App.css'
import { Routes, Route } from 'react-router-dom'

import Landing from '@/pages/Landing'
import NotFound from '@/pages/NotFound'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Services from '@/pages/Services'
import { Navbar } from '@/components/Navbar'
import { Service } from '@/pages/Service'
import { Dashboard } from '@/pages/Dashboard'
import ProtectedRoute from '@/components/ProtectedRoutes'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />
        <Route
          path="/service"
          element={
            <ProtectedRoute>
              <Service />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
