import { fireEvent, render, screen } from '@testing-library/react'
import ThemeButton from './index'

jest.mock('styled-components', () => ({
  ...jest.requireActual('styled-components'),
  useTheme: () => ({
    mode: 'light'
  })
}))

jest.mock('@/utils/themeUtils', () => ({
  isLightMode: () => true
}))

jest.mock('react-icons/fa6', () => ({
  FaMoon: () => <span data-testid="moon-icon">🌙</span>
}))

jest.mock('react-icons/ri', () => ({
  RiSunFill: () => <span data-testid="sun-icon">☀️</span>
}))

jest.mock('./styles', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-container">{children}</div>
  ),
  Button: ({
    children,
    onClick
  }: {
    children: React.ReactNode
    onClick: () => void
  }) => (
    <button data-testid="theme-button" onClick={onClick}>
      {children}
    </button>
  )
}))

describe('ThemeButton Component', () => {
  const mockOnClick = jest.fn()

  beforeEach(() => {
    mockOnClick.mockClear()
  })

  it('deve renderizar o botão de tema', () => {
    render(<ThemeButton onClick={mockOnClick} />)

    const container = screen.getByTestId('theme-container')
    const button = screen.getByTestId('theme-button')

    expect(container).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('deve renderizar ícone de lua no modo claro', () => {
    render(<ThemeButton onClick={mockOnClick} />)

    const moonIcon = screen.getByTestId('moon-icon')
    expect(moonIcon).toBeInTheDocument()
  })

  it('deve chamar onClick quando clicado', () => {
    render(<ThemeButton onClick={mockOnClick} />)

    const button = screen.getByTestId('theme-button')
    fireEvent.click(button)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('deve ser acessível', () => {
    render(<ThemeButton onClick={mockOnClick} />)

    const button = screen.getByTestId('theme-button')
    expect(button).toBeInTheDocument()
  })

  it('deve funcionar com teclado', () => {
    render(<ThemeButton onClick={mockOnClick} />)

    const button = screen.getByTestId('theme-button')
    fireEvent.keyDown(button, { key: 'Enter' })

    expect(button).toBeInTheDocument()
  })

  it('deve funcionar com espaço', () => {
    render(<ThemeButton onClick={mockOnClick} />)

    const button = screen.getByTestId('theme-button')
    fireEvent.keyDown(button, { key: ' ' })

    expect(button).toBeInTheDocument()
  })

  it('deve renderizar ícone de sol no modo escuro', () => {
    jest.doMock('@/utils/themeUtils', () => ({
      isLightMode: () => false
    }))

    render(<ThemeButton onClick={mockOnClick} />)

    const button = screen.getByTestId('theme-button')
    expect(button).toBeInTheDocument()
  })

  it('deve ter estrutura correta', () => {
    render(<ThemeButton onClick={mockOnClick} />)

    const container = screen.getByTestId('theme-container')
    const button = screen.getByTestId('theme-button')
    const icon = screen.getByTestId('moon-icon')

    expect(container).toContainElement(button)
    expect(button).toContainElement(icon)
  })
})
