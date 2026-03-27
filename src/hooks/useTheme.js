import { useState, useCallback, useEffect } from 'react'
import { siteConfig } from '../data/siteConfig'

const STORAGE_KEY = 'theme-preference'

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') return stored

  const configDefault = siteConfig.site.defaultTheme || 'system'
  if (configDefault === 'dark' || configDefault === 'light') return configDefault

  return getSystemTheme()
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  document.documentElement.dispatchEvent(
    new CustomEvent('theme-change', { detail: { theme } })
  )
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // Mark ready after first render to enable CSS transitions
  useEffect(() => {
    requestAnimationFrame(() => {
      document.documentElement.setAttribute('data-theme-ready', '')
    })
  }, [])

  // Follow system preference when no manual override is stored
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setTheme(mq.matches ? 'dark' : 'light')
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }, [])

  return { theme, toggleTheme, isDark: theme === 'dark' }
}
