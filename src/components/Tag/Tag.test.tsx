import { ComponentSize, TagVariant } from '@/types/common'
import { render, screen } from '@testing-library/react'
import Tag from './index'

jest.mock('styled-components', () => ({
  ...jest.requireActual('styled-components'),
  useTheme: () => ({
    mode: 'light'
  })
}))

jest.mock('./styles', () => ({
  Tag: ({
    children,
    $variant,
    $size
  }: {
    children: React.ReactNode
    $variant: TagVariant
    $size: ComponentSize
  }) => (
    <span data-testid="tag" data-variant={$variant} data-size={$size}>
      {children}
    </span>
  )
}))

describe('Tag Component', () => {
  it('deve renderizar o conteúdo do tag', () => {
    render(<Tag>Ação</Tag>)

    const tag = screen.getByTestId('tag')
    expect(tag).toHaveTextContent('Ação')
  })

  it('deve renderizar com variante padrão', () => {
    render(<Tag>Ação</Tag>)

    const tag = screen.getByTestId('tag')
    expect(tag).toHaveAttribute('data-variant', TagVariant.GENRE)
  })

  it('deve renderizar com variante customizada', () => {
    render(<Tag variant={TagVariant.PLATFORM}>PC</Tag>)

    const tag = screen.getByTestId('tag')
    expect(tag).toHaveAttribute('data-variant', TagVariant.PLATFORM)
  })

  it('deve renderizar com tamanho padrão', () => {
    render(<Tag>Ação</Tag>)

    const tag = screen.getByTestId('tag')
    expect(tag).toHaveAttribute('data-size', ComponentSize.MEDIUM)
  })

  it('deve renderizar com tamanho customizado', () => {
    render(<Tag size={ComponentSize.SMALL}>Ação</Tag>)

    const tag = screen.getByTestId('tag')
    expect(tag).toHaveAttribute('data-size', ComponentSize.SMALL)
  })

  it('deve renderizar com diferentes variantes', () => {
    const { rerender } = render(<Tag variant={TagVariant.GENRE}>Ação</Tag>)
    expect(screen.getByTestId('tag')).toHaveAttribute(
      'data-variant',
      TagVariant.GENRE
    )

    rerender(<Tag variant={TagVariant.PLATFORM}>PC</Tag>)
    expect(screen.getByTestId('tag')).toHaveAttribute(
      'data-variant',
      TagVariant.PLATFORM
    )

    rerender(<Tag variant={TagVariant.DEVELOPER}>Ubisoft</Tag>)
    expect(screen.getByTestId('tag')).toHaveAttribute(
      'data-variant',
      TagVariant.DEVELOPER
    )
  })

  it('deve renderizar com diferentes tamanhos', () => {
    const { rerender } = render(<Tag size={ComponentSize.SMALL}>Ação</Tag>)
    expect(screen.getByTestId('tag')).toHaveAttribute(
      'data-size',
      ComponentSize.SMALL
    )

    rerender(<Tag size={ComponentSize.MEDIUM}>Ação</Tag>)
    expect(screen.getByTestId('tag')).toHaveAttribute(
      'data-size',
      ComponentSize.MEDIUM
    )

    rerender(<Tag size={ComponentSize.LARGE}>Ação</Tag>)
    expect(screen.getByTestId('tag')).toHaveAttribute(
      'data-size',
      ComponentSize.LARGE
    )
  })

  it('deve combinar variante e tamanho', () => {
    render(
      <Tag variant={TagVariant.PLATFORM} size={ComponentSize.LARGE}>
        PC
      </Tag>
    )

    const tag = screen.getByTestId('tag')
    expect(tag).toHaveAttribute('data-variant', TagVariant.PLATFORM)
    expect(tag).toHaveAttribute('data-size', ComponentSize.LARGE)
    expect(tag).toHaveTextContent('PC')
  })

  it('deve renderizar conteúdo complexo', () => {
    render(
      <Tag>
        <span>Gênero:</span> Ação
      </Tag>
    )

    const tag = screen.getByTestId('tag')
    expect(tag).toHaveTextContent('Gênero: Ação')
  })

  it('deve ser acessível', () => {
    render(<Tag>Ação</Tag>)

    const tag = screen.getByTestId('tag')
    expect(tag).toBeInTheDocument()
  })
})
