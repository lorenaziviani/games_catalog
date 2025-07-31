import type { DefaultTheme } from 'styled-components'
import { TextVariant, ThemeMode } from '@/types/common'

export const isDarkMode = (theme: DefaultTheme): boolean => {
  return theme.mode === ThemeMode.DARK
}

export const isLightMode = (theme: DefaultTheme): boolean => {
  return theme.mode === ThemeMode.LIGHT
}

export const getThemeColor = (
  theme: DefaultTheme,
  lightColor: string,
  darkColor: string
): string => {
  return isDarkMode(theme) ? darkColor : lightColor
}

export const getTextColorByVariant = (
  variant: TextVariant,
  theme: DefaultTheme
) => {
  switch (variant) {
    case TextVariant.PRIMARY:
      return theme.primary
    case TextVariant.SECONDARY:
      return theme.secondary
    case TextVariant.TERTIARY:
      return theme.tertiary
    case TextVariant.QUATERNARY:
      return theme.quaternary
    case TextVariant.QUINARY:
      return theme.quinary
    case TextVariant.WHITE:
      return theme.white
    default:
      return theme.primary
  }
}

export const getDarkPrimaryLightSecondary = (theme: DefaultTheme): string => {
  return isDarkMode(theme) ? theme.primary : theme.secondary
}

export const getDarkSecondaryLightQuaternary = (
  theme: DefaultTheme
): string => {
  return isDarkMode(theme) ? theme.secondary : theme.quaternary
}

export const getDarkQuaternaryLightPrimary = (theme: DefaultTheme): string => {
  return isDarkMode(theme) ? theme.quaternary : theme.primary
}

export const getDarkSecondaryLightPrimary = (theme: DefaultTheme): string => {
  return isDarkMode(theme) ? theme.secondary : theme.primary
}

export const getDarkTertiaryLightQuaternary = (theme: DefaultTheme): string => {
  return isDarkMode(theme) ? theme.tertiary : theme.quaternary
}
