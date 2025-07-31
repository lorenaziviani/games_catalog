export interface IObservabilityService {
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
  captureApiError(endpoint: string, status: number, error: unknown): void
  captureApiPerformance(
    endpoint: string,
    duration: number,
    status: number
  ): void
}
