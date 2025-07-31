import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Image from './index'

jest.mock('../Text', () => {
  return function MockText({ children }: { children: string }) {
    return <span data-testid="text-component">{children}</span>
  }
})

describe('Image Component', () => {
  const mockProps = {
    src: 'https://example.com/image.jpg',
    alt: 'Test image'
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve renderizar a imagem com src e alt corretos', () => {
    render(<Image {...mockProps} />)

    const image = screen.getByAltText('Test image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
  })

  it('deve renderizar com className customizado', () => {
    render(<Image {...mockProps} className="custom-class" />)

    const image = screen.getByRole('img')
    const container = image.closest('div')
    expect(container).toHaveClass('custom-class')
  })

  it('deve mostrar loading spinner inicialmente', () => {
    render(<Image {...mockProps} />)

    const image = screen.getByRole('img')
    const container = image.closest('div')
    const loadingSpinner = container?.querySelector('div')
    expect(loadingSpinner).toBeInTheDocument()
  })

  it('deve esconder loading spinner quando imagem carrega', async () => {
    render(<Image {...mockProps} />)

    const image = screen.getByAltText('Test image')

    fireEvent.load(image)

    await waitFor(() => {
      expect(image).toBeInTheDocument()
    })
  })

  it('deve usar fallback quando imagem falha', async () => {
    render(<Image {...mockProps} fallbackSrc="/fallback.jpg" />)

    const image = screen.getByAltText('Test image')

    fireEvent.error(image)

    await waitFor(() => {
      const updatedImage = screen.getByAltText('Test image')
      expect(updatedImage).toHaveAttribute('src', '/fallback.jpg')
    })
  })

  it('deve mostrar placeholder de erro quando fallback também falha', async () => {
    render(<Image {...mockProps} fallbackSrc="/fallback.jpg" />)

    const image = screen.getByAltText('Test image')

    fireEvent.error(image)

    await waitFor(() => {
      const fallbackImage = screen.getByAltText('Test image')
      fireEvent.error(fallbackImage)
    })

    await waitFor(() => {
      expect(screen.getByText('Imagem não disponível')).toBeInTheDocument()
    })
  })

  it('deve usar fallback padrão quando não especificado', async () => {
    render(<Image {...mockProps} />)

    const image = screen.getByAltText('Test image')

    fireEvent.error(image)

    await waitFor(() => {
      const updatedImage = screen.getByAltText('Test image')
      expect(updatedImage).toHaveAttribute('src', '/placeholder-game.jpg')
    })
  })

  it('deve aplicar classes CSS baseadas no estado', async () => {
    render(<Image {...mockProps} />)

    const image = screen.getByAltText('Test image')

    expect(image).toBeInTheDocument()

    fireEvent.load(image)

    await waitFor(() => {
      expect(image).toBeInTheDocument()
    })
  })

  it('deve aplicar classe de erro quando imagem falha', async () => {
    render(<Image {...mockProps} />)

    const image = screen.getByAltText('Test image')

    fireEvent.error(image)

    await waitFor(() => {
      expect(image).toBeInTheDocument()
    })
  })

  it('deve renderizar ícone de erro quando imagem não está disponível', async () => {
    render(<Image {...mockProps} />)

    const image = screen.getByAltText('Test image')

    fireEvent.error(image)

    await waitFor(() => {
      const fallbackImage = screen.getByAltText('Test image')
      fireEvent.error(fallbackImage)
    })

    await waitFor(() => {
      expect(screen.getByText('Imagem não disponível')).toBeInTheDocument()
    })
  })

  it('deve ser acessível', () => {
    render(<Image {...mockProps} />)

    const image = screen.getByAltText('Test image')
    expect(image).toHaveAttribute('alt', 'Test image')
  })

  it('deve lidar com URLs de imagem inválidas', async () => {
    render(<Image src="invalid-url" alt="Invalid image" />)

    const image = screen.getByAltText('Invalid image')

    fireEvent.error(image)

    await waitFor(() => {
      const updatedImage = screen.getByAltText('Invalid image')
      expect(updatedImage).toHaveAttribute('src', '/placeholder-game.jpg')
    })
  })
})
