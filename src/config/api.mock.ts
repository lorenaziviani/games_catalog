import { configService } from '@services/configService.mock'

export const API_CONFIG = {
  BASE_URL: 'https://api.rawg.io/api',
  API_KEY: 'test-api-key',
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 50
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

  return url.toString()
}

export const validateApiConfig = (): void => {
  // Mock implementation
}

export const getDefaultHeaders = (): Record<string, string> => {
  return {
    accept: '*/*',
    'accept-language': 'pt-BR,pt;q=0.9,en;q=0.8',
    origin: 'http://localhost:3000',
    referer: 'http://localhost:3000/',
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
  }
}

export const getTimeoutConfig = () => {
  return configService.getTimeoutConfig()
}
