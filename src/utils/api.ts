import { getDefaultHeaders } from '@/config/api'
import { configService } from '@/services/configService'

const fetchWithHeaders = async (url: string) => {
  const timeoutConfig = configService.getTimeoutConfig()
  const headers = getDefaultHeaders()

  if (configService.isProduction()) {
    headers['Cache-Control'] = 'public, max-age=300'
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutConfig.timeout)

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      signal: controller.signal
    })

    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

export { fetchWithHeaders }
