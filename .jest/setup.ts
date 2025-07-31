import '@testing-library/jest-dom'
import 'jest-styled-components'

Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: {
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
        VITE_MAX_PAGE_SIZE: '50'
      }
    }
  }
})

// eslint-disable-next-line @typescript-eslint/no-require-imports
global.TextEncoder = require('util').TextEncoder
// eslint-disable-next-line @typescript-eslint/no-require-imports
global.TextDecoder = require('util').TextDecoder
