import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { store } from '@/store'
import { LightTheme } from '@/styles/theme'
import AccessibilityButton from './index'

// Mock do hook useAccessibility
const mockSetMode = jest.fn()
const mockSetFontSize = jest.fn()
const mockSetReducedMotion = jest.fn()
const mockResetSettings = jest.fn()

const mockSettings = {
  mode: 'normal' as const,
  fontSize: 'normal' as const,
  reducedMotion: false
}

jest.mock('../../../../hooks/useAccessibility', () => ({
  useAccessibility: () => ({
    settings: mockSettings,
    setMode: mockSetMode,
    setFontSize: mockSetFontSize,
    setReducedMotion: mockSetReducedMotion,
    resetSettings: mockResetSettings
  })
}))

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <ThemeProvider theme={LightTheme}>
        <BrowserRouter>{component}</BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

describe('AccessibilityButton', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve renderizar o botão de acessibilidade', () => {
    renderWithProviders(<AccessibilityButton />)

    const button = screen.getByRole('button', {
      name: /configurações de acessibilidade/i
    })
    expect(button).toBeInTheDocument()
  })

  it('deve abrir o menu quando o botão é clicado', async () => {
    renderWithProviders(<AccessibilityButton />)

    const button = screen.getByRole('button', {
      name: /configurações de acessibilidade/i
    })
    fireEvent.click(button)

    await waitFor(() => {
      expect(
        screen.getByText('Configurações de Acessibilidade')
      ).toBeInTheDocument()
    })
  })

  it('deve mostrar as opções de modo de cor', async () => {
    renderWithProviders(<AccessibilityButton />)

    const button = screen.getByRole('button', {
      name: /configurações de acessibilidade/i
    })
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Modo de Cor:')).toBeInTheDocument()
      expect(screen.getByText('Amigável para Daltonismo')).toBeInTheDocument()
      expect(screen.getByText('Alto Contraste')).toBeInTheDocument()
    })
  })

  it('deve mostrar as opções de tamanho de fonte', async () => {
    renderWithProviders(<AccessibilityButton />)

    const button = screen.getByRole('button', {
      name: /configurações de acessibilidade/i
    })
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Tamanho da Fonte:')).toBeInTheDocument()
      expect(screen.getByText('Grande')).toBeInTheDocument()
      expect(screen.getByText('Extra Grande')).toBeInTheDocument()
    })
  })

  it('deve mostrar a opção de reduzir movimento', async () => {
    renderWithProviders(<AccessibilityButton />)

    const button = screen.getByRole('button', {
      name: /configurações de acessibilidade/i
    })
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Reduzir Movimento')).toBeInTheDocument()
    })
  })

  it('deve chamar setMode quando um modo de cor é selecionado', async () => {
    renderWithProviders(<AccessibilityButton />)

    const button = screen.getByRole('button', {
      name: /configurações de acessibilidade/i
    })
    fireEvent.click(button)

    await waitFor(() => {
      const colorblindButton = screen.getByText('Amigável para Daltonismo')
      fireEvent.click(colorblindButton)
      expect(mockSetMode).toHaveBeenCalledWith('colorblind')
    })
  })

  it('deve chamar setFontSize quando um tamanho de fonte é selecionado', async () => {
    renderWithProviders(<AccessibilityButton />)

    const button = screen.getByRole('button', {
      name: /configurações de acessibilidade/i
    })
    fireEvent.click(button)

    await waitFor(() => {
      const largeButton = screen.getByText('Grande')
      fireEvent.click(largeButton)
      expect(mockSetFontSize).toHaveBeenCalledWith('large')
    })
  })

  it('deve chamar setReducedMotion quando a opção é clicada', async () => {
    renderWithProviders(<AccessibilityButton />)

    const button = screen.getByRole('button', {
      name: /configurações de acessibilidade/i
    })
    fireEvent.click(button)

    await waitFor(() => {
      const reducedMotionButton = screen.getByText('Reduzir Movimento')
      fireEvent.click(reducedMotionButton)
      expect(mockSetReducedMotion).toHaveBeenCalled()
    })
  })

  it('deve chamar resetSettings quando o botão de reset é clicado', async () => {
    renderWithProviders(<AccessibilityButton />)

    const button = screen.getByRole('button', {
      name: /configurações de acessibilidade/i
    })
    fireEvent.click(button)

    await waitFor(() => {
      const resetButton = screen.getByText('Restaurar Padrão')
      fireEvent.click(resetButton)
      expect(mockResetSettings).toHaveBeenCalled()
    })
  })

  it('deve fechar o menu quando uma opção é selecionada', async () => {
    renderWithProviders(<AccessibilityButton />)

    const button = screen.getByRole('button', {
      name: /configurações de acessibilidade/i
    })
    fireEvent.click(button)

    await waitFor(() => {
      const colorblindButton = screen.getByText('Amigável para Daltonismo')
      fireEvent.click(colorblindButton)
    })

    await waitFor(() => {
      expect(
        screen.queryByText('Configurações de Acessibilidade')
      ).not.toBeInTheDocument()
    })
  })

  it('deve ter atributos de acessibilidade corretos', () => {
    renderWithProviders(<AccessibilityButton />)

    const button = screen.getByRole('button', {
      name: /configurações de acessibilidade/i
    })
    expect(button).toHaveAttribute(
      'aria-label',
      'Configurações de acessibilidade'
    )
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveAttribute('aria-haspopup', 'true')
  })

  it('deve atualizar aria-expanded quando o menu é aberto', async () => {
    renderWithProviders(<AccessibilityButton />)

    const button = screen.getByRole('button', {
      name: /configurações de acessibilidade/i
    })
    fireEvent.click(button)

    await waitFor(() => {
      expect(button).toHaveAttribute('aria-expanded', 'true')
    })
  })
})
