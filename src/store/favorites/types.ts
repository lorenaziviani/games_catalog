import type { Game } from '@/types/game'

export interface FavoritesState {
  items: Game[]
  isLoading: boolean
  error: string | null
  lastUpdated: number | null
}

export interface StoredFavorites {
  items: Game[]
  lastUpdated: number
}
