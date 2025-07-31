import { useCallback } from 'react'
import { useAnalytics, useErrorHandler } from '../services/observability'

export const useObservability = () => {
  const { trackEvent, trackNavigation, trackUserInteraction } = useAnalytics()
  const { handleError } = useErrorHandler()

  const trackGameView = useCallback(
    (gameId: number, gameName: string) => {
      trackEvent('game_view', { gameId, gameName })
    },
    [trackEvent]
  )

  const trackGameFavorite = useCallback(
    (gameId: number, gameName: string, isFavorite: boolean) => {
      trackEvent('game_favorite', { gameId, gameName, isFavorite })
    },
    [trackEvent]
  )

  const trackGameSearch = useCallback(
    (query: string, resultsCount: number) => {
      trackEvent('game_search', { query, resultsCount })
    },
    [trackEvent]
  )

  const trackGameFilter = useCallback(
    (filterType: string, filterValue: string) => {
      trackEvent('game_filter', { filterType, filterValue })
    },
    [trackEvent]
  )

  const trackPageView = useCallback(
    (pageName: string) => {
      trackNavigation('page_view', pageName)
    },
    [trackNavigation]
  )

  const trackPerformance = useCallback(
    (
      metric: string,
      value: number,
      context?: Record<string, string | number | boolean>
    ) => {
      trackEvent('performance_metric', { metric, value, ...context })
    },
    [trackEvent]
  )

  const trackError = useCallback(
    (error: Error, context?: Record<string, string | number | boolean>) => {
      handleError(error, context)
    },
    [handleError]
  )

  const trackClick = useCallback(
    (element: string, context?: Record<string, string | number | boolean>) => {
      trackUserInteraction('click', element, context)
    },
    [trackUserInteraction]
  )

  const trackKeyPress = useCallback(
    (
      key: string,
      element: string,
      context?: Record<string, string | number | boolean>
    ) => {
      trackUserInteraction('key_press', element, { key, ...context })
    },
    [trackUserInteraction]
  )

  return {
    trackGameView,
    trackGameFavorite,
    trackGameSearch,
    trackGameFilter,

    trackPageView,

    trackPerformance,

    trackError,

    trackClick,
    trackKeyPress,

    trackEvent,
    trackNavigation,
    trackUserInteraction,
    handleError
  }
}
