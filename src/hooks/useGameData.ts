import {
  GAME_DATA_QUERY_KEYS,
  GAME_DATA_STALE_TIME,
  GAME_DATA_STORAGE_KEYS
} from '@/types/common'
import type { FilterOption } from '@/types/filter'
import type { Genre, Platform, Store, Tag } from '@/types/game'
import { gamesApi } from '@services/gamesApi'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

interface GameDataState {
  genres: FilterOption[]
  platforms: FilterOption[]
  stores: FilterOption[]
  tags: FilterOption[]
}

const DEFAULT_GAME_DATA: GameDataState = {
  genres: [],
  platforms: [],
  stores: [],
  tags: []
}

export const useGameData = () => {
  const [gameData, setGameData] = useState<GameDataState>(() => {
    const savedData: Partial<GameDataState> = {}

    Object.entries(GAME_DATA_STORAGE_KEYS).forEach(([key, storageKey]) => {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        try {
          savedData[key as keyof GameDataState] = JSON.parse(saved)
        } catch (error) {
          console.error(`Erro ao carregar ${key} do localStorage:`, error)
        }
      }
    })

    return { ...DEFAULT_GAME_DATA, ...savedData }
  })

  const { data: genresData } = useQuery({
    queryKey: [GAME_DATA_QUERY_KEYS.GENRES],
    queryFn: () => gamesApi.getGenres(),
    staleTime: GAME_DATA_STALE_TIME,
    enabled: gameData.genres.length === 0
  })

  const { data: platformsData } = useQuery({
    queryKey: [GAME_DATA_QUERY_KEYS.PLATFORMS],
    queryFn: () => gamesApi.getPlatforms(),
    staleTime: GAME_DATA_STALE_TIME,
    enabled: gameData.platforms.length === 0
  })

  const { data: storesData } = useQuery({
    queryKey: [GAME_DATA_QUERY_KEYS.STORES],
    queryFn: () => gamesApi.getStores(),
    staleTime: GAME_DATA_STALE_TIME,
    enabled: gameData.stores.length === 0
  })

  const { data: tagsData } = useQuery({
    queryKey: [GAME_DATA_QUERY_KEYS.TAGS],
    queryFn: () => gamesApi.getTags(),
    staleTime: GAME_DATA_STALE_TIME,
    enabled: gameData.tags.length === 0
  })

  useEffect(() => {
    if (genresData?.results) {
      const genres = genresData.results.map((genre: Genre) => ({
        value: genre.id.toString(),
        label: genre.name
      }))

      setGameData(prev => ({ ...prev, genres }))
      localStorage.setItem(
        GAME_DATA_STORAGE_KEYS.GENRES,
        JSON.stringify(genres)
      )
    }
  }, [genresData])

  useEffect(() => {
    if (platformsData?.results) {
      const platforms = platformsData.results.map((platform: Platform) => ({
        value: platform.id.toString(),
        label: platform.name,
        id: platform.id
      }))

      console.log('🔍 DEBUG - Platforms data:', platforms.slice(0, 3))

      setGameData(prev => ({ ...prev, platforms }))
      localStorage.setItem(
        GAME_DATA_STORAGE_KEYS.PLATFORMS,
        JSON.stringify(platforms)
      )
    }
  }, [platformsData])

  useEffect(() => {
    if (storesData?.results) {
      const stores = storesData.results.map((store: Store) => ({
        value: store.id.toString(),
        label: store.name
      }))

      setGameData(prev => ({ ...prev, stores }))
      localStorage.setItem(
        GAME_DATA_STORAGE_KEYS.STORES,
        JSON.stringify(stores)
      )
    }
  }, [storesData])

  useEffect(() => {
    if (tagsData?.results) {
      const tags = tagsData.results.map((tag: Tag) => ({
        value: tag.id.toString(),
        label: tag.name,
        count: tag.games_count
      }))

      setGameData(prev => ({ ...prev, tags }))
      localStorage.setItem(GAME_DATA_STORAGE_KEYS.TAGS, JSON.stringify(tags))
    }
  }, [tagsData])

  return {
    gameData
  }
}
