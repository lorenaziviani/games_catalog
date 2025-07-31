import {
  ColorblindTheme,
  DarkTheme,
  HighContrastTheme,
  LightTheme
} from '@/styles/theme'
import { ThemeMode } from '@/types/common'
import { useState } from 'react'

const THEME_STORAGE_KEY = 'app-theme'

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    return saved ? (saved as ThemeMode) : ThemeMode.LIGHT
  })

  const getTheme = () => {
    switch (currentTheme) {
      case ThemeMode.DARK:
        return DarkTheme
      case ThemeMode.COLORBLIND:
        return ColorblindTheme
      case ThemeMode.HIGH_CONTRAST:
        return HighContrastTheme
      default:
        return LightTheme
    }
  }

  const setTheme = (theme: ThemeMode) => {
    setCurrentTheme(theme)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }

  const toggleTheme = () => {
    const newTheme =
      currentTheme === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT
    setTheme(newTheme)
  }

  return {
    theme: getTheme(),
    currentTheme,
    setTheme,
    toggleTheme
  }
}
