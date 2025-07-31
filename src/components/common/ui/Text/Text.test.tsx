import { ElementType, TextVariant } from '@/types/common'
import { render, screen } from '@testing-library/react'
import Text from './index'

describe('Text Component', () => {
  it('deve renderizar o texto com tag padrão (p)', () => {
    render(<Text>Texto de teste</Text>)

    const textElement = screen.getByText('Texto de teste')
    expect(textElement.tagName).toBe('P')
  })

  it('deve renderizar o texto com tag customizada', () => {
    render(<Text as={ElementType.TITLE}>Título</Text>)

    const textElement = screen.getByText('Título')
    expect(textElement.tagName).toBe('H2')
  })

  it('deve renderizar o texto com variante padrão', () => {
    render(<Text>Texto de teste</Text>)

    const textElement = screen.getByText('Texto de teste')
    expect(textElement).toBeInTheDocument()
  })

  it('deve renderizar o texto com variante customizada', () => {
    render(<Text $variant={TextVariant.SECONDARY}>Texto secundário</Text>)

    const textElement = screen.getByText('Texto secundário')
    expect(textElement).toBeInTheDocument()
  })

  it('deve renderizar com tamanho de fonte customizado', () => {
    render(<Text $lgFontSize={24}>Texto grande</Text>)

    const textElement = screen.getByText('Texto grande')
    expect(textElement).toBeInTheDocument()
  })

  it('deve renderizar com múltiplos tamanhos de fonte', () => {
    render(
      <Text $smFontSize={16} $mdFontSize={20} $lgFontSize={24}>
        Texto responsivo
      </Text>
    )

    const textElement = screen.getByText('Texto responsivo')
    expect(textElement).toBeInTheDocument()
  })

  it('deve renderizar texto longo', () => {
    const longText =
      'Este é um texto muito longo que deve ser renderizado corretamente pelo componente Text'

    render(<Text>{longText}</Text>)

    const textElement = screen.getByText(longText)
    expect(textElement).toBeInTheDocument()
  })

  it('deve renderizar texto com caracteres especiais', () => {
    const specialText = 'Texto com caracteres especiais: áéíóú çãõ ñ'

    render(<Text>{specialText}</Text>)

    const textElement = screen.getByText(specialText)
    expect(textElement).toBeInTheDocument()
  })

  it('deve renderizar com diferentes tipos de elementos', () => {
    const { rerender } = render(<Text as={ElementType.TITLE}>Título H2</Text>)
    expect(screen.getByText('Título H2').tagName).toBe('H2')

    rerender(<Text as={ElementType.P}>Parágrafo</Text>)
    expect(screen.getByText('Parágrafo').tagName).toBe('P')

    rerender(<Text as={ElementType.SPAN}>Span</Text>)
    expect(screen.getByText('Span').tagName).toBe('SPAN')
  })

  it('deve renderizar com diferentes variantes', () => {
    const { rerender } = render(
      <Text $variant={TextVariant.PRIMARY}>Primário</Text>
    )
    expect(screen.getByText('Primário')).toBeInTheDocument()

    rerender(<Text $variant={TextVariant.SECONDARY}>Secundário</Text>)
    expect(screen.getByText('Secundário')).toBeInTheDocument()
  })

  it('deve combinar todas as props corretamente', () => {
    render(
      <Text
        as={ElementType.TITLE}
        $variant={TextVariant.SECONDARY}
        $lgFontSize={32}
        $mdFontSize={24}
        $smFontSize={20}
      >
        Título completo
      </Text>
    )

    const textElement = screen.getByText('Título completo')
    expect(textElement.tagName).toBe('H2')
    expect(textElement).toBeInTheDocument()
  })
})
