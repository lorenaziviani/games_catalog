import { store } from '@/store'
import type { Game } from '@/types/game'
import Card from '@components/Card'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Provider } from 'react-redux'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    )
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de card para exibir informações de jogos com imagem, rating, gêneros, plataformas e botão de favorito integrado ao Redux'
      }
    }
  },
  argTypes: {
    game: {
      control: 'object',
      description: 'Dados do jogo'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const mockGame: Game = {
  id: 1,
  name: 'The Legend of Zelda: Breath of the Wild',
  slug: 'the-legend-of-zelda-breath-of-the-wild',
  background_image:
    'https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9b5e8.jpg',
  rating: 4.5,
  rating_top: 5,
  metacritic: 97,
  playtime: 120,
  released: '2017-03-03',
  updated: '2023-01-01T00:00:00',
  tba: false,
  added: 1500,
  added_by_status: {
    yet: 50,
    owned: 1000,
    beaten: 300,
    toplay: 100,
    dropped: 30,
    playing: 20
  },
  ratings: [
    {
      id: 5,
      title: 'exceptional',
      count: 100,
      percent: 80.0
    },
    {
      id: 4,
      title: 'recommended',
      count: 20,
      percent: 16.0
    },
    {
      id: 3,
      title: 'meh',
      count: 5,
      percent: 4.0
    }
  ],
  ratings_count: 125,
  reviews_text_count: 10,
  suggestions_count: 50,
  user_game: null,
  reviews_count: 15,
  saturated_color: '0f0f0f',
  dominant_color: '0f0f0f',
  platforms: [
    {
      platform: {
        id: 4,
        name: 'PC',
        slug: 'pc',
        image: null,
        year_end: null,
        year_start: null,
        games_count: 552949,
        image_background:
          'https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg'
      },
      released_at: '2020-12-10',
      requirements_en: {
        minimum: 'Minimum requirements...',
        recommended: 'Recommended requirements...'
      },
      requirements_ru: null
    },
    {
      platform: {
        id: 187,
        name: 'PlayStation 5',
        slug: 'ps5',
        image: null,
        year_end: null,
        year_start: null,
        games_count: 1234,
        image_background:
          'https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg'
      },
      released_at: '2020-12-10',
      requirements_en: {
        minimum: 'Minimum requirements...',
        recommended: 'Recommended requirements...'
      },
      requirements_ru: null
    }
  ],
  genres: [
    {
      id: 1,
      name: 'Action',
      slug: 'action',
      games_count: 150,
      image_background:
        'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
    },
    {
      id: 2,
      name: 'Adventure',
      slug: 'adventure',
      games_count: 120,
      image_background:
        'https://media.rawg.io/media/games/b6b/b6b20bfc4b34e312dbc8aac53c95a348.jpg'
    },
    {
      id: 3,
      name: 'RPG',
      slug: 'rpg',
      games_count: 80,
      image_background:
        'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
    }
  ],
  publishers: [
    {
      id: 1,
      name: 'Nintendo',
      slug: 'nintendo',
      games_count: 150,
      image_background:
        'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
    }
  ],
  developers: [
    {
      id: 1,
      name: 'Nintendo EPD',
      slug: 'nintendo-epd',
      games_count: 100,
      image_background:
        'https://media.rawg.io/media/games/b6b/b6b20bfc4b34e312dbc8aac53c95a348.jpg'
    }
  ],
  tags: [
    {
      id: 1,
      name: 'Open World',
      slug: 'open-world',
      language: 'eng',
      games_count: 150,
      image_background:
        'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
    },
    {
      id: 2,
      name: 'Exploration',
      slug: 'exploration',
      language: 'eng',
      games_count: 120,
      image_background:
        'https://media.rawg.io/media/games/b6b/b6b20bfc4b34e312dbc8aac53c95a348.jpg'
    }
  ],
  short_screenshots: [],
  parent_platforms: [
    {
      platform: {
        id: 1,
        name: 'PC',
        slug: 'pc'
      }
    }
  ],
  stores: [
    {
      id: 1,
      store: {
        id: 1,
        name: 'Steam',
        slug: 'steam',
        domain: 'store.steampowered.com',
        games_count: 115878,
        image_background:
          'https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg'
      }
    }
  ],
  creators: [
    {
      id: 1,
      name: 'Nintendo',
      slug: 'nintendo',
      games_count: 150,
      image_background:
        'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
    }
  ],
  clip: null
}

const mockGameWithoutMetacritic: Game = {
  ...mockGame,
  id: 2,
  name: 'Super Mario Odyssey',
  metacritic: 0,
  rating: 4.5,
  genres: [
    { id: 4, name: 'Platformer', slug: 'platformer' },
    { id: 5, name: 'Adventure', slug: 'adventure' }
  ]
}

const mockGameWithLowRating: Game = {
  ...mockGame,
  id: 3,
  name: 'Cyberpunk 2077',
  rating: 2.1,
  metacritic: 56,
  genres: [
    { id: 6, name: 'RPG', slug: 'rpg' },
    { id: 7, name: 'Action', slug: 'action' }
  ]
}

export const Default: Story = {
  args: {
    game: mockGame
  }
}

export const WithoutMetacritic: Story = {
  args: {
    game: mockGameWithoutMetacritic
  },
  parameters: {
    docs: {
      description: {
        story: 'Card de jogo sem pontuação Metacritic'
      }
    }
  }
}

export const LowRating: Story = {
  args: {
    game: mockGameWithLowRating
  },
  parameters: {
    docs: {
      description: {
        story: 'Card de jogo com baixa avaliação'
      }
    }
  }
}

export const Favorited: Story = {
  render: args => {
    // Pré-carregar como favorito
    store.dispatch({
      type: 'favorites/addToFavorites',
      payload: args.game
    })
    return <Card {...args} />
  },
  args: {
    game: mockGame
  },
  parameters: {
    docs: {
      description: {
        story: 'Card de jogo marcado como favorito'
      }
    }
  }
}

export const NotFavorited: Story = {
  render: args => {
    // Garantir que não está favorito
    store.dispatch({
      type: 'favorites/removeFromFavorites',
      payload: args.game.id
    })
    return <Card {...args} />
  },
  args: {
    game: mockGame
  },
  parameters: {
    docs: {
      description: {
        story: 'Card de jogo não marcado como favorito'
      }
    }
  }
}
