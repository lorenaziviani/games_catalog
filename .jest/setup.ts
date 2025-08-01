Object.defineProperty(globalThis, 'import', {
  value: {
    meta: {
      env: {
        VITE_API_URL: 'http://localhost:3000',
        NODE_ENV: 'test',
        VITE_RAWG_API_KEY: 'test-api-key',
        VITE_RAWG_API_BASE_URL: 'https://api.rawg.io/api',
        VITE_APP_NAME: 'Games Catalog',
        VITE_APP_VERSION: '1.0.0',
        VITE_APP_ENV: 'test',
        VITE_ENABLE_DEBUG: 'true',
        VITE_ENABLE_DEVTOOLS: 'true',
        VITE_CACHE_DURATION: '300000',
        VITE_DEBOUNCE_DELAY: '500',
        VITE_RETRY_ATTEMPTS: '3',
        VITE_RETRY_DELAY: '1000',
        VITE_DEFAULT_PAGE_SIZE: '20',
        VITE_MAX_PAGE_SIZE: '50',
        VITE_LOGROCKET_APP_ID: 'test-logrocket-app-id',
        DEV: false
      }
    }
  },
  writable: true,
  configurable: true
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}))

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}))

// eslint-disable-next-line @typescript-eslint/no-require-imports
global.TextEncoder = require('util').TextEncoder
// eslint-disable-next-line @typescript-eslint/no-require-imports
global.TextDecoder = require('util').TextDecoder

import '@testing-library/jest-dom'
import 'jest-styled-components'
