import { LightTheme } from '@/styles/theme'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import Pagination from './index'

const meta: Meta<typeof Pagination> = {
  title: 'Features/Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered'
  },
  decorators: [
    Story => (
      <ThemeProvider theme={LightTheme}>
        <div style={{ padding: '2rem' }}>
          <Story />
        </div>
      </ThemeProvider>
    )
  ],
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    showInfo: true
  }
}

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 20,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    showInfo: true
  }
}

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    showInfo: true
  }
}

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    showInfo: true
  }
}

export const WithoutInfo: Story = {
  args: {
    currentPage: 3,
    totalPages: 8,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    showInfo: false
  }
}

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    showInfo: true
  }
}

export const ManyPages: Story = {
  args: {
    currentPage: 50,
    totalPages: 100,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    showInfo: true
  }
}
