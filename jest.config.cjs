const path = require('path')

module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  coverageReporters: ['html', 'text', 'text-summary', 'json'],
  collectCoverage: true,
  testMatch: ['**/?(*.)(test).ts?(x)'],
  collectCoverageFrom: [
    'src/**/*.ts(x)?',
    '!src/**/*.stories.tsx',
    '!src/styles/**/*.ts',
    '!src/types/**/*.d.ts',
    '!src/utils/**/*.ts',
    '!src/hooks/**/*.ts',
    '!src/**/mock.ts(x)?',
    '!src/**/*.mock.ts(x)?',
    '!src/**/__mocks__/**/*.ts(x)?',
    '!src/**/styles.ts',
    '!**/styles.ts',
    '!**/*styles.ts',
    '!**/*.mock.ts',
    '!**/*.mock.tsx',
    '!**/mock.ts',
    '!**/mock.tsx',
    '!**/*mock.ts',
    '!**/*mock.tsx',
    '!src/config/*.mock.ts',
    '!src/services/*.mock.ts',
    '!src/**/__mocks__/*.ts',
    '!src/**/__mocks__/*.tsx',
    '!src/config/env.mock.ts',
    '!src/config/api.mock.ts',
    '!src/services/configService.mock.ts',
    '!src/components/__mocks__/observabilityMock.ts',
    '!src/**/interfaces/**/*.ts',
    '!src/**/interfaces/**/*.tsx',
    '!src/**/interfaces/*.ts',
    '!src/**/interfaces/*.tsx',
    '!src/services/interfaces/**/*.ts',
    '!src/store/favorites/interfaces/**/*.ts',
    '!src/domain/repositories/**/*.ts',
    '!src/domain/entities/**/*.ts',
    '!src/domain/aggregates/**/*.ts',
    '!src/main.tsx'
  ],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  modulePaths: ['<rootDir>/src/', '<rootDir>/.jest'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@/config/env$': '<rootDir>/src/config/env.mock.ts',
    '^@/services/configService$':
      '<rootDir>/src/services/configService.mock.ts',
    '^@/config/api$': '<rootDir>/src/config/api.mock.ts'
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          ['@babel/preset-react', { runtime: 'automatic' }],
          '@babel/preset-typescript'
        ],
        plugins: [['babel-plugin-styled-components', { ssr: false }]]
      }
    ]
  },
  transformIgnorePatterns: ['node_modules/(?!(styled-components)/)'],
  globals: {
    'import.meta': {
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
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '.*\\.styles\\.ts$',
    '.*/styles\\.ts$',
    '.*styles\\.ts$',
    '.*/styles\\.ts$',
    'styles\\.ts$',
    '.*\\.mock\\.ts$',
    '.*\\.mock\\.tsx$',
    '.*/__mocks__/.*',
    '.*mock\\.ts$',
    '.*mock\\.tsx$',
    '.*/interfaces/.*',
    '.*interfaces\\.ts$',
    '.*interfaces\\.tsx$',
    '.*main\\.tsx$',
    'config/env.ts$',
    '.*types\\.ts$'
  ]
}
