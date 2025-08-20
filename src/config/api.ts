import { configService } from '@services/configService'
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

  let url: URL
  if (baseUrl.startsWith('http://') || baseUrl.startsWith('https://')) {
    url = new URL(baseUrl + '/' + path)
  } else {
    const currentOrigin = window.location.origin
    url = new URL(currentOrigin + baseUrl + '/' + path)
  }

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

  if (configService.isDevelopment()) {
    console.log('URL construída:', url.toString())
  } else {
    // Log para debug em produção (pode ser removido depois)
    console.log('URL construída (produção):', url.toString())
  }

  return url.toString()
}

export const testUrlConstruction = (): void => {
  try {
    const testEndpoint = 'genres'
    const result = getRawgApiUrl(testEndpoint)
    console.log('✅ Teste de construção de URL:', {
      endpoint: testEndpoint,
      result,
      baseUrl: API_CONFIG.BASE_URL
    })
  } catch (error) {
    console.error('❌ Erro no teste de construção de URL:', error)
  }
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

  // Debug para produção
  console.log('API Config:', {
    BASE_URL: API_CONFIG.BASE_URL,
    API_KEY: API_CONFIG.API_KEY ? '***' : 'não configurada',
    IS_ABSOLUTE_URL: API_CONFIG.BASE_URL.startsWith('http'),
    CURRENT_ORIGIN:
      typeof window !== 'undefined' ? window.location.origin : 'N/A'
  })
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
  return configService.getTimeoutConfig()
}
