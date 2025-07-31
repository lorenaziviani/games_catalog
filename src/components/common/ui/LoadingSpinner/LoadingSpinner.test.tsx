import {
  LoadingMessage,
  LoadingSpinnerSize,
  LoadingSpinnerVariant
} from '@/types/common'
import { render, screen } from '@testing-library/react'
import LoadingSpinner from './index'

describe('LoadingSpinner Component', () => {
  it('deve renderizar o spinner com mensagem padrão', () => {
    render(<LoadingSpinner />)

    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('deve renderizar o spinner com mensagem customizada', () => {
    render(<LoadingSpinner message="Carregando dados..." />)

    expect(screen.getByText('Carregando dados...')).toBeInTheDocument()
  })

  it('deve renderizar o spinner sem mensagem', () => {
    render(<LoadingSpinner message="" />)

    expect(screen.queryByText('Carregando...')).not.toBeInTheDocument()
  })

  it('deve renderizar o spinner com tamanho padrão', () => {
    render(<LoadingSpinner />)

    const container = screen.getByText('Carregando...').closest('div')
    expect(container).toBeInTheDocument()
  })

  it('deve renderizar o spinner com tamanho customizado', () => {
    render(<LoadingSpinner size={LoadingSpinnerSize.LARGE} />)

    const container = screen.getByText('Carregando...').closest('div')
    expect(container).toBeInTheDocument()
  })

  it('deve renderizar o spinner com variante padrão', () => {
    render(<LoadingSpinner />)

    const textElement = screen.getByText('Carregando...')
    const container = textElement.closest('div')
    const spinner = container?.querySelector('div')
    expect(spinner).toBeInTheDocument()
  })

  it('deve renderizar o spinner com variante dots', () => {
    render(<LoadingSpinner variant={LoadingSpinnerVariant.DOTS} />)

    const textElement = screen.getByText('Carregando...')
    const container = textElement.closest('div')
    const dotsSpinner = container?.querySelector('div')
    expect(dotsSpinner).toBeInTheDocument()
  })

  it('deve renderizar o spinner com variante gradient', () => {
    render(<LoadingSpinner variant={LoadingSpinnerVariant.GRADIENT} />)

    const textElement = screen.getByText('Carregando...')
    const container = textElement.closest('div')
    const gradientSpinner = container?.querySelector('div')
    expect(gradientSpinner).toBeInTheDocument()
  })

  it('deve renderizar com diferentes mensagens do enum', () => {
    const { rerender } = render(
      <LoadingSpinner message={LoadingMessage.GAMES} />
    )
    expect(screen.getByText('Carregando jogos...')).toBeInTheDocument()

    rerender(<LoadingSpinner message={LoadingMessage.DATA} />)
    expect(screen.getByText('Carregando dados...')).toBeInTheDocument()

    rerender(<LoadingSpinner message={LoadingMessage.API} />)
    expect(screen.getByText('Buscando na API...')).toBeInTheDocument()

    rerender(<LoadingSpinner message={LoadingMessage.SEARCH} />)
    expect(screen.getByText('Buscando jogos...')).toBeInTheDocument()
  })

  it('deve renderizar com diferentes tamanhos', () => {
    const { rerender } = render(
      <LoadingSpinner size={LoadingSpinnerSize.SMALL} />
    )
    expect(screen.getByText('Carregando...')).toBeInTheDocument()

    rerender(<LoadingSpinner size={LoadingSpinnerSize.MEDIUM} />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()

    rerender(<LoadingSpinner size={LoadingSpinnerSize.LARGE} />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('deve combinar todas as props corretamente', () => {
    render(
      <LoadingSpinner
        message="Teste customizado"
        size={LoadingSpinnerSize.LARGE}
        variant={LoadingSpinnerVariant.GRADIENT}
      />
    )

    expect(screen.getByText('Teste customizado')).toBeInTheDocument()
    const textElement = screen.getByText('Teste customizado')
    const container = textElement.closest('div')
    const gradientSpinner = container?.querySelector('div')
    expect(gradientSpinner).toBeInTheDocument()
  })

  it('deve ser acessível', () => {
    render(<LoadingSpinner message="Carregando..." />)

    const textElement = screen.getByText('Carregando...')
    const container = textElement.closest('div')
    expect(container).toBeInTheDocument()
  })
})
