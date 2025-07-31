import { EnvironmentsType, type Environment } from '@/types/common'

interface EnvConfig {
  RAWG_API_KEY: string
  RAWG_API_BASE_URL: string
  APP_NAME: string
  APP_VERSION: string
  APP_ENV: Environment
  ENABLE_DEBUG: boolean
  ENABLE_DEVTOOLS: boolean
  CACHE_DURATION: number
  DEBOUNCE_DELAY: number
  RETRY_ATTEMPTS: number
  RETRY_DELAY: number
  DEFAULT_PAGE_SIZE: number
  MAX_PAGE_SIZE: number
}

const getEnvVar = <T>(
  key: string,
  defaultValue: T,
  converter?: (value: string) => T
): T => {
  const value = import.meta.env[key]

  if (value === undefined) {
    if (defaultValue === undefined) {
      throw new Error(`Environment variable ${key} is required but not set`)
    }
    return defaultValue
  }

  if (converter) {
    return converter(value)
  }

  return value as T
}

const toBoolean = (value: string): boolean => {
  return value.toLowerCase() === 'true'
}

const toNumber = (value: string): number => {
  const num = parseInt(value, 10)
  if (isNaN(num)) {
    throw new Error(`Invalid number for environment variable: ${value}`)
  }
  return num
}

export const env: EnvConfig = {
  // API Configuration
  RAWG_API_KEY: getEnvVar('VITE_RAWG_API_KEY', ''),
  RAWG_API_BASE_URL: getEnvVar(
    'VITE_RAWG_API_BASE_URL',
    'https://api.rawg.io/api'
  ),

  // App Configuration
  APP_NAME: getEnvVar('VITE_APP_NAME', 'Games Catalog'),
  APP_VERSION: getEnvVar('VITE_APP_VERSION', '1.0.0'),
  APP_ENV: getEnvVar('VITE_APP_ENV', EnvironmentsType.DEVELOPMENT, value => {
    if (!['development', 'production', 'test'].includes(value)) {
      throw new Error(`Invalid APP_ENV: ${value}`)
    }
    return value as EnvironmentsType
  }),

  // Feature Flags
  ENABLE_DEBUG: getEnvVar('VITE_ENABLE_DEBUG', true, toBoolean),
  ENABLE_DEVTOOLS: getEnvVar('VITE_ENABLE_DEVTOOLS', true, toBoolean),

  // Performance Configuration
  CACHE_DURATION: getEnvVar('VITE_CACHE_DURATION', 300000, toNumber),
  DEBOUNCE_DELAY: getEnvVar('VITE_DEBOUNCE_DELAY', 500, toNumber),
  RETRY_ATTEMPTS: getEnvVar('VITE_RETRY_ATTEMPTS', 3, toNumber),
  RETRY_DELAY: getEnvVar('VITE_RETRY_DELAY', 1000, toNumber),

  // Pagination
  DEFAULT_PAGE_SIZE: getEnvVar('VITE_DEFAULT_PAGE_SIZE', 20, toNumber),
  MAX_PAGE_SIZE: getEnvVar('VITE_MAX_PAGE_SIZE', 50, toNumber)
}

export const validateEnv = (): void => {
  if (!env.RAWG_API_KEY) {
    console.warn(
      'RAWG_API_KEY não configurada. Algumas funcionalidades podem não funcionar.'
    )
  }

  if (env.APP_ENV === 'production' && env.ENABLE_DEBUG) {
    console.warn('DEBUG habilitado em produção. Considere desabilitar.')
  }

  if (env.APP_ENV === 'production' && env.ENABLE_DEVTOOLS) {
    console.warn('DEVTOOLS habilitado em produção. Considere desabilitar.')
  }
}

export const isDevelopment = (): boolean => {
  return env.APP_ENV === EnvironmentsType.DEVELOPMENT
}

export const isProduction = (): boolean => {
  return env.APP_ENV === EnvironmentsType.PRODUCTION
}

export const isTest = (): boolean => {
  return env.APP_ENV === EnvironmentsType.TEST
}

export const getCacheConfig = () => {
  return {
    duration: isProduction() ? env.CACHE_DURATION * 2 : env.CACHE_DURATION,
    staleTime: isProduction() ? 10 * 60 * 1000 : 5 * 60 * 1000
  }
}

export const getRetryConfig = () => {
  return {
    attempts: isProduction() ? env.RETRY_ATTEMPTS + 1 : env.RETRY_ATTEMPTS,
    delay: isProduction() ? env.RETRY_DELAY * 1.5 : env.RETRY_DELAY
  }
}

export const getTimeoutConfig = () => {
  return {
    timeout: isProduction() ? 10000 : 5000,
    retryAttempts: env.RETRY_ATTEMPTS,
    retryDelay: env.RETRY_DELAY
  }
}
