import {
  initializeLogRocket,
  useAnalytics
} from '@services/observability/index'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ErrorBoundary } from './ErrorBoundary'

interface ObservabilityWrapperProps {
  children: React.ReactNode
}

const ObservabilityWrapper: React.FC<ObservabilityWrapperProps> = ({
  children
}) => {
  const location = useLocation()
  const { trackNavigation, trackUserInteraction } = useAnalytics()

  useEffect(() => {
    initializeLogRocket()
  }, [])

  useEffect(() => {
    trackNavigation('navigation', location.pathname)
  }, [location.pathname, trackNavigation])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const element = target.tagName.toLowerCase()
      const text = target.textContent?.slice(0, 50) || ''

      trackUserInteraction('click', element, {
        text,
        pathname: location.pathname
      })
    }

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        const target = event.target as HTMLElement
        const element = target.tagName.toLowerCase()
        const text = target.textContent?.slice(0, 50) || ''

        trackUserInteraction('key_press', element, {
          key: event.key,
          text,
          pathname: location.pathname
        })
      }
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('keypress', handleKeyPress)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [trackUserInteraction, location.pathname])

  return <>{children}</>
}

export const ObservabilityWrapperWithErrorBoundary = (
  props: ObservabilityWrapperProps
) => (
  <ErrorBoundary>
    <ObservabilityWrapper {...props} />
  </ErrorBoundary>
)

export default ObservabilityWrapper
