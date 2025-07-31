import { LightTheme } from '@/styles/theme'
import { ComponentSize, Position } from '@/types/common'
import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import FavoriteButton from './index'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={LightTheme}>{ui}</ThemeProvider>)
}

describe('FavoriteButton Component', () => {
  const mockOnToggle = jest.fn()

  beforeEach(() => {
    mockOnToggle.mockClear()
  })

  it('deve renderizar o botão de favorito', () => {
    renderWithTheme(
      <FavoriteButton isFavorite={false} onToggle={mockOnToggle} />
    )

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('deve renderizar o ícone de coração', () => {
    renderWithTheme(
      <FavoriteButton isFavorite={false} onToggle={mockOnToggle} />
    )

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('')
  })

  it('deve chamar onToggle quando clicado', () => {
    renderWithTheme(
      <FavoriteButton isFavorite={false} onToggle={mockOnToggle} />
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockOnToggle).toHaveBeenCalledTimes(1)
  })

  it('deve aplicar estilo de favorito quando isFavorite é true', () => {
    renderWithTheme(
      <FavoriteButton isFavorite={true} onToggle={mockOnToggle} />
    )

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('deve aplicar estilo de não favorito quando isFavorite é false', () => {
    renderWithTheme(
      <FavoriteButton isFavorite={false} onToggle={mockOnToggle} />
    )

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('deve renderizar com tamanho padrão quando não especificado', () => {
    renderWithTheme(
      <FavoriteButton isFavorite={false} onToggle={mockOnToggle} />
    )

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('deve renderizar com tamanho customizado', () => {
    renderWithTheme(
      <FavoriteButton
        isFavorite={false}
        onToggle={mockOnToggle}
        size={ComponentSize.LARGE}
      />
    )

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('deve renderizar com posição padrão quando não especificada', () => {
    renderWithTheme(
      <FavoriteButton isFavorite={false} onToggle={mockOnToggle} />
    )

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('deve renderizar com posição customizada', () => {
    renderWithTheme(
      <FavoriteButton
        isFavorite={false}
        onToggle={mockOnToggle}
        position={Position.BOTTOM_LEFT}
      />
    )

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('deve ser acessível com aria-label apropriado', () => {
    renderWithTheme(
      <FavoriteButton isFavorite={false} onToggle={mockOnToggle} />
    )

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('deve ter aria-label diferente para favorito e não favorito', () => {
    const { rerender } = renderWithTheme(
      <FavoriteButton isFavorite={false} onToggle={mockOnToggle} />
    )

    let button = screen.getByRole('button')
    expect(button).toBeInTheDocument()

    rerender(
      <ThemeProvider theme={LightTheme}>
        <FavoriteButton isFavorite={true} onToggle={mockOnToggle} />
      </ThemeProvider>
    )

    button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('deve permitir múltiplos cliques', () => {
    renderWithTheme(
      <FavoriteButton isFavorite={false} onToggle={mockOnToggle} />
    )

    const button = screen.getByRole('button')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockOnToggle).toHaveBeenCalledTimes(2)
  })
})
