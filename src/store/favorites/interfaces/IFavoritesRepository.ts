import type { Game } from '@/types/game'

export interface IFavoritesRepository {
  save(favorites: Game[]): Promise<void>
  load(): Promise<Game[]>
  clear(): Promise<void>
  isAvailable(): Promise<boolean>
}
