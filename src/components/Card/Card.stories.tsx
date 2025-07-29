import type { Game } from '@/types/game'
import Card from '@components/Card'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de card para exibir informações de jogos com imagem, rating, gêneros, plataformas e botão de favorito'
      }
    }
  },
  argTypes: {
    game: {
      control: 'object',
      description: 'Dados do jogo'
    },
    isFavorite: {
      control: 'boolean',
      description: 'Se o jogo está favoritado'
    },
    onFavoriteToggle: {
      action: 'favorite toggled',
      description: 'Callback quando o favorito é alterado'
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
    game: mockGame,
    isFavorite: false
  }
}

export const Favorited: Story = {
  args: {
    game: mockGame,
    isFavorite: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Card com jogo favoritado'
      }
    }
  }
}

export const WithoutMetacritic: Story = {
  args: {
    game: mockGameWithoutMetacritic,
    isFavorite: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Card de jogo sem score do Metacritic'
      }
    }
  }
}

export const LowRating: Story = {
  args: {
    game: mockGameWithLowRating,
    isFavorite: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Card de jogo com baixa avaliação'
      }
    }
  }
}

export const MultipleCards: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        width: '100%'
      }}
    >
      <Card game={mockGame} isFavorite={false} onFavoriteToggle={() => {}} />
      <Card
        game={mockGameWithoutMetacritic}
        isFavorite={true}
        onFavoriteToggle={() => {}}
      />
      <Card
        game={mockGameWithLowRating}
        isFavorite={false}
        onFavoriteToggle={() => {}}
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Múltiplos cards em grid responsivo'
      }
    }
  }
}

export const Interactive: Story = {
  args: {
    game: mockGame,
    isFavorite: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Card interativo - clique no botão de favorito para testar'
      }
    }
  }
}
