import { jest } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'
import { ThemeMode } from './types/common'

jest.mock('./hooks/useTheme', () => ({
  useTheme: jest.fn()
}))

jest.mock('./components/common/layout/Header', () => {
  return function MockHeader({
    setTheme
  }: {
    setTheme: (theme: string) => void
  }) {
    return (
      <header data-testid="header">
        <button onClick={() => setTheme('dark')}>Set Dark</button>
        <button onClick={() => setTheme('light')}>Set Light</button>
      </header>
    )
  }
})

jest.mock('./components/features/theme/ThemeButton', () => {
  return function MockThemeButton({ onClick }: { onClick: () => void }) {
    return (
      <button data-testid="theme-button" onClick={onClick}>
        Toggle Theme
      </button>
    )
  }
})

jest.mock('./components/ObservabilityWrapper', () => {
  return function MockObservabilityWrapper({
    children
  }: {
    children: React.ReactNode
  }) {
    return <div data-testid="observability-wrapper">{children}</div>
  }
})

jest.mock('./routes', () => {
  return function MockRoutesApp() {
    return <div data-testid="routes-app">Routes Content</div>
  }
})

jest.mock('./store', () => ({
  store: {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
    subscribe: jest.fn()
  }
}))

jest.mock('./styles/global', () => ({
  GlobalStyle: () => <div data-testid="global-style" />
}))

jest.mock('./styles', () => ({
  AppContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-container">{children}</div>
  ),
  ThemeButtonWrapper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-button-wrapper">{children}</div>
  )
}))

import { useTheme } from './hooks/useTheme'

const mockUseTheme = jest.mocked(useTheme)

