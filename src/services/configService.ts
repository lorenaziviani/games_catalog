import { env, getCacheConfig, getRetryConfig } from '@/config/env'
import { EnvironmentsType } from '@/types/common'

export const configService = {
  getApiConfig() {
    return {
      baseUrl: env.RAWG_API_BASE_URL,
      apiKey: env.RAWG_API_KEY,
      defaultPageSize: env.DEFAULT_PAGE_SIZE,
      maxPageSize: env.MAX_PAGE_SIZE
    }
  },

  getCacheConfig() {
    return getCacheConfig()
  },

  getRetryConfig() {
    return getRetryConfig()
  },

  getTimeoutConfig() {
    return {
      timeout: env.APP_ENV === EnvironmentsType.PRODUCTION ? 10000 : 5000,
      retryAttempts: env.RETRY_ATTEMPTS,
      retryDelay: env.RETRY_DELAY
    }
  },

  isDevelopment() {
    return env.APP_ENV === EnvironmentsType.DEVELOPMENT
  },

  isProduction() {
    return env.APP_ENV === EnvironmentsType.PRODUCTION
  }
}
