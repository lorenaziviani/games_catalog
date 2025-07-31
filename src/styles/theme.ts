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

export const ColorblindTheme: DefaultTheme = {
  mode: ThemeMode.COLORBLIND,
  primary: '#022fa3',
  secondary: '#fefefe',
  tertiary: '#615a48',
  quaternary: '#8c8889',
  quinary: '#7083cf',
  white: '#ffffff',
  rating: {
    excellent: '#ab9f38',
    good: '#0054fc',
    average: '#fff83b',
    poor: '#a39302',
    bad: '#615a48'
  }
}

export const HighContrastTheme: DefaultTheme = {
  mode: ThemeMode.DARK,
  primary: '#ffff00',
  secondary: '#000000',
  tertiary: '#00ffff',
  quaternary: '#000000',
  quinary: '#ff0000',
  white: '#ffffff',
  rating: {
    excellent: '#00ff00',
    good: '#00ffff',
    average: '#ffff00',
    poor: '#ff8000',
    bad: '#ff0000'
  }
}
