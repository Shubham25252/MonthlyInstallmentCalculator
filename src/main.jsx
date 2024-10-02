import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BankDashboard from './BankDashboard'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BankDashboard />
  </StrictMode>,
)
