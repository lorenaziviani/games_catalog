import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import ThemeButton from './components/ThemeButton'
import { GlobalStyle } from './styles/global'
import { DarkTheme, LightTheme } from './styles/theme'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <>
      <ThemeProvider theme={isDarkMode ? DarkTheme : LightTheme}>
        <GlobalStyle />
        <ThemeButton onClick={() => setIsDarkMode(!isDarkMode)} />
        <h1>Catálogo de Heróis</h1>
      </ThemeProvider>
    </>
  )
}

export default App
