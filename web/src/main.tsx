import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import * as dotenv from 'dotenv'
import { Provider } from 'react-redux'

import App from './App'
import { store } from '@/app/store'
import './index.css'
import 'react-toastify/dist/ReactToastify.min.css'

dotenv.config()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    <ToastContainer />
  </React.StrictMode>
)
