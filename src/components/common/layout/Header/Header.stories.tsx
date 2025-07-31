import { store } from '@/store'
import { LightTheme } from '@/styles/theme'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import Header from './index'

const HeaderWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={LightTheme}>
        <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
      </ThemeProvider>
    </Provider>
  )
}

const meta: Meta<typeof Header> = {
  title: 'Common/Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    Story => (
      <HeaderWrapper>
        <Story />
      </HeaderWrapper>
    )
  ]
}

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {}

export const WithContent: Story = {
  render: () => (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Conteúdo da página</h2>
        <p>Este é o conteúdo que aparece abaixo do header.</p>
      </div>
    </div>
  )
}
