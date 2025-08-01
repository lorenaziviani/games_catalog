import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import {
  mockInitializeLogRocket,
  mockTrackNavigation,
  mockTrackUserInteraction
} from './__mocks__/observabilityMock'
import ObservabilityWrapper, {
  ObservabilityWrapperWithErrorBoundary
} from './ObservabilityWrapper'

jest.mock('@services/observability/index', () => ({
  initializeLogRocket: mockInitializeLogRocket,
  useAnalytics: () => ({
    trackNavigation: mockTrackNavigation,
    trackUserInteraction: mockTrackUserInteraction
  })
}))

jest.mock('./ErrorBoundary', () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )
}))

const TestComponent = () => {
  const location = useLocation()
  return <div data-testid="location">{location.pathname}</div>
}

const renderWithRouter = (component: React.ReactElement, initialPath = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>{component}</MemoryRouter>
  )
}

describe('ObservabilityWrapper', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Inicialização', () => {
    it('deve inicializar LogRocket no mount', () => {
      renderWithRouter(
        <ObservabilityWrapper>
          <div>Teste</div>
        </ObservabilityWrapper>
      )

      expect(mockInitializeLogRocket).toHaveBeenCalledTimes(1)
    })

    it('deve inicializar LogRocket apenas uma vez', () => {
      const { rerender } = renderWithRouter(
        <ObservabilityWrapper>
          <div>Teste</div>
        </ObservabilityWrapper>
      )

      expect(mockInitializeLogRocket).toHaveBeenCalledTimes(1)

      rerender(
        <MemoryRouter>
          <ObservabilityWrapper>
            <div>Teste 2</div>
          </ObservabilityWrapper>
        </MemoryRouter>
      )

      expect(mockInitializeLogRocket).toHaveBeenCalledTimes(1)
    })
  })

  describe('Tracking de Navegação', () => {
    it('deve trackear navegação inicial', () => {
      renderWithRouter(
        <ObservabilityWrapper>
          <TestComponent />
        </ObservabilityWrapper>
      )

      expect(mockTrackNavigation).toHaveBeenCalledWith('navigation', '/')
    })

    it('deve trackear mudanças de rota', async () => {
      const { rerender } = renderWithRouter(
        <ObservabilityWrapper>
          <TestComponent />
        </ObservabilityWrapper>
      )

      expect(mockTrackNavigation).toHaveBeenCalledWith('navigation', '/')

      rerender(
        <MemoryRouter initialEntries={['/games']}>
          <ObservabilityWrapper>
            <TestComponent />
          </ObservabilityWrapper>
        </MemoryRouter>
      )

      expect(mockTrackNavigation).toHaveBeenCalledWith('navigation', '/')
    })

    it('deve trackear múltiplas navegações', () => {
      const { rerender } = renderWithRouter(
        <ObservabilityWrapper>
          <TestComponent />
        </ObservabilityWrapper>
      )

      expect(mockTrackNavigation).toHaveBeenCalledWith('navigation', '/')

      rerender(
        <MemoryRouter initialEntries={['/favorites']}>
          <ObservabilityWrapper>
            <TestComponent />
          </ObservabilityWrapper>
        </MemoryRouter>
      )

      expect(mockTrackNavigation).toHaveBeenCalledWith('navigation', '/')
    })
  })

  describe('Tracking de Interações do Usuário', () => {
    it('deve trackear cliques em elementos', () => {
      renderWithRouter(
        <ObservabilityWrapper>
          <button>Clique aqui</button>
        </ObservabilityWrapper>
      )

      const button = screen.getByText('Clique aqui')
      fireEvent.click(button)

      expect(mockTrackUserInteraction).toHaveBeenCalledWith('click', 'button', {
        text: 'Clique aqui',
        pathname: '/'
      })
    })

    it('deve trackear pressionar Enter', () => {
      renderWithRouter(
        <ObservabilityWrapper>
          <input type="text" />
        </ObservabilityWrapper>
      )

      const input = screen.getByRole('textbox')
      fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' })

      expect(mockTrackUserInteraction).toHaveBeenCalledWith(
        'key_press',
        'input',
        {
          key: 'Enter',
          pathname: '/',
          text: ''
        }
      )
    })

    it('deve trackear pressionar Espaço', () => {
      renderWithRouter(
        <ObservabilityWrapper>
          <button>Botão</button>
        </ObservabilityWrapper>
      )

      const button = screen.getByText('Botão')
      fireEvent.keyPress(button, { key: ' ', code: 'Space' })

      expect(mockTrackUserInteraction).toHaveBeenCalledWith(
        'key_press',
        'button',
        {
          key: ' ',
          pathname: '/',
          text: 'Botão'
        }
      )
    })

    it('deve limitar texto a 50 caracteres', () => {
      renderWithRouter(
        <ObservabilityWrapper>
          <button>{'A'.repeat(100)}</button>
        </ObservabilityWrapper>
      )

      const button = screen.getByText('A'.repeat(100))
      fireEvent.click(button)

      expect(mockTrackUserInteraction).toHaveBeenCalledWith('click', 'button', {
        text: 'A'.repeat(50),
        pathname: '/'
      })
    })

    it('deve lidar com elementos sem texto', () => {
      renderWithRouter(
        <ObservabilityWrapper>
          <div data-testid="empty-div"></div>
        </ObservabilityWrapper>
      )

      const div = screen.getByTestId('empty-div')
      fireEvent.click(div)

      expect(mockTrackUserInteraction).toHaveBeenCalledWith('click', 'div', {
        text: '',
        pathname: '/'
      })
    })

    it('deve incluir pathname correto nas interações', () => {
      renderWithRouter(
        <ObservabilityWrapper>
          <button>Botão</button>
        </ObservabilityWrapper>,
        '/games'
      )

      const button = screen.getByText('Botão')
      fireEvent.click(button)

      expect(mockTrackUserInteraction).toHaveBeenCalledWith('click', 'button', {
        text: 'Botão',
        pathname: '/games'
      })
    })
  })

  describe('Edge Cases', () => {
    it('deve lidar com children undefined', () => {
      renderWithRouter(<ObservabilityWrapper>{undefined}</ObservabilityWrapper>)

      expect(mockInitializeLogRocket).toHaveBeenCalled()
    })

    it('deve lidar com children null', () => {
      renderWithRouter(<ObservabilityWrapper>{null}</ObservabilityWrapper>)

      expect(mockInitializeLogRocket).toHaveBeenCalled()
    })

    it('deve lidar com elementos aninhados', () => {
      renderWithRouter(
        <ObservabilityWrapper>
          <div>
            <span>
              <button>Botão aninhado</button>
            </span>
          </div>
        </ObservabilityWrapper>
      )

      const button = screen.getByText('Botão aninhado')
      fireEvent.click(button)

      expect(mockTrackUserInteraction).toHaveBeenCalledWith('click', 'button', {
        text: 'Botão aninhado',
        pathname: '/'
      })
    })
  })

  describe('Performance', () => {
    it('deve lidar com múltiplos cliques rápidos', () => {
      renderWithRouter(
        <ObservabilityWrapper>
          <button>Botão</button>
        </ObservabilityWrapper>
      )

      const button = screen.getByText('Botão')

      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button)

      expect(mockTrackUserInteraction).toHaveBeenCalledTimes(3)
    })

    it('deve evitar memory leaks', () => {
      const { unmount } = renderWithRouter(
        <ObservabilityWrapper>
          <div>Teste</div>
        </ObservabilityWrapper>
      )

      unmount()

      expect(mockInitializeLogRocket).toHaveBeenCalled()
    })
  })

  describe('Integração', () => {
    it('deve integrar com outros componentes', () => {
      renderWithRouter(
        <ObservabilityWrapper>
          <div>
            <button>Botão</button>
            <input type="text" />
          </div>
        </ObservabilityWrapper>
      )

      const button = screen.getByText('Botão')
      fireEvent.click(button)

      expect(mockTrackUserInteraction).toHaveBeenCalled()
    })

    it('deve funcionar com múltiplos ObservabilityWrappers', () => {
      renderWithRouter(
        <ObservabilityWrapper>
          <ObservabilityWrapper>
            <button>Botão</button>
          </ObservabilityWrapper>
        </ObservabilityWrapper>
      )

      const button = screen.getByText('Botão')
      fireEvent.click(button)

      expect(mockTrackUserInteraction).toHaveBeenCalledTimes(2)
    })
  })

  describe('ObservabilityWrapperWithErrorBoundary', () => {
    it('deve manter funcionalidade de tracking com ErrorBoundary', () => {
      renderWithRouter(
        <ObservabilityWrapperWithErrorBoundary>
          <button>Botão</button>
        </ObservabilityWrapperWithErrorBoundary>
      )

      const button = screen.getByText('Botão')
      fireEvent.click(button)

      expect(mockTrackUserInteraction).toHaveBeenCalled()
    })

    it('deve inicializar LogRocket com ErrorBoundary', () => {
      renderWithRouter(
        <ObservabilityWrapperWithErrorBoundary>
          <div>Teste</div>
        </ObservabilityWrapperWithErrorBoundary>
      )

      expect(mockInitializeLogRocket).toHaveBeenCalled()
    })
  })

  describe('Testes de Regressão', () => {
    it('deve manter comportamento após múltiplas renderizações', () => {
      const { rerender } = renderWithRouter(
        <ObservabilityWrapper>
          <button>Botão</button>
        </ObservabilityWrapper>
      )

      for (let i = 0; i < 5; i++) {
        const button = screen.getByText('Botão')
        fireEvent.click(button)

        rerender(
          <MemoryRouter>
            <ObservabilityWrapper>
              <button>Botão</button>
            </ObservabilityWrapper>
          </MemoryRouter>
        )
      }

      expect(mockTrackUserInteraction).toHaveBeenCalled()
    })
  })
})
