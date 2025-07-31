import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import Header from './components/common/layout/Header'
import ThemeButton from './components/features/theme/ThemeButton'
import ObservabilityWrapperWithErrorBoundary from './components/ObservabilityWrapper'
import { useTheme } from './hooks/useTheme'
import RoutesApp from './routes'
import { store } from './store'
import * as S from './styles'
import { GlobalStyle } from './styles/global'
import { ThemeMode } from './types/common'

function App() {
  const { theme, toggleTheme, setTheme, currentTheme } = useTheme()

  const showThemeButton =
    currentTheme === ThemeMode.LIGHT || currentTheme === ThemeMode.DARK

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <ObservabilityWrapperWithErrorBoundary>
            <Header setTheme={setTheme} />
            <S.AppContainer>
              {showThemeButton && (
                <S.ThemeButtonWrapper>
                  <ThemeButton onClick={toggleTheme} />
                </S.ThemeButtonWrapper>
              )}
              <RoutesApp />
            </S.AppContainer>
          </ObservabilityWrapperWithErrorBoundary>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
