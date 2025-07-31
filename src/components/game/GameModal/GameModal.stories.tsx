import { store } from '@/store'
import { LightTheme } from '@/styles/theme'
import type { Game } from '@/types/game'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import GameModal from './index'

const mockGame: Game = {
  id: 1,
  name: 'The Legend of Zelda: Breath of the Wild',
  slug: 'the-legend-of-zelda-breath-of-the-wild',
  background_image: 'https://placehold.co/600x400',
  rating: 4.8,
  rating_top: 5,
  metacritic: 97,
  playtime: 120,
  released: '2017-03-03',
  updated: '2023-01-01',
  tba: false,
  added: 1000,
  added_by_status: {
    yet: 100,
    owned: 500,
    beaten: 300,
    toplay: 50,
    dropped: 20,
    playing: 30
  },
  ratings: [
    {
      id: 1,
      title: 'exceptional',
      count: 500,
      percent: 80
    },
    { id: 2, title: 'recommended', count: 100, percent: 16 },
    { id: 3, title: 'meh', count: 20, percent: 3 },
    { id: 4, title: 'skip', count: 5, percent: 1 }
  ],
  ratings_count: 625,
  reviews_text_count: 50,
  suggestions_count: 10,
  user_game: null,
  reviews_count: 25,
  saturated_color: '#5d4e75',
  dominant_color: '#5d4e75',
  platforms: [
    {
      platform: {
        id: 7,
        name: 'Nintendo Switch',
        slug: 'nintendo-switch',
        image: null,
        year_end: null,
        year_start: 2017,
        games_count: 1000,
        image_background: 'https://placehold.co/600x400'
      },
      released_at: '2017-03-03',
      requirements_en: {
        minimum: 'Windows 10',
        recommended: 'Windows 10'
      },
      requirements_ru: null
    }
  ],
  genres: [
    {
      id: 3,
      name: 'Adventure',
      slug: 'adventure',
      games_count: 1000,
      image_background: 'https://placehold.co/600x400'
    },
    {
      id: 4,
      name: 'Action',
      slug: 'action',
      games_count: 2000,
      image_background: 'https://placehold.co/600x400'
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
        games_count: 10000,
        image_background: 'https://placehold.co/600x400'
      }
    }
  ],
  tags: [
    {
      id: 1,
      name: 'Open World',
      slug: 'open-world',
      language: 'eng',
      games_count: 500,
      image_background: 'https://placehold.co/600x400'
    },
    {
      id: 2,
      name: 'RPG',
      slug: 'rpg',
      language: 'eng',
      games_count: 300,
      image_background: 'https://placehold.co/600x400'
    }
  ],
  short_screenshots: [
    {
      id: 1,
      image: 'https://placehold.co/600x400'
    },
    {
      id: 2,
      image: 'https://placehold.co/600x400'
    }
  ],
  clip: null
}

const meta: Meta<typeof GameModal> = {
  title: 'Game/GameModal',
  component: GameModal,
  decorators: [
    Story => (
      <Provider store={store}>
        <ThemeProvider theme={LightTheme}>
          <Story />
        </ThemeProvider>
      </Provider>
    )
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Modal responsivo para visualização detalhada de jogos com informações completas, screenshots e funcionalidades de favoritos.'
      }
    }
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controla se o modal está aberto ou fechado'
    },
    game: {
      control: 'object',
      description: 'Dados do jogo a ser exibido no modal'
    },
    gameDetails: {
      control: 'object',
      description: 'Detalhes adicionais do jogo'
    },
    loading: {
      control: 'boolean',
      description: 'Indica se os detalhes estão sendo carregados'
    },
    error: {
      control: 'text',
      description: 'Mensagem de erro se houver'
    },
    onClose: {
      action: 'closed',
      description: 'Função chamada quando o modal é fechado'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isOpen: true,
    game: mockGame,
    gameDetails: null,
    loading: false,
    error: null,
    onClose: () => console.log('Modal fechado')
  }
}

export const Closed: Story = {
  args: {
    isOpen: false,
    game: mockGame,
    gameDetails: null,
    loading: false,
    error: null,
    onClose: () => console.log('Modal fechado')
  }
}

export const NoGame: Story = {
  args: {
    isOpen: true,
    game: null,
    gameDetails: null,
    loading: false,
    error: null,
    onClose: () => console.log('Modal fechado')
  }
}

export const Loading: Story = {
  args: {
    isOpen: true,
    game: mockGame,
    gameDetails: null,
    loading: true,
    error: null,
    onClose: () => console.log('Modal fechado')
  }
}

export const WithError: Story = {
  args: {
    isOpen: true,
    game: mockGame,
    gameDetails: null,
    loading: false,
    error: 'Erro ao carregar detalhes do jogo',
    onClose: () => console.log('Modal fechado')
  }
}
