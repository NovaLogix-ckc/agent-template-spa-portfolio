import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/variables.css'
import './styles/reset.css'
import './styles/typography.css'
import './styles/grain.css'
import App from './App.jsx'
import { siteConfig } from './data/siteConfig'
import { getInitialTheme, applyTheme } from './hooks/useTheme'

// Apply light/dark theme before React renders to prevent flash
applyTheme(getInitialTheme())

// Apply theme overrides to :root before React renders
if (siteConfig.theme) {
  const root = document.documentElement
  Object.entries(siteConfig.theme).forEach(([prop, value]) => {
    root.style.setProperty(prop, value)
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
