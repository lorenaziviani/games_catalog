import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import Header from './index'

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ]
}

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {}

export const WithContent: Story = {
  decorators: [
    Story => (
      <BrowserRouter>
        <div style={{ minHeight: '100vh' }}>
          <Story />
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>Conteúdo da página</h2>
            <p>Este é o conteúdo que aparece abaixo do header.</p>
          </div>
        </div>
      </BrowserRouter>
    )
  ]
}
