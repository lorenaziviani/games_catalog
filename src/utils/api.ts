import { getDefaultHeaders } from '@/config/api'
import { env, getTimeoutConfig } from '@/config/env'

const fetchWithHeaders = async (url: string) => {
  const timeoutConfig = getTimeoutConfig()
  const headers = getDefaultHeaders()

  if (env.APP_ENV === 'production') {
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
