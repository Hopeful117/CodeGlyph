import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/authcontext.jsx'
import { SavedProvider } from './context/bookmarkContext.jsx'
import './index.scss'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <SavedProvider>
    <App />
    </SavedProvider>
    </AuthProvider>
  </StrictMode>,
)
