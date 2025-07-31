import { captureError } from '@/services/observability/index'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { ErrorBoundary } from './ErrorBoundary'

jest.mock('@/services/observability/index', () => ({
  captureError: jest.fn()
}))

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Erro de teste')
  }
  return <div>Componente normal</div>
}

describe('ErrorBoundary', () => {
  const mockCaptureError = jest.mocked(captureError)

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('Renderização Básica', () => {
    it('deve renderizar children quando não há erro', () => {
      render(
        <ErrorBoundary>
          <div data-testid="child-component">Conteúdo normal</div>
        </ErrorBoundary>
      )

      expect(screen.getByTestId('child-component')).toBeInTheDocument()
      expect(screen.getByText('Conteúdo normal')).toBeInTheDocument()
    })

    it('deve renderizar mensagem de erro quando há erro', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(screen.getByTestId('error-message')).toBeInTheDocument()
      expect(screen.getByText('Algo deu errado')).toBeInTheDocument()
      expect(
        screen.getByText('Desculpe, ocorreu um erro inesperado.')
      ).toBeInTheDocument()
      expect(screen.getByText('Tentar novamente')).toBeInTheDocument()
    })
  })

  describe('Captura de Erros', () => {
    it('deve capturar erro e chamar captureError', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(mockCaptureError).toHaveBeenCalledWith(expect.any(Error), {
        componentName: 'ErrorBoundary',
        errorInfo: expect.any(String)
      })
    })

    it('deve capturar diferentes tipos de erro', () => {
      const TypeErrorComponent = () => {
        throw new TypeError('Erro de tipo')
      }

      render(
        <ErrorBoundary>
          <TypeErrorComponent />
        </ErrorBoundary>
      )

      expect(mockCaptureError).toHaveBeenCalledWith(
        expect.any(TypeError),
        expect.objectContaining({
          componentName: 'ErrorBoundary'
        })
      )
    })

    it('deve capturar erro com informações detalhadas', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      const callArgs = mockCaptureError.mock.calls[0]
      expect(callArgs[0]).toBeInstanceOf(Error)
      expect(callArgs[1]).toEqual({
        componentName: 'ErrorBoundary',
        errorInfo: expect.stringContaining('componentStack')
      })
    })
  })

  describe('Reset de Estado', () => {
    it('deve resetar estado de erro ao clicar em "Tentar novamente"', () => {
      const { rerender } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(screen.getByTestId('error-message')).toBeInTheDocument()

      rerender(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      )

      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    })

    it('deve manter estado normal após reset', () => {
      const { rerender } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      rerender(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      )

      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('deve lidar com children undefined', () => {
      render(<ErrorBoundary>{undefined}</ErrorBoundary>)

      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    })

    it('deve lidar com children null', () => {
      render(<ErrorBoundary>{null}</ErrorBoundary>)

      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    })

    it('deve lidar com múltiplos erros sequenciais', () => {
      const { rerender } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(screen.getByTestId('error-message')).toBeInTheDocument()

      rerender(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      )

      rerender(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(screen.getByTestId('error-message')).toBeInTheDocument()
      expect(mockCaptureError).toHaveBeenCalledTimes(3)
    })

    it('deve lidar com erro durante renderização do erro', () => {
      const { rerender } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      )

      rerender(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })
  })

  describe('Integração', () => {
    it('deve integrar com outros componentes', () => {
      const TestComponent = () => (
        <div>
          <h1>Título</h1>
          <ThrowError shouldThrow={true} />
        </div>
      )

      render(
        <ErrorBoundary>
          <TestComponent />
        </ErrorBoundary>
      )

      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })

    it('deve manter contexto de outros providers', () => {
      const TestContext = React.createContext('default')

      const TestComponent = () => {
        const value = React.useContext(TestContext)
        if (value === 'error') {
          throw new Error('Erro baseado no contexto')
        }
        return <div>Valor: {value}</div>
      }

      render(
        <TestContext.Provider value="error">
          <ErrorBoundary>
            <TestComponent />
          </ErrorBoundary>
        </TestContext.Provider>
      )

      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('deve lidar com múltiplos resets rápidos', () => {
      const { rerender } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(screen.getByTestId('error-message')).toBeInTheDocument()

      for (let i = 0; i < 3; i++) {
        rerender(
          <ErrorBoundary>
            <ThrowError shouldThrow={false} />
          </ErrorBoundary>
        )
        rerender(
          <ErrorBoundary>
            <ThrowError shouldThrow={true} />
          </ErrorBoundary>
        )
      }

      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })

    it('deve evitar re-renders desnecessários', () => {
      const renderSpy = jest.spyOn(ErrorBoundary.prototype, 'render')

      render(
        <ErrorBoundary>
          <div>Conteúdo</div>
        </ErrorBoundary>
      )

      expect(renderSpy).toHaveBeenCalledTimes(1)

      renderSpy.mockRestore()
    })
  })

  describe('Acessibilidade', () => {
    it('deve ter estrutura semântica correta', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      const errorMessage = screen.getByTestId('error-message')
      const heading = screen.getByRole('heading', { level: 2 })
      const button = screen.getByRole('button')

      expect(errorMessage).toBeInTheDocument()
      expect(heading).toHaveTextContent('Algo deu errado')
      expect(button).toHaveTextContent('Tentar novamente')
    })

    it('deve ser navegável por teclado', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()

      button.focus()
      expect(button).toHaveFocus()
    })
  })

  describe('Testes de Regressão', () => {
    it('deve manter comportamento após múltiplos ciclos de erro/reset', () => {
      const { rerender } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      for (let i = 0; i < 3; i++) {
        expect(screen.getByTestId('error-message')).toBeInTheDocument()

        rerender(
          <ErrorBoundary>
            <ThrowError shouldThrow={false} />
          </ErrorBoundary>
        )

        expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()

        rerender(
          <ErrorBoundary>
            <ThrowError shouldThrow={true} />
          </ErrorBoundary>
        )
      }
    })
  })
})
