import type { Game } from '@/types/game'

export const extractGameGenresIds = (game: Game): string[] => {
  return game.genres?.map(genre => genre.id.toString()) || []
}

export const extractGamePlatformsIds = (game: Game): string[] => {
  return game.platforms?.map(platform => platform.platform.id.toString()) || []
}

export const extractGameStoresIds = (game: Game): string[] => {
  return game.stores?.map(store => store.store.id.toString()) || []
}

export const extractGameTagsIds = (game: Game): string[] => {
  return game.tags?.map(tag => tag.id.toString()) || []
}

export const isGameMatchingFilterIds = (
  gameIds: string[],
  filterIds: string[]
): boolean => {
  if (filterIds.length === 0) return true
  return filterIds.some(filterId => gameIds.includes(filterId))
}
