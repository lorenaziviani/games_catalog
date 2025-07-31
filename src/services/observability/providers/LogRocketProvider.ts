import LogRocket from 'logrocket'
import type { ObservabilityProvider } from '../types'

const LOGROCKET_APP_ID = import.meta.env.VITE_LOGROCKET_APP_ID || ''

export class LogRocketProvider implements ObservabilityProvider {
  private isInitialized = false

  initialize(): void {
    console.log('LogRocket Debug:', {
      LOGROCKET_APP_ID,
      isDev: import.meta.env.DEV,
      shouldInit: LOGROCKET_APP_ID && !import.meta.env.DEV
    })

    if (LOGROCKET_APP_ID && !this.isInitialized) {
      console.log('Initializing LogRocket...')
      LogRocket.init(LOGROCKET_APP_ID)

      LogRocket.identify('anonymous', {
        name: 'Anonymous User',
        email: 'anonymous@example.com'
      })

      this.isInitialized = true
      console.log('LogRocket initialized successfully!')
    } else {
      console.log('LogRocket not initialized:', {
        reason: 'APP_ID not configured or already initialized'
      })
    }
  }

  captureError(
    error: Error,
    context?: Record<string, string | number | boolean>
  ): void {
    console.log('captureError called:', { error: error.message, context })

    if (LOGROCKET_APP_ID && this.isInitialized) {
      LogRocket.captureException(error, {
        extra: context
      })
      console.log('Error sent to LogRocket')
    }

    if (import.meta.env.DEV) {
      console.error('Error captured:', error, context)
    }
  }

  captureEvent(
    eventName: string,
    properties?: Record<string, string | number | boolean>
  ): void {
    if (LOGROCKET_APP_ID && this.isInitialized) {
      LogRocket.track(eventName, properties)
      console.log('Event sent to LogRocket:', eventName)
    }

    if (import.meta.env.DEV) {
      console.log('Event captured:', eventName, properties)
    }
  }

  capturePerformance(
    metric: string,
    value: number,
    context?: Record<string, string | number | boolean>
  ): void {
    if (LOGROCKET_APP_ID && this.isInitialized) {
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

  identify(
    userId: string,
    properties?: Record<string, string | number | boolean>
  ): void {
    if (LOGROCKET_APP_ID && this.isInitialized) {
      LogRocket.identify(userId, properties)
      console.log('User identified in LogRocket:', userId)
    }

    if (import.meta.env.DEV) {
      console.log('User identified:', userId, properties)
    }
  }
}
