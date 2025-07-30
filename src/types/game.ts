export interface Game {
  id: number
  name: string
  slug: string
  background_image: string
  rating: number
  rating_top: number
  metacritic: number | null
  playtime: number
  released: string
  updated: string
  tba: boolean
  added: number
  added_by_status: {
    yet: number
    owned: number
    beaten: number
    toplay: number
    dropped: number
    playing: number
  }
  ratings: Array<{
    id: number
    title: string
    count: number
    percent: number
  }>
  ratings_count: number
  reviews_text_count: number
  suggestions_count: number
  user_game: string | null
  reviews_count: number
  saturated_color: string
  dominant_color: string
  platforms: {
    platform: {
      id: number
      name: string
      slug: string
      image: string | null
      year_end: number | null
      year_start: number | null
      games_count: number
      image_background: string
    }
    released_at: string
    requirements_en: {
      minimum?: string
      recommended?: string
    }
    requirements_ru: {
      minimum?: string
      recommended?: string
    } | null
  }[]
  genres: {
    id: number
    name: string
    slug: string
    games_count: number
    image_background: string
  }[]
  stores: {
    id: number
    store: {
      id: number
      name: string
      slug: string
      domain: string
      games_count: number
      image_background: string
    }
  }[]
  tags: {
    id: number
    name: string
    slug: string
    language: string
    games_count: number
    image_background: string
  }[]
  esrb_rating?: {
    id: number
    name: string
    slug: string
  }
  short_screenshots: {
    id: number
    image: string
  }[]
  clip: string | null
}

export interface GamesResponse {
  count: number
  next?: string
  previous?: string
  results: Game[]
}

export interface GameDetails extends Game {
  description: string
  website: string
  reddit_url: string
  reddit_name: string
  reddit_description: string
  reddit_logo: string
  screenshots_count: number
  movies_count: number
  creators_count: number
  achievements_count: number
  parent_achievements: string
  metacritic_url: string
  parents_count: number
  additions_count: number
  game_series_count: number
  user_game: string
  reviews_count: number
  saturated_color: string
  dominant_color: string
  stores: {
    id: number
    store: {
      id: number
      name: string
      slug: string
      domain: string
      games_count: number
      image_background: string
    }
  }[]
  clip: string
  clips: {
    clip: string
    clips: {
      320: string
      640: string
      full: string
    }
    video: string
    preview: string
  }
  requirements: {
    minimum?: string
    recommended?: string
  }
}

export interface Genre {
  id: number
  name: string
  slug: string
  games_count: number
}

export interface GenresResponse {
  count: number
  results: Genre[]
}

export interface Platform {
  id: number
  name: string
  slug: string
  games_count: number
}

export interface PlatformsResponse {
  count: number
  results: Platform[]
}

export interface Store {
  id: number
  name: string
  slug: string
  domain: string
  games_count: number
  image_background: string
}

export interface StoresResponse {
  count: number
  results: Store[]
}

export interface Tag {
  id: number
  name: string
  slug: string
  games_count: number
  image_background: string
}

export interface TagsResponse {
  count: number
  results: Tag[]
}
