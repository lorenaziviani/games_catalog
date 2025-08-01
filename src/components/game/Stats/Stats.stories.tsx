import { store } from '@/store'
import type { Game } from '@/types/game'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Provider } from 'react-redux'
import Stats from './index'

const meta: Meta<typeof Stats> = {
  title: 'Game/Stats',
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
        minimum: 'Windows 10',
        recommended: 'Windows 10, 16GB RAM'
      },
      requirements_ru: null
    }
  ],
  genres: [
    {
      id: 1,
      name: 'Action',
      slug: 'action',
      games_count: 100,
      image_background:
        'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
    },
    {
      id: 2,
      name: 'Adventure',
      slug: 'adventure',
      games_count: 200,
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
  clip: null
}

export const Default: Story = {
  args: {
    games: [mockGame],
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
    games: [mockGame],
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
    games: [mockGame],
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
