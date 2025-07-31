import { FILTER_FIELDS } from '@/types/common'
import type { GameItem } from '@/types/filter'
import type { Game } from '@/types/game'
import type { IFavoritesRepository } from './interfaces/IFavoritesRepository'

export class FavoritesService {
  constructor(private repository: IFavoritesRepository) {}

  async loadFavorites(): Promise<Game[]> {
    return await this.repository.load()
  }

  async saveFavorites(favorites: Game[]): Promise<void> {
    await this.repository.save(favorites)
  }

  async clearFavorites(): Promise<void> {
    await this.repository.clear()
  }

  async isStorageAvailable(): Promise<boolean> {
    return await this.repository.isAvailable()
  }

  filterDataFromFavorites(favorites: Game[]) {
    const genres = this.extractUniqueItems(favorites, FILTER_FIELDS.GENRES)
    const platforms = this.extractUniqueItems(
      favorites,
      FILTER_FIELDS.PLATFORMS
    )
    const stores = this.extractUniqueItems(favorites, FILTER_FIELDS.STORES)
    const tags = this.extractUniqueItems(favorites, FILTER_FIELDS.TAGS)

    return {
      genres,
      platforms,
      stores,
      tags
    }
  }

  private extractUniqueItems(
    favorites: Game[],
    field: keyof typeof FIELD_CONFIGS
  ): GameItem[] {
    const items = favorites.flatMap(FIELD_CONFIGS[field])
    const uniqueMap = new Map<string, GameItem>()
    for (const item of items) {
      if (item && item.value && item.label) {
        uniqueMap.set(item.value, item)
      }
    }
    return Array.from(uniqueMap.values())
  }
}

const FIELD_CONFIGS = {
  genres: (g: Game) =>
    g.genres
      ?.map(item => ({ value: item.id.toString(), label: item.name }))
      .sort((a, b) => a.label.localeCompare(b.label)) || [],
  tags: (g: Game) =>
    g.tags
      ?.map(item => ({ value: item.id.toString(), label: item.name }))
      .sort((a, b) => a.label.localeCompare(b.label)) || [],
  platforms: (g: Game) =>
    g.platforms
      ?.map(p => ({
        value: p.platform.id.toString(),
        label: p.platform.name
      }))
      .sort((a, b) => a.label.localeCompare(b.label)) || [],
  stores: (g: Game) =>
    g.stores
      ?.map(s => ({
        value: s.store.id.toString(),
        label: s.store.name
      }))
      .sort((a, b) => a.label.localeCompare(b.label)) || []
} satisfies Record<string, (game: Game) => GameItem[]>
