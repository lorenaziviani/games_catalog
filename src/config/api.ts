import { env } from './env'

export const API_CONFIG = {
  BASE_URL: env.RAWG_API_BASE_URL,
  API_KEY: env.RAWG_API_KEY,
  DEFAULT_PAGE_SIZE: env.DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE: env.MAX_PAGE_SIZE
} as const

export const getRawgApiUrl = (endpoint: string): string => {
  const baseUrl = API_CONFIG.BASE_URL
  const apiKey = API_CONFIG.API_KEY

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint

  const [path, queryString] = cleanEndpoint.split('?')

  const url = new URL(baseUrl + '/' + path)

  if (queryString) {
    const params = new URLSearchParams(queryString)
    params.forEach((value, key) => {
      url.searchParams.set(key, value)
    })
  }

  if (apiKey) {
    const existingParams = url.searchParams.toString()
    url.search = ''

    url.searchParams.set('key', apiKey)

    if (existingParams) {
      const params = new URLSearchParams(existingParams)
      params.forEach((value, key) => {
        url.searchParams.set(key, value)
      })
    }
  }

  if (env.ENABLE_DEBUG) {
    console.log('URL construída:', url.toString())
  }

  return url.toString()
}

export const validateApiConfig = (): void => {
  if (!API_CONFIG.BASE_URL) {
    throw new Error('API_BASE_URL não configurada')
  }

  if (!API_CONFIG.API_KEY) {
    console.warn(
      'API_KEY não configurada. Algumas funcionalidades podem não funcionar.'
    )
  }
}

export const getDefaultHeaders = (): Record<string, string> => {
  return {
    accept: '*/*',
    'accept-language': 'pt-BR,pt;q=0.9,en;q=0.8',
    origin: window.location.origin,
    referer: window.location.origin + '/',
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
  }
}

export const getTimeoutConfig = () => {
  return {
    timeout: env.APP_ENV === 'production' ? 10000 : 5000,
    retryAttempts: env.RETRY_ATTEMPTS,
    retryDelay: env.RETRY_DELAY
  }
}
