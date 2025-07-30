import { store } from '@/store'
import type { Game } from '@/types/game'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Provider } from 'react-redux'
import Stats from './index'

const meta: Meta<typeof Stats> = {
  title: 'Components/Stats',
  component: Stats,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Componente de estatísticas reutilizável para exibir informações sobre jogos'
      }
    }
  },
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    )
  ],
  argTypes: {
    games: {
      control: false,
      description: 'Array de jogos para calcular estatísticas'
    },
    onClearAll: {
      control: false,
      description: 'Função chamada ao clicar no botão "Limpar Todos"'
    },
    showClearButton: {
      control: 'boolean',
      description: 'Mostrar botão de limpar todos'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const mockGames: Game[] = [
  {
    id: 1,
    name: 'The Witcher 3: Wild Hunt',
    slug: 'the-witcher-3-wild-hunt',
    rating: 4.8,
    rating_top: 5,
    metacritic: 93,
    playtime: 0,
    released: '2015-05-19',
    updated: '2023-01-01',
    background_image: 'https://example.com/witcher3.jpg',
    genres: [
      {
        id: 1,
        name: 'RPG',
        slug: 'rpg',
        games_count: 100,
        image_background:
          'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
      },
      {
        id: 2,
        name: 'Action',
        slug: 'action',
        games_count: 100,
        image_background:
          'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
      },
      {
        id: 3,
        name: 'Adventure',
        slug: 'adventure',
        games_count: 100,
        image_background:
          'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
      }
    ],
    platforms: [
      {
        platform: {
          id: 1,
          name: 'PC',
          slug: 'pc',
          image: null,
          year_end: null,
          year_start: null,
          games_count: 1000,
          image_background:
            'https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg'
        },
        requirements: {}
      },
      {
        platform: {
          id: 2,
          name: 'PlayStation 4',
          slug: 'ps4',
          image: null,
          year_end: null,
          year_start: null,
          games_count: 1000,
          image_background:
            'https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg'
        },
        requirements: {}
      },
      {
        platform: {
          id: 3,
          name: 'Xbox One',
          slug: 'xbox-one',
          image: null,
          year_end: null,
          year_start: null,
          games_count: 1000,
          image_background:
            'https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg'
        },
        requirements: {}
      }
    ],
    publishers: [],
    developers: [],
    tags: [],
    short_screenshots: []
  },
  {
    id: 2,
    name: 'Red Dead Redemption 2',
    slug: 'red-dead-redemption-2',
    rating: 4.9,
    rating_top: 5,
    metacritic: 97,
    playtime: 0,
    released: '2018-10-26',
    updated: '2023-01-01',
    background_image: 'https://example.com/rdr2.jpg',
    genres: [
      {
        id: 2,
        name: 'Action',
        slug: 'action',
        games_count: 100,
        image_background:
          'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
      },
      {
        id: 3,
        name: 'Adventure',
        slug: 'adventure',
        games_count: 100,
        image_background:
          'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
      },
      {
        id: 4,
        name: 'Western',
        slug: 'western',
        games_count: 100,
        image_background:
          'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
      }
    ],
    platforms: [
      {
        platform: {
          id: 1,
          name: 'PC',
          slug: 'pc',
          image: null,
          year_end: null,
          year_start: null,
          games_count: 1000,
          image_background:
            'https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg'
        },
        requirements: {}
      },
      {
        platform: {
          id: 2,
          name: 'PlayStation 4',
          slug: 'ps4',
          image: null,
          year_end: null,
          year_start: null,
          games_count: 1000,
          image_background:
            'https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg'
        },
        requirements: {}
      },
      {
        platform: {
          id: 3,
          name: 'Xbox One',
          slug: 'xbox-one',
          image: null,
          year_end: null,
          year_start: null,
          games_count: 1000,
          image_background:
            'https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg'
        },
        requirements: {}
      }
    ],
    publishers: [],
    developers: [],
    tags: [],
    short_screenshots: []
  },
  {
    id: 3,
    name: 'God of War',
    slug: 'god-of-war',
    rating: 4.7,
    rating_top: 5,
    metacritic: 94,
    playtime: 0,
    released: '2018-04-20',
    updated: '2023-01-01',
    background_image: 'https://example.com/gow.jpg',
    genres: [
      {
        id: 2,
        name: 'Action',
        slug: 'action',
        games_count: 100,
        image_background:
          'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
      },
      {
        id: 3,
        name: 'Adventure',
        slug: 'adventure',
        games_count: 100,
        image_background:
          'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
      }
    ],
    platforms: [
      {
        platform: {
          id: 2,
          name: 'PlayStation 4',
          slug: 'ps4',
          image: null,
          year_end: null,
          year_start: null,
          games_count: 1000,
          image_background:
            'https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg'
        },
        requirements: {}
      },
      {
        platform: {
          id: 1,
          name: 'PC',
          slug: 'pc',
          image: null,
          year_end: null,
          year_start: null,
          games_count: 1000,
          image_background:
            'https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg'
        },
        requirements: {}
      }
    ],
    publishers: [],
    developers: [],
    tags: [],
    short_screenshots: []
  }
]

export const Default: Story = {
  args: {
    games: mockGames,
    showClearButton: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Estatísticas básicas sem botão de limpar'
      }
    }
  }
}

export const WithClearButton: Story = {
  args: {
    games: mockGames,
    showClearButton: true,
    onClearAll: () => {
      console.log('Limpar todos os jogos')
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Estatísticas com botão de limpar todos'
      }
    }
  }
}

export const Empty: Story = {
  args: {
    games: [],
    showClearButton: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Componente com lista vazia (não renderiza)'
      }
    }
  }
}

export const SingleGame: Story = {
  args: {
    games: [mockGames[0]],
    showClearButton: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Estatísticas com apenas um jogo'
      }
    }
  }
}
