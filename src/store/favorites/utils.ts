import type { Game } from '@/types/game'
import type { StoredFavorites } from './types'

export const FAVORITES_STORAGE_KEY = 'favorites'
export const FAVORITES_VERSION = '1.0.0'

export const favoritesStorage = {
  save: (favorites: Game[]): void => {
    try {
      const data: StoredFavorites = {
        items: favorites,
        lastUpdated: Date.now()
      }
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error('Erro ao salvar favoritos no localStorage:', error)
      throw new Error('Erro ao salvar favoritos')
    }
  },

  load: (): Game[] => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
      if (!stored) return []

      const data: StoredFavorites = JSON.parse(stored)

      if (!Array.isArray(data.items)) {
        console.warn('Dados inválidos no localStorage, limpando...')
        localStorage.removeItem(FAVORITES_STORAGE_KEY)
        return []
      }

      return data.items
    } catch (error) {
      console.error('Erro ao carregar favoritos do localStorage:', error)
      localStorage.removeItem(FAVORITES_STORAGE_KEY)
      return []
    }
  },

  clear: (): void => {
    try {
      localStorage.removeItem(FAVORITES_STORAGE_KEY)
    } catch (error) {
      console.error('Erro ao limpar favoritos do localStorage:', error)
    }
  },

  isAvailable: (): boolean => {
    try {
      const test = 'test'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  }
}
