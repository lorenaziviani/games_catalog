import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '@/styles/global'
import { DarkTheme, LightTheme } from '@/styles/theme'
import ThemeButton from './index'

const meta: Meta<typeof ThemeButton> = {
  title: 'Features/Theme/ThemeButton',
  component: ThemeButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Botão para alternar entre tema claro e escuro'
      }
    }
  },
  argTypes: {
    onClick: { action: 'clicked' }
  }
}

export default meta
type Story = StoryObj<typeof ThemeButton>

export const Default: Story = {
  decorators: [
    Story => {
      const [isDarkMode, setIsDarkMode] = useState(false)

      const handleToggle = () => {
        setIsDarkMode(!isDarkMode)
        console.log('Theme toggled to:', !isDarkMode ? 'dark' : 'light')
      }

      return (
        <ThemeProvider theme={isDarkMode ? DarkTheme : LightTheme}>
          <GlobalStyle />
          <div
            style={{
              width: '100vw',
              height: '100vh',
              position: 'relative',
              backgroundColor: isDarkMode
                ? DarkTheme.secondary
                : LightTheme.secondary,
              color: isDarkMode ? DarkTheme.primary : LightTheme.primary
            }}
          >
            <Story args={{ onClick: handleToggle }} />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                padding: '20px'
              }}
            >
              <h2>Tema Atual: {isDarkMode ? 'Escuro' : 'Claro'}</h2>
              <p>Clique no botão para alternar o tema</p>
            </div>
          </div>
        </ThemeProvider>
      )
    }
  ]
}
