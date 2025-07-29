import 'styled-components'
import { ThemeMode } from './common'

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: ThemeMode
    primary: string
    secondary: string
    tertiary: string
    quaternary: string
    quinary: string
    white: string
    rating: {
      excellent: string
      good: string
      average: string
      poor: string
      bad: string
    }
  }
}
