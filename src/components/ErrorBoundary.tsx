import { captureError } from '@/services/observability/index'
import React from 'react'

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

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    // Reset error state when children change
    if (prevProps.children !== this.props.children && this.state.hasError) {
      this.setState({ hasError: false })
    }
  }

  resetError = () => {
    this.setState({ hasError: false }, () => {
      // Força re-render após reset
      this.forceUpdate()
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
          <button onClick={this.resetError}>Tentar novamente</button>
        </div>
      )
    }

    return this.props.children
  }

  // Método para forçar reset do estado (usado nos testes)
  forceReset = () => {
    this.setState({ hasError: false }, () => {
      this.forceUpdate()
    })
  }
}
