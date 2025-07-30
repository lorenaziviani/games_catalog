import { ComponentSize, TagVariant } from '@/types/common'
import { render, screen } from '@testing-library/react'
import TagsContainer from './index'

jest.mock('../Tag', () => {
  return function MockTag({
    children,
    variant,
    size
  }: {
    children: React.ReactNode
    variant: TagVariant
    size: ComponentSize
  }) {
    return (
      <span data-testid="tag" data-variant={variant} data-size={size}>
        {children}
      </span>
    )
  }
})

jest.mock('./styles', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="tags-container">{children}</div>
  )
}))

describe('TagsContainer Component', () => {
  const mockItems = [
    { id: 1, name: 'Ação' },
    { id: 2, name: 'Aventura' },
    { id: 3, name: 'RPG' },
    { id: 4, name: 'Estratégia' },
    { id: 5, name: 'Esporte' }
  ]

  it('deve renderizar os tags', () => {
    render(<TagsContainer items={mockItems} variant={TagVariant.GENRE} />)

    const container = screen.getByTestId('tags-container')
    const tags = screen.getAllByTestId('tag')

    expect(container).toBeInTheDocument()
    expect(tags).toHaveLength(3)
  })

  it('deve renderizar com variante correta', () => {
    render(<TagsContainer items={mockItems} variant={TagVariant.PLATFORM} />)

    const tags = screen.getAllByTestId('tag')
    tags.forEach(tag => {
      expect(tag).toHaveAttribute('data-variant', TagVariant.PLATFORM)
    })
  })

  it('deve renderizar com tamanho padrão', () => {
    render(<TagsContainer items={mockItems} variant={TagVariant.GENRE} />)

    const tags = screen.getAllByTestId('tag')
    tags.forEach(tag => {
      expect(tag).toHaveAttribute('data-size', ComponentSize.MEDIUM)
    })
  })

  it('deve renderizar com tamanho customizado', () => {
    render(
      <TagsContainer
        items={mockItems}
        variant={TagVariant.GENRE}
        size={ComponentSize.LARGE}
      />
    )

    const tags = screen.getAllByTestId('tag')
    tags.forEach(tag => {
      expect(tag).toHaveAttribute('data-size', ComponentSize.LARGE)
    })
  })

  it('deve limitar o número de tags exibidos', () => {
    render(
      <TagsContainer
        items={mockItems}
        variant={TagVariant.GENRE}
        maxItems={2}
      />
    )

    const tags = screen.getAllByTestId('tag')
    expect(tags).toHaveLength(2)
    expect(tags[0]).toHaveTextContent('Ação')
    expect(tags[1]).toHaveTextContent('Aventura')
  })

  it('deve renderizar todos os tags quando maxItems é maior que o array', () => {
    render(
      <TagsContainer
        items={mockItems}
        variant={TagVariant.GENRE}
        maxItems={10}
      />
    )

    const tags = screen.getAllByTestId('tag')
    expect(tags).toHaveLength(5)
  })

  it('deve renderizar com array vazio', () => {
    render(<TagsContainer items={[]} variant={TagVariant.GENRE} />)

    const container = screen.getByTestId('tags-container')
    const tags = screen.queryAllByTestId('tag')

    expect(container).toBeInTheDocument()
    expect(tags).toHaveLength(0)
  })

  it('deve renderizar com diferentes variantes', () => {
    const { rerender } = render(
      <TagsContainer items={mockItems} variant={TagVariant.GENRE} />
    )
    let tags = screen.getAllByTestId('tag')
    tags.forEach(tag => {
      expect(tag).toHaveAttribute('data-variant', TagVariant.GENRE)
    })

    rerender(<TagsContainer items={mockItems} variant={TagVariant.PLATFORM} />)
    tags = screen.getAllByTestId('tag')
    tags.forEach(tag => {
      expect(tag).toHaveAttribute('data-variant', TagVariant.PLATFORM)
    })

    rerender(<TagsContainer items={mockItems} variant={TagVariant.GENRE} />)
    tags = screen.getAllByTestId('tag')
    tags.forEach(tag => {
      expect(tag).toHaveAttribute('data-variant', TagVariant.GENRE)
    })
  })

  it('deve renderizar com diferentes tamanhos', () => {
    const { rerender } = render(
      <TagsContainer
        items={mockItems}
        variant={TagVariant.GENRE}
        size={ComponentSize.SMALL}
      />
    )
    let tags = screen.getAllByTestId('tag')
    tags.forEach(tag => {
      expect(tag).toHaveAttribute('data-size', ComponentSize.SMALL)
    })

    rerender(
      <TagsContainer
        items={mockItems}
        variant={TagVariant.GENRE}
        size={ComponentSize.MEDIUM}
      />
    )
    tags = screen.getAllByTestId('tag')
    tags.forEach(tag => {
      expect(tag).toHaveAttribute('data-size', ComponentSize.MEDIUM)
    })

    rerender(
      <TagsContainer
        items={mockItems}
        variant={TagVariant.GENRE}
        size={ComponentSize.LARGE}
      />
    )
    tags = screen.getAllByTestId('tag')
    tags.forEach(tag => {
      expect(tag).toHaveAttribute('data-size', ComponentSize.LARGE)
    })
  })

  it('deve combinar todas as props corretamente', () => {
    render(
      <TagsContainer
        items={mockItems}
        variant={TagVariant.PLATFORM}
        maxItems={2}
        size={ComponentSize.LARGE}
      />
    )

    const container = screen.getByTestId('tags-container')
    const tags = screen.getAllByTestId('tag')

    expect(container).toBeInTheDocument()
    expect(tags).toHaveLength(2)
    tags.forEach(tag => {
      expect(tag).toHaveAttribute('data-variant', TagVariant.PLATFORM)
      expect(tag).toHaveAttribute('data-size', ComponentSize.LARGE)
    })
  })

  it('deve ser acessível', () => {
    render(<TagsContainer items={mockItems} variant={TagVariant.GENRE} />)

    const container = screen.getByTestId('tags-container')
    expect(container).toBeInTheDocument()
  })
})
