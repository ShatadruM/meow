import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LoadingProvider } from './context/LoadingContext.jsx' // <-- 1. Import the Provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Wrap the App component */}
    <LoadingProvider>
      <App />
    </LoadingProvider>
  </StrictMode>,
)