import { render, screen } from '@testing-library/react'
import { FaStar } from 'react-icons/fa'
import Banner from './index'

describe('Banner Component', () => {
  it('deve renderizar o conteúdo do banner', () => {
    render(<Banner>Conteúdo do banner</Banner>)

    expect(screen.getByText('Conteúdo do banner')).toBeInTheDocument()
  })

  it('deve renderizar o badge quando fornecido', () => {
    const badge = {
      icon: FaStar,
      text: 'Destaque'
    }

    render(<Banner badge={badge}>Conteúdo do banner</Banner>)

    expect(screen.getByText('Destaque')).toBeInTheDocument()
  })

  it('não deve renderizar o badge quando não fornecido', () => {
    render(<Banner>Conteúdo do banner</Banner>)

    expect(screen.queryByText('Destaque')).not.toBeInTheDocument()
  })

  it('deve renderizar conteúdo complexo', () => {
    render(
      <Banner>
        <h1>Título do Banner</h1>
        <p>Descrição do banner</p>
        <button>Botão</button>
      </Banner>
    )

    expect(screen.getByText('Título do Banner')).toBeInTheDocument()
    expect(screen.getByText('Descrição do banner')).toBeInTheDocument()
    expect(screen.getByText('Botão')).toBeInTheDocument()
  })

  it('deve renderizar badge com ícone', () => {
    const badge = {
      icon: FaStar,
      text: 'Popular'
    }

    render(<Banner badge={badge}>Banner com ícone</Banner>)

    expect(screen.getByText('Popular')).toBeInTheDocument()
  })

  it('deve renderizar múltiplos elementos filhos', () => {
    render(
      <Banner>
        <div>Elemento 1</div>
        <div>Elemento 2</div>
        <div>Elemento 3</div>
      </Banner>
    )

    expect(screen.getByText('Elemento 1')).toBeInTheDocument()
    expect(screen.getByText('Elemento 2')).toBeInTheDocument()
    expect(screen.getByText('Elemento 3')).toBeInTheDocument()
  })
})
