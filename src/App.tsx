import { useState } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import Header from './components/Header'
import ThemeButton from './components/ThemeButton'
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
          <Header />
          <S.AppContainer>
            <S.ThemeButtonWrapper>
              <ThemeButton onClick={() => setIsDarkMode(!isDarkMode)} />
            </S.ThemeButtonWrapper>
            <RoutesApp />
          </S.AppContainer>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
