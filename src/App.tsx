import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import Header from './components/Header'
import ThemeButton from './components/ThemeButton'
import RoutesApp from './routes'
import { GlobalStyle } from './styles/global'
import { DarkTheme, LightTheme } from './styles/theme'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <BrowserRouter>
      <ThemeProvider theme={isDarkMode ? DarkTheme : LightTheme}>
        <GlobalStyle />
        <Header />
        <ThemeButton onClick={() => setIsDarkMode(!isDarkMode)} />
        <RoutesApp />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
