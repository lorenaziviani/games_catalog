import type { IObservabilityService } from '../interfaces/IObservabilityService'
import type { ObservabilityConfig, ObservabilityProvider } from './types'

export class ObservabilityService implements IObservabilityService {
  private providers: ObservabilityProvider[] = []
  private isInitialized = false

  constructor(config: ObservabilityConfig) {
    this.providers = config.providers
  }

  initialize(): void {
    if (this.isInitialized) {
      console.warn('ObservabilityService already initialized')
      return
    }

    this.providers.forEach(provider => {
      try {
        provider.initialize()
      } catch (error) {
        console.error('Failed to initialize observability provider:', error)
      }
    })

    this.isInitialized = true
    console.log(
      `ObservabilityService initialized with ${this.providers.length} providers`
    )
  }

  captureError(
    error: Error,
    context?: Record<string, string | number | boolean>
  ): void {
    this.providers.forEach(provider => {
      try {
        provider.captureError(error, context)
      } catch (err) {
        console.error('Failed to capture error in provider:', err)
      }
    })
  }

  captureEvent(
    eventName: string,
    properties?: Record<string, string | number | boolean>
  ): void {
    this.providers.forEach(provider => {
      try {
        provider.captureEvent(eventName, properties)
      } catch (error) {
        console.error('Failed to capture event in provider:', error)
      }
    })
  }

  capturePerformance(
    metric: string,
    value: number,
    context?: Record<string, string | number | boolean>
  ): void {
    this.providers.forEach(provider => {
      try {
        provider.capturePerformance(metric, value, context)
      } catch (error) {
        console.error('Failed to capture performance in provider:', error)
      }
    })
  }

  identify(
    userId: string,
    properties?: Record<string, string | number | boolean>
  ): void {
    this.providers.forEach(provider => {
      try {
        provider.identify(userId, properties)
      } catch (error) {
        console.error('Failed to identify user in provider:', error)
      }
    })
  }

  captureApiError(endpoint: string, status: number, error: unknown): void {
    this.captureError(new Error(`API Error: ${endpoint} - ${status}`), {
      endpoint,
      status: String(status),
      error: error instanceof Error ? error.message : String(error)
    })
  }

  captureApiPerformance(
    endpoint: string,
    duration: number,
    status: number
  ): void {
    this.capturePerformance('api_response_time', duration, {
      endpoint,
      status: String(status)
    })
  }
}
