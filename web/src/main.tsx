import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import * as dotenv from 'dotenv'

import App from './App'
import './index.css'
import 'react-toastify/dist/ReactToastify.min.css'

dotenv.config()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>
)
