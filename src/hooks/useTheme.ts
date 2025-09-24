'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme || 'system'
    setTheme(savedTheme)
  }, [])

  useEffect(() => {
    const updateTheme = () => {
      const root = document.documentElement
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      const appliedTheme = theme === 'system' ? systemTheme : theme
      
      setResolvedTheme(appliedTheme)
      
      if (appliedTheme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }

    updateTheme()

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', updateTheme)
      return () => mediaQuery.removeEventListener('change', updateTheme)
    }
  }, [theme])

  const setThemeMode = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return {
    theme,
    resolvedTheme,
    setTheme: setThemeMode,
    toggleTheme: () => {
      const newTheme = resolvedTheme === 'light' ? 'dark' : 'light'
      setThemeMode(newTheme)
    }
  }
}

