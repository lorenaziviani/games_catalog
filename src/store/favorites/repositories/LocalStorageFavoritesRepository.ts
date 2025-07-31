import type { Game } from '@/types/game'
import type { IFavoritesRepository } from '../interfaces/IFavoritesRepository'
import type { StoredFavorites } from '../types'

export class LocalStorageFavoritesRepository implements IFavoritesRepository {
  private readonly storageKey = 'favorites'

  async save(favorites: Game[]): Promise<void> {
    try {
      const data: StoredFavorites = {
        items: favorites,
        lastUpdated: Date.now()
      }
      localStorage.setItem(this.storageKey, JSON.stringify(data))
    } catch (error) {
      console.error('Erro ao salvar favoritos no localStorage:', error)
      throw new Error('Erro ao salvar favoritos')
    }
  }

  async load(): Promise<Game[]> {
    try {
      const stored = localStorage.getItem(this.storageKey)
      if (!stored) return []

      const data: StoredFavorites = JSON.parse(stored)

      if (!Array.isArray(data.items)) {
        console.warn('Dados inválidos no localStorage, limpando...')
        localStorage.removeItem(this.storageKey)
        return []
      }

      return data.items
    } catch (error) {
      console.error('Erro ao carregar favoritos do localStorage:', error)
      localStorage.removeItem(this.storageKey)
      return []
    }
  }

  async clear(): Promise<void> {
    try {
      localStorage.removeItem(this.storageKey)
    } catch (error) {
      console.error('Erro ao limpar favoritos do localStorage:', error)
    }
  }

  async isAvailable(): Promise<boolean> {
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
