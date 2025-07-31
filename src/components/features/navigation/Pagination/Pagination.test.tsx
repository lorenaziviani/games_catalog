import { fireEvent, render, screen } from '@testing-library/react'
import Pagination from './index'

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn()

  beforeEach(() => {
    mockOnPageChange.mockClear()
  })

  it('deve renderizar os botões de navegação', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    expect(screen.getByText('Anterior')).toBeInTheDocument()
    expect(screen.getByText('Próxima')).toBeInTheDocument()
  })

  it('deve mostrar informações da página', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    )

    expect(screen.getByText('Página 3 de 10')).toBeInTheDocument()
  })

  it('deve chamar onPageChange ao clicar em Próxima', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const nextButton = screen.getByText('Próxima')
    fireEvent.click(nextButton)

    expect(mockOnPageChange).toHaveBeenCalledWith(2)
  })

  it('deve chamar onPageChange ao clicar em Anterior', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const previousButton = screen.getByText('Anterior')
    fireEvent.click(previousButton)

    expect(mockOnPageChange).toHaveBeenCalledWith(2)
  })

  it('deve desabilitar botão Anterior na primeira página', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const previousButton = screen.getByText('Anterior')
    expect(previousButton).toBeDisabled()
  })

  it('deve desabilitar botão Próxima na última página', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const nextButton = screen.getByText('Próxima')
    expect(nextButton).toBeDisabled()
  })

  it('não deve renderizar quando totalPages é 1', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    )

    expect(screen.queryByText('Anterior')).not.toBeInTheDocument()
    expect(screen.queryByText('Próxima')).not.toBeInTheDocument()
  })

  it('não deve renderizar quando totalPages é 0', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={0}
        onPageChange={mockOnPageChange}
      />
    )

    expect(screen.queryByText('Anterior')).not.toBeInTheDocument()
    expect(screen.queryByText('Próxima')).not.toBeInTheDocument()
  })

  it('não deve mostrar informações quando showInfo é false', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
        showInfo={false}
      />
    )

    expect(screen.queryByText('Página 3 de 10')).not.toBeInTheDocument()
  })

  it('deve mostrar informações quando showInfo é true', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
        showInfo={true}
      />
    )

    expect(screen.getByText('Página 3 de 10')).toBeInTheDocument()
  })

  it('deve mostrar informações por padrão', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    )

    expect(screen.getByText('Página 3 de 10')).toBeInTheDocument()
  })

  it('deve permitir navegação entre páginas', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const nextButton = screen.getByText('Próxima')
    const previousButton = screen.getByText('Anterior')

    fireEvent.click(nextButton)
    expect(mockOnPageChange).toHaveBeenCalledWith(3)

    fireEvent.click(previousButton)
    expect(mockOnPageChange).toHaveBeenCalledWith(1)
  })

  it('deve ser acessível', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const previousButton = screen.getByText('Anterior')
    const nextButton = screen.getByText('Próxima')

    expect(previousButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })

  it('deve funcionar com teclado', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const nextButton = screen.getByText('Próxima')
    const previousButton = screen.getByText('Anterior')

    fireEvent.keyDown(nextButton, { key: 'Enter' })
    expect(nextButton).toBeInTheDocument()

    fireEvent.keyDown(previousButton, { key: 'Enter' })
    expect(previousButton).toBeInTheDocument()
  })
})
