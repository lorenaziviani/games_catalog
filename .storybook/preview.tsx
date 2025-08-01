import { configureStore } from '@reduxjs/toolkit'
import type { Preview } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import favoritesReducer from '../src/store/favorites/reducer'
import { LightTheme } from '../src/styles/theme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity
    }
  }
})

const store = configureStore({
  reducer: {
    favorites: favoritesReducer
  }
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff'
        },
        {
          name: 'dark',
          value: '#1a1a1a'
        },
        {
          name: 'gray',
          value: '#f5f5f5'
        }
      ]
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px'
          }
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px'
          }
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1200px',
            height: '800px'
          }
        }
      }
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'button-name',
            enabled: true
          },
          {
            id: 'color-contrast',
            enabled: true
          }
        ]
      }
    }
  },
  decorators: [
    Story => (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider theme={LightTheme}>
            <Story />
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    )
  ]
}

export default preview
