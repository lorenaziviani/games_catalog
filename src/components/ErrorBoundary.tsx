import React from 'react'
import { captureError } from '../services/observability/index'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error('ErrorBoundary caught error:', error)
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    captureError(error, {
      componentName: 'ErrorBoundary',
      errorInfo: JSON.stringify(errorInfo)
    })
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div
          data-testid="error-message"
          style={{ padding: '20px', textAlign: 'center' }}
        >
          <h2>Algo deu errado</h2>
          <p>Desculpe, ocorreu um erro inesperado.</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Tentar novamente
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
