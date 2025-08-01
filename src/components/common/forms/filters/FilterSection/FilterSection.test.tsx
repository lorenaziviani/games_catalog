import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
  return function MockText({
    children,
    $variant,
    $lgFontSize
  }: {
    children: React.ReactNode
    $variant?: string
    $lgFontSize?: number
  }) {
    return (
      <span
        data-testid="text"
        data-variant={$variant}
        data-font-size={$lgFontSize}
      >
        {children}
      </span>
    )
  }
})

jest.mock('./styles', () => ({
  Container: ({
    children,
    ...props
  }: {
    children: React.ReactNode
    [key: string]: unknown
  }) => (
    <div data-testid="filter-section-container" {...props}>
      {children}
    </div>
  ),
  Content: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="filter-section-content">{children}</div>
  )
}))

describe('FilterSection Component', () => {
  describe('Renderização Básica', () => {
    it('deve renderizar o container da seção de filtro', () => {
      render(
        <FilterSection title="Teste">
          <div>Conteúdo do filtro</div>
        </FilterSection>
      )

      const container = screen.getByTestId('filter-section')
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

      const container = screen.getByTestId('filter-section')
      const content = screen.getByTestId('filter-section-content')
      const text = screen.getByTestId('text')

      expect(container).toBeInTheDocument()
      expect(content).toBeInTheDocument()
      expect(text).toHaveTextContent('Título sem conteúdo')
    })
  })

  describe('Configuração de Tema', () => {
    it('deve aplicar variante correta para tema claro', () => {
      render(
        <FilterSection title="Tema Claro">
          <div>Conteúdo</div>
        </FilterSection>
      )

      const text = screen.getByTestId('text')
      expect(text).toHaveAttribute('data-variant', 'primary')
    })

    it('deve aplicar tamanho de fonte correto', () => {
      render(
        <FilterSection title="Tamanho de Fonte">
          <div>Conteúdo</div>
        </FilterSection>
      )

      const text = screen.getByTestId('text')
      expect(text).toHaveAttribute('data-font-size', '16')
    })
  })

  describe('Edge Cases', () => {
    it('deve lidar com título muito longo', () => {
      const longTitle = 'A'.repeat(1000)
      render(
        <FilterSection title={longTitle}>
          <div>Conteúdo</div>
        </FilterSection>
      )

      const text = screen.getByTestId('text')
      expect(text).toHaveTextContent(longTitle)
    })

    it('deve lidar com título com caracteres especiais', () => {
      render(
        <FilterSection title="Título com @#$%^&*()">
          <div>Conteúdo</div>
        </FilterSection>
      )

      const text = screen.getByTestId('text')
      expect(text).toHaveTextContent('Título com @#$%^&*()')
    })

    it('deve lidar com título com emojis', () => {
      render(
        <FilterSection title="🎮 Jogos 🎯">
          <div>Conteúdo</div>
        </FilterSection>
      )

      const text = screen.getByTestId('text')
      expect(text).toHaveTextContent('🎮 Jogos 🎯')
    })

    it('deve lidar com conteúdo undefined', () => {
      render(
        <FilterSection title="Título">
          {undefined as React.ReactNode}
        </FilterSection>
      )

      const container = screen.getByTestId('filter-section')
      expect(container).toBeInTheDocument()
    })

    it('deve lidar com conteúdo null', () => {
      render(<FilterSection title="Título">{null}</FilterSection>)

      const container = screen.getByTestId('filter-section')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Acessibilidade', () => {
    it('deve ser focável', async () => {
      const user = userEvent.setup()
      render(
        <FilterSection title="Acessibilidade">
          <button data-testid="focusable-button">Botão</button>
        </FilterSection>
      )

      const button = screen.getByTestId('focusable-button')
      await user.tab()

      expect(button).toHaveFocus()
    })

    it('deve suportar navegação por teclado', async () => {
      const user = userEvent.setup()
      render(
        <FilterSection title="Navegação">
          <button data-testid="button-1">Botão 1</button>
          <button data-testid="button-2">Botão 2</button>
        </FilterSection>
      )

      const button1 = screen.getByTestId('button-1')
      const button2 = screen.getByTestId('button-2')

      await user.tab()
      expect(button1).toHaveFocus()

      await user.tab()
      expect(button2).toHaveFocus()
    })

    it('deve ter estrutura semântica correta', () => {
      render(
        <FilterSection title="Estrutura">
          <div>Conteúdo</div>
        </FilterSection>
      )

      const container = screen.getByTestId('filter-section')
      const text = screen.getByTestId('text')
      const content = screen.getByTestId('filter-section-content')

      expect(container).toContainElement(text)
      expect(container).toContainElement(content)
    })
  })

  describe('Performance', () => {
    it('deve lidar com re-renders frequentes', () => {
      const { rerender } = render(
        <FilterSection title="Performance">
          <div>Conteúdo</div>
        </FilterSection>
      )

      for (let i = 0; i < 10; i++) {
        rerender(
          <FilterSection title={`Título ${i}`}>
            <div>Conteúdo {i}</div>
          </FilterSection>
        )
      }

      const container = screen.getByTestId('filter-section')
      expect(container).toBeInTheDocument()
    })

    it('deve renderizar sem erros com conteúdo complexo', () => {
      const complexContent = (
        <div>
          <input type="text" data-testid="input" />
          <select data-testid="select">
            <option>Opção 1</option>
            <option>Opção 2</option>
          </select>
          <button data-testid="button">Botão</button>
          <div data-testid="nested">
            <span>Texto aninhado</span>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        </div>
      )

      render(
        <FilterSection title="Conteúdo Complexo">
          {complexContent}
        </FilterSection>
      )

      const container = screen.getByTestId('filter-section')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Integração', () => {
    it('deve funcionar com diferentes tipos de conteúdo', () => {
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

    it('deve ser acessível', () => {
      render(
        <FilterSection title="Acessibilidade">
          <div>Conteúdo do filtro</div>
        </FilterSection>
      )

      const container = screen.getByTestId('filter-section')
      expect(container).toBeInTheDocument()
    })

    it('deve ter estrutura correta', () => {
      render(
        <FilterSection title="Estrutura">
          <div data-testid="filter-child">Conteúdo</div>
        </FilterSection>
      )

      const container = screen.getByTestId('filter-section')
      const text = screen.getByTestId('text')
      const content = screen.getByTestId('filter-section-content')
      const child = screen.getByTestId('filter-child')

      expect(container).toContainElement(text)
      expect(container).toContainElement(content)
      expect(child).toBeInTheDocument()
    })
  })

  describe('Responsividade', () => {
    it('deve renderizar corretamente com diferentes tamanhos de tela', () => {
      render(
        <FilterSection title="Responsivo">
          <div>Conteúdo responsivo</div>
        </FilterSection>
      )

      const container = screen.getByTestId('filter-section')
      expect(container).toBeInTheDocument()
    })

    it('deve lidar com conteúdo que muda de tamanho', () => {
      const { rerender } = render(
        <FilterSection title="Tamanho Dinâmico">
          <div data-testid="dynamic-content">Conteúdo pequeno</div>
        </FilterSection>
      )

      rerender(
        <FilterSection title="Tamanho Dinâmico">
          <div data-testid="dynamic-content">
            Conteúdo muito maior que pode causar problemas de layout se não for
            tratado corretamente
          </div>
        </FilterSection>
      )

      const content = screen.getByTestId('dynamic-content')
      expect(content).toBeInTheDocument()
    })
  })

  describe('Testes de Regressão', () => {
    it('deve manter comportamento consistente entre renderizações', () => {
      const { rerender } = render(
        <FilterSection title="Consistência">
          <div>Conteúdo</div>
        </FilterSection>
      )

      const initialText = screen.getByTestId('text')
      expect(initialText).toHaveTextContent('Consistência')

      rerender(
        <FilterSection title="Consistência">
          <div>Novo conteúdo</div>
        </FilterSection>
      )

      const updatedText = screen.getByTestId('text')
      expect(updatedText).toHaveTextContent('Consistência')
    })

    it('deve preservar estrutura DOM entre atualizações', () => {
      const { rerender } = render(
        <FilterSection title="Estrutura">
          <div data-testid="preserved">Conteúdo</div>
        </FilterSection>
      )

      const container = screen.getByTestId('filter-section')
      const content = screen.getByTestId('filter-section-content')
      const preserved = screen.getByTestId('preserved')

      expect(container).toContainElement(content)
      expect(content).toContainElement(preserved)

      rerender(
        <FilterSection title="Estrutura Atualizada">
          <div data-testid="preserved">Conteúdo atualizado</div>
        </FilterSection>
      )

      const updatedContainer = screen.getByTestId('filter-section')
      const updatedContent = screen.getByTestId('filter-section-content')
      const updatedPreserved = screen.getByTestId('preserved')

      expect(updatedContainer).toContainElement(updatedContent)
      expect(updatedContent).toContainElement(updatedPreserved)
    })
  })
})
