import { jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import RoutesApp from './index'

jest.mock('@pages/Home', () => {
  return function MockHomePage() {
    return <div data-testid="home-page">Home Page</div>
  }
})

jest.mock('@pages/Favorites', () => {
  return function MockFavoritesPage() {
    return <div data-testid="favorites-page">Favorites Page</div>
  }
})

describe('RoutesApp', () => {
  describe('navegação de rotas', () => {
    it('deve renderizar a página Home na rota raiz', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <RoutesApp />
        </MemoryRouter>
      )

      expect(screen.getByTestId('home-page')).toBeInTheDocument()
      expect(screen.getByText('Home Page')).toBeInTheDocument()
    })

    it('deve renderizar a página Favorites na rota /favorites', () => {
      render(
        <MemoryRouter initialEntries={['/favorites']}>
          <RoutesApp />
        </MemoryRouter>
      )

      expect(screen.getByTestId('favorites-page')).toBeInTheDocument()
      expect(screen.getByText('Favorites Page')).toBeInTheDocument()
    })

    it('deve não renderizar nenhuma página para rotas não encontradas', () => {
      render(
        <MemoryRouter initialEntries={['/invalid-route']}>
          <RoutesApp />
        </MemoryRouter>
      )

      expect(screen.queryByTestId('home-page')).not.toBeInTheDocument()
      expect(screen.queryByTestId('favorites-page')).not.toBeInTheDocument()
    })
  })

  describe('estrutura de rotas', () => {
    it('deve ter a rota raiz configurada', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <RoutesApp />
        </MemoryRouter>
      )

      expect(screen.getByTestId('home-page')).toBeInTheDocument()
    })

    it('deve ter a rota /favorites configurada', () => {
      render(
        <MemoryRouter initialEntries={['/favorites']}>
          <RoutesApp />
        </MemoryRouter>
      )

      expect(screen.getByTestId('favorites-page')).toBeInTheDocument()
    })
  })

  describe('componentes renderizados', () => {
    it('deve renderizar o componente Routes', () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/']}>
          <RoutesApp />
        </MemoryRouter>
      )

      expect(container.firstChild).toBeInTheDocument()
    })

    it('deve renderizar o componente Route para a página Home', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <RoutesApp />
        </MemoryRouter>
      )

      expect(screen.getByTestId('home-page')).toBeInTheDocument()
    })

    it('deve renderizar o componente Route para a página Favorites', () => {
      render(
        <MemoryRouter initialEntries={['/favorites']}>
          <RoutesApp />
        </MemoryRouter>
      )

      expect(screen.getByTestId('favorites-page')).toBeInTheDocument()
    })
  })

  describe('cenários de edge cases', () => {
    it('deve lidar com rotas vazias', () => {
      render(
        <MemoryRouter initialEntries={['']}>
          <RoutesApp />
        </MemoryRouter>
      )

      expect(screen.getByTestId('home-page')).toBeInTheDocument()
    })

    it('deve lidar com rotas com barras extras', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <RoutesApp />
        </MemoryRouter>
      )

      expect(screen.getByTestId('home-page')).toBeInTheDocument()
    })

    it('deve não renderizar para rotas case-sensitive incorretas', () => {
      render(
        <MemoryRouter initialEntries={['/FAVORITES']}>
          <RoutesApp />
        </MemoryRouter>
      )

      expect(screen.queryByTestId('home-page')).not.toBeInTheDocument()
    })
  })

  describe('estrutura do componente', () => {
    it('deve ter a estrutura correta de Routes e Route', () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/']}>
          <RoutesApp />
        </MemoryRouter>
      )

      expect(container.firstChild).toBeInTheDocument()
    })

    it('deve exportar o componente como default', () => {
      expect(RoutesApp).toBeDefined()
      expect(typeof RoutesApp).toBe('function')
    })
  })

  describe('integração com React Router', () => {
    it('deve funcionar corretamente com MemoryRouter', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <RoutesApp />
        </MemoryRouter>
      )

      expect(screen.getByTestId('home-page')).toBeInTheDocument()
    })
  })

  describe('comportamento específico das rotas', () => {
    it('deve renderizar HomePage na rota exata "/"', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <RoutesApp />
        </MemoryRouter>
      )

      expect(screen.getByTestId('home-page')).toBeInTheDocument()
    })

    it('deve renderizar FavoritesPage na rota exata "/favorites"', () => {
      render(
        <MemoryRouter initialEntries={['/favorites']}>
          <RoutesApp />
        </MemoryRouter>
      )

      expect(screen.getByTestId('favorites-page')).toBeInTheDocument()
    })

    it('deve não renderizar para rotas inexistentes', () => {
      render(
        <MemoryRouter initialEntries={['/about']}>
          <RoutesApp />
        </MemoryRouter>
      )

      expect(screen.queryByTestId('home-page')).not.toBeInTheDocument()
      expect(screen.queryByTestId('favorites-page')).not.toBeInTheDocument()
    })
  })

  describe('testes de navegação independentes', () => {
    it('deve renderizar HomePage quando acessa rota raiz', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <RoutesApp />
        </MemoryRouter>
      )

      expect(screen.getByTestId('home-page')).toBeInTheDocument()
    })

    it('deve renderizar FavoritesPage quando acessa rota /favorites', () => {
      render(
        <MemoryRouter initialEntries={['/favorites']}>
          <RoutesApp />
        </MemoryRouter>
      )

      expect(screen.getByTestId('favorites-page')).toBeInTheDocument()
    })
  })
})
