import { DarkTheme } from '@styles/theme'
import {
  screen,
  render as testingLibraryRender,
  waitFor,
  type RenderOptions
} from '@testing-library/react'
import type { ReactElement } from 'react'
import { ThemeProvider } from 'styled-components'
type CustomRenderProps = Omit<RenderOptions, 'queries'>

const customRender = (
  ui: ReactElement,
  { ...renderOptions }: CustomRenderProps = {}
) =>
  testingLibraryRender(
    <ThemeProvider theme={DarkTheme}>{ui}</ThemeProvider>,
    renderOptions
  )

export { customRender as render, screen, waitFor }