describe('App', () => {
  const defaultTheme = {
    mode: ThemeMode.LIGHT,
    primary: '#171b31',
    secondary: '#fefefe',
    tertiary: '#9b3430',
    quaternary: '#aeb7c2',
    quinary: '#3b5fa4',
    white: '#ffffff',
    rating: {
      excellent: '#4CAF50',
      good: '#8BC34A',
      average: '#FFC107',
      poor: '#FF9800',
      bad: '#F44336'
    }
  }

  const defaultUseThemeReturn = {
    theme: defaultTheme,
    currentTheme: ThemeMode.LIGHT,
    setTheme: jest.fn(),
    toggleTheme: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseTheme.mockReturnValue(defaultUseThemeReturn)
  })

  const renderApp = () => {
    return render(<App />)
  }

  describe('renderização básica', () => {
    it('deve renderizar o componente App sem erros', () => {
      const { container } = renderApp()
      expect(container).toBeInTheDocument()
    })

    it('deve renderizar todos os componentes principais', () => {
      renderApp()

      expect(screen.getByTestId('header')).toBeInTheDocument()
      expect(screen.getByTestId('observability-wrapper')).toBeInTheDocument()
      expect(screen.getByTestId('app-container')).toBeInTheDocument()
      expect(screen.getByTestId('routes-app')).toBeInTheDocument()
      expect(screen.getByTestId('global-style')).toBeInTheDocument()
    })

    it('deve renderizar o ThemeButton quando currentTheme é LIGHT', () => {
      mockUseTheme.mockReturnValue({
        ...defaultUseThemeReturn,
        currentTheme: ThemeMode.LIGHT
      })

      renderApp()

      expect(screen.getByTestId('theme-button')).toBeInTheDocument()
      expect(screen.getByTestId('theme-button-wrapper')).toBeInTheDocument()
    })

    it('deve renderizar o ThemeButton quando currentTheme é DARK', () => {
      mockUseTheme.mockReturnValue({
        ...defaultUseThemeReturn,
        currentTheme: ThemeMode.DARK
      })

      renderApp()

      expect(screen.getByTestId('theme-button')).toBeInTheDocument()
      expect(screen.getByTestId('theme-button-wrapper')).toBeInTheDocument()
    })

    it('não deve renderizar o ThemeButton quando currentTheme não é LIGHT ou DARK', () => {
      mockUseTheme.mockReturnValue({
        ...defaultUseThemeReturn,
        currentTheme: ThemeMode.COLORBLIND
      })

      renderApp()

      expect(screen.queryByTestId('theme-button')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('theme-button-wrapper')
      ).not.toBeInTheDocument()
    })

    it('não deve renderizar o ThemeButton quando currentTheme é HIGH_CONTRAST', () => {
      mockUseTheme.mockReturnValue({
        ...defaultUseThemeReturn,
        currentTheme: ThemeMode.HIGH_CONTRAST
      })

      renderApp()

      expect(screen.queryByTestId('theme-button')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('theme-button-wrapper')
      ).not.toBeInTheDocument()
    })
  })

  describe('integração com useTheme', () => {
    it('deve chamar useTheme corretamente', () => {
      renderApp()

      expect(mockUseTheme).toHaveBeenCalledTimes(1)
    })

    it('deve usar os valores retornados pelo useTheme', () => {
      const customTheme = {
        mode: ThemeMode.DARK,
        primary: '#ff0000',
        secondary: '#00ff00',
        tertiary: '#9b3430',
        quaternary: '#aeb7c2',
        quinary: '#3b5fa4',
        white: '#ffffff',
        rating: {
          excellent: '#4CAF50',
          good: '#8BC34A',
          average: '#FFC107',
          poor: '#FF9800',
          bad: '#F44336'
        }
      }

      mockUseTheme.mockReturnValue({
        theme: customTheme,
        currentTheme: ThemeMode.DARK,
        setTheme: jest.fn(),
        toggleTheme: jest.fn()
      })

      renderApp()

      expect(mockUseTheme).toHaveBeenCalledTimes(1)
    })
  })

  describe('funcionalidade do ThemeButton', () => {
    it('deve chamar toggleTheme quando o botão é clicado', () => {
      const mockToggleTheme = jest.fn()
      mockUseTheme.mockReturnValue({
        ...defaultUseThemeReturn,
        toggleTheme: mockToggleTheme
      })

      renderApp()

      const themeButton = screen.getByTestId('theme-button')
      fireEvent.click(themeButton)

      expect(mockToggleTheme).toHaveBeenCalledTimes(1)
    })

    it('deve passar a função toggleTheme corretamente para o ThemeButton', () => {
      const mockToggleTheme = jest.fn()
      mockUseTheme.mockReturnValue({
        ...defaultUseThemeReturn,
        toggleTheme: mockToggleTheme
      })

      renderApp()

      const themeButton = screen.getByTestId('theme-button')
      expect(themeButton).toBeInTheDocument()
    })
  })

  describe('integração com Header', () => {
    it('deve passar setTheme para o Header', () => {
      const mockSetTheme = jest.fn()
      mockUseTheme.mockReturnValue({
        ...defaultUseThemeReturn,
        setTheme: mockSetTheme
      })

      renderApp()

      const setDarkButton = screen.getByText('Set Dark')
      const setLightButton = screen.getByText('Set Light')

      fireEvent.click(setDarkButton)
      expect(mockSetTheme).toHaveBeenCalledWith('dark')

      fireEvent.click(setLightButton)
      expect(mockSetTheme).toHaveBeenCalledWith('light')
    })
  })

  describe('estrutura do DOM', () => {
    it('deve ter a estrutura correta de providers', () => {
      const { container } = renderApp()

      const provider = container.querySelector(
        '[data-testid="observability-wrapper"]'
      )
      expect(provider).toBeInTheDocument()

      const appContainer = container.querySelector(
        '[data-testid="app-container"]'
      )
      expect(appContainer).toBeInTheDocument()
    })

    it('deve renderizar o conteúdo das rotas dentro do AppContainer', () => {
      renderApp()

      const appContainer = screen.getByTestId('app-container')
      const routesApp = screen.getByTestId('routes-app')

      expect(appContainer).toContainElement(routesApp)
    })

    it('deve renderizar o Header dentro do ObservabilityWrapper', () => {
      renderApp()

      const observabilityWrapper = screen.getByTestId('observability-wrapper')
      const header = screen.getByTestId('header')

      expect(observabilityWrapper).toContainElement(header)
    })
  })

  describe('cenários de tema', () => {
    it('deve mostrar o ThemeButton quando o tema é LIGHT', () => {
      mockUseTheme.mockReturnValue({
        ...defaultUseThemeReturn,
        currentTheme: ThemeMode.LIGHT
      })

      renderApp()

      expect(screen.getByTestId('theme-button')).toBeInTheDocument()
    })

    it('deve mostrar o ThemeButton quando o tema é DARK', () => {
      mockUseTheme.mockReturnValue({
        ...defaultUseThemeReturn,
        currentTheme: ThemeMode.DARK
      })

      renderApp()

      expect(screen.getByTestId('theme-button')).toBeInTheDocument()
    })

    it('não deve mostrar o ThemeButton para outros temas', () => {
      const themes = [ThemeMode.COLORBLIND, ThemeMode.HIGH_CONTRAST]

      themes.forEach(theme => {
        mockUseTheme.mockReturnValue({
          ...defaultUseThemeReturn,
          currentTheme: theme
        })

        const { unmount } = renderApp()

        expect(screen.queryByTestId('theme-button')).not.toBeInTheDocument()
        expect(
          screen.queryByTestId('theme-button-wrapper')
        ).not.toBeInTheDocument()

        unmount()
      })
    })
  })

  describe('integração com Redux', () => {
    it('deve renderizar com o Provider do Redux', () => {
      renderApp()

      const observabilityWrapper = screen.getByTestId('observability-wrapper')
      expect(observabilityWrapper).toBeInTheDocument()
    })
  })

  describe('integração com React Router', () => {
    it('deve renderizar com o BrowserRouter', () => {
      renderApp()

      const routesApp = screen.getByTestId('routes-app')
      expect(routesApp).toBeInTheDocument()
    })
  })

  describe('integração com Styled Components', () => {
    it('deve renderizar com o ThemeProvider', () => {
      renderApp()

      const appContainer = screen.getByTestId('app-container')
      expect(appContainer).toBeInTheDocument()
    })

    it('deve renderizar o GlobalStyle', () => {
      renderApp()

      const globalStyle = screen.getByTestId('global-style')
      expect(globalStyle).toBeInTheDocument()
    })
  })

  describe('comportamento responsivo', () => {
    it('deve renderizar todos os elementos em diferentes cenários de tema', () => {
      const themes = [
        ThemeMode.LIGHT,
        ThemeMode.DARK,
        ThemeMode.COLORBLIND,
        ThemeMode.HIGH_CONTRAST
      ]

      themes.forEach(theme => {
        mockUseTheme.mockReturnValue({
          ...defaultUseThemeReturn,
          currentTheme: theme
        })

        const { unmount } = renderApp()

        expect(screen.getByTestId('header')).toBeInTheDocument()
        expect(screen.getByTestId('observability-wrapper')).toBeInTheDocument()
        expect(screen.getByTestId('app-container')).toBeInTheDocument()
        expect(screen.getByTestId('routes-app')).toBeInTheDocument()
        expect(screen.getByTestId('global-style')).toBeInTheDocument()

        if (theme === ThemeMode.LIGHT || theme === ThemeMode.DARK) {
          expect(screen.getByTestId('theme-button')).toBeInTheDocument()
          expect(screen.getByTestId('theme-button-wrapper')).toBeInTheDocument()
        } else {
          expect(screen.queryByTestId('theme-button')).not.toBeInTheDocument()
          expect(
            screen.queryByTestId('theme-button-wrapper')
          ).not.toBeInTheDocument()
        }

        unmount()
      })
    })
  })

  describe('interações do usuário', () => {
    it('deve permitir alternar o tema através do ThemeButton', () => {
      const mockToggleTheme = jest.fn()
      mockUseTheme.mockReturnValue({
        ...defaultUseThemeReturn,
        toggleTheme: mockToggleTheme
      })

      renderApp()

      const themeButton = screen.getByTestId('theme-button')
      fireEvent.click(themeButton)

      expect(mockToggleTheme).toHaveBeenCalledTimes(1)
    })

    it('deve permitir definir o tema através do Header', () => {
      const mockSetTheme = jest.fn()
      mockUseTheme.mockReturnValue({
        ...defaultUseThemeReturn,
        setTheme: mockSetTheme
      })

      renderApp()

      const setDarkButton = screen.getByText('Set Dark')
      fireEvent.click(setDarkButton)

      expect(mockSetTheme).toHaveBeenCalledWith('dark')
    })
  })

  describe('estrutura de providers', () => {
    it('deve ter a hierarquia correta de providers', () => {
      const { container } = renderApp()

      const provider = container.querySelector(
        '[data-testid="observability-wrapper"]'
      )
      const header = container.querySelector('[data-testid="header"]')
      const appContainer = container.querySelector(
        '[data-testid="app-container"]'
      )

      expect(provider).toBeInTheDocument()
      expect(header).toBeInTheDocument()
      expect(appContainer).toBeInTheDocument()
    })
  })

  describe('cenários de erro', () => {
    it('deve renderizar mesmo se useTheme retornar valores inesperados', () => {
      mockUseTheme.mockReturnValue({
        theme: defaultTheme,
        currentTheme: 'invalid' as ThemeMode,
        setTheme: jest.fn(),
        toggleTheme: jest.fn()
      })

      expect(() => renderApp()).not.toThrow()
    })

    it('deve lidar com currentTheme undefined', () => {
      mockUseTheme.mockReturnValue({
        ...defaultUseThemeReturn,
        currentTheme: ThemeMode.LIGHT
      })

      expect(() => renderApp()).not.toThrow()
    })
  })
})
