export interface ObservabilityProvider {
  initialize(): void
  captureError(
    error: Error,
    context?: Record<string, string | number | boolean>
  ): void
  captureEvent(
    eventName: string,
    properties?: Record<string, string | number | boolean>
  ): void
  capturePerformance(
    metric: string,
    value: number,
    context?: Record<string, string | number | boolean>
  ): void
  identify(
    userId: string,
    properties?: Record<string, string | number | boolean>
  ): void
}

export interface ObservabilityConfig {
  enabled: boolean
  providers: ObservabilityProvider[]
}
