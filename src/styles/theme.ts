import type { DefaultTheme } from 'styled-components'
import { ThemeMode } from '../types/common'

export const LightTheme: DefaultTheme = {
  mode: ThemeMode.LIGHT,
  primary: '#171b31',
  secondary: '#fefefe',
  tertiary: '#9b3430',
  quaternary: '#aeb7c2',
  quinary: '#3b5fa4',
  white: '#ffffff',
  rating: {
    excellent: '#4CAF50',
    good: '#8BC34A',
    average: '#FFC107',
    poor: '#FF9800',
    bad: '#F44336'
  }
}

export const DarkTheme: DefaultTheme = {
  mode: ThemeMode.DARK,
  primary: '#fefefe',
  secondary: '#171b31',
  tertiary: '#aeb7c2',
  quaternary: '#3b5fa4',
  quinary: '#9b3430',
  white: '#ffffff',
  rating: {
    excellent: '#4CAF50',
    good: '#8BC34A',
    average: '#FFC107',
    poor: '#FF9800',
    bad: '#F44336'
  }
}
