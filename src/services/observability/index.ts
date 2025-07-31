import { ObservabilityService } from './ObservabilityService'
import { ConsoleProvider } from './providers/ConsoleProvider'
import { LogRocketProvider } from './providers/LogRocketProvider'
import type { ObservabilityConfig } from './types'

const createObservabilityConfig = (): ObservabilityConfig => {
  const providers = []

  providers.push(new ConsoleProvider())

  if (import.meta.env.VITE_LOGROCKET_APP_ID) {
    providers.push(new LogRocketProvider())
  }

  return {
    enabled: providers.length > 0,
    providers
  }
}

const observabilityService = new ObservabilityService(
  createObservabilityConfig()
)

export const initializeLogRocket = () => {
  observabilityService.initialize()
}

export const captureError = (
  error: Error,
  context?: Record<string, string | number | boolean>
) => {
  observabilityService.captureError(error, context)
}

export const captureEvent = (
  eventName: string,
  properties?: Record<string, string | number | boolean>
) => {
  observabilityService.captureEvent(eventName, properties)
}

export const capturePerformance = (
  metric: string,
  value: number,
  context?: Record<string, string | number | boolean>
) => {
  observabilityService.capturePerformance(metric, value, context)
}

export const captureNavigation = (from: string, to: string) => {
  observabilityService.captureEvent('navigation', { from, to })
}

export const captureUserInteraction = (
  action: string,
  element: string,
  properties?: Record<string, string | number | boolean>
) => {
  observabilityService.captureEvent('user_interaction', {
    action,
    element,
    ...properties
  })
}

export const captureApiError = (
  endpoint: string,
  status: number,
  error: unknown
) => {
  observabilityService.captureError(
    new Error(`API Error: ${endpoint} - ${status}`),
    {
      endpoint,
      status: String(status),
      error: error instanceof Error ? error.message : String(error)
    }
  )
}

export const captureApiPerformance = (
  endpoint: string,
  duration: number,
  status: number
) => {
  observabilityService.capturePerformance('api_response_time', duration, {
    endpoint,
    status: String(status)
  })
}

import React from 'react'

export const useErrorHandler = () => {
  const handleError = React.useCallback(
    (error: Error, context?: Record<string, string | number | boolean>) => {
      observabilityService.captureError(error, context)
    },
    []
  )

  return { handleError }
}

export const useAnalytics = () => {
  const trackEvent = React.useCallback(
    (
      eventName: string,
      properties?: Record<string, string | number | boolean>
    ) => {
      observabilityService.captureEvent(eventName, properties)
    },
    []
  )

  const trackNavigation = React.useCallback((from: string, to: string) => {
    observabilityService.captureEvent('navigation', { from, to })
  }, [])

  const trackUserInteraction = React.useCallback(
    (
      action: string,
      element: string,
      properties?: Record<string, string | number | boolean>
    ) => {
      observabilityService.captureEvent('user_interaction', {
        action,
        element,
        ...properties
      })
    },
    []
  )

  return { trackEvent, trackNavigation, trackUserInteraction }
}

export { observabilityService }
