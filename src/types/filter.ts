export interface FilterState {
  name: string
  genres: string[]
  platforms: string[]
  stores: string[]
  tags: string[]
  dateRange: {
    start: string
    end: string
  }
  metacriticRange: {
    min: number
    max: number
  }
  ordering: string
}

import { DEFAULT_FILTER_ORDERING } from './common'

export const DEFAULT_FILTERS: FilterState = {
  name: '',
  genres: [],
  platforms: [],
  stores: [],
  tags: [],
  dateRange: {
    start: '',
    end: ''
  },
  metacriticRange: {
    min: 0,
    max: 100
  },
  ordering: DEFAULT_FILTER_ORDERING
}

export interface FilterOption {
  value: string
  label: string
}

export type FilterType =
  | 'name'
  | 'genres'
  | 'platforms'
  | 'stores'
  | 'tags'
  | 'dateRange'
  | 'ratingRange'
  | 'metacriticRange'
  | 'ordering'

export interface ApiFilterParams {
  search?: string
  genres?: string
  platforms?: string
  stores?: string
  tags?: string
  dates?: string
  metacritic?: string
  ordering?: string
}

export type GameItem = { value: string; label: string }

export type Gameselectors = {
  genres: GameItem[]
  tags: GameItem[]
  platforms: { platform: GameItem }[]
  stores: { store: GameItem }[]
}
