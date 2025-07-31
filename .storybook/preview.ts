import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from '@/styles/global'
import { DarkTheme, LightTheme } from '@/styles/theme'

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: LightTheme,
      dark: DarkTheme
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles
  })
]
