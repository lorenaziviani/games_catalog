import { useState } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import Header from './components/common/layout/Header'
import ThemeButton from './components/features/theme/ThemeButton'
import ObservabilityWrapperWithErrorBoundary from './components/ObservabilityWrapper'
import RoutesApp from './routes'
import { store } from './store'
import * as S from './styles'
import { GlobalStyle } from './styles/global'
import { DarkTheme, LightTheme } from './styles/theme'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={isDarkMode ? DarkTheme : LightTheme}>
          <GlobalStyle />
          <ObservabilityWrapperWithErrorBoundary>
            <Header />
            <S.AppContainer>
              <S.ThemeButtonWrapper>
                <ThemeButton onClick={() => setIsDarkMode(!isDarkMode)} />
              </S.ThemeButtonWrapper>
              <RoutesApp />
            </S.AppContainer>
          </ObservabilityWrapperWithErrorBoundary>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
