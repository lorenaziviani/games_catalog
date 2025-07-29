import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from '../src/styles/global'
import { DarkTheme, LightTheme } from '../src/styles/theme'

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
