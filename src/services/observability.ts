import LogRocket from 'logrocket'
import React from 'react'

const LOGROCKET_APP_ID = import.meta.env.VITE_LOGROCKET_APP_ID || ''

export const initializeLogRocket = () => {
  console.log('LogRocket Debug:', {
    LOGROCKET_APP_ID,
    isDev: import.meta.env.DEV,
    shouldInit: LOGROCKET_APP_ID && !import.meta.env.DEV
  })

  if (LOGROCKET_APP_ID) {
    console.log('Initializing LogRocket...')
    LogRocket.init(LOGROCKET_APP_ID)

    LogRocket.identify('anonymous', {
      name: 'Anonymous User',
      email: 'anonymous@example.com'
    })
    console.log('LogRocket initialized successfully!')
  } else {
    console.log('LogRocket not initialized:', {
      reason: 'APP_ID not configured'
    })
  }
}

export const captureError = (
  error: Error,
  context?: Record<string, string | number | boolean>
) => {
  console.log('captureError called:', { error: error.message, context })

  if (LOGROCKET_APP_ID) {
    LogRocket.captureException(error, {
      extra: context
    })
    console.log('Error sent to LogRocket')
  }

  if (import.meta.env.DEV) {
    console.error('Error captured:', error, context)
  }
}

export const captureEvent = (
  eventName: string,
  properties?: Record<string, string | number | boolean>
) => {
  if (LOGROCKET_APP_ID) {
    LogRocket.track(eventName, properties)
    console.log('Event sent to LogRocket:', eventName)
  }

  if (import.meta.env.DEV) {
    console.log('Event captured:', eventName, properties)
  }
}

export const capturePerformance = (
  metric: string,
  value: number,
  context?: Record<string, string | number | boolean>
) => {
  if (LOGROCKET_APP_ID) {
    LogRocket.track('performance_metric', {
      metric,
      value,
      ...context
    })
    console.log('Performance sent to LogRocket:', metric)
  }

  if (import.meta.env.DEV) {
    console.log('Performance captured:', metric, value, context)
  }
}

export const captureNavigation = (from: string, to: string) => {
  captureEvent('navigation', { from, to })
}

export const captureUserInteraction = (
  action: string,
  element: string,
  properties?: Record<string, string | number | boolean>
) => {
  captureEvent('user_interaction', {
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
  captureError(new Error(`API Error: ${endpoint} - ${status}`), {
    endpoint,
    status: String(status),
    error: error instanceof Error ? error.message : String(error)
  })
}

export const captureApiPerformance = (
  endpoint: string,
  duration: number,
  status: number
) => {
  capturePerformance('api_response_time', duration, {
    endpoint,
    status: String(status)
  })
}

export const useErrorHandler = () => {
  const handleError = React.useCallback(
    (error: Error, context?: Record<string, string | number | boolean>) => {
      captureError(error, context)
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
      captureEvent(eventName, properties)
    },
    []
  )

  const trackNavigation = React.useCallback((from: string, to: string) => {
    captureNavigation(from, to)
  }, [])

  const trackUserInteraction = React.useCallback(
    (
      action: string,
      element: string,
      properties?: Record<string, string | number | boolean>
    ) => {
      captureUserInteraction(action, element, properties)
    },
    []
  )

  return { trackEvent, trackNavigation, trackUserInteraction }
}
