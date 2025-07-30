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
  background_image: 'https://placehold.co/600x400',
  rating: 4.8,
  rating_top: 5,
  metacritic: 97,
  playtime: 120,
  released: '2017-03-03',
  updated: '2023-12-01T10:00:00Z',
  platforms: [
    {
      platform: {
        id: 1,
        name: 'Nintendo Switch',
        slug: 'nintendo-switch'
      },
      requirements: {}
    },
    {
      platform: {
        id: 2,
        name: 'Wii U',
        slug: 'wii-u'
      },
      requirements: {}
    }
  ],
  genres: [
    { id: 1, name: 'Action', slug: 'action' },
    { id: 2, name: 'Adventure', slug: 'adventure' },
    { id: 3, name: 'RPG', slug: 'rpg' }
  ],
  publishers: [{ id: 1, name: 'Nintendo', slug: 'nintendo' }],
  developers: [{ id: 1, name: 'Nintendo EPD', slug: 'nintendo-epd' }],
  tags: [
    { id: 1, name: 'Open World', slug: 'open-world' },
    { id: 2, name: 'Exploration', slug: 'exploration' }
  ],
  short_screenshots: []
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
