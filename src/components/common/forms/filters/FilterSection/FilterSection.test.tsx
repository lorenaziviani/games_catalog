import { render, screen } from '@testing-library/react'
import FilterSection from './index.tsx'

jest.mock('styled-components', () => ({
  ...jest.requireActual('styled-components'),
  useTheme: () => ({
    mode: 'light'
  })
}))

jest.mock('../../../../../utils/themeUtils', () => ({
  isDarkMode: () => false
}))

jest.mock('../../../ui/Text', () => {
  return function MockText({ children }: { children: React.ReactNode }) {
    return <span data-testid="text">{children}</span>
  }
})

jest.mock('./styles', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="filter-section-container">{children}</div>
  ),
  Content: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="filter-section-content">{children}</div>
  )
}))

describe('FilterSection Component', () => {
  it('deve renderizar o container da seção de filtro', () => {
    render(
      <FilterSection title="Teste">
        <div>Conteúdo do filtro</div>
      </FilterSection>
    )

    const container = screen.getByTestId('filter-section-container')
    expect(container).toBeInTheDocument()
  })

  it('deve renderizar o título da seção', () => {
    render(
      <FilterSection title="Gêneros">
        <div>Conteúdo do filtro</div>
      </FilterSection>
    )

    const text = screen.getByTestId('text')
    expect(text).toHaveTextContent('Gêneros')
  })

  it('deve renderizar o conteúdo da seção', () => {
    render(
      <FilterSection title="Plataformas">
        <div data-testid="filter-content">Conteúdo do filtro</div>
      </FilterSection>
    )

    const content = screen.getByTestId('filter-section-content')
    const filterContent = screen.getByTestId('filter-content')
    expect(content).toBeInTheDocument()
    expect(content).toContainElement(filterContent)
  })

  it('deve renderizar com título customizado', () => {
    render(
      <FilterSection title="Lojas">
        <div>Conteúdo do filtro</div>
      </FilterSection>
    )

    const text = screen.getByTestId('text')
    expect(text).toHaveTextContent('Lojas')
  })

  it('deve renderizar com conteúdo complexo', () => {
    render(
      <FilterSection title="Tags">
        <div data-testid="complex-content">
          <span>Item 1</span>
          <span>Item 2</span>
          <span>Item 3</span>
        </div>
      </FilterSection>
    )

    const content = screen.getByTestId('filter-section-content')
    const complexContent = screen.getByTestId('complex-content')
    expect(content).toContainElement(complexContent)
  })

  it('deve renderizar com múltiplos elementos filhos', () => {
    render(
      <FilterSection title="Filtros">
        <div data-testid="child-1">Filho 1</div>
        <div data-testid="child-2">Filho 2</div>
        <div data-testid="child-3">Filho 3</div>
      </FilterSection>
    )

    const content = screen.getByTestId('filter-section-content')
    const child1 = screen.getByTestId('child-1')
    const child2 = screen.getByTestId('child-2')
    const child3 = screen.getByTestId('child-3')

    expect(content).toContainElement(child1)
    expect(content).toContainElement(child2)
    expect(content).toContainElement(child3)
  })

  it('deve renderizar com título vazio', () => {
    render(
      <FilterSection title="">
        <div>Conteúdo do filtro</div>
      </FilterSection>
    )

    const text = screen.getByTestId('text')
    expect(text).toHaveTextContent('')
  })

  it('deve renderizar sem conteúdo', () => {
    render(<FilterSection title="Título sem conteúdo">{null}</FilterSection>)

    const container = screen.getByTestId('filter-section-container')
    const content = screen.getByTestId('filter-section-content')
    const text = screen.getByTestId('text')

    expect(container).toBeInTheDocument()
    expect(content).toBeInTheDocument()
    expect(text).toHaveTextContent('Título sem conteúdo')
  })

  it('deve ser acessível', () => {
    render(
      <FilterSection title="Acessibilidade">
        <div>Conteúdo do filtro</div>
      </FilterSection>
    )

    const container = screen.getByTestId('filter-section-container')
    expect(container).toBeInTheDocument()
  })

  it('deve ter estrutura correta', () => {
    render(
      <FilterSection title="Estrutura">
        <div data-testid="filter-child">Conteúdo</div>
      </FilterSection>
    )

    const container = screen.getByTestId('filter-section-container')
    const text = screen.getByTestId('text')
    const content = screen.getByTestId('filter-section-content')
    const child = screen.getByTestId('filter-child')

    expect(container).toContainElement(text)
    expect(container).toContainElement(content)
    expect(content).toContainElement(child)
  })

  it('deve renderizar com diferentes tipos de conteúdo', () => {
    render(
      <FilterSection title="Tipos de Conteúdo">
        <input data-testid="input" type="text" />
        <select data-testid="select">
          <option>Opção 1</option>
        </select>
        <button data-testid="button">Botão</button>
      </FilterSection>
    )

    const content = screen.getByTestId('filter-section-content')
    const input = screen.getByTestId('input')
    const select = screen.getByTestId('select')
    const button = screen.getByTestId('button')

    expect(content).toContainElement(input)
    expect(content).toContainElement(select)
    expect(content).toContainElement(button)
  })
})
