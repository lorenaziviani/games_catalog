export interface Game {
  id: number
  name: string
  slug: string
  background_image: string
  rating: number
  rating_top: number
  metacritic: number
  playtime: number
  released: string
  updated: string
  platforms: {
    platform: {
      id: number
      name: string
      slug: string
    }
    requirements: {
      minimum?: string
      recommended?: string
    }
  }[]
  genres: {
    id: number
    name: string
    slug: string
  }[]
  publishers: {
    id: number
    name: string
    slug: string
  }[]
  developers: {
    id: number
    name: string
    slug: string
  }[]
  tags: {
    id: number
    name: string
    slug: string
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
}

export interface GenresResponse {
  count: number
  results: Genre[]
}
