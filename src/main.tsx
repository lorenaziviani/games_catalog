import { configService } from '@services/configService'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { validateApiConfig } from './config/api'
import { validateEnv } from './config/env'
import './styles/global.ts'

validateEnv()
validateApiConfig()

const cacheConfig = configService.getCacheConfig()
const retryConfig = configService.getRetryConfig()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: cacheConfig.staleTime,
      gcTime: cacheConfig.duration,
      retry: (failureCount, error) => {
        if (error instanceof Error && error.message.includes('401')) {
          return false
        }
        return failureCount < retryConfig.attempts
      },
      retryDelay: attemptIndex =>
        Math.min(retryConfig.delay * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true
    },
    mutations: {
      retry: 1,
      retryDelay: retryConfig.delay
    }
  }
})

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {configService.isDevelopment() && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  </React.StrictMode>
)
