import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { validateApiConfig } from './config/api'
import { env, getCacheConfig, getRetryConfig, validateEnv } from './config/env'
import './styles/global.ts'

validateEnv()
validateApiConfig()

const cacheConfig = getCacheConfig()
const retryConfig = getRetryConfig()

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {env.ENABLE_DEVTOOLS && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </React.StrictMode>
)
