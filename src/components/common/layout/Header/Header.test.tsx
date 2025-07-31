import favoritesReducer from '@/store/favorites/reducer'
import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Header from './index'

jest.mock('@/hooks/useFavorites', () => ({
  useFavorites: () => ({
    favoritesCount: 2
  })
}))

const renderWithProviders = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      favorites: favoritesReducer
    }
  })

  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  )
}

describe('Header Component', () => {
  it('deve renderizar o header', () => {
    renderWithProviders(<Header />)

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  it('deve renderizar os links de navegação', () => {
    renderWithProviders(<Header />)

    expect(screen.getByText('Início')).toBeInTheDocument()
    expect(screen.getByText('Favoritos (2)')).toBeInTheDocument()
  })

  it('deve mostrar o contador de favoritos quando há favoritos', () => {
    renderWithProviders(<Header />)

    expect(screen.getByText('Favoritos (2)')).toBeInTheDocument()
  })

  it('deve navegar para a página inicial ao clicar no link', () => {
    renderWithProviders(<Header />)

    const homeLink = screen.getByText('Início')
    expect(homeLink.closest('a')).toHaveAttribute('href', '/')
  })

  it('deve navegar para a página de favoritos ao clicar no link', () => {
    renderWithProviders(<Header />)

    const favoritesLink = screen.getByText('Favoritos (2)')
    expect(favoritesLink.closest('a')).toHaveAttribute('href', '/favorites')
  })

  it('deve renderizar a navegação', () => {
    renderWithProviders(<Header />)

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })
})
