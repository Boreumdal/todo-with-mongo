import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SystemContext } from './context/SystemContext'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <SystemContext>
        <App />
      </SystemContext>
    </BrowserRouter>
  </React.StrictMode>,
)
