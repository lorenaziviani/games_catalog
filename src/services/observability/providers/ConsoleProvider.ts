import type { ObservabilityProvider } from '@/services/observability/types'

export class ConsoleProvider implements ObservabilityProvider {
  initialize(): void {
    console.log('Console Provider initialized for development')
  }

  captureError(
    error: Error,
    context?: Record<string, string | number | boolean>
  ): void {
    console.error('Error captured:', {
      message: error.message,
      stack: error.stack,
      context
    })
  }

  captureEvent(
    eventName: string,
    properties?: Record<string, string | number | boolean>
  ): void {
    console.log('Event captured:', {
      event: eventName,
      properties
    })
  }

  capturePerformance(
    metric: string,
    value: number,
    context?: Record<string, string | number | boolean>
  ): void {
    console.log('⚡ Performance captured:', {
      metric,
      value,
      context
    })
  }

  identify(
    userId: string,
    properties?: Record<string, string | number | boolean>
  ): void {
    console.log('👤 User identified:', {
      userId,
      properties
    })
  }
}
