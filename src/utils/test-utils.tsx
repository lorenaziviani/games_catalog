import { store } from '@/store'
import { DarkTheme } from '@styles/theme'
import {
  screen,
  render as testingLibraryRender,
  waitFor,
  type RenderOptions
} from '@testing-library/react'
import type { ReactElement } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

type CustomRenderProps = Omit<RenderOptions, 'queries'>

const customRender = (
  ui: ReactElement,
  { ...renderOptions }: CustomRenderProps = {}
) =>
  testingLibraryRender(
    <Provider store={store}>
      <ThemeProvider theme={DarkTheme}>{ui}</ThemeProvider>
    </Provider>,
    renderOptions
  )

export { customRender as render, screen, waitFor }
